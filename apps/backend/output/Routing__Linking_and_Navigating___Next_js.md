# Routing: Linking and Navigating | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRoutingLinking and NavigatingLinking and NavigatingThere are four ways to navigate between routes in Next.js:</p>
<p>Using the &lt;Link&gt; Component
Using the useRouter hook (Client Components)
Using the redirect function (Server Components)
Using the native History API</p>
<p>This page will go through how to use each of these options, and dive deeper into how navigation works.
&lt;Link&gt; Component</p>
<p>&lt;Link&gt; is a built-in component that extends the HTML &lt;a&gt; tag to provide prefetching and client-side navigation between routes. It is the primary and recommended way to navigate between routes in Next.js.
You can use it by importing it from next/link, and passing a href prop to the component:
app/page.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Page() {
return &lt;Link href=&quot;/dashboard&quot;&gt;Dashboard&lt;/Link&gt;
}</p>
<p>There are other optional props you can pass to &lt;Link&gt;. See the API reference for more.
useRouter() hook</p>
<p>The useRouter hook allows you to programmatically change routes from Client Components.
app/page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useRouter } from 'next/navigation'</p>
<p>export default function Page() {
const router = useRouter()</p>
<p>return (
&lt;button type=&quot;button&quot; onClick={() =&gt; router.push('/dashboard')}&gt;
Dashboard
&lt;/button&gt;
)
}</p>
<p>For a full list of useRouter methods, see the API reference.</p>
<p>Recommendation: Use the &lt;Link&gt; component to navigate between routes unless you have a specific requirement for using useRouter.</p>
<p>redirect function</p>
<p>For Server Components, use the redirect function instead.
app/team/[id]/page.tsxTypeScriptJavaScriptTypeScriptimport { redirect } from 'next/navigation'</p>
<p>async function fetchTeam(id: string) {
const res = await fetch('https://...')
if (!res.ok) return undefined
return res.json()
}</p>
<p>export default async function Profile({
params,
}: {
params: Promise&lt;{ id: string }&gt;
}) {
const id = (await params).id
if (!id) {
redirect('/login')
}</p>
<p>const team = await fetchTeam(id)
if (!team) {
redirect('/join')
}</p>
<p>// ...
}</p>
<p>Good to know:</p>
<p>redirect returns a 307 (Temporary Redirect) status code by default. When used in a Server Action, it returns a 303 (See Other), which is commonly used for redirecting to a success page as a result of a POST request.
redirect internally throws an error so it should be called outside of try/catch blocks.
redirect can be called in Client Components during the rendering process but not in event handlers. You can use the useRouter hook instead.
redirect also accepts absolute URLs and can be used to redirect to external links.
If you'd like to redirect before the render process, use next.config.js or Middleware.</p>
<p>See the redirect API reference for more information.
Using the native History API</p>
<p>Next.js allows you to use the native window.history.pushState and window.history.replaceState methods to update the browser's history stack without reloading the page.
pushState and replaceState calls integrate into the Next.js Router, allowing you to sync with usePathname and useSearchParams.
window.history.pushState</p>
<p>Use it to add a new entry to the browser's history stack. The user can navigate back to the previous state. For example, to sort a list of products:
'use client'</p>
<p>import { useSearchParams } from 'next/navigation'</p>
<p>export default function SortProducts() {
const searchParams = useSearchParams()</p>
<p>function updateSorting(sortOrder: string) {
const params = new URLSearchParams(searchParams.toString())
params.set('sort', sortOrder)
window.history.pushState(null, '', <code>?${params.toString()}</code>)
}</p>
<p>return (
&lt;&gt;
&lt;button onClick={() =&gt; updateSorting('asc')}&gt;Sort Ascending&lt;/button&gt;
&lt;button onClick={() =&gt; updateSorting('desc')}&gt;Sort Descending&lt;/button&gt;
&lt;/&gt;
)
}</p>
<p>window.history.replaceState</p>
<p>Use it to replace the current entry on the browser's history stack. The user is not able to navigate back to the previous state. For example, to switch the application's locale:
'use client'</p>
<p>import { usePathname } from 'next/navigation'</p>
<p>export function LocaleSwitcher() {
const pathname = usePathname()</p>
<p>function switchLocale(locale: string) {
// e.g. '/en/about' or '/fr/contact'
const newPath = <code>/${locale}${pathname}</code>
window.history.replaceState(null, '', newPath)
}</p>
<p>return (
&lt;&gt;
&lt;button onClick={() =&gt; switchLocale('en')}&gt;English&lt;/button&gt;
&lt;button onClick={() =&gt; switchLocale('fr')}&gt;French&lt;/button&gt;
&lt;/&gt;
)
}</p>
<p>How Routing and Navigation Works</p>
<p>The App Router uses a hybrid approach for routing and navigation. On the server, your application code is automatically code-split by route segments. And on the client, Next.js prefetches and caches the route segments. This means, when a user navigates to a new route, the browser doesn't reload the page, and only the route segments that change re-render - improving the navigation experience and performance.</p>
<ol>
<li>Code Splitting</li>
</ol>
<p>Code splitting allows you to split your application code into smaller bundles to be downloaded and executed by the browser. This reduces the amount of data transferred and execution time for each request, leading to improved performance.
Server Components allow your application code to be automatically code-split by route segments. This means only the code needed for the current route is loaded on navigation.
2. Prefetching</p>
<p>Prefetching is a way to preload a route in the background before the user visits it.
There are two ways routes are prefetched in Next.js:</p>
<p>&lt;Link&gt; component: Routes are automatically prefetched as they become visible in the user's viewport. Prefetching happens when the page first loads or when it comes into view through scrolling.
router.prefetch(): The useRouter hook can be used to prefetch routes programmatically.</p>
<p>The &lt;Link&gt;'s default prefetching behavior (i.e. when the prefetch prop is left unspecified or set to null) is different depending on your usage of loading.js. Only the shared layout, down the rendered &quot;tree&quot; of components until the first loading.js file, is prefetched and cached for 30s. This reduces the cost of fetching an entire dynamic route, and it means you can show an instant loading state for better visual feedback to users.
You can disable prefetching by setting the prefetch prop to false. Alternatively, you can prefetch the full page data beyond the loading boundaries by setting the prefetch prop to true.
See the &lt;Link&gt; API reference for more information.</p>
<p>Good to know:</p>
<p>Prefetching is not enabled in development, only in production.</p>
<ol start="3">
<li>Caching</li>
</ol>
<p>Next.js has an in-memory client-side cache called the Router Cache. As users navigate around the app, the React Server Component Payload of prefetched route segments and visited routes are stored in the cache.
This means on navigation, the cache is reused as much as possible, instead of making a new request to the server - improving performance by reducing the number of requests and data transferred.
Learn more about how the Router Cache works and how to configure it.
4. Partial Rendering</p>
<p>Partial rendering means only the route segments that change on navigation re-render on the client, and any shared segments are preserved.
For example, when navigating between two sibling routes, /dashboard/settings and /dashboard/analytics, the settings page will be unmounted, the analytics page will be mounted with fresh state, and the shared dashboard layout will be preserved. This behavior is also present between two routes on the same dynamic segment e.g. with /blog/[slug]/page and navigating from /blog/first to /blog/second.</p>
<p>Without partial rendering, each navigation would cause the full page to re-render on the client. Rendering only the segment that changes reduces the amount of data transferred and execution time, leading to improved performance.
5. Soft Navigation</p>
<p>Browsers perform a &quot;hard navigation&quot; when navigating between pages. The Next.js App Router enables &quot;soft navigation&quot; between pages, ensuring only the route segments that have changed are re-rendered (partial rendering). This enables client React state to be preserved during navigation.
6. Back and Forward Navigation</p>
<p>By default, Next.js will maintain the scroll position for backwards and forwards navigation, and re-use route segments in the Router Cache.
7. Routing between pages/ and app/</p>
<p>When incrementally migrating from pages/ to app/, the Next.js router will automatically handle hard navigation between the two. To detect transitions from pages/ to app/, there is a client router filter that leverages probabilistic checking of app routes, which can occasionally result in false positives. By default, such occurrences should be very rare, as we configure the false positive likelihood to be 0.01%. This likelihood can be customized via the experimental.clientRouterFilterAllowedRate option in next.config.js. It's important to note that lowering the false positive rate will increase the size of the generated filter in the client bundle.
Alternatively, if you prefer to disable this handling completely and manage the routing between pages/ and app/ manually, you can set experimental.clientRouterFilter to false in next.config.js. When this feature is disabled, any dynamic routes in pages that overlap with app routes won't be navigated to properly by default.Next StepsCachingAn overview of caching mechanisms in Next.js.TypeScriptNext.js provides a TypeScript-first development experience for building your React application.Was this helpful?</p>
<p>supported.Send</p>
