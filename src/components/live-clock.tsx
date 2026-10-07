"use client";
import { useEffect, useState } from "react";
export default function LiveClock() {
  const [time, setTime] = useState("--:--:--");
  const [offset, setOffset] = useState("UTC-03");
  useEffect(() => {
    const update = () => {
      const date = new Date();
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "America/Santiago",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(date),
      );
      setOffset(
        new Intl.DateTimeFormat("en", {
          timeZone: "America/Santiago",
          timeZoneName: "shortOffset",
        })
          .formatToParts(date)
          .find((p) => p.type === "timeZoneName")
          ?.value.replace("GMT", "UTC")
          .replace(/UTC-(\d)$/, "UTC-0$1") ?? "UTC-03",
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="clock">
      <span>{time}</span>
      <span className="muted">{offset}</span>
    </span>
  );
}
