# Routing: Route Handlers | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRoutingRoute HandlersRoute HandlersRoute Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.</p>
<p>Good to know: Route Handlers are only available inside the app directory. They are the equivalent of API Routes inside the pages directory meaning you do not need to use API Routes and Route Handlers together.</p>
<p>Convention</p>
<p>Route Handlers are defined in a route.js|ts file inside the app directory:
app/api/route.tsTypeScriptJavaScriptTypeScriptexport async function GET(request: Request) {}</p>
<p>Route Handlers can be nested anywhere inside the app directory, similar to page.js and layout.js. But there cannot be a route.js file at the same route segment level as page.js.
Supported HTTP Methods</p>
<p>The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. If an unsupported method is called, Next.js will return a 405 Method Not Allowed response.
Extended NextRequest and NextResponse APIs</p>
<p>In addition to supporting the native Request and Response APIs, Next.js extends them with NextRequest and NextResponse to provide convenient helpers for advanced use cases.
Behavior</p>
<p>Caching</p>
<p>Route Handlers are not cached by default. You can, however, opt into caching for GET methods. Other supported HTTP methods are not cached. To cache a GET method, use a route config option such as export const dynamic = 'force-static' in your Route Handler file.
app/items/route.tsTypeScriptJavaScriptTypeScriptexport const dynamic = 'force-static'</p>
<p>export async function GET() {
const res = await fetch('https://data.mongodb-api.com/...', {
headers: {
'Content-Type': 'application/json',
'API-Key': process.env.DATA_API_KEY,
},
})
const data = await res.json()</p>
<p>return Response.json({ data })
}</p>
<p>Good to know: Other supported HTTP methods are not cached, even if they are placed alongside a GET method that is cached, in the same file.</p>
<p>Special Route Handlers</p>
<p>Special Route Handlers like sitemap.ts, opengraph-image.tsx, and icon.tsx, and other metadata files remain static by default unless they use Dynamic APIs or dynamic config options.
Route Resolution</p>
<p>You can consider a route the lowest level routing primitive.</p>
<p>They do not participate in layouts or client-side navigations like page.
There cannot be a route.js file at the same route as page.js.</p>
<p>PageRouteResultapp/page.jsapp/route.js Conflictapp/page.jsapp/api/route.js Validapp/[user]/page.jsapp/api/route.js Valid
Each route.js or page.js file takes over all HTTP verbs for that route.
app/page.tsTypeScriptJavaScriptTypeScriptexport default function Page() {
return &lt;h1&gt;Hello, Next.js!&lt;/h1&gt;
}</p>
<p>// ❌ Conflict
// <code>app/route.ts</code>
export async function POST(request: Request) {}</p>
<p>Examples</p>
<p>The following examples show how to combine Route Handlers with other Next.js APIs and features.
Revalidating Cached Data</p>
<p>You can revalidate cached data using Incremental Static Regeneration (ISR):
app/posts/route.tsTypeScriptJavaScriptTypeScriptexport const revalidate = 60</p>
<p>export async function GET() {
const data = await fetch('https://api.vercel.app/blog')
const posts = await data.json()</p>
<p>return Response.json(posts)
}</p>
<p>Cookies</p>
<p>You can read or set cookies with cookies from next/headers. This server function can be called directly in a Route Handler, or nested inside of another function.
Alternatively, you can return a new Response using the Set-Cookie header.
app/api/route.tsTypeScriptJavaScriptTypeScriptimport { cookies } from 'next/headers'</p>
<p>export async function GET(request: Request) {
const cookieStore = await cookies()
const token = cookieStore.get('token')</p>
<p>return new Response('Hello, Next.js!', {
status: 200,
headers: { 'Set-Cookie': <code>token=${token.value}</code> },
})
}</p>
<p>You can also use the underlying Web APIs to read cookies from the request (NextRequest):
app/api/route.tsTypeScriptJavaScriptTypeScriptimport { type NextRequest } from 'next/server'</p>
<p>export async function GET(request: NextRequest) {
const token = request.cookies.get('token')
}</p>
<p>Headers</p>
<p>You can read headers with headers from next/headers. This server function can be called directly in a Route Handler, or nested inside of another function.
This headers instance is read-only. To set headers, you need to return a new Response with new headers.
app/api/route.tsTypeScriptJavaScriptTypeScriptimport { headers } from 'next/headers'</p>
<p>export async function GET(request: Request) {
const headersList = await headers()
const referer = headersList.get('referer')</p>
<p>return new Response('Hello, Next.js!', {
status: 200,
headers: { referer: referer },
})
}</p>
<p>You can also use the underlying Web APIs to read headers from the request (NextRequest):
app/api/route.tsTypeScriptJavaScriptTypeScriptimport { type NextRequest } from 'next/server'</p>
<p>export async function GET(request: NextRequest) {
const requestHeaders = new Headers(request.headers)
}</p>
<p>Redirects</p>
<p>app/api/route.tsTypeScriptJavaScriptTypeScriptimport { redirect } from 'next/navigation'</p>
<p>export async function GET(request: Request) {
redirect('https://nextjs.org/')
}</p>
<p>Dynamic Route Segments</p>
<p>Route Handlers can use Dynamic Segments to create request handlers from dynamic data.
app/items/[slug]/route.tsTypeScriptJavaScriptTypeScriptexport async function GET(
request: Request,
{ params }: { params: Promise&lt;{ slug: string }&gt; }
) {
const slug = (await params).slug // 'a', 'b', or 'c'
}</p>
<p>RouteExample URLparamsapp/items/[slug]/route.js/items/aPromise&lt;{ slug: 'a' }&gt;app/items/[slug]/route.js/items/bPromise&lt;{ slug: 'b' }&gt;app/items/[slug]/route.js/items/cPromise&lt;{ slug: 'c' }&gt;
URL Query Parameters</p>
<p>The request object passed to the Route Handler is a NextRequest instance, which has some additional convenience methods, including for more easily handling query parameters.
app/api/search/route.tsTypeScriptJavaScriptTypeScriptimport { type NextRequest } from 'next/server'</p>
<p>export function GET(request: NextRequest) {
const searchParams = request.nextUrl.searchParams
const query = searchParams.get('query')
// query is &quot;hello&quot; for /api/search?query=hello
}</p>
<p>Streaming</p>
<p>Streaming is commonly used in combination with Large Language Models (LLMs), such as OpenAI, for AI-generated content. Learn more about the AI SDK.
app/api/chat/route.tsTypeScriptJavaScriptTypeScriptimport { openai } from '@ai-sdk/openai'
import { StreamingTextResponse, streamText } from 'ai'</p>
<p>export async function POST(req: Request) {
const { messages } = await req.json()
const result = await streamText({
model: openai('gpt-4-turbo'),
messages,
})</p>
<p>return new StreamingTextResponse(result.toAIStream())
}</p>
<p>These abstractions use the Web APIs to create a stream. You can also use the underlying Web APIs directly.
app/api/route.tsTypeScriptJavaScriptTypeScript// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: any) {
return new ReadableStream({
async pull(controller) {
const { value, done } = await iterator.next()</p>
<pre><code>  if (done) {
    controller.close()
  } else {
    controller.enqueue(value)
  }
},
</code></pre>
<p>})
}</p>
<p>function sleep(time: number) {
return new Promise((resolve) =&gt; {
setTimeout(resolve, time)
})
}</p>
<p>const encoder = new TextEncoder()</p>
<p>async function* makeIterator() {
yield encoder.encode('&lt;p&gt;One&lt;/p&gt;')
await sleep(200)
yield encoder.encode('&lt;p&gt;Two&lt;/p&gt;')
await sleep(200)
yield encoder.encode('&lt;p&gt;Three&lt;/p&gt;')
}</p>
<p>export async function GET() {
const iterator = makeIterator()
const stream = iteratorToStream(iterator)</p>
<p>return new Response(stream)
}</p>
<p>Request Body</p>
<p>You can read the Request body using the standard Web API methods:
app/items/route.tsTypeScriptJavaScriptTypeScriptexport async function POST(request: Request) {
const res = await request.json()
return Response.json({ res })
}</p>
<p>Request Body FormData</p>
<p>You can read the FormData using the request.formData() function:
app/items/route.tsTypeScriptJavaScriptTypeScriptexport async function POST(request: Request) {
const formData = await request.formData()
const name = formData.get('name')
const email = formData.get('email')
return Response.json({ name, email })
}</p>
<p>Since formData data are all strings, you may want to use zod-form-data to validate the request and retrieve data in the format you prefer (e.g. number).
CORS</p>
<p>You can set CORS headers for a specific Route Handler using the standard Web API methods:
app/api/route.tsTypeScriptJavaScriptTypeScriptexport async function GET(request: Request) {
return new Response('Hello, Next.js!', {
status: 200,
headers: {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
'Access-Control-Allow-Headers': 'Content-Type, Authorization',
},
})
}</p>
<p>Good to know:</p>
<p>To add CORS headers to multiple Route Handlers, you can use Middleware or the next.config.js file.
Alternatively, see our CORS example package.</p>
<p>Webhooks</p>
<p>You can use a Route Handler to receive webhooks from third-party services:
app/api/route.tsTypeScriptJavaScriptTypeScriptexport async function POST(request: Request) {
try {
const text = await request.text()
// Process the webhook payload
} catch (error) {
return new Response(<code>Webhook error: ${error.message}</code>, {
status: 400,
})
}</p>
<p>return new Response('Success!', {
status: 200,
})
}</p>
<p>Notably, unlike API Routes with the Pages Router, you do not need to use bodyParser to use any additional configuration.
Non-UI Responses</p>
<p>You can use Route Handlers to return non-UI content. Note that sitemap.xml, robots.txt, app icons, and open graph images all have built-in support.
app/rss.xml/route.tsTypeScriptJavaScriptTypeScriptexport async function GET() {
return new Response(
`&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;
&lt;rss version=&quot;2.0&quot;&gt;</p>
<p>&lt;channel&gt;
&lt;title&gt;Next.js Documentation&lt;/title&gt;
&lt;link&gt;https://nextjs.org/docs&lt;/link&gt;
&lt;description&gt;The React Framework for the Web&lt;/description&gt;
&lt;/channel&gt;</p>
<p>&lt;/rss&gt;`,
{
headers: {
'Content-Type': 'text/xml',
},
}
)
}</p>
<p>Segment Config Options</p>
<p>Route Handlers use the same route segment configuration as pages and layouts.
app/items/route.tsTypeScriptJavaScriptTypeScriptexport const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'</p>
<p>See the API reference for more details.API ReferenceLearn more about the route.js file.route.jsAPI reference for the route.js special file.Was this helpful?</p>
<p>supported.Send</p>
