# Functions: draftMode | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsdraftModedraftModedraftMode is an async function allows you to enable and disable Draft Mode, as well as check if Draft Mode is enabled in a Server Component.
app/page.tsTypeScriptJavaScriptTypeScriptimport { draftMode } from 'next/headers'</p>
<p>export default async function Page() {
const { isEnabled } = await draftMode()
}</p>
<p>Reference</p>
<p>The following methods and properties are available:
MethodDescriptionisEnabledA boolean value that indicates if Draft Mode is enabled.enable()Enables Draft Mode in a Route Handler by setting a cookie (__prerender_bypass).disable()Disables Draft Mode in a Route Handler by deleting a cookie.
Good to know</p>
<p>draftMode is an asynchronous function that returns a promise. You must use async/await or React's use function.</p>
<p>In version 14 and earlier, draftMode was a synchronous function. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.</p>
<p>A new bypass cookie value will be generated each time you run next build. This ensures that the bypass cookie can’t be guessed.
To test Draft Mode locally over HTTP, your browser will need to allow third-party cookies and local storage access.</p>
<p>Examples</p>
<p>Enabling Draft Mode</p>
<p>To enable Draft Mode, create a new Route Handler and call the enable() method:
app/draft/route.tsTypeScriptJavaScriptTypeScriptimport { draftMode } from 'next/headers'</p>
<p>export async function GET(request: Request) {
const draft = await draftMode()
draft.enable()
return new Response('Draft mode is enabled')
}</p>
<p>Disabling Draft Mode</p>
<p>By default, the Draft Mode session ends when the browser is closed.
To disable Draft Mode manually, call the disable() method in your Route Handler:
app/draft/route.tsTypeScriptJavaScriptTypeScriptimport { draftMode } from 'next/headers'</p>
<p>export async function GET(request: Request) {
const draft = await draftMode()
draft.disable()
return new Response('Draft mode is disabled')
}</p>
<p>Then, send a request to invoke the Route Handler. If calling the route using the &lt;Link&gt; component, you must pass prefetch={false} to prevent accidentally deleting the cookie on prefetch.
Checking if Draft Mode is enabled</p>
<p>You can check if Draft Mode is enabled in a Server Component with the isEnabled property:
app/page.tsTypeScriptJavaScriptTypeScriptimport { draftMode } from 'next/headers'</p>
<p>export default async function Page() {
const { isEnabled } = await draftMode()
return (
&lt;main&gt;
&lt;h1&gt;My Blog Post&lt;/h1&gt;
&lt;p&gt;Draft Mode is currently {isEnabled ? 'Enabled' : 'Disabled'}&lt;/p&gt;
&lt;/main&gt;
)
}</p>
<p>Version History</p>
<p>VersionChangesv15.0.0-RCdraftMode is now an async function. A codemod is available.v13.4.0draftMode introduced.Next StepsLearn how to use Draft Mode with this step-by-step guide.Draft ModeNext.js has draft mode to toggle between static and dynamic pages. You can learn how it works with App Router here.Was this helpful?</p>
<p>supported.Send</p>
