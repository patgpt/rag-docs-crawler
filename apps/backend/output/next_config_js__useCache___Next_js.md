# next.config.js: useCache | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsuseCacheuseCacheThis feature is currently available in the canary channel and subject to change. Try it out by upgrading Next.js, and share your feedback on GitHub.The useCache flag is an experimental feature in Next.js that enables the use cache directive to be used independently of dynamicIO. When enabled, you can use use cache in your application even if dynamicIO is turned off.
Usage</p>
<p>To enable the useCache flag, set it to true in the experimental section of your next.config.ts file:
next.config.tsimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
useCache: true,
},
}</p>
<p>export default nextConfig
When useCache is enabled, you can use the following cache functions and configurations:</p>
<p>The use cache directive
The cacheLife function with use cache
The cacheTag function
Was this helpful?</p>
<p>supported.Send</p>
