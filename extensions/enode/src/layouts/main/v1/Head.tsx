import type { LayoutProps } from "quinecms/core/layout-contract";
export default function Head({ settings }: LayoutProps) {
  return (
    <>
      <style>{"body { margin: 0; }"}</style>
      <meta name="description" content={String(settings.description || "")} />
      <meta name="theme-color" content="#eefde6" />
      <link rel="icon" href="/enode/favicon.svg" type="image/svg+xml" />
      <link
        rel="preload"
        href="/enode/enode-sans.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
}
