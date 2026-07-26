import Script from "next/script";
import { dbRetry } from "@/lib/db";

let cachedSettings: any = null;
let lastFetchTime = 0;
const CACHE_TTL = 60 * 1000; // 60 seconds memory cache to prevent DB connection storms

async function getCachedSiteSettings() {
  const now = Date.now();
  if (cachedSettings && now - lastFetchTime < CACHE_TTL) {
    return cachedSettings;
  }
  try {
    const settings = await dbRetry(
      (client) =>
        (client as any).siteSettings.findUnique({
          where: { id: "default" },
        }),
      2,
      200
    );
    if (settings) {
      cachedSettings = settings;
      lastFetchTime = now;
    }
    return settings || cachedSettings || null;
  } catch (error) {
    return cachedSettings || null;
  }
}

export default async function AnalyticsScripts() {
  const settings = await getCachedSiteSettings();

  if (!settings) return null;

  const {
    gaId,
    gtmId,
    searchConsoleVerification,
    clarityId,
    customHeadScripts,
    customBodyScripts,
  } = settings;

  // Search console verification token check
  const searchConsoleToken = searchConsoleVerification?.includes("content=")
    ? searchConsoleVerification.match(/content=["']([^"']+)["']/)?.[1] || searchConsoleVerification
    : searchConsoleVerification;

  return (
    <>
      {/* Search Console Meta Tag */}
      {searchConsoleToken && (
        <meta name="google-site-verification" content={searchConsoleToken} />
      )}

      {/* Google Analytics 4 (GA4) */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager (GTM) */}
      {gtmId && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      )}

      {/* Microsoft Clarity */}
      {clarityId && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}

      {/* Custom Head Raw Scripts */}
      {customHeadScripts && (
        <div
          dangerouslySetInnerHTML={{ __html: customHeadScripts }}
          suppressHydrationWarning
        />
      )}

      {/* Custom Body Scripts */}
      {customBodyScripts && (
        <div
          dangerouslySetInnerHTML={{ __html: customBodyScripts }}
          suppressHydrationWarning
        />
      )}
    </>
  );
}
