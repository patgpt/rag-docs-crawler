# Functions: after | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsafterafterafter allows you to schedule work to be executed after a response (or prerender) is finished. This is useful for tasks and other side effects that should not block the response, such as logging and analytics.
It can be used in Server Components (including generateMetadata), Server Actions, Route Handlers, and Middleware.
The function accepts a callback that will be executed after the response (or prerender) is finished:
app/layout.tsxTypeScriptJavaScriptTypeScriptimport { after } from 'next/server'
// Custom logging function
import { log } from '@/app/utils'</p>
<p>export default function Layout({ children }: { children: React.ReactNode }) {
after(() =&gt; {
// Execute after the layout is rendered and sent to the user
log()
})
return &lt;&gt;{children}&lt;/&gt;
}</p>
<p>Good to know: after is not a Dynamic API and calling it does not cause a route to become dynamic. If it's used within a static page, the callback will execute at build time, or whenever a page is revalidated.</p>
<p>Reference</p>
<p>Parameters</p>
<p>A callback function which will be executed after the response (or prerender) is finished.</p>
<p>Duration</p>
<p>after will run for the platform's default or configured max duration of your route. If your platform supports it, you can configure the timeout limit using the maxDuration route segment config.
Good to know</p>
<p>after will be executed even if the response didn't complete successfully. Including when an error is thrown or when notFound or redirect is called.
You can use React cache to deduplicate functions called inside after.
after can be nested inside other after calls, for example, you can create utility functions that wrap after calls to add additional functionality.</p>
<p>Alternatives</p>
<p>The use case for after is to process secondary tasks without blocking the primary response. It's similar to using the platform's waitUntil() or removing await from a promise, but with the following differences:</p>
<p>waitUntil(): accepts a promise and enqueues a task to be executed during the lifecycle of the request, whereas after accepts a callback that will be executed after the response is finished.
Removing await: starts executing during the response, which uses resources. It's also not reliable in serverless environments as the function stops computation immediately after the response is sent, potentially interrupting the task.</p>
<p>We recommend using after as it has been designed to consider other Next.js APIs and contexts.
Examples</p>
<p>With request APIs</p>
<p>You can use request APIs such as cookies and headers inside after in Server Actions and Route Handlers. This is useful for logging activity after a mutation. For example:
app/api/route.tsTypeScriptJavaScriptTypeScriptimport { after } from 'next/server'
import { cookies, headers } from 'next/headers'
import { logUserAction } from '@/app/utils'</p>
<p>export async function POST(request: Request) {
// Perform mutation
// ...</p>
<p>// Log user activity for analytics
after(async () =&gt; {
const userAgent = (await headers().get('user-agent')) || 'unknown'
const sessionCookie =
(await cookies().get('session-id'))?.value || 'anonymous'</p>
<pre><code>logUserAction({ sessionCookie, userAgent })
</code></pre>
<p>})</p>
<p>return new Response(JSON.stringify({ status: 'success' }), {
status: 200,
headers: { 'Content-Type': 'application/json' },
})
}</p>
<p>However, you cannot use these request APIs inside after in Server Components. This is because Next.js needs to know which part of the tree access the request APIs to support Partial Prerendering, but after runs after React's rendering lifecycle.
Version HistoryDescriptionv15.1.0after became stable.v15.0.0-rcunstable_after introduced.Was this helpful?</p>
<p>supported.Send</p>
