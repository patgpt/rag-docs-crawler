# Functions: cacheLife | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionscacheLifecacheLifeThis feature is currently available in the canary channel and subject to change. Try it out by upgrading Next.js, and share your feedback on GitHub.The cacheLife function is used to set the cache lifetime of a function or component. It should be used alongside the use cache directive, and within the scope of the function or component.
Usage</p>
<p>To use cacheLife, enable the dynamicIO flag in your next.config.js file:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
dynamicIO: true,
},
}</p>
<p>export default nextConfig</p>
<p>Then, import and invoke the cacheLife function within the scope of the function or component:
app/page.tsxTypeScriptJavaScriptTypeScript'use cache'
import { unstable_cacheLife as cacheLife } from 'next/cache'</p>
<p>export default async function Page() {
cacheLife('hours')
return &lt;div&gt;Page&lt;/div&gt;
}</p>
<p>Reference</p>
<p>Default cache profiles</p>
<p>Next.js provides a set of named cache profiles modeled on various timescales. If you don't specify a cache profile in the cacheLife function alongside the use cache directive, Next.js will automatically apply the “default” cache profile.
However, we recommend always adding a cache profile when using the use cache directive to explicitly define caching behavior.
ProfileStaleRevalidateExpireDescriptiondefaultundefined15 minutesINFINITE_CACHEDefault profile, suitable for content that doesn't need frequent updatessecondsundefined1 second1 minuteFor rapidly changing content requiring near real-time updatesminutes5 minutes1 minute1 hourFor content that updates frequently within an hourhours5 minutes1 hour1 dayFor content that updates daily but can be slightly staledays5 minutes1 day1 weekFor content that updates weekly but can be a day oldweeks5 minutes1 week1 monthFor content that updates monthly but can be a week oldmax5 minutes1 monthINFINITE_CACHEFor very stable content that rarely needs updating
The string values used to reference cache profiles don't carry inherent meaning; instead they serve as semantic labels. This allows you to better understand and manage your cached content within your codebase.
Custom cache profiles</p>
<p>You can configure custom cache profiles by adding them to the cacheLife option in your next.config.ts file.
Cache profiles are objects that contain the following properties:
PropertyValueDescriptionRequirementstalenumberDuration the client should cache a value without checking the server.OptionalrevalidatenumberFrequency at which the cache should refresh on the server; stale values may be served while revalidating.OptionalexpirenumberMaximum duration for which a value can remain stale before switching to dynamic fetching; must be longer than revalidate.Optional - Must be longer than revalidate
The &quot;stale&quot; property differs from the staleTimes setting in that it specifically controls client-side router caching. While staleTimes is a global setting that affects all instances of both dynamic and static data, the cacheLife configuration allows you to define &quot;stale&quot; times on a per-function or per-route basis.</p>
<p>Good to know: The “stale” property does not set the Cache-control: max-age header. It instead controls the client-side router cache.</p>
<p>Examples</p>
<p>Defining reusable cache profiles</p>
<p>You can create a reusable cache profile by defining them in your next.config.ts file. Choose a name that suits your use case and set values for the stale, revalidate, and expire properties. You can create as many custom cache profiles as needed. Each profile can be referenced by its name as a string value passed to the cacheLife function.
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
dynamicIO: true,
cacheLife: {
biweekly: {
stale: 60 * 60 * 24 * 14, // 14 days
revalidate: 60 * 60 * 24, // 1 day
expire: 60 * 60 * 24 * 14, // 14 days
},
},
},
}</p>
<p>module.exports = nextConfig</p>
<p>The example above caches for 14 days, checks for updates daily, and expires the cache after 14 days. You can then reference this profile throughout your application by its name:
app/page.tsx'use cache'
import { unstable_cacheLife as cacheLife } from 'next/cache'</p>
<p>export default async function Page() {
cacheLife('biweekly')
return &lt;div&gt;Page&lt;/div&gt;
}
Overriding the default cache profiles</p>
<p>While the default cache profiles provide a useful way to think about how fresh or stale any given part of cacheable output can be, you may prefer different named profiles to better align with your applications caching strategies.
You can override the default named cache profiles by creating a new configuration with the same name as the defaults.
The example below shows how to override the default “days” cache profile:
next.config.tsconst nextConfig = {
experimental: {
dynamicIO: true,
cacheLife: {
days: {
stale: 3600, // 1 hour
revalidate: 900, // 15 minutes
expire: 86400, // 1 day
},
},
},
}</p>
<p>module.exports = nextConfig
Defining cache profiles inline</p>
<p>For specific use cases, you can set a custom cache profile by passing an object to the cacheLife function:
app/page.tsxTypeScriptJavaScriptTypeScript'use cache'
import { unstable_cacheLife as cacheLife } from 'next/cache'</p>
<p>export default async function Page() {
cacheLife({
stale: 3600, // 1 hour
revalidate: 900, // 15 minutes
expire: 86400, // 1 day
})</p>
<p>return &lt;div&gt;Page&lt;/div&gt;
}</p>
<p>This inline cache profile will only be applied to the function or file it was created in. If you want to reuse the same profile throughout your application, you can add the configuration to the cacheLife property of your next.config.ts file.
Nested usage of use cache and cacheLife</p>
<p>When defining multiple caching behaviors in the same route or component tree, if the inner caches specify their own cacheLife profile, the outer cache will respect the shortest cache duration among them. This applies only if the outer cache does not have its own explicit cacheLife profile defined.
For example, if you add the use cache directive to your page, without specifying a cache profile, the default cache profile will be applied implicitly (cacheLife(”default”)). If a component imported into the page also uses the use cache directive with its own cache profile, the outer and inner cache profiles are compared, and shortest duration set in the profiles will be applied.
app/components/parent.tsx// Parent component
import { unstable_cacheLife as cacheLife } from 'next/cache'
import { ChildComponent } from './child'</p>
<p>export async function ParentComponent() {
'use cache'
cacheLife('days')</p>
<p>return (
&lt;div&gt;
&lt;ChildComponent /&gt;
&lt;/div&gt;
)
}
And in a separate file, we defined the Child component that was imported:
app/components/child.tsx// Child component
import { unstable_cacheLife as cacheLife } from 'next/cache'</p>
<p>export async function ChildComponent() {
'use cache'
cacheLife('hours')
return &lt;div&gt;Child Content&lt;/div&gt;</p>
<p>// This component's cache will respect the shorter 'hours' profile
}RelatedView related API references.dynamicIOLearn how to enable the dynamicIO flag in Next.js.use cacheLearn how to use the use cache directive to cache data in your Next.js application.revalidateTagAPI Reference for the revalidateTag function.cacheTagLearn how to use the cacheTag function to manage cache invalidation in your Next.js application.Was this helpful?</p>
<p>supported.Send</p>
