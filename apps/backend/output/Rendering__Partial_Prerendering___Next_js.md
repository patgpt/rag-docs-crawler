# Rendering: Partial Prerendering | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRenderingPartial PrerenderingPartial Prerendering
Note: Partial Prerendering is an experimental feature only available on canary and is subject to change. It is not ready for production use.</p>
<p>Partial Prerendering (PPR) enables you to combine static and dynamic components together in the same route.
During the build, Next.js prerenders as much of the route as possible. If dynamic code is detected, like reading from the incoming request, you can wrap the relevant component with a React Suspense boundary. The Suspense boundary fallback will then be included in the prerendered HTML.</p>
<p>🎥 Watch: Why PPR and how it works → YouTube (10 minutes).</p>
<p>Background</p>
<p>PPR enables your Next.js server to immediately send prerendered content.
To prevent client to server waterfalls, dynamic components begin streaming from the server in parallel while serving the initial prerender. This ensures dynamic components can begin rendering before client JavaScript has been loaded in the browser.
To prevent creating many HTTP requests for each dynamic component, PPR is able to combine the static prerender and dynamic components together into a single HTTP request. This ensures there are not multiple network roundtrips needed for each dynamic component.
Using Partial Prerendering</p>
<p>Incremental Adoption (Version 15 Canary Versions)</p>
<p>In Next.js 15 canary versions, PPR is available as an experimental feature. It's not available in the stable versions yet. To install:
npm install next@canary
You can incrementally adopt Partial Prerendering in layouts and pages by setting the ppr option in next.config.js to incremental, and exporting the experimental_ppr route config option at the top of the file:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
ppr: 'incremental',
},
}</p>
<p>export default nextConfig</p>
<p>app/page.tsxTypeScriptJavaScriptTypeScriptimport { Suspense } from 'react'
import { StaticComponent, DynamicComponent, Fallback } from '@/app/ui'</p>
<p>export const experimental_ppr = true</p>
<p>export default function Page() {
return (
&lt;&gt;
&lt;StaticComponent /&gt;
&lt;Suspense fallback={&lt;Fallback /&gt;}&gt;
&lt;DynamicComponent /&gt;
&lt;/Suspense&gt;
&lt;/&gt;
)
}</p>
<p>Good to know:</p>
<p>Routes that don't have experimental_ppr will default to false and will not be prerendered using PPR. You need to explicitly opt-in to PPR for each route.
experimental_ppr will apply to all children of the route segment, including nested layouts and pages. You don't have to add it to every file, only the top segment of a route.
To disable PPR for children segments, you can set experimental_ppr to false in the child segment.</p>
<p>Dynamic Components</p>
<p>When creating the prerender for your route during next build, Next.js requires that Dynamic APIs are wrapped with React Suspense. The fallback is then included in the prerender.
For example, using functions like cookies or headers:</p>
<p>app/user.tsxTypeScriptJavaScriptTypeScriptimport { cookies } from 'next/headers'</p>
<p>export async function User() {
const session = (await cookies()).get('session')?.value
return '...'
}
This component requires looking at the incoming request to read cookies. To use this with PPR, you should wrap the component with Suspense:
app/page.tsxTypeScriptJavaScriptTypeScriptimport { Suspense } from 'react'
import { User, AvatarSkeleton } from './user'</p>
<p>export const experimental_ppr = true</p>
<p>export default function Page() {
return (
&lt;section&gt;
&lt;h1&gt;This will be prerendered&lt;/h1&gt;
&lt;Suspense fallback={&lt;AvatarSkeleton /&gt;}&gt;
&lt;User /&gt;
&lt;/Suspense&gt;
&lt;/section&gt;
)
}</p>
<p>Components only opt into dynamic rendering when the value is accessed.
For example, if you are reading searchParams from a page, you can forward this value to another component as a prop:
app/page.tsxTypeScriptJavaScriptTypeScriptimport { Table } from './table'</p>
<p>export default function Page({
searchParams,
}: {
searchParams: Promise&lt;{ sort: string }&gt;
}) {
return (
&lt;section&gt;
&lt;h1&gt;This will be prerendered&lt;/h1&gt;
&lt;Table searchParams={searchParams} /&gt;
&lt;/section&gt;
)
}</p>
<p>Inside of the table component, accessing the value from searchParams will make the component run dynamically:
app/table.tsxTypeScriptJavaScriptTypeScriptexport async function Table({
searchParams,
}: {
searchParams: Promise&lt;{ sort: string }&gt;
}) {
const sort = (await searchParams).sort === 'true'
return '...'
}
Was this helpful?</p>
<p>supported.Send</p>
