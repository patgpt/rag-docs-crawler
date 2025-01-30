# Directives: use client | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceDirectivesuse clientuse clientThe use client directive designates a component to be rendered on the client side and should be used when creating interactive user interfaces (UI) that require client-side JavaScript capabilities, such as state management, event handling, and access to browser APIs. This is a React feature.
Usage</p>
<p>To designate a component as a Client Component, add the use client directive at the top of the file, before any imports:
app/components/counter.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useState } from 'react'</p>
<p>export default function Counter() {
const [count, setCount] = useState(0)</p>
<p>return (
&lt;div&gt;
&lt;p&gt;Count: {count}&lt;/p&gt;
&lt;button onClick={() =&gt; setCount(count + 1)}&gt;Increment&lt;/button&gt;
&lt;/div&gt;
)
}</p>
<p>Nesting Client Components within Server Components</p>
<p>Combining Server and Client Components allows you to build applications that are both performant and interactive:</p>
<p>Server Components: Use for static content, data fetching, and SEO-friendly elements.
Client Components: Use for interactive elements that require state, effects, or browser APIs.
Component composition: Nest Client Components within Server Components as needed for a clear separation of server and client logic.</p>
<p>In the following example:</p>
<p>Header is a Server Component handling static content.
Counter is a Client Component enabling interactivity within the page.</p>
<p>app/page.tsxTypeScriptJavaScriptTypeScriptimport Header from './header'
import Counter from './counter' // This is a Client Component</p>
<p>export default function Page() {
return (
&lt;div&gt;
&lt;Header /&gt;
&lt;Counter /&gt;
&lt;/div&gt;
)
}</p>
<p>Reference</p>
<p>See the React documentation for more information on use client.Was this helpful?</p>
<p>supported.Send</p>
