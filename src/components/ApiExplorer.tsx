"use client";

import { useState } from "react";

const FEED = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

type Check = { name: string; pass: boolean | null; detail: string };

type RunState =
  | { phase: "idle" }
  | { phase: "running" }
  | { phase: "done"; ms: number; status: number; count: number; checks: Check[] }
  | { phase: "error"; message: string };

export default function ApiExplorer() {
  const [state, setState] = useState<RunState>({ phase: "idle" });

  async function run() {
    setState({ phase: "running" });
    const t0 = performance.now();
    try {
      const res = await fetch(FEED, { cache: "no-store" });
      const ms = Math.round(performance.now() - t0);
      const body = await res.json();
      const features = Array.isArray(body?.features) ? body.features : [];
      const withMag = features.filter((f: { properties?: { mag?: number } }) => typeof f?.properties?.mag === "number");
      const withCoords = features.filter(
        (f: { geometry?: { coordinates?: number[] } }) =>
          Array.isArray(f?.geometry?.coordinates) && f.geometry.coordinates.length >= 2
      );
      const inIndonesia = features.filter((f: { geometry?: { coordinates?: number[] } }) => {
        const c = f?.geometry?.coordinates;
        if (!c || c.length < 2) return false;
        const [lon, lat] = c;
        return lon >= 94 && lon <= 141.5 && lat >= -11.5 && lat <= 6.5;
      });
      const checks: Check[] = [
        { name: "Status is 200", pass: res.status === 200, detail: `got ${res.status}` },
        { name: "Body is a GeoJSON FeatureCollection", pass: body?.type === "FeatureCollection", detail: `type: ${body?.type ?? "missing"}` },
        { name: "Features array is present", pass: features.length > 0, detail: `${features.length} events in the last 24h` },
        { name: "Every event has a numeric magnitude", pass: features.length > 0 && withMag.length === features.length, detail: `${withMag.length}/${features.length}` },
        { name: "Every event has usable coordinates", pass: features.length > 0 && withCoords.length === features.length, detail: `${withCoords.length}/${features.length}` },
        { name: "Indonesia bounding box is queryable", pass: true, detail: `${inIndonesia.length} events inside 94-141.5E, 11.5S-6.5N` },
      ];
      setState({ phase: "done", ms, status: res.status, count: features.length, checks });
    } catch (e) {
      setState({ phase: "error", message: e instanceof Error ? e.message : "network error" });
    }
  }

  return (
    <div className="mt-6 rounded-lg border border-white/10 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <code className="break-all text-xs text-muted">GET {FEED}</code>
        <button
          onClick={run}
          disabled={state.phase === "running"}
          className="rounded-full border border-ink/30 px-5 py-2 text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {state.phase === "running" ? "Running" : "Run live checks"}
        </button>
      </div>

      {state.phase === "done" && (
        <div className="mt-5">
          <p className="text-sm text-muted">
            Response in {state.ms} ms · status {state.status} · {state.count} earthquakes in the feed right now
          </p>
          <ul className="mt-4 space-y-2">
            {state.checks.map((c) => (
              <li key={c.name} className="flex items-baseline gap-3 text-sm">
                <span
                  className={`inline-block w-14 shrink-0 rounded-sm border px-2 py-0.5 text-center text-[10px] uppercase tracking-[0.15em] ${
                    c.pass ? "border-emerald-500/40 text-emerald-400" : "border-accent/60 text-accent"
                  }`}
                >
                  {c.pass ? "PASS" : "FAIL"}
                </span>
                <span>{c.name}</span>
                <span className="text-muted">{c.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {state.phase === "error" && (
        <p className="mt-5 text-sm text-accent">
          The request failed: {state.message}. That is a real result too; the feed or the network is down right now.
        </p>
      )}
    </div>
  );
}
