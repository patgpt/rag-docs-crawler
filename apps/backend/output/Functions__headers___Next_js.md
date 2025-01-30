# Functions: headers | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsheadersheadersheaders is an async function that allows you to read the HTTP incoming request headers from a Server Component.
app/page.tsxTypeScriptJavaScriptTypeScriptimport { headers } from 'next/headers'</p>
<p>export default async function Page() {
const headersList = await headers()
const userAgent = headersList.get('user-agent')
}</p>
<p>Reference</p>
<p>Parameters</p>
<p>headers does not take any parameters.
Returns</p>
<p>headers returns a read-only Web Headers object.</p>
<p>Headers.entries(): Returns an iterator allowing to go through all key/value pairs contained in this object.
Headers.forEach(): Executes a provided function once for each key/value pair in this Headers object.
Headers.get(): Returns a String sequence of all the values of a header within a Headers object with a given name.
Headers.has(): Returns a boolean stating whether a Headers object contains a certain header.
Headers.keys(): Returns an iterator allowing you to go through all keys of the key/value pairs contained in this object.
Headers.values(): Returns an iterator allowing you to go through all values of the key/value pairs contained in this object.</p>
<p>Good to know</p>
<p>headers is an asynchronous function that returns a promise. You must use async/await or React's use function.</p>
<p>In version 14 and earlier, headers was a synchronous function. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.</p>
<p>Since headers is read-only, you cannot set or delete the outgoing request headers.
headers is a Dynamic API whose returned values cannot be known ahead of time. Using it in will opt a route into dynamic rendering.</p>
<p>Examples</p>
<p>Using the Authorization header</p>
<p>app/page.jsimport { headers } from 'next/headers'</p>
<p>export default async function Page() {
const authorization = (await headers()).get('authorization')
const res = await fetch('...', {
headers: { authorization }, // Forward the authorization header
})
const user = await res.json()</p>
<p>return &lt;h1&gt;{user.name}&lt;/h1&gt;
}
Version History</p>
<p>VersionChangesv15.0.0-RCheaders is now an async function. A codemod is available.v13.0.0headers introduced.Was this helpful?</p>
<p>supported.Send</p>
