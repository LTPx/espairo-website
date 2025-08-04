"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

export interface MediaFileWp {
  url: string;
  type: "video" | "image";
}

interface Props {
  children?: React.ReactElement;
  className?: string;
  media?: MediaFileWp;
  img?: string;
}

export function CoverMedia(props: Props) {
  const { children, className, media, img } = props;
  const t = useTranslations();
  
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div className={`cover-video-container`}>
      {img && (
        <img
          src={img}
          className={`${className} w-full object-cover`}
          style={{ height: "calc(var(--vh, 1vh) * 100)" }}
        />
      )}
      {media?.type === "video" && (
        <video
          className={`${className} w-full object-cover`}
          style={{ height: "calc(var(--vh, 1vh) * 100)" }}
          autoPlay={true}
          loop={true}
          muted
          playsInline
          preload="auto"
        >
          <source src={media.url} type="video/mp4" />
        </video>
      )}
      {media?.type === "image" && (
        <img
          src={media.url}
          style={{ height: "calc(var(--vh, 1vh) * 100)" }}
          className={`${className} w-full object-cover`}
        />
      )}
      <div
        className={`hidden lg:absolute inset-0  ${className}`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.25))",
          zIndex: 1,
          height: "calc(var(--vh, 1vh) * 100)" 
        }}
      />
    </div>
  );
}

export default CoverMedia;
