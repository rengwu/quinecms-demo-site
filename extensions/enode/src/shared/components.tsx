import { useState } from "react";
import type { Json, ViewProps, Context } from "quinecms/core/types";
import { text, rows, url, media } from "./content";
import "./styles.css";
function Image({
  value,
  context,
  alt = "",
  eager = false,
  className = "",
}: {
  value: Json | undefined;
  context: Context;
  alt?: string;
  eager?: boolean;
  className?: string;
}) {
  const file = media(value, context);
  if (!file) return null;
  const customAlt =
    value && typeof value === "object" && !Array.isArray(value)
      ? text(value.alt)
      : "";
  return (
    <img
      className={className}
      src={file.url}
      width={file.width}
      height={file.height}
      alt={customAlt || alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return children ? (
    <p className="enode-eyebrow">
      <span />
      {children}
    </p>
  ) : null;
}
function Button({
  label,
  href,
  secondary = false,
}: {
  label: unknown;
  href: unknown;
  secondary?: boolean;
}) {
  return text(label) ? (
    <a
      className={`enode-button ${secondary ? "enode-button-secondary" : ""}`}
      href={url(href)}
    >
      {text(label)}
    </a>
  ) : null;
}
export function Hero({ props, context }: ViewProps) {
  return (
    <section
      className={`enode-hero enode-hero-${text(props.variant) || "home"}`}
    >
      <div className="enode-dot-field" aria-hidden="true" />
      <div className="enode-container enode-hero-copy">
        <Eyebrow>{text(props.eyebrow)}</Eyebrow>
        <h1>{text(props.heading)}</h1>
        <div className="enode-actions">
          <Button label={props.actionLabel} href={props.actionUrl} />
          <Button
            label={props.secondaryLabel}
            href={props.secondaryUrl}
            secondary
          />
        </div>
      </div>
      <div className="enode-hero-media">
        <picture>
          {media(props.mobileImage, context) && (
            <source
              media="(max-width: 600px)"
              srcSet={media(props.mobileImage, context)!.url}
            />
          )}
          <Image
            value={props.image}
            context={context}
            alt="Solar panels on a home surrounded by trees"
            eager
          />
        </picture>
        <span className="enode-energy-label">
          <i />
          {text(props.imageLabel)}
        </span>
        <span className="enode-image-caption">{text(props.imageCaption)}</span>
      </div>
    </section>
  );
}
export function Introduction({ props }: ViewProps) {
  return (
    <section className="enode-introduction enode-container">
      <Eyebrow>{text(props.eyebrow)}</Eyebrow>
      {text(props.heading) && <h2>{text(props.heading)}</h2>}
      <p>{text(props.description)}</p>
      <Button label={props.actionLabel} href={props.actionUrl} />
    </section>
  );
}
export function Logos({ props, context }: ViewProps) {
  return (
    <section className="enode-logos enode-container">
      <p className="enode-eyebrow">{text(props.heading)}</p>
      <div>
        {rows(props.items).map((item, i) => (
          <Image
            key={text(item._rowId) || i}
            value={item.image}
            context={context}
            alt={text(item.label)}
          />
        ))}
      </div>
    </section>
  );
}
export function PlatformDiagram() {
  return (
    <svg
      className="enode-platform-diagram"
      viewBox="0 0 660 560"
      role="img"
      aria-label="The Enode platform, from asset connectivity through home coordination to grid flexibility"
    >
      {[
        { y: 210, label: "F", fill: "#252322" },
        { y: 160, label: "I", fill: "#353630" },
        { y: 100, label: "R", fill: "#4a6740" },
        { y: 40, label: "H", fill: "#7aaa61" },
        { y: -20, label: "A", fill: "#b8fc88" },
      ].map((layer) => (
        <g key={layer.label} transform={`translate(0 ${layer.y})`}>
          <path
            d="M330 70 580 205 330 340 80 205Z"
            fill={layer.fill}
            stroke="#aaa"
            strokeWidth="1"
          />
          <path
            d="M80 205v26l250 135 250-135v-26L330 340Z"
            fill={layer.fill}
            stroke="#aaa"
            strokeWidth="1"
          />
          <text
            x="330"
            y="216"
            textAnchor="middle"
            fill={layer.label === "A" ? "#252322" : "#f4f2f1"}
            fontSize="36"
          >
            {layer.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
export function Platform({ props, context }: ViewProps) {
  const hero = props.hero === true;
  return (
    <section
      className={`enode-platform enode-dark ${hero ? "enode-platform-hero" : ""}`}
    >
      <div className="enode-container">
        <Eyebrow>{text(props.eyebrow)}</Eyebrow>
        {hero ? <h1>{text(props.heading)}</h1> : <h2>{text(props.heading)}</h2>}
        <div className="enode-platform-body">
          <div>
            <p className="enode-lead">{text(props.description)}</p>
            <Button label={props.actionLabel} href={props.actionUrl} />
            <div className="enode-layer-links">
              {rows(props.items).map((item, i) => (
                <a href={url(item.url)} key={text(item._rowId) || i}>
                  <span className="enode-letter">{text(item.letter)}</span>
                  <span>{text(item.title)}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
          <PlatformDiagram />
        </div>
        {hero && (
          <div className="enode-platform-teasers">
            {rows(props.items).map((item, i) => (
              <a href={url(item.url)} key={i}>
                <Image
                  value={item.image}
                  context={context}
                  alt={text(item.title)}
                />
                <h3>
                  <span className="enode-letter">{text(item.letter)}</span>
                  {text(item.title)}
                </h3>
                <p>{text(item.description)}</p>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
function ProductVisual({ kind }: { kind: string }) {
  if (kind === "charging")
    return (
      <div className="enode-device-demo">
        <div className="enode-device-top">
          <span>Tesla Model Y</span>
          <span>•••</span>
        </div>
        <span className="enode-status">● On schedule</span>
        <svg viewBox="0 0 300 100" aria-hidden="true">
          <path
            d="m38 62 17-8 21-30h133l34 31 18 8v19H38Z"
            fill="#e0e5df"
            stroke="#434a43"
            strokeWidth="2"
          />
          <path d="m83 29-19 27h162l-26-27Z" fill="#677772" />
          <circle cx="79" cy="79" r="16" fill="#252322" />
          <circle cx="221" cy="79" r="16" fill="#252322" />
        </svg>
        <div className="enode-charge-number">
          70<span>%</span>
          <small>356 km</small>
        </div>
        <div className="enode-charge-track">
          <span />
        </div>
        <div className="enode-device-bottom">
          <span>Ready by</span>
          <strong>08:00</strong>
        </div>
      </div>
    );
  if (kind === "home")
    return (
      <div className="enode-home-demo">
        <img
          src="/enode/preview-home.jpg"
          alt="A connected home with solar panels"
          loading="lazy"
        />
        <div className="enode-energy-readings">
          {[
            ["Solar", "3.6 kW"],
            ["Battery", "1.4 kW"],
            ["EV", "1.2 kW"],
            ["Grid", "0.2 kW"],
          ].map(([a, b]) => (
            <div key={a}>
              <span>{a}</span>
              <strong>{b}</strong>
            </div>
          ))}
        </div>
      </div>
    );
  if (kind === "grid")
    return (
      <div className="enode-grid-demo">
        <div className="enode-graph-label">
          Portfolio flexibility <span>Today</span>
        </div>
        <svg viewBox="0 0 320 170" aria-hidden="true">
          <path d="M10 145H310M10 100H310M10 55H310" stroke="#d1d5cd" />
          <path
            d="M10 130 35 123 60 125 85 103 110 112 135 60 160 87 185 50 210 61 235 24 260 37 285 18 310 29V155H10Z"
            fill="#b8fc8870"
          />
          <path
            d="M10 130 35 123 60 125 85 103 110 112 135 60 160 87 185 50 210 61 235 24 260 37 285 18 310 29"
            stroke="#6b9a4a"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <div className="enode-device-bottom">
          <span>Available capacity</span>
          <strong>4.8 MW</strong>
        </div>
      </div>
    );
  return (
    <div className="enode-code-demo">
      <div>enode / {kind === "events" ? "events" : "api"}</div>
      <pre>
        {kind === "events"
          ? "● user:vehicle:updated\n● user:charger:discovered\n● user:battery:updated\n● user:schedule:completed"
          : 'GET /users/{id}/vehicles\n\n{\n  "isReachable": true,\n  "batteryLevel": 70,\n  "isCharging": true\n}'}
      </pre>
    </div>
  );
}
export function Cards({ props, context }: ViewProps) {
  return (
    <section className="enode-section enode-container">
      <Eyebrow>{text(props.eyebrow)}</Eyebrow>
      <div className="enode-section-heading">
        <h2>{text(props.heading)}</h2>
        {text(props.description) && <p>{text(props.description)}</p>}
      </div>
      <div
        className={`enode-cards ${props.columns === 2 ? "enode-cards-two" : ""}`}
      >
        {rows(props.items).map((item, i) => (
          <a
            className="enode-card"
            href={url(item.url)}
            key={text(item._rowId) || i}
          >
            <div className="enode-card-visual">
              {media(item.image, context) ? (
                <Image
                  value={item.image}
                  context={context}
                  alt={text(item.title)}
                />
              ) : (
                <ProductVisual kind={text(item.visual)} />
              )}
            </div>
            <h3>
              {text(item.title)}
              <span aria-hidden="true">↗</span>
            </h3>
            <p>{text(item.description)}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
export function Stats({ props }: ViewProps) {
  return (
    <section className="enode-stats enode-container">
      {rows(props.items).map((item, i) => (
        <div key={text(item._rowId) || i}>
          <strong>{text(item.value)}</strong>
          <p>{text(item.label)}</p>
        </div>
      ))}
    </section>
  );
}
export function Story({ props, context }: ViewProps) {
  return (
    <section className="enode-story enode-container">
      <a href={url(props.url)}>
        <Image value={props.image} context={context} alt="Home energy" />
        <div>
          <Eyebrow>{text(props.eyebrow)}</Eyebrow>
          <h2>{text(props.heading)}</h2>
          <span className="enode-button">
            {text(props.actionLabel)} <span aria-hidden="true">↗</span>
          </span>
        </div>
      </a>
    </section>
  );
}
export function Cta({ props }: ViewProps) {
  return (
    <section className="enode-cta enode-container">
      <div className="enode-dot-field" aria-hidden="true" />
      <h2>{text(props.heading)}</h2>
      <p>{text(props.description)}</p>
      <Button label={props.actionLabel} href={props.actionUrl} />
    </section>
  );
}
function DeviceIcon({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 96 80" aria-hidden="true" className="enode-device-icon">
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        {kind === "ev" ? (
          <>
            <path d="M10 49 20 43 31 22h37l15 25 6 4v14H10Z" />
            <path d="m30 28-8 16h50l-9-16Z" />
            <circle cx="27" cy="63" r="9" />
            <circle cx="73" cy="63" r="9" />
          </>
        ) : kind === "solar" ? (
          <>
            <path d="m25 18 51 0 15 43H10Z M21 32h61M17 46h69M42 18 37 61M60 18l6 43M50 62v13M34 75h32" />
          </>
        ) : kind === "hvac" ? (
          <>
            <rect x="10" y="20" width="76" height="40" rx="7" />
            <path d="M18 46h60M18 52h60M34 65v10M48 65v10M62 65v10" />
          </>
        ) : (
          <>
            <rect x="28" y="8" width="40" height="64" rx="5" />
            <path d="M36 20h24v16H36Z M51 42l-9 13h11l-9 12" />
          </>
        )}
      </g>
    </svg>
  );
}
export function Devices({ props }: ViewProps) {
  return (
    <section className="enode-section enode-container">
      <Eyebrow>{text(props.eyebrow)}</Eyebrow>
      <div className="enode-section-heading">
        <h2>{text(props.heading)}</h2>
        <p>{text(props.description)}</p>
      </div>
      <div className="enode-device-grid">
        {rows(props.items).map((item, i) => (
          <article key={text(item._rowId) || i}>
            <div className="enode-device-art">
              <DeviceIcon kind={text(item.icon)} />
              <span className="enode-letter">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3>{text(item.title)}</h3>
            <p>{text(item.description)}</p>
            <div className="enode-device-meta">{text(item.meta)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Feature({ props, context }: ViewProps) {
  return (
    <section
      className={`enode-feature enode-container ${props.reverse ? "enode-feature-reverse" : ""}`}
    >
      <div>
        <Eyebrow>{text(props.eyebrow)}</Eyebrow>
        <h2>{text(props.heading)}</h2>
        <p>{text(props.description)}</p>
        <Button label={props.actionLabel} href={props.actionUrl} secondary />
      </div>
      <div className="enode-feature-visual">
        {media(props.image, context) ? (
          <Image
            value={props.image}
            context={context}
            alt={text(props.heading)}
          />
        ) : (
          <ProductVisual kind={text(props.visual) || "api"} />
        )}
      </div>
    </section>
  );
}
export function Tabs({ props }: ViewProps) {
  const items = rows(props.items);
  const [active, setActive] = useState(0);
  const selected = items[Math.min(active, Math.max(0, items.length - 1))];
  return (
    <section className="enode-section enode-container">
      <Eyebrow>{text(props.eyebrow)}</Eyebrow>
      <h2>{text(props.heading)}</h2>
      <div className="enode-tabs">
        <div
          className="enode-tab-list"
          role="tablist"
          aria-label={text(props.heading)}
        >
          {items.map((item, i) => (
            <button
              type="button"
              key={text(item._rowId) || i}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
            >
              <h3>{text(item.title)}</h3>
              <p>{text(item.description)}</p>
            </button>
          ))}
        </div>
        <div
          className="enode-tab-panel"
          role="tabpanel"
          aria-label={text(selected?.title)}
        >
          <ProductVisual kind={text(selected?.visual)} />
        </div>
      </div>
    </section>
  );
}
