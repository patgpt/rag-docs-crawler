# File Conventions: instrumentation.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionsinstrumentation.jsinstrumentation.jsThe instrumentation.js|ts file is used to integrate observability tools into your application, allowing you to track the performance and behavior, and to debug issues in production.
To use it, place the file in the root of your application or inside a src folder if using one.
Exports</p>
<p>register (optional)</p>
<p>The file exports a register function that is called once when a new Next.js server instance is initiated. register can be an async function.
instrumentation.tsTypeScriptJavaScriptTypeScriptimport { registerOTel } from '@vercel/otel'</p>
<p>export function register() {
registerOTel('next-app')
}</p>
<p>onRequestError (optional)</p>
<p>You can optionally export an onRequestError function to track server errors to any custom observability provider.</p>
<p>If you're running any async tasks in onRequestError, make sure they're awaited. onRequestError will be triggered when the Next.js server captures the error.
The error instance might not be the original error instance thrown, as it may be processed by React if encountered during Server Components rendering. If this happens, you can use digest property on an error to identify the actual error type.</p>
<p>instrumentation.tsTypeScriptJavaScriptTypeScriptimport { type Instrumentation } from 'next'</p>
<p>export const onRequestError: Instrumentation.onRequestError = async (
err,
request,
context
) =&gt; {
await fetch('https://.../report-error', {
method: 'POST',
body: JSON.stringify({
message: err.message,
request,
context,
}),
headers: {
'Content-Type': 'application/json',
},
})
}</p>
<p>Parameters</p>
<p>The function accepts three parameters: error, request, and context.
Typesexport function onRequestError(
error: { digest: string } &amp; Error,
request: {
path: string // resource path, e.g. /blog?name=foo
method: string // request method. e.g. GET, POST, etc
headers: { [key: string]: string }
},
context: {
routerKind: 'Pages Router' | 'App Router' // the router type
routePath: string // the route file path, e.g. /app/blog/[dynamic]
routeType: 'render' | 'route' | 'action' | 'middleware' // the context in which the error occurred
renderSource:
| 'react-server-components'
| 'react-server-components-payload'
| 'server-rendering'
revalidateReason: 'on-demand' | 'stale' | undefined // undefined is a normal request without revalidation
renderType: 'dynamic' | 'dynamic-resume' // 'dynamic-resume' for PPR
}
): void | Promise&lt;void&gt;</p>
<p>error: The caught error itself (type is always Error), and a digest property which is the unique ID of the error.
request: Read-only request information associated with the error.
context: The context in which the error occurred. This can be the type of router (App or Pages Router), and/or (Server Components ('render'), Route Handlers ('route'), Server Actions ('action'), or Middleware ('middleware')).</p>
<p>Specifying the runtime</p>
<p>The instrumentation.js file works in both the Node.js and Edge runtime, however, you can use process.env.NEXT_RUNTIME to target a specific runtime.
instrumentation.jsexport function register() {
if (process.env.NEXT_RUNTIME === 'edge') {
return require('./register.edge')
} else {
return require('./register.node')
}
}</p>
<p>export function onRequestError() {
if (process.env.NEXT_RUNTIME === 'edge') {
return require('./on-request-error.edge')
} else {
return require('./on-request-error.node')
}
}
Version History</p>
<p>VersionChangesv15.0.0-RConRequestError introduced, instrumentation stablev14.0.4Turbopack support for instrumentationv13.2.0instrumentation introduced as an experimental featureLearn more about InstrumentationInstrumentationLearn how to use instrumentation to run code at server startup in your Next.js appWas this helpful?</p>
<p>supported.Send</p>
