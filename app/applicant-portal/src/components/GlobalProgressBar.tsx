'use client';

import { usePathname, useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import { useEffect } from 'react';

nProgress.configure({
  showSpinner: false,
  speed: 400,
  trickleSpeed: 100,
  minimum: 0.1
});

export default function GlobalProgressBar() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => nProgress.start();
    const handleStop = () => nProgress.done();

    // Listen to router push/replace events
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = async (...args) => {
      handleStart();
      try {
        const result = await originalPush(...args);
        handleStop();
        return result;
      } catch (err) {
        handleStop();
        throw err;
      }
    };

    router.replace = async (...args) => {
      handleStart();
      try {
        const result = await originalReplace(...args);
        handleStop();
        return result;
      } catch (err) {
        handleStop();
        throw err;
      }
    };

    // Stop NProgress on pathname change (e.g., back/forward)
    handleStop();

    return () => {
      nProgress.done();
    };
  }, [router]);

  // Ensure progress stops when path changes
  useEffect(() => {
    nProgress.done();
  }, [pathname]);

  return null;
}
