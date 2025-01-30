# Functions: useRouter | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsuseRouteruseRouterThe useRouter hook allows you to programmatically change routes inside Client Components.</p>
<p>Recommendation: Use the &lt;Link&gt; component for navigation unless you have a specific requirement for using useRouter.</p>
<p>app/example-client-component.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useRouter } from 'next/navigation'</p>
<p>export default function Page() {
const router = useRouter()</p>
<p>return (
&lt;button type=&quot;button&quot; onClick={() =&gt; router.push('/dashboard')}&gt;
Dashboard
&lt;/button&gt;
)
}</p>
<p>useRouter()</p>
<p>router.push(href: string, { scroll: boolean }): Perform a client-side navigation to the provided route. Adds a new entry into the browser’s history stack.
router.replace(href: string, { scroll: boolean }): Perform a client-side navigation to the provided route without adding a new entry into the browser’s history stack.
router.refresh(): Refresh the current route. Making a new request to the server, re-fetching data requests, and re-rendering Server Components. The client will merge the updated React Server Component payload without losing unaffected client-side React (e.g. useState) or browser state (e.g. scroll position).
router.prefetch(href: string): Prefetch the provided route for faster client-side transitions.
router.back(): Navigate back to the previous route in the browser’s history stack.
router.forward(): Navigate forwards to the next page in the browser’s history stack.</p>
<p>Good to know:</p>
<p>You must not send untrusted or unsanitized URLs to router.push or router.replace, as this can open your site to cross-site scripting (XSS) vulnerabilities. For example, javascript: URLs sent to router.push or router.replace will be executed in the context of your page.
The &lt;Link&gt; component automatically prefetch routes as they become visible in the viewport.
refresh() could re-produce the same result if fetch requests are cached. Other Dynamic APIs like cookies and headers could also change the response.</p>
<p>Migrating from next/router</p>
<p>The useRouter hook should be imported from next/navigation and not next/router when using the App Router
The pathname string has been removed and is replaced by usePathname()
The query object has been removed and is replaced by useSearchParams()
router.events has been replaced. See below.</p>
<p>View the full migration guide.
Examples</p>
<p>Router events</p>
<p>You can listen for page changes by composing other Client Component hooks like usePathname and useSearchParams.
app/components/navigation-events.js'use client'</p>
<p>import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'</p>
<p>export function NavigationEvents() {
const pathname = usePathname()
const searchParams = useSearchParams()</p>
<p>useEffect(() =&gt; {
const url = <code>${pathname}?${searchParams}</code>
console.log(url)
// You can now use the current URL
// ...
}, [pathname, searchParams])</p>
<p>return '...'
}
Which can be imported into a layout.
app/layout.jsimport { Suspense } from 'react'
import { NavigationEvents } from './components/navigation-events'</p>
<p>export default function Layout({ children }) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;body&gt;
{children}</p>
<pre><code>    &lt;Suspense fallback={null}&gt;
      &lt;NavigationEvents /&gt;
    &lt;/Suspense&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>)
}</p>
<p>Good to know: &lt;NavigationEvents&gt; is wrapped in a Suspense boundary becauseuseSearchParams() causes client-side rendering up to the closest Suspense boundary during static rendering. Learn more.</p>
<p>Disabling scroll to top</p>
<p>By default, Next.js will scroll to the top of the page when navigating to a new route. You can disable this behavior by passing scroll: false to router.push() or router.replace().
app/example-client-component.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useRouter } from 'next/navigation'</p>
<p>export default function Page() {
const router = useRouter()</p>
<p>return (
&lt;button
type=&quot;button&quot;
onClick={() =&gt; router.push('/dashboard', { scroll: false })}
&gt;
Dashboard
&lt;/button&gt;
)
}</p>
<p>Version History</p>
<p>VersionChangesv13.0.0useRouter from next/navigation introduced.Was this helpful?</p>
<p>supported.Send</p>
