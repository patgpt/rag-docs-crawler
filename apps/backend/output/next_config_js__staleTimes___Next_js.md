# next.config.js: staleTimes | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsstaleTimesstaleTimesThis feature is currently experimental and subject to change, it's not recommended for production. Try it out and share your feedback on GitHub.staleTimes is an experimental feature that enables caching of page segments in the client-side router cache.
You can enable this experimental feature and provide custom revalidation times by setting the experimental staleTimes flag:
next.config.js/** @type {import('next').NextConfig} */
const nextConfig = {
experimental: {
staleTimes: {
dynamic: 30,
static: 180,
},
},
}</p>
<p>module.exports = nextConfig
The static and dynamic properties correspond with the time period (in seconds) based on different types of link prefetching.</p>
<p>The dynamic property is used when the page is neither statically generated nor fully prefetched (e.g. with prefetch={true}).</p>
<p>Default: 0 seconds (not cached)</p>
<p>The static property is used for statically generated pages, or when the prefetch prop on Link is set to true, or when calling router.prefetch.</p>
<p>Default: 5 minutes</p>
<p>Good to know:</p>
<p>Loading boundaries are considered reusable for the static period defined in this configuration.
This doesn't affect partial rendering, meaning shared layouts won't automatically be refetched on every navigation, only the page segment that changes.
This doesn't change back/forward caching behavior to prevent layout shift and to prevent losing the browser scroll position.</p>
<p>You can learn more about the Client Router Cache here.
Version History</p>
<p>VersionChangesv15.0.0The dynamic staleTimes default changed from 30s to 0s.v14.2.0Experimental staleTimes introduced.Was this helpful?</p>
<p>supported.Send</p>
