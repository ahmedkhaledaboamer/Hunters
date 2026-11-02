/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
}

interface Window {
  /** Set by the preloader in index.html; called once the first page has rendered. */
  __hhReady?: () => void;
}
