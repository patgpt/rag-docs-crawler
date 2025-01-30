# Directives: use cache | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceDirectivesuse cacheuse cacheThis feature is currently available in the canary channel and subject to change. Try it out by upgrading Next.js, and share your feedback on GitHub.The use cache directive designates a component and/or a function to be cached. It can be used at the top of a file to indicate that all exports in the file are cacheable, or inline at the top of a function or component to inform Next.js the return value should be cached and reused for subsequent requests. This is an experimental Next.js feature, and not a native React feature like use client or use server.
Usage</p>
<p>Enable support for the use cache directive with the useCache flag in your next.config.ts file:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
useCache: true,
},
}</p>
<p>export default nextConfig</p>
<p>Additionally, use cache directives are also enabled when the dynamicIO flag is set.
Then, you can use the use cache directive at the file, component, or function level:
// File level
'use cache'</p>
<p>export default async function Page() {
// ...
}</p>
<p>// Component level
export async function MyComponent() {
'use cache'
return &lt;&gt;&lt;/&gt;
}</p>
<p>// Function level
export async function getData() {
'use cache'
const data = await fetch('/api/data')
return data
}
Good to know</p>
<p>use cache is an experimental Next.js feature, and not a native React feature like use client or use server.
Any serializable arguments (or props) passed to the cached function, as well as any serializable values it reads from the parent scope, will be converted to a format like JSON and automatically become a part of the cache key.
Any non-serializable arguments, props, or closed-over values will turn into opaque references inside the cached function, and can be only passed through and not inspected nor modified. These non-serializable values will be filled in at the request time and won't become a part of the cache key.</p>
<p>For example, a cached function can take in JSX as a children prop and return &lt;div&gt;{children}&lt;/div&gt;, but it won't be able to introspect the actual children object.</p>
<p>The return value of the cacheable function must also be serializable. This ensures that the cached data can be stored and retrieved correctly.
Functions that use the use cache directive must not have any side-effects, such as modifying state, directly manipulating the DOM, or setting timers to execute code at intervals.
If used alongside Partial Prerendering, segments that have use cache will be prerendered as part of the static HTML shell.
Unlike unstable_cache which only supports JSON data, use cache can cache any serializable data React can render, including the render output of components.</p>
<p>Examples</p>
<p>Caching entire routes with use cache</p>
<p>To prerender an entire route, add use cache to the top both the layout and page files. Each of these segments are treated as separate entry points in your application, and will be cached independently.
app/layout.tsxTypeScriptJavaScriptTypeScript'use cache'
import { unstable_cacheLife as cacheLife } from 'next/cache'</p>
<p>export default function Layout({ children }: { children: ReactNode }) {
return &lt;div&gt;{children}&lt;/div&gt;
}</p>
<p>Any components imported and nested in page file will inherit the cache behavior of page.
app/page.tsxTypeScriptJavaScriptTypeScript'use cache'
import { unstable_cacheLife as cacheLife } from 'next/cache'</p>
<p>async function Users() {
const users = await fetch('/api/users')
// loop through users
}</p>
<p>export default function Page() {
return (
&lt;main&gt;
&lt;Users /&gt;
&lt;/main&gt;
)
}</p>
<p>This is recommended for applications that previously used the export const dynamic = &quot;force-static&quot; option, and will ensure the entire route is prerendered.</p>
<p>Caching component output with use cache</p>
<p>You can use use cache at the component level to cache any fetches or computations performed within that component. When you reuse the component throughout your application it can share the same cache entry as long as the props maintain the same structure.
The props are serialized and form part of the cache key, and the cache entry will be reused as long as the serialized props produce the same value in each instance.
app/components/bookings.tsxTypeScriptJavaScriptTypeScriptexport async function Bookings({ type = 'haircut' }: BookingsProps) {
'use cache'
async function getBookingsData() {
const data = await fetch(<code>/api/bookings?type=${encodeURIComponent(type)}</code>)
return data
}
return //...
}</p>
<p>interface BookingsProps {
type: string
}</p>
<p>Caching function output with use cache</p>
<p>Since you can add use cache to any asynchronous function, you aren't limited to caching components or routes only. You might want to cache a network request or database query or compute something that is very slow. By adding use cache to a function containing this type of work it becomes cacheable, and when reused, will share the same cache entry.
app/actions.tsTypeScriptJavaScriptTypeScriptexport async function getData() {
'use cache'</p>
<p>const data = await fetch('/api/data')
return data
}</p>
<p>Revalidating</p>
<p>By default, Next.js sets a revalidation period of 15 minutes when you use the use cache directive. Next.js sets a near-infinite expiration duration, meaning it's suitable for content that doesn't need frequent updates.
While this revalidation period may be useful for content you don't expect to change often, you can use the cacheLife and cacheTag APIs to configure the cache behavior:</p>
<p>cacheLife: For time-based revalidation periods.
cacheTag: For on-demand revalidation.</p>
<p>Both of these APIs integrate across the client and server caching layers, meaning you can configure your caching semantics in one place and have them apply everywhere.
See the cacheLife and cacheTag docs for more information.
Interleaving</p>
<p>If you need to pass non-serializable arguments to a cacheable function, you can pass them as children. This means the children reference can change without affecting the cache entry.
app/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page() {
const uncachedData = await getData()
return (
&lt;CacheComponent&gt;
&lt;DynamicComponent data={uncachedData} /&gt;
&lt;/CacheComponent&gt;
)
}</p>
<p>async function CacheComponent({ children }: { children: ReactNode }) {
'use cache'
const cachedData = await fetch('/api/cached-data')
return (
&lt;div&gt;
&lt;PrerenderedComponent data={cachedData} /&gt;
{children}
&lt;/div&gt;
)
}</p>
<p>You can also pass Server Actions through cached components to Client Components without invoking them inside the cacheable function.
app/page.tsxTypeScriptJavaScriptTypeScriptimport ClientComponent from './ClientComponent'</p>
<p>export default async function Page() {
const performUpdate = async () =&gt; {
'use server'
// Perform some server-side update
await db.update(...)
}</p>
<p>return &lt;CacheComponent performUpdate={performUpdate} /&gt;
}</p>
<p>async function CachedComponent({
performUpdate,
}: {
performUpdate: () =&gt; Promise&lt;void&gt;
}) {
'use cache'
// Do not call performUpdate here
return &lt;ClientComponent action={performUpdate} /&gt;
}</p>
<p>app/ClientComponent.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>export default function ClientComponent({
action,
}: {
action: () =&gt; Promise&lt;void&gt;
}) {
return &lt;button onClick={action}&gt;Update&lt;/button&gt;
}
RelatedView related API references.useCacheLearn how to enable the useCache flag in Next.js.dynamicIOLearn how to enable the dynamicIO flag in Next.js.cacheLifeLearn how to set up cacheLife configurations in Next.js.cacheTagLearn how to use the cacheTag function to manage cache invalidation in your Next.js application.cacheLifeLearn how to use the cacheLife function to set the cache expiration time for a cached function or component.revalidateTagAPI Reference for the revalidateTag function.Was this helpful?</p>
<p>supported.Send</p>
