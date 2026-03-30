"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical" | "fluid";
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  style,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded or blocked
    }
  }, []);

  return (
    <div className={`ad-container my-6 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style || { display: "block" }}
        data-ad-client="ca-pub-3399354024239327"
        data-ad-slot={slot || ""}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}

/** In-article ad — placed between content sections */
export function InArticleAd() {
  return (
    <AdUnit
      format="fluid"
      style={{ display: "block", textAlign: "center" }}
      className="my-8"
    />
  );
}

/** Sidebar ad — sticky in the sidebar */
export function SidebarAd() {
  return (
    <AdUnit
      format="vertical"
      style={{ display: "block", minHeight: "250px" }}
      className="my-4"
    />
  );
}

/** Banner ad — full width between sections */
export function BannerAd() {
  return (
    <AdUnit
      format="horizontal"
      style={{ display: "block", minHeight: "90px" }}
      className="my-8"
    />
  );
}
