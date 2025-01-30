# next.config.js: ppr | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jspprpprThis feature is currently experimental and subject to change, it's not recommended for production. Try it out and share your feedback on GitHub.Partial Prerendering (PPR) enables you to combine static and dynamic components together in the same route. Learn more about PPR.
Using Partial Prerendering</p>
<p>Incremental Adoption (Version 15)</p>
<p>In Next.js 15, you can incrementally adopt Partial Prerendering in layouts and pages by setting the ppr option in next.config.js to incremental, and exporting the experimental_ppr route config option at the top of the file:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
ppr: 'incremental',
},
}</p>
<p>export default nextConfig</p>
<p>app/page.tsxTypeScriptJavaScriptTypeScriptimport { Suspense } from &quot;react&quot;
import { StaticComponent, DynamicComponent, Fallback } from &quot;@/app/ui&quot;</p>
<p>export const experimental_ppr = true</p>
<p>export default function Page() {
return {
&lt;&gt;
&lt;StaticComponent /&gt;
&lt;Suspense fallback={&lt;Fallback /&gt;}&gt;
&lt;DynamicComponent /&gt;
&lt;/Suspense&gt;
&lt;/&gt;
};
}</p>
<p>Good to know:</p>
<p>Routes that don't have experimental_ppr will default to false and will not be prerendered using PPR. You need to explicitly opt-in to PPR for each route.
experimental_ppr will apply to all children of the route segment, including nested layouts and pages. You don't have to add it to every file, only the top segment of a route.
To disable PPR for children segments, you can set experimental_ppr to false in the child segment.</p>
<p>VersionChangesv15.0.0experimental incremental value introducedv14.0.0experimental ppr introducedLearn more about Partial PrerenderingPartial PrerenderingLearn how to combine the benefits of static and dynamic rendering with Partial Prerendering.Was this helpful?</p>
<p>supported.Send</p>
