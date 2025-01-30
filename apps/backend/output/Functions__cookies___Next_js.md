# Functions: cookies | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionscookiescookiescookies is an async function that allows you to read the HTTP incoming request cookies in Server Component, and read/write outgoing request cookies in Server Actions or Route Handlers.
app/page.tsxTypeScriptJavaScriptTypeScriptimport { cookies } from 'next/headers'</p>
<p>export default async function Page() {
const cookieStore = await cookies()
const theme = cookieStore.get('theme')
return '...'
}</p>
<p>Reference</p>
<p>Methods</p>
<p>The following methods are available:
MethodReturn TypeDescriptionget('name')ObjectAccepts a cookie name and returns an object with the name and value.getAll()Array of objectsReturns a list of all the cookies with a matching name.has('name')BooleanAccepts a cookie name and returns a boolean based on if the cookie exists.set(name, value, options)-Accepts a cookie name, value, and options and sets the outgoing request cookie.delete(name)-Accepts a cookie name and deletes the cookie.clear()-Deletes all cookies.toString()StringReturns a string representation of the cookies.
Options</p>
<p>When setting a cookie, the following properties from the options object are supported:
OptionTypeDescriptionnameStringSpecifies the name of the cookie.valueStringSpecifies the value to be stored in the cookie.expiresDateDefines the exact date when the cookie will expire.maxAgeNumberSets the cookie’s lifespan in seconds.domainStringSpecifies the domain where the cookie is available.pathString, default: '/'Limits the cookie's scope to a specific path within the domain.secureBooleanEnsures the cookie is sent only over HTTPS connections for added security.httpOnlyBooleanRestricts the cookie to HTTP requests, preventing client-side access.sameSiteBoolean, 'lax', 'strict', 'none'Controls the cookie's cross-site request behavior.priorityString (&quot;low&quot;, &quot;medium&quot;, &quot;high&quot;)Specifies the cookie's priorityencode('value')FunctionSpecifies a function that will be used to encode a cookie's value.partitionedBooleanIndicates whether the cookie is partitioned.
The only option with a default value is path.
To learn more about these options, see the MDN docs.
Good to know</p>
<p>cookies is an asynchronous function that returns a promise. You must use async/await or React's use function to access cookies.</p>
<p>In version 14 and earlier, cookies was a synchronous function. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.</p>
<p>cookies is a Dynamic API whose returned values cannot be known ahead of time. Using it in a layout or page will opt a route into dynamic rendering.
The .delete method can only be called:</p>
<p>In a Server Action or Route Handler.
If it belongs to the same domain from which .set is called. Additionally, the code must be executed on the same protocol (HTTP or HTTPS) as the cookie you want to delete.</p>
<p>HTTP does not allow setting cookies after streaming starts, so you must use .set in a Server Action or Route Handler.</p>
<p>Understanding Cookie Behavior in Server Components</p>
<p>When working with cookies in Server Components, it's important to understand that cookies are fundamentally a client-side storage mechanism:</p>
<p>Reading cookies works in Server Components because you're accessing the cookie data that the client's browser sends to the server in the HTTP request headers.
Setting cookies cannot be done directly in a Server Component, even when using a Route Handler or Server Action. This is because cookies are actually stored by the browser, not the server.</p>
<p>The server can only send instructions (via Set-Cookie headers) to tell the browser to store cookies - the actual storage happens on the client side. This is why cookie operations that modify state (.set, .delete, .clear) must be performed in a Route Handler or Server Action where the response headers can be properly set.
Examples</p>
<p>Getting a cookie</p>
<p>You can use the (await cookies()).get('name') method to get a single cookie:
app/page.tsxTypeScriptJavaScriptTypeScriptimport { cookies } from 'next/headers'</p>
<p>export default async function Page() {
const cookieStore = await cookies()
const theme = cookieStore.get('theme')
return '...'
}</p>
<p>Getting all cookies</p>
<p>You can use the (await cookies()).getAll() method to get all cookies with a matching name. If name is unspecified, it returns all the available cookies.
app/page.tsxTypeScriptJavaScriptTypeScriptimport { cookies } from 'next/headers'</p>
<p>export default async function Page() {
const cookieStore = await cookies()
return cookieStore.getAll().map((cookie) =&gt; (
&lt;div key={cookie.name}&gt;
&lt;p&gt;Name: {cookie.name}&lt;/p&gt;
&lt;p&gt;Value: {cookie.value}&lt;/p&gt;
&lt;/div&gt;
))
}</p>
<p>Setting a cookie</p>
<p>You can use the (await cookies()).set(name, value, options) method in a Server Action or Route Handler to set a cookie. The options object is optional.
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { cookies } from 'next/headers'</p>
<p>export async function create(data) {
const cookieStore = await cookies()</p>
<p>cookieStore.set('name', 'lee')
// or
cookieStore.set('name', 'lee', { secure: true })
// or
cookieStore.set({
name: 'name',
value: 'lee',
httpOnly: true,
path: '/',
})
}</p>
<p>Checking if a cookie exists</p>
<p>You can use the (await cookies()).has(name) method to check if a cookie exists:
app/page.tsTypeScriptJavaScriptTypeScriptimport { cookies } from 'next/headers'</p>
<p>export default async function Page() {
const cookieStore = await cookies()
const hasCookie = cookieStore.has('theme')
return '...'
}</p>
<p>Deleting cookies</p>
<p>There are three ways you can delete a cookie.
Using the delete() method:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { cookies } from 'next/headers'</p>
<p>export async function delete(data) {
(await cookies()).delete('name')
}</p>
<p>Setting a new cookie with the same name and an empty value:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { cookies } from 'next/headers'</p>
<p>export async function delete(data) {
(await cookies()).set('name', '')
}</p>
<p>Setting the maxAge to 0 will immediately expire a cookie. maxAge accepts a value in seconds.
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { cookies } from 'next/headers'</p>
<p>export async function delete(data) {
(await cookies()).set('name', 'value', { maxAge: 0 })
}</p>
<p>Version History</p>
<p>VersionChangesv15.0.0-RCcookies is now an async function. A codemod is available.v13.0.0cookies introduced.Was this helpful?</p>
<p>supported.Send</p>
