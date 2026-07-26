import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://5168b99802ea6cc54f1b0d4c3b1431b2@o4511801545588736.ingest.us.sentry.io/4511801548603392",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample fewer transactions in production.
  replaysSessionSampleRate: 0.1,

  // You can define a custom integration if needed
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes here
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
