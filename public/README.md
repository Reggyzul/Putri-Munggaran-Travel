# Public Directory

Place all static images and other public assets (like icons, fonts, etc.) in this folder.

## How to use in code:
Assets in this directory are served at the root path `/`. 

For example, if you place an image named `car-banner.jpg` directly in this directory:
- You can reference it in your React components as:
  ```tsx
  <img src="/car-banner.jpg" alt="Car Banner" />
  ```
- Or in your CSS:
  ```css
  background-image: url('/car-banner.jpg');
  ```
