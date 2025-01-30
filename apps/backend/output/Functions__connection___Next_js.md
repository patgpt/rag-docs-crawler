# Functions: connection | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsconnectionconnectionThe connection() function allows you to indicate rendering should wait for an incoming user request before continuing.
It's useful when a component doesn’t use Dynamic APIs, but you want it to be dynamically rendered at runtime and not statically rendered at build time. This usually occurs when you access external information that you intentionally want to change the result of a render, such as Math.random() or new Date().
app/page.tsxTypeScriptJavaScriptTypeScriptimport { connection } from 'next/server'</p>
<p>export default async function Page() {
await connection()
// Everything below will be excluded from prerendering
const rand = Math.random()
return &lt;span&gt;{rand}&lt;/span&gt;
}</p>
<p>Reference</p>
<p>Type</p>
<p>function connection(): Promise&lt;void&gt;
Parameters</p>
<p>The function does not accept any parameters.</p>
<p>Returns</p>
<p>The function returns a void Promise. It is not meant to be consumed.</p>
<p>Good to know</p>
<p>connection replaces unstable_noStore to better align with the future of Next.js.
The function is only necessary when dynamic rendering is required and common Dynamic APIs are not used.</p>
<p>Version History</p>
<p>VersionChangesv15.0.0connection stabilized.v15.0.0-RCconnection introduced.Was this helpful?</p>
<p>supported.Send</p>
