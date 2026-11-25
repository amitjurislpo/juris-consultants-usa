import { DashIcon } from "./icons";
import { DashMotion } from "./motion";
import { DashNav, type DashNavGroup } from "./nav";

/** Whole page frame of the approved dashboard design: gradient sidebar, sticky top bar, content.
 *  Wraps everything in `.jd`, so the design styles apply only inside it. */
export function DashShell({
  brandSub,
  groups,
  sideFooter,
  crumb,
  topRight,
  children,
}: {
  brandSub: string;
  groups: DashNavGroup[];
  /** Bottom of the sidebar: promo card, user card, system status. */
  sideFooter: React.ReactNode;
  /** Breadcrumb text, e.g. "Customer portal / Dashboard". */
  crumb?: React.ReactNode;
  /** Right side of the top bar: time zone, avatar menu, and so on. */
  topRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="jd">
      <div aria-hidden="true" className="d-bgfx" />
      <div className="d-app">
        <aside className="d-side">
          <div className="d-brand">
            <div className="d-lg">JC</div>
            <div>
              <span>
                Juris Consultants <b>USA</b>
              </span>
              <small>{brandSub}</small>
            </div>
          </div>
          <DashNav groups={groups} />
          <div className="d-grow" />
          {sideFooter}
        </aside>
        <div className="d-main">
          <header className="d-top">
            <div className="d-crumb">{crumb}</div>
            <div className="d-sp" />
            {topRight}
          </header>
          <main className="d-view" id="main">
            <DashMotion>{children}</DashMotion>
          </main>
        </div>
      </div>
    </div>
  );
}

/** Round avatar for the sidebar card and top bar: photo, or the first letter of the name. */
export function DashAvatar({
  name,
  image,
}: {
  name: string;
  image?: string | null;
}) {
  const letter = (name.trim()[0] ?? "A").toUpperCase();
  return (
    <span aria-hidden="true" className="d-av">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- small data URL
        <img alt="" src={image} />
      ) : (
        letter
      )}
    </span>
  );
}

/** User card at the bottom of the sidebar. `action` is the (app-provided) log out button. */
export function DashUserCard({
  name,
  sub,
  image,
  action,
}: {
  name: string;
  sub: string;
  image?: string | null;
  action: React.ReactNode;
}) {
  return (
    <div className="d-ucard">
      <DashAvatar image={image} name={name} />
      <div className="d-who">
        <b>{name}</b>
        <small>{sub}</small>
      </div>
      {action}
    </div>
  );
}

export function DashLogoutIcon() {
  return <DashIcon name="logout" />;
}

/** "Start a new order" gradient card for the customer sidebar. */
export function DashPromo({
  title,
  text,
  href,
  cta,
}: {
  title: string;
  text: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="d-promo">
      <b>{title}</b>
      <p>{text}</p>
      <a href={href}>
        <DashIcon name="arrow" />
        {cta}
      </a>
      <DashIcon className="d-pi" name="plane" />
    </div>
  );
}

export function DashSystemOk({
  text = "All systems running",
}: {
  text?: string;
}) {
  return (
    <div className="d-sysok">
      <i />
      {text}
    </div>
  );
}
