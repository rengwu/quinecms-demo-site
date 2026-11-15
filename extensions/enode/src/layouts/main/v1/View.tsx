import { useRef } from "react";
import type { LayoutProps } from "quinecms/core/layout-contract";
import { rows, text, url } from "../../../shared/content";
import "../../../shared/styles.css";
export default function EnodeLayout({
  settings,
  children,
  preview,
  onNavigate,
}: LayoutProps) {
  const root = useRef<HTMLDivElement>(null);
  const platform = rows(settings.platform);
  const resources = rows(settings.resources);
  const navigation = rows(settings.navigation);
  const linkList = (items: typeof platform) =>
    items.map((item, i) => (
      <a key={text(item._rowId) || i} href={url(item.url)}>
        {text(item.label)}
      </a>
    ));
  return (
    <div
      ref={root}
      className="enode-site"
      data-preview={preview || undefined}
      data-theme={text(settings.theme) || "light"}
      onClick={(event) => {
        const anchor = (event.target as HTMLElement).closest("a");
        if (
          !anchor ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        root.current
          ?.querySelectorAll("details[open]")
          .forEach((element) => element.removeAttribute("open"));
        if (
          preview &&
          anchor.getAttribute("href")?.startsWith("/") &&
          onNavigate
        ) {
          event.preventDefault();
          onNavigate(anchor.getAttribute("href")!);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          root.current?.querySelectorAll("details[open]").forEach((element) => {
            element.removeAttribute("open");
            element.querySelector("summary")?.focus();
          });
        }
      }}
    >
      <a className="enode-skip" href="#enode-content">
        Skip to content
      </a>
      <header className="enode-header">
        <div className="enode-header-inner">
          <a className="enode-logo" href="/" aria-label="Enode home">
            <img
              src="/enode/enode-wordmark.svg"
              alt="Enode"
              width="83"
              height="24"
            />
          </a>
          <nav className="enode-desktop-nav" aria-label="Main navigation">
            <details name="enode-menu">
              <summary>Platform</summary>
              <div className="enode-dropdown">
                <span className="enode-eyebrow">The Enode platform</span>
                {linkList(platform)}
              </div>
            </details>
            <details name="enode-menu">
              <summary>Resources</summary>
              <div className="enode-dropdown">{linkList(resources)}</div>
            </details>
            {linkList(navigation)}
          </nav>
          <div className="enode-header-actions">
            <a className="enode-signin" href="https://platform.enode.com/">
              Sign in
            </a>
            <a className="enode-button" href={url(settings.contactUrl)}>
              {text(settings.contactLabel)}
            </a>
          </div>
          <details className="enode-mobile-menu">
            <summary aria-label="Toggle navigation">
              <span />
              <span />
            </summary>
            <nav aria-label="Mobile navigation">
              {linkList(platform)}
              {linkList(resources)}
              {linkList(navigation)}
              <a href={url(settings.contactUrl)}>
                {text(settings.contactLabel)}
              </a>
            </nav>
          </details>
        </div>
      </header>
      <main id="enode-content">{children}</main>
      <footer className="enode-footer">
        <div className="enode-container enode-footer-grid">
          <div className="enode-footer-brand">
            <a className="enode-logo" href="/">
              <img
                src="/enode/enode-wordmark.svg"
                alt="Enode"
                width="83"
                height="24"
              />
            </a>
            <p>{text(settings.tagline)}</p>
          </div>
          <div>
            <h2>Platform</h2>
            {linkList(platform)}
          </div>
          <div>
            <h2>Resources</h2>
            {linkList(resources)}
          </div>
          <div>
            <h2>Developers</h2>
            {linkList(rows(settings.developers))}
          </div>
          <div>
            <h2>Company</h2>
            {linkList(rows(settings.company))}
          </div>
        </div>
      </footer>
    </div>
  );
}
