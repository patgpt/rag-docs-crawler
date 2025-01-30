# Optimizing: Lazy Loading | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationOptimizingLazy LoadingLazy Loading
Lazy loading in Next.js helps improve the initial loading performance of an application by decreasing the amount of JavaScript needed to render a route.
It allows you to defer loading of Client Components and imported libraries, and only include them in the client bundle when they're needed. For example, you might want to defer loading a modal until a user clicks to open it.
There are two ways you can implement lazy loading in Next.js:</p>
<p>Using Dynamic Imports with next/dynamic
Using React.lazy() with Suspense</p>
<p>By default, Server Components are automatically code split, and you can use streaming to progressively send pieces of UI from the server to the client. Lazy loading applies to Client Components.
next/dynamic</p>
<p>next/dynamic is a composite of React.lazy() and Suspense. It behaves the same way in the app and pages directories to allow for incremental migration.
Examples</p>
<p>Importing Client Components</p>
<p>app/page.js'use client'</p>
<p>import { useState } from 'react'
import dynamic from 'next/dynamic'</p>
<p>// Client Components:
const ComponentA = dynamic(() =&gt; import('../components/A'))
const ComponentB = dynamic(() =&gt; import('../components/B'))
const ComponentC = dynamic(() =&gt; import('../components/C'), { ssr: false })</p>
<p>export default function ClientComponentExample() {
const [showMore, setShowMore] = useState(false)</p>
<p>return (
&lt;div&gt;
{/* Load immediately, but in a separate client bundle */}
&lt;ComponentA /&gt;</p>
<pre><code>  {/* Load on demand, only when/if the condition is met */}
  {showMore &amp;&amp; &lt;ComponentB /&gt;}
  &lt;button onClick={() =&gt; setShowMore(!showMore)}&gt;Toggle&lt;/button&gt;

  {/* Load only on the client side */}
  &lt;ComponentC /&gt;
&lt;/div&gt;
</code></pre>
<p>)
}Skipping SSR</p>
<p>When using React.lazy() and Suspense, Client Components will be prerendered (SSR) by default.
Note: ssr: false option will only work for client components, move it into client components ensure the client code-splitting working properly.
If you want to disable pre-rendering for a Client Component, you can use the ssr option set to false:const ComponentC = dynamic(() =&gt; import('../components/C'), { ssr: false })Importing Server Components</p>
<p>If you dynamically import a Server Component, only the Client Components that are children of the Server Component will be lazy-loaded - not the Server Component itself.
It will also help preload the static assets such as CSS when you're using it in Server Components.app/page.jsimport dynamic from 'next/dynamic'</p>
<p>// Server Component:
const ServerComponent = dynamic(() =&gt; import('../components/ServerComponent'))</p>
<p>export default function ServerComponentExample() {
return (
&lt;div&gt;
&lt;ServerComponent /&gt;
&lt;/div&gt;
)
}
Note: ssr: false option is not supported in Server Components. You will see an error if you try to use it in Server Components.
ssr: false is not allowed with next/dynamic in Server Components. Please move it into a client component.
Loading External Libraries</p>
<p>External libraries can be loaded on demand using the import() function. This example uses the external library fuse.js for fuzzy search. The module is only loaded on the client after the user types in the search input.app/page.js'use client'</p>
<p>import { useState } from 'react'</p>
<p>const names = ['Tim', 'Joe', 'Bel', 'Lee']</p>
<p>export default function Page() {
const [results, setResults] = useState()</p>
<p>return (
&lt;div&gt;
&lt;input
type=&quot;text&quot;
placeholder=&quot;Search&quot;
onChange={async (e) =&gt; {
const { value } = e.currentTarget
// Dynamically load fuse.js
const Fuse = (await import('fuse.js')).default
const fuse = new Fuse(names)</p>
<pre><code>      setResults(fuse.search(value))
    }}
  /&gt;
  &lt;pre&gt;Results: {JSON.stringify(results, null, 2)}&lt;/pre&gt;
&lt;/div&gt;
</code></pre>
<p>)
}Adding a custom loading component</p>
<p>app/page.js'use client'</p>
<p>import dynamic from 'next/dynamic'</p>
<p>const WithCustomLoading = dynamic(
() =&gt; import('../components/WithCustomLoading'),
{
loading: () =&gt; &lt;p&gt;Loading...&lt;/p&gt;,
}
)</p>
<p>export default function Page() {
return (
&lt;div&gt;
{/* The loading component will be rendered while  &lt;WithCustomLoading/&gt; is loading */}
&lt;WithCustomLoading /&gt;
&lt;/div&gt;
)
}Importing Named Exports</p>
<p>To dynamically import a named export, you can return it from the Promise returned by import() function:components/hello.js'use client'</p>
<p>export function Hello() {
return &lt;p&gt;Hello!&lt;/p&gt;
}app/page.jsimport dynamic from 'next/dynamic'</p>
<p>const ClientComponent = dynamic(() =&gt;
import('../components/hello').then((mod) =&gt; mod.Hello)
)
Was this helpful?</p>
<p>supported.Send</p>
