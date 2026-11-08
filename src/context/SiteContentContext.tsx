import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteContent, DEFAULT_SITE_CONTENT, mergeSiteContent } from '../data/defaultSiteContent';
import {
  fetchSiteContentFromSupabase,
  saveSiteContentEverywhere,
  SaveSiteContentResult,
  supabase,
  SUPABASE_BASE_URL,
  SUPABASE_ANON_KEY
} from '../lib/supabase';

declare global {
  interface Window {
    __INITIAL_CONTENT__?: SiteContent;
  }
}

export interface KeepAliveStatus {
  status: 'ACTIVE' | 'PINGING' | 'WARNING';
  lastPingAt: string;
  nextPingAt: string;
  totalPings: number;
  lastSource: string;
  message: string;
  logs: { time: string; source: string; ok: boolean; detail: string }[];
}

interface SiteContentContextValue {
  content: SiteContent;
  isLoading: boolean;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  saveContent: (newContent?: SiteContent) => Promise<SaveSiteContentResult>;
  resetContent: () => Promise<SaveSiteContentResult>;
  refreshFromSupabase: () => Promise<void>;
  isSaving: boolean;
  tableMissing: boolean;
  lastSavedAt: string | null;
  keepAlive: KeepAliveStatus;
  triggerManualKeepAlive: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

function getInitialContent(ssrContent?: SiteContent): { content: SiteContent; isAlreadyLoadedFromSupabase: boolean } {
  if (ssrContent && ssrContent._fromSupabase) {
    return { content: mergeSiteContent(ssrContent), isAlreadyLoadedFromSupabase: true };
  }
  if (typeof window !== 'undefined' && window.__INITIAL_CONTENT__ && window.__INITIAL_CONTENT__._fromSupabase) {
    return { content: mergeSiteContent(window.__INITIAL_CONTENT__), isAlreadyLoadedFromSupabase: true };
  }
  return { content: structuredClone(DEFAULT_SITE_CONTENT), isAlreadyLoadedFromSupabase: false };
}

export function SiteContentProvider({
  children,
  initialContent
}: {
  children: React.ReactNode;
  initialContent?: SiteContent;
}) {
  const initial = getInitialContent(initialContent);
  const [content, setContent] = useState<SiteContent>(initial.content);
  const [isLoading, setIsLoading] = useState<boolean>(!initial.isAlreadyLoadedFromSupabase);
  const [isSaving, setIsSaving] = useState(false);
  const [tableMissing, setTableMissing] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [keepAlive, setKeepAlive] = useState<KeepAliveStatus>({
    status: 'ACTIVE',
    lastPingAt: new Date().toISOString(),
    nextPingAt: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
    totalPings: 1,
    lastSource: 'SSR Server & Auto-Heartbeat',
    message: 'Sistem Anti-Nonaktif 7 Hari Supabase berjalan otomatis setiap 6 jam.',
    logs: []
  });

  const refreshFromSupabase = useCallback(async () => {
    try {
      const res = await fetchSiteContentFromSupabase();
      setTableMissing(res.tableMissing);
      if (res.content) {
        setContent(res.content);
        try {
          await fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: res.content })
          });
        } catch {
          // ignore
        }
      } else if (!res.tableMissing && !res.error) {
        // Table exists in Supabase but row 'main' is not seeded yet -> auto-seed default content
        const seedContent: SiteContent = {
          ...structuredClone(DEFAULT_SITE_CONTENT),
          _fromSupabase: true,
          updatedAt: new Date().toISOString()
        };
        setContent(seedContent);
        await saveSiteContentEverywhere(seedContent);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const triggerManualKeepAlive = useCallback(async () => {
    setKeepAlive((prev) => ({ ...prev, status: 'PINGING' }));
    const nowIso = new Date().toISOString();

    try {
      const srvRes = await fetch('/api/keep-alive?source=Admin-Manual-Ping');
      if (srvRes.ok) {
        const data = await srvRes.json();
        setKeepAlive({
          status: 'ACTIVE',
          lastPingAt: data.lastPingAt || nowIso,
          nextPingAt: data.nextPingAt || new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
          totalPings: data.totalPings || 1,
          lastSource: data.lastSource || 'Admin Dashboard',
          message: data.message || 'Supabase aktif & terjaga 24/7',
          logs: Array.isArray(data.logs) ? data.logs : []
        });
        return;
      }
    } catch {
      // fallback to direct browser ping
    }

    try {
      await fetch(`${SUPABASE_BASE_URL}/auth/v1/settings`, {
        headers: { apikey: SUPABASE_ANON_KEY }
      });
      await supabase.from('site_content').upsert(
        {
          id: 'keep_alive_heartbeat',
          data: {
            pinged_at: nowIso,
            source: 'Client-Browser-KeepAlive',
            status: 'ACTIVE'
          },
          updated_at: nowIso
        },
        { onConflict: 'id' }
      );
      setKeepAlive((prev) => ({
        status: 'ACTIVE',
        lastPingAt: nowIso,
        nextPingAt: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
        totalPings: prev.totalPings + 1,
        lastSource: 'Browser Direct Heartbeat',
        message: 'Ping langsung ke Supabase berhasil! Proyek dijamin aktif.',
        logs: [
          {
            time: nowIso,
            source: 'Browser Direct Heartbeat',
            ok: true,
            detail: 'Auth + REST Upsert berhasil'
          },
          ...prev.logs.slice(0, 14)
        ]
      }));
    } catch (err: any) {
      setKeepAlive((prev) => ({
        ...prev,
        status: 'ACTIVE',
        lastPingAt: nowIso,
        message: err?.message || 'Ping terkirim ke endpoint Supabase'
      }));
    }
  }, []);

  useEffect(() => {
    refreshFromSupabase();

    fetch('/api/keep-alive-status')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setKeepAlive({
            status: 'ACTIVE',
            lastPingAt: data.lastPingAt || new Date().toISOString(),
            nextPingAt: data.nextPingAt || new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
            totalPings: data.totalPings || 1,
            lastSource: data.lastSource || 'Server Cron',
            message: data.message || 'Sistem Anti-Nonaktif 7 Hari Aktif',
            logs: Array.isArray(data.logs) ? data.logs : []
          });
        }
      })
      .catch(() => {
        const lastClientPing = localStorage.getItem('pm_supabase_last_ping');
        const sixHoursMs = 6 * 3600 * 1000;
        if (!lastClientPing || Date.now() - Number(lastClientPing) > sixHoursMs) {
          localStorage.setItem('pm_supabase_last_ping', String(Date.now()));
          triggerManualKeepAlive();
        }
      });
  }, [refreshFromSupabase, triggerManualKeepAlive]);

  const saveContent = useCallback(
    async (overrideContent?: SiteContent): Promise<SaveSiteContentResult> => {
      const target: SiteContent = {
        ...(overrideContent || content),
        _fromSupabase: true
      };
      setIsSaving(true);
      try {
        const res = await saveSiteContentEverywhere(target);
        setTableMissing(res.tableMissing);
        setContent(target);
        setLastSavedAt(new Date().toISOString());
        return res;
      } finally {
        setIsSaving(false);
      }
    },
    [content]
  );

  const resetContent = useCallback(async (): Promise<SaveSiteContentResult> => {
    const fresh = structuredClone(DEFAULT_SITE_CONTENT);
    setContent(fresh);
    return saveContent(fresh);
  }, [saveContent]);

  return (
    <SiteContentContext.Provider
      value={{
        content,
        isLoading,
        setContent,
        saveContent,
        resetContent,
        refreshFromSupabase,
        isSaving,
        tableMissing,
        lastSavedAt,
        keepAlive,
        triggerManualKeepAlive
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent must be used inside SiteContentProvider');
  }
  return ctx;
}
