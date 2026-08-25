import { ChevronDown } from "lucide-react";

export function Header({ dataMode }: { dataMode?: "live" | "mock" }) {
  return (
    <header className="site-header sticky top-0 z-30">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 h-28 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="group grid size-12 place-items-center">
            <svg viewBox="0 0 32 32" className="size-12">
              <circle cx="16" cy="16" r="14" className="fill-accent" />
              <g className="origin-center transition-transform duration-700 group-hover:rotate-45">
                <path d="M16 6 L19 16 L16 13 L13 16 Z" className="fill-white" />
                <path d="M16 26 L13 16 L16 19 L19 16 Z" className="fill-white/55" />
              </g>
              <circle cx="16" cy="16" r="1.4" className="fill-white" />
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-bold tracking-tight text-[29px] leading-none">
              Way<span className="text-accent">Finder</span>
            </div>
            <div className="text-[10px] text-foreground mono mt-2 tracking-[0.18em]">
              SUPPLY · CHAIN RISK<br />INTELLIGENCE
            </div>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-11 text-[16px] font-medium">
          <a href="#solutions" className="header-link inline-flex items-center gap-1.5">Solutions <ChevronDown className="size-3.5" /></a>
          <a href="#features" className="header-link">Features</a>
          <a href="#pricing" className="header-link">Pricing</a>
          <a href="#resources" className="header-link inline-flex items-center gap-1.5">Resources <ChevronDown className="size-3.5" /></a>
          <a href="#about" className="header-link">About</a>
        </nav>
        <div className="flex items-center gap-3 text-[11px] mono">
          {dataMode && (
            <span
              className={
                "px-2 py-1 rounded-md border " +
                (dataMode === "live"
                  ? "border-ok/40 text-ok bg-ok/10"
                  : "border-warn/40 text-warn bg-warn/10")
              }
            >
              {dataMode === "live" ? "● LIVE DATA" : "● DEMO DATA"}
            </span>
          )}
          {!dataMode && <><button type="button" className="hidden sm:block rounded-xl border border-foreground px-7 py-3 text-[15px] font-sans font-medium hover:bg-foreground hover:text-white transition">Login</button><button type="button" className="hidden sm:block rounded-xl bg-accent px-7 py-3 text-[15px] font-sans font-medium text-white shadow-[0_8px_20px_rgba(0,128,123,.22)] hover:brightness-110 transition">Sign Up</button></>}
          {dataMode && <><span className="text-muted hidden sm:inline">powered by</span><span className="text-accent-2 font-semibold">Bright Data</span></>}
        </div>
      </div>
    </header>
  );
}
