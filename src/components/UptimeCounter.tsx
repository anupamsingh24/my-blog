"use client";

import { useEffect, useState } from "react";

interface Props {
  launchDate: string;
}

function formatUptime(from: Date, to: Date): string {
  const ms = Math.max(0, to.getTime() - from.getTime());
  const totalMinutes = Math.floor(ms / 60_000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return `${days}d ${hours}h ${minutes}m`;
}

export default function UptimeCounter({ launchDate }: Props) {
  const [uptime, setUptime] = useState<string | null>(null);

  useEffect(() => {
    const launch = new Date(launchDate);
    const tick = () => setUptime(formatUptime(launch, new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [launchDate]);

  // Render nothing on the server / first paint to avoid hydration mismatch
  if (uptime === null) return null;

  return (
    <p aria-live="off">
      Site running for <span className="text-(--color-accent)">{uptime}</span>
    </p>
  );
}
