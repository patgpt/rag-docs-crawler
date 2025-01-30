# Optimizing: OpenTelemetry | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationOptimizingOpenTelemetryOpenTelemetry
Observability is crucial for understanding and optimizing the behavior and performance of your Next.js app.
As applications become more complex, it becomes increasingly difficult to identify and diagnose issues that may arise. By leveraging observability tools, such as logging and metrics, developers can gain insights into their application's behavior and identify areas for optimization. With observability, developers can proactively address issues before they become major problems and provide a better user experience. Therefore, it is highly recommended to use observability in your Next.js applications to improve performance, optimize resources, and enhance user experience.
We recommend using OpenTelemetry for instrumenting your apps.
It's a platform-agnostic way to instrument apps that allows you to change your observability provider without changing your code.
Read Official OpenTelemetry docs for more information about OpenTelemetry and how it works.
This documentation uses terms like Span, Trace or Exporter throughout this doc, all of which can be found in the OpenTelemetry Observability Primer.
Next.js supports OpenTelemetry instrumentation out of the box, which means that we already instrumented Next.js itself.
When you enable OpenTelemetry we will automatically wrap all your code like getStaticProps in spans with helpful attributes.
Getting Started</p>
<p>OpenTelemetry is extensible but setting it up properly can be quite verbose.
That's why we prepared a package @vercel/otel that helps you get started quickly.
Using @vercel/otel</p>
<p>To get started, install the following packages:
Terminalnpm install @vercel/otel @opentelemetry/sdk-logs @opentelemetry/api-logs @opentelemetry/instrumentation
Next, create a custom instrumentation.ts (or .js) file in the root directory of the project (or inside src folder if using one):</p>
<p>your-project/instrumentation.tsTypeScriptJavaScriptTypeScriptimport { registerOTel } from '@vercel/otel'</p>
<p>export function register() {
registerOTel({ serviceName: 'next-app' })
}</p>
<p>See the @vercel/otel documentation for additional configuration options.</p>
<p>Good to know:</p>
<p>The instrumentation file should be in the root of your project and not inside the app or pages directory. If you're using the src folder, then place the file inside src alongside pages and app.
If you use the pageExtensions config option to add a suffix, you will also need to update the instrumentation filename to match.
We have created a basic with-opentelemetry example that you can use.</p>
<p>Manual OpenTelemetry configuration</p>
<p>The @vercel/otel package provides many configuration options and should serve most of common use cases. But if it doesn't suit your needs, you can configure OpenTelemetry manually.
Firstly you need to install OpenTelemetry packages:
Terminalnpm install @opentelemetry/sdk-node @opentelemetry/resources @opentelemetry/semantic-conventions @opentelemetry/sdk-trace-node @opentelemetry/exporter-trace-otlp-http
Now you can initialize NodeSDK in your instrumentation.ts.
Unlike @vercel/otel, NodeSDK is not compatible with edge runtime, so you need to make sure that you are importing them only when process.env.NEXT_RUNTIME === 'nodejs'. We recommend creating a new file instrumentation.node.ts which you conditionally import only when using node:
instrumentation.tsTypeScriptJavaScriptTypeScriptexport async function register() {
if (process.env.NEXT_RUNTIME === 'nodejs') {
await import('./instrumentation.node.ts')
}
}</p>
<p>instrumentation.node.tsTypeScriptJavaScriptTypeScriptimport { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'</p>
<p>const sdk = new NodeSDK({
resource: new Resource({
[ATTR_SERVICE_NAME]: 'next-app',
}),
spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
})
sdk.start()</p>
<p>Doing this is equivalent to using @vercel/otel, but it's possible to modify and extend some features that are not exposed by the @vercel/otel. If edge runtime support is necessary, you will have to use @vercel/otel.
Testing your instrumentation</p>
<p>You need an OpenTelemetry collector with a compatible backend to test OpenTelemetry traces locally.
We recommend using our OpenTelemetry dev environment.
If everything works well you should be able to see the root server span labeled as GET /requested/pathname.
All other spans from that particular trace will be nested under it.
Next.js traces more spans than are emitted by default.
To see more spans, you must set NEXT_OTEL_VERBOSE=1.
Deployment</p>
<p>Using OpenTelemetry Collector</p>
<p>When you are deploying with OpenTelemetry Collector, you can use @vercel/otel.
It will work both on Vercel and when self-hosted.
Deploying on Vercel</p>
<p>We made sure that OpenTelemetry works out of the box on Vercel.
Follow Vercel documentation to connect your project to an observability provider.
Self-hosting</p>
<p>Deploying to other platforms is also straightforward. You will need to spin up your own OpenTelemetry Collector to receive and process the telemetry data from your Next.js app.
To do this, follow the OpenTelemetry Collector Getting Started guide, which will walk you through setting up the collector and configuring it to receive data from your Next.js app.
Once you have your collector up and running, you can deploy your Next.js app to your chosen platform following their respective deployment guides.
Custom Exporters</p>
<p>OpenTelemetry Collector is not necessary. You can use a custom OpenTelemetry exporter with @vercel/otel or manual OpenTelemetry configuration.
Custom Spans</p>
<p>You can add a custom span with OpenTelemetry APIs.
Terminalnpm install @opentelemetry/api
The following example demonstrates a function that fetches GitHub stars and adds a custom fetchGithubStars span to track the fetch request's result:
import { trace } from '@opentelemetry/api'</p>
<p>export async function fetchGithubStars() {
return await trace
.getTracer('nextjs-example')
.startActiveSpan('fetchGithubStars', async (span) =&gt; {
try {
return await getValue()
} finally {
span.end()
}
})
}
The register function will execute before your code runs in a new environment.
You can start creating new spans, and they should be correctly added to the exported trace.
Default Spans in Next.js</p>
<p>Next.js automatically instruments several spans for you to provide useful insights into your application's performance.
Attributes on spans follow OpenTelemetry semantic conventions. We also add some custom attributes under the next namespace:</p>
<p>next.span_name - duplicates span name
next.span_type - each span type has a unique identifier
next.route - The route pattern of the request (e.g., /[param]/user).
next.rsc (true/false) - Whether the request is an RSC request, such as prefetch.
next.page</p>
<p>This is an internal value used by an app router.
You can think about it as a route to a special file (like page.ts, layout.ts, loading.ts and others)
It can be used as a unique identifier only when paired with next.route because /layout can be used to identify both /(groupA)/layout.ts and /(groupB)/layout.ts</p>
<p>[http.method] [next.route]</p>
<p>next.span_type: BaseServer.handleRequest</p>
<p>This span represents the root span for each incoming request to your Next.js application. It tracks the HTTP method, route, target, and status code of the request.
Attributes:</p>
<p>Common HTTP attributes</p>
<p>http.method
http.status_code</p>
<p>Server HTTP attributes</p>
<p>http.route
http.target</p>
<p>next.span_name
next.span_type
next.route</p>
<p>render route (app) [next.route]</p>
<p>next.span_type: AppRender.getBodyResult.</p>
<p>This span represents the process of rendering a route in the app router.
Attributes:</p>
<p>next.span_name
next.span_type
next.route</p>
<p>fetch [http.method] [http.url]</p>
<p>next.span_type: AppRender.fetch</p>
<p>This span represents the fetch request executed in your code.
Attributes:</p>
<p>Common HTTP attributes</p>
<p>http.method</p>
<p>Client HTTP attributes</p>
<p>http.url
net.peer.name
net.peer.port (only if specified)</p>
<p>next.span_name
next.span_type</p>
<p>This span can be turned off by setting NEXT_OTEL_FETCH_DISABLED=1 in your environment. This is useful when you want to use a custom fetch instrumentation library.
executing api route (app) [next.route]</p>
<p>next.span_type: AppRouteRouteHandlers.runHandler.</p>
<p>This span represents the execution of an API Route Handler in the app router.
Attributes:</p>
<p>next.span_name
next.span_type
next.route</p>
<p>getServerSideProps [next.route]</p>
<p>next.span_type: Render.getServerSideProps.</p>
<p>This span represents the execution of getServerSideProps for a specific route.
Attributes:</p>
<p>next.span_name
next.span_type
next.route</p>
<p>getStaticProps [next.route]</p>
<p>next.span_type: Render.getStaticProps.</p>
<p>This span represents the execution of getStaticProps for a specific route.
Attributes:</p>
<p>next.span_name
next.span_type
next.route</p>
<p>render route (pages) [next.route]</p>
<p>next.span_type: Render.renderDocument.</p>
<p>This span represents the process of rendering the document for a specific route.
Attributes:</p>
<p>next.span_name
next.span_type
next.route</p>
<p>generateMetadata [next.page]</p>
<p>next.span_type: ResolveMetadata.generateMetadata.</p>
<p>This span represents the process of generating metadata for a specific page (a single route can have multiple of these spans).
Attributes:</p>
<p>next.span_name
next.span_type
next.page</p>
<p>resolve page components</p>
<p>next.span_type: NextNodeServer.findPageComponents.</p>
<p>This span represents the process of resolving page components for a specific page.
Attributes:</p>
<p>next.span_name
next.span_type
next.route</p>
<p>resolve segment modules</p>
<p>next.span_type: NextNodeServer.getLayoutOrPageModule.</p>
<p>This span represents loading of code modules for a layout or a page.
Attributes:</p>
<p>next.span_name
next.span_type
next.segment</p>
<p>start response</p>
<p>next.span_type: NextNodeServer.startResponse.</p>
<p>This zero-length span represents the time when the first byte has been sent in the response.Was this helpful?</p>
<p>supported.Send</p>
