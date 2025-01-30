# next.config.js: cacheLife | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jscacheLifecacheLifeThis feature is currently available in the canary channel and subject to change. Try it out by upgrading Next.js, and share your feedback on GitHub.The cacheLife option allows you to define custom cache profiles when using the cacheLife function inside components or functions, and within the scope of the use cache directive.
Usage</p>
<p>To define a profile, enable the dynamicIO flag and add the cache profile in the cacheLife object in the next.config.js file. For example, a blog profile:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
dynamicIO: true,
cacheLife: {
blog: {
stale: 3600, // 1 hour
revalidate: 900, // 15 minutes
expire: 86400, // 1 day
},
},
},
}</p>
<p>export default nextConfig</p>
<p>You can now use this custom blog configuration in your component or function as follows:
app/actions.tsTypeScriptJavaScriptTypeScriptimport { unstable_cacheLife as cacheLife } from 'next/cache'</p>
<p>export async function getCachedData() {
'use cache'
cacheLife('blog')
const data = await fetch('/api/data')
return data
}</p>
<p>Reference</p>
<p>The configuration object has key values with the following format:
PropertyValueDescriptionRequirementstalenumberDuration the client should cache a value without checking the server.OptionalrevalidatenumberFrequency at which the cache should refresh on the server; stale values may be served while revalidating.OptionalexpirenumberMaximum duration for which a value can remain stale before switching to dynamic.Optional - Must be longer than revalidateWas this helpful?</p>
<p>supported.Send</p>
