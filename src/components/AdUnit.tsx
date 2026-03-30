"use client";

import { useEffect, useRef, useState } from "react";

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
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      pushed.current = true;

      // Check if ad filled after a delay
      const timer = setTimeout(() => {
        if (adRef.current) {
          const ins = adRef.current.querySelector("ins");
          if (ins && ins.getAttribute("data-ad-status") === "filled") {
            setFilled(true);
          } else if (ins && ins.clientHeight > 0) {
            setFilled(true);
          }
        }
      }, 3000);
      return () => clearTimeout(timer);
    } catch {
      // AdSense not loaded or blocked
    }
  }, []);

  return (
    <div
      ref={adRef}
      className={`ad-container ${className}`}
      style={{ minHeight: filled ? undefined : 0, overflow: "hidden" }}
    >
      <ins
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
