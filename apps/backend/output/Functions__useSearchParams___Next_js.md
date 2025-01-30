# Functions: useSearchParams | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsuseSearchParamsuseSearchParamsuseSearchParams is a Client Component hook that lets you read the current URL's query string.
useSearchParams returns a read-only version of the URLSearchParams interface.
app/dashboard/search-bar.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useSearchParams } from 'next/navigation'</p>
<p>export default function SearchBar() {
const searchParams = useSearchParams()</p>
<p>const search = searchParams.get('search')</p>
<p>// URL -&gt; <code>/dashboard?search=my-project</code>
// <code>search</code> -&gt; 'my-project'
return &lt;&gt;Search: {search}&lt;/&gt;
}</p>
<p>Parameters</p>
<p>const searchParams = useSearchParams()
useSearchParams does not take any parameters.
Returns</p>
<p>useSearchParams returns a read-only version of the URLSearchParams interface, which includes utility methods for reading the URL's query string:</p>
<p>URLSearchParams.get(): Returns the first value associated with the search parameter. For example:
URLsearchParams.get(&quot;a&quot;)/dashboard?a=1'1'/dashboard?a=''/dashboard?b=3null/dashboard?a=1&amp;a=2'1' - use getAll() to get all values</p>
<p>URLSearchParams.has(): Returns a boolean value indicating if the given parameter exists. For example:
URLsearchParams.has(&quot;a&quot;)/dashboard?a=1true/dashboard?b=3false</p>
<p>Learn more about other read-only methods of URLSearchParams, including the getAll(), keys(), values(), entries(), forEach(), and toString().</p>
<p>Good to know:</p>
<p>useSearchParams is a Client Component hook and is not supported in Server Components to prevent stale values during partial rendering.
If an application includes the /pages directory, useSearchParams will return ReadonlyURLSearchParams | null. The null value is for compatibility during migration since search params cannot be known during pre-rendering of a page that doesn't use getServerSideProps</p>
<p>Behavior</p>
<p>Static Rendering</p>
<p>If a route is statically rendered, calling useSearchParams will cause the Client Component tree up to the closest Suspense boundary to be client-side rendered.
This allows a part of the route to be statically rendered while the dynamic part that uses useSearchParams is client-side rendered.
We recommend wrapping the Client Component that uses useSearchParams in a &lt;Suspense/&gt; boundary. This will allow any Client Components above it to be statically rendered and sent as part of initial HTML. Example.
For example:
app/dashboard/search-bar.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useSearchParams } from 'next/navigation'</p>
<p>export default function SearchBar() {
const searchParams = useSearchParams()</p>
<p>const search = searchParams.get('search')</p>
<p>// This will not be logged on the server when using static rendering
console.log(search)</p>
<p>return &lt;&gt;Search: {search}&lt;/&gt;
}</p>
<p>app/dashboard/page.tsxTypeScriptJavaScriptTypeScriptimport { Suspense } from 'react'
import SearchBar from './search-bar'</p>
<p>// This component passed as a fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the <code>&lt;SearchBar&gt;</code> component.
function SearchBarFallback() {
return &lt;&gt;placeholder&lt;/&gt;
}</p>
<p>export default function Page() {
return (
&lt;&gt;
&lt;nav&gt;
&lt;Suspense fallback={&lt;SearchBarFallback /&gt;}&gt;
&lt;SearchBar /&gt;
&lt;/Suspense&gt;
&lt;/nav&gt;
&lt;h1&gt;Dashboard&lt;/h1&gt;
&lt;/&gt;
)
}</p>
<p>Dynamic Rendering</p>
<p>If a route is dynamically rendered, useSearchParams will be available on the server during the initial server render of the Client Component.
For example:
app/dashboard/search-bar.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useSearchParams } from 'next/navigation'</p>
<p>export default function SearchBar() {
const searchParams = useSearchParams()</p>
<p>const search = searchParams.get('search')</p>
<p>// This will be logged on the server during the initial render
// and on the client on subsequent navigations.
console.log(search)</p>
<p>return &lt;&gt;Search: {search}&lt;/&gt;
}</p>
<p>app/dashboard/page.tsxTypeScriptJavaScriptTypeScriptimport SearchBar from './search-bar'</p>
<p>export const dynamic = 'force-dynamic'</p>
<p>export default function Page() {
return (
&lt;&gt;
&lt;nav&gt;
&lt;SearchBar /&gt;
&lt;/nav&gt;
&lt;h1&gt;Dashboard&lt;/h1&gt;
&lt;/&gt;
)
}</p>
<p>Good to know: Setting the dynamic route segment config option to force-dynamic can be used to force dynamic rendering.</p>
<p>Server Components</p>
<p>Pages</p>
<p>To access search params in Pages (Server Components), use the searchParams prop.
Layouts</p>
<p>Unlike Pages, Layouts (Server Components) do not receive the searchParams prop. This is because a shared layout is not re-rendered during navigation which could lead to stale searchParams between navigations. View detailed explanation.
Instead, use the Page searchParams prop or the useSearchParams hook in a Client Component, which is re-rendered on the client with the latest searchParams.
Examples</p>
<p>Updating searchParams</p>
<p>You can use useRouter or Link to set new searchParams. After a navigation is performed, the current page.js will receive an updated searchParams prop.
app/example-client-component.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>export default function ExampleClientComponent() {
const router = useRouter()
const pathname = usePathname()
const searchParams = useSearchParams()</p>
<p>// Get a new searchParams string by merging the current
// searchParams with a provided key/value pair
const createQueryString = useCallback(
(name: string, value: string) =&gt; {
const params = new URLSearchParams(searchParams.toString())
params.set(name, value)</p>
<pre><code>  return params.toString()
},
[searchParams]
</code></pre>
<p>)</p>
<p>return (
&lt;&gt;
&lt;p&gt;Sort By&lt;/p&gt;</p>
<pre><code>  {/* using useRouter */}
  &lt;button
    onClick={() =&gt; {
      // &lt;pathname&gt;?sort=asc
      router.push(pathname + '?' + createQueryString('sort', 'asc'))
    }}
  &gt;
    ASC
  &lt;/button&gt;

  {/* using &lt;Link&gt; */}
  &lt;Link
    href={
      // &lt;pathname&gt;?sort=desc
      pathname + '?' + createQueryString('sort', 'desc')
    }
  &gt;
    DESC
  &lt;/Link&gt;
&lt;/&gt;
</code></pre>
<p>)
}</p>
<p>Version History</p>
<p>VersionChangesv13.0.0useSearchParams introduced.Was this helpful?</p>
<p>supported.Send</p>
