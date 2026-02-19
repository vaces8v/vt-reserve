'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    ym: (id: number, method: string, ...args: any[]) => void;
  }
}

function YandexMetrikaScript() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize Yandex.Metrika
    (function (m: any, e: Document, t: string, r: string, i: string) {
      m[i] = m[i] || function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
      m[i].l = 1 * new Date().getTime();
      for (let j = 0; j < e.scripts.length; j++) {
        if (e.scripts[j].src === r) {
          return;
        }
      }
      const k = e.createElement(t) as HTMLScriptElement;
      const a = e.getElementsByTagName(t)[0];
      k.async = true;
      k.src = r;
      if (a && a.parentNode) {
        a.parentNode.insertBefore(k, a);
      }
    })(
      window,
      document,
      'script',
      'https://mc.yandex.ru/metrika/tag.js',
      'ym'
    );

    window.ym(106913810, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: 'dataLayer',
    });
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(106913810, 'hit', window.location.href, {
        referer: document.referrer,
      });
    }
  }, [pathname, searchParams]);

  return (
    <noscript>
      <div>
        <img
          src="https://mc.yandex.ru/watch/106913810"
          style={{ position: 'absolute', left: '-9999px' }}
          alt=""
        />
      </div>
    </noscript>
  );
}

export default function YandexMetrika() {
  return (
    <Suspense fallback={null}>
      <YandexMetrikaScript />
    </Suspense>
  );
}
