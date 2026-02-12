'use client';

import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function ScannerPage() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<'idle' | 'starting' | 'running' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const [lastCode, setLastCode] = useState<string | null>(null);
  const [flashGreen, setFlashGreen] = useState(false);

  const scannerRegionId = useMemo(() => 'reader', []);
  const qrRef = useRef<Html5Qrcode | null>(null);
  const startedRef = useRef(false);

  const lastScanAtRef = useRef(0);
  const flashTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const start = async () => {
      setStatus('starting');
      setError(null);

      try {
        const qr = new Html5Qrcode(scannerRegionId);
        qrRef.current = qr;

        await qr.start(
          { facingMode: 'environment' },
          { fps: 10, aspectRatio: 1 },
          (decodedText) => {
            // debounce so it doesn't spam-count
            const now = Date.now();
            if (now - lastScanAtRef.current < 900) return;
            lastScanAtRef.current = now;

            setCount((c) => c + 1);
            setLastCode(decodedText);

            // green outline flash
            setFlashGreen(true);
            if (flashTimeoutRef.current) window.clearTimeout(flashTimeoutRef.current);
            flashTimeoutRef.current = window.setTimeout(() => setFlashGreen(false), 450);
          },
          () => {
            // ignore per-frame decode errors
          }
        );

        setStatus('running');
      } catch (e) {
        setStatus('error');
        setError(e instanceof Error ? e.message : String(e));
      }
    };

    void start();

    return () => {
      if (flashTimeoutRef.current) window.clearTimeout(flashTimeoutRef.current);

      const qr = qrRef.current;
      qrRef.current = null;

      void (async () => {
        try {
          if (qr?.isScanning) await qr.stop();
          await qr?.clear();
        } catch {
          // ignore
        }
      })();
    };
  }, [scannerRegionId]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center gap-4 px-4 py-6">
        <h1 className="text-2xl font-semibold tracking-tight">Scanner</h1>

        <div className="w-full max-w-sm">
          <div
            className={[
              'aspect-square w-full overflow-hidden rounded-2xl bg-black transition',
              flashGreen ? 'ring-4 ring-green-500/90' : 'border border-white/10'
            ].join(' ')}
          >
            <div id={scannerRegionId} className="h-full w-full" />
          </div>
        </div>

        <p className="mt-2 text-lg font-semibold">{count} scanned</p>

        <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Last code</div>
          <div className="mt-1 break-all text-sm">
            {lastCode ?? <span className="text-slate-400">No scans yet</span>}
          </div>
        </div>

        <div className="mt-1 text-xs text-slate-400">Status: {status}</div>

        {error && (
          <div className="mt-2 w-full max-w-sm rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setCount(0);
            setLastCode(null);
          }}
          className="mt-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
        >
          Reset
        </button>
      </div>
    </main>
  );
}