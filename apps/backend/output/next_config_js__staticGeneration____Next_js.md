# next.config.js: staticGeneration* | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsstaticGeneration<em>staticGeneration</em>This feature is currently experimental and subject to change, it's not recommended for production. Try it out and share your feedback on GitHub.The staticGeneration* options allow you to configure the Static Generation process for advanced use cases.
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
staticGenerationRetryCount: 1,
staticGenerationMaxConcurrency: 8,
staticGenerationMinPagesPerWorker: 25,
},
}</p>
<p>export default nextConfig</p>
<p>Config Options</p>
<p>The following options are available:</p>
<p>staticGenerationRetryCount: The number of times to retry a failed page generation before failing the build.
staticGenerationMaxConcurrency: The maximum number of pages to be processed per worker.
staticGenerationMinPagesPerWorker: The minimum number of pages to be processed before starting a new worker.
Was this helpful?</p>
<p>supported.Send</p>
