# Routing: Middleware | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRoutingMiddlewareMiddleware
Middleware allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.
Middleware runs before cached content and routes are matched. See Matching Paths for more details.
Use Cases</p>
<p>Integrating Middleware into your application can lead to significant improvements in performance, security, and user experience. Some common scenarios where Middleware is particularly effective include:</p>
<p>Authentication and Authorization: Ensure user identity and check session cookies before granting access to specific pages or API routes.
Server-Side Redirects: Redirect users at the server level based on certain conditions (e.g., locale, user role).
Path Rewriting: Support A/B testing, feature rollouts, or legacy paths by dynamically rewriting paths to API routes or pages based on request properties.
Bot Detection: Protect your resources by detecting and blocking bot traffic.
Logging and Analytics: Capture and analyze request data for insights before processing by the page or API.
Feature Flagging: Enable or disable features dynamically for seamless feature rollouts or testing.</p>
<p>Recognizing situations where middleware may not be the optimal approach is just as crucial. Here are some scenarios to be mindful of:</p>
<p>Complex Data Fetching and Manipulation: Middleware is not designed for direct data fetching or manipulation, this should be done within Route Handlers or server-side utilities instead.
Heavy Computational Tasks: Middleware should be lightweight and respond quickly or it can cause delays in page load. Heavy computational tasks or long-running processes should be done within dedicated Route Handlers.
Extensive Session Management: While Middleware can manage basic session tasks, extensive session management should be managed by dedicated authentication services or within Route Handlers.
Direct Database Operations: Performing direct database operations within Middleware is not recommended. Database interactions should be done within Route Handlers or server-side utilities.</p>
<p>Convention</p>
<p>Use the file middleware.ts (or .js) in the root of your project to define Middleware. For example, at the same level as pages or app, or inside src if applicable.</p>
<p>Note: While only one middleware.ts file is supported per project, you can still organize your middleware logic modularly. Break out middleware functionalities into separate .ts or .js files and import them into your main middleware.ts file. This allows for cleaner management of route-specific middleware, aggregated in the middleware.ts for centralized control. By enforcing a single middleware file, it simplifies configuration, prevents potential conflicts, and optimizes performance by avoiding multiple middleware layers.</p>
<p>Example</p>
<p>middleware.tsTypeScriptJavaScriptTypeScriptimport { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'</p>
<p>// This function can be marked <code>async</code> if using <code>await</code> inside
export function middleware(request: NextRequest) {
return NextResponse.redirect(new URL('/home', request.url))
}</p>
<p>// See &quot;Matching Paths&quot; below to learn more
export const config = {
matcher: '/about/:path*',
}</p>
<p>Matching Paths</p>
<p>Middleware will be invoked for every route in your project. Given this, it's crucial to use matchers to precisely target or exclude specific routes. The following is the execution order:</p>
<p>headers from next.config.js
redirects from next.config.js
Middleware (rewrites, redirects, etc.)
beforeFiles (rewrites) from next.config.js
Filesystem routes (public/, _next/static/, pages/, app/, etc.)
afterFiles (rewrites) from next.config.js
Dynamic Routes (/blog/[slug])
fallback (rewrites) from next.config.js</p>
<p>There are two ways to define which paths Middleware will run on:</p>
<p>Custom matcher config
Conditional statements</p>
<p>Matcher</p>
<p>matcher allows you to filter Middleware to run on specific paths.
middleware.jsexport const config = {
matcher: '/about/:path*',
}
You can match a single path or multiple paths with an array syntax:
middleware.jsexport const config = {
matcher: ['/about/:path*', '/dashboard/:path*'],
}
The matcher config allows full regex so matching like negative lookaheads or character matching is supported. An example of a negative lookahead to match all except specific paths can be seen here:
middleware.jsexport const config = {
matcher: [
/*
* Match all request paths except for the ones starting with:
* - api (API routes)
* - _next/static (static files)
* - _next/image (image optimization files)
* - favicon.ico, sitemap.xml, robots.txt (metadata files)
<em>/
'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).</em>)',
],
}
You can also bypass Middleware for certain requests by using the missing or has arrays, or a combination of both:
middleware.jsexport const config = {
matcher: [
/*
* Match all request paths except for the ones starting with:
* - api (API routes)
* - _next/static (static files)
* - _next/image (image optimization files)
* - favicon.ico, sitemap.xml, robots.txt (metadata files)
<em>/
{
source:
'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).</em>)',
missing: [
{ type: 'header', key: 'next-router-prefetch' },
{ type: 'header', key: 'purpose', value: 'prefetch' },
],
},</p>
<pre><code>{
  source:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  has: [
    { type: 'header', key: 'next-router-prefetch' },
    { type: 'header', key: 'purpose', value: 'prefetch' },
  ],
},

{
  source:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  has: [{ type: 'header', key: 'x-present' }],
  missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
},
</code></pre>
<p>],
}</p>
<p>Good to know: The matcher values need to be constants so they can be statically analyzed at build-time. Dynamic values such as variables will be ignored.</p>
<p>Configured matchers:</p>
<p>MUST start with /
Can include named parameters: /about/:path matches /about/a and /about/b but not /about/a/c
Can have modifiers on named parameters (starting with :): /about/:path* matches /about/a/b/c because * is zero or more. ? is zero or one and + one or more
Can use regular expression enclosed in parenthesis: /about/(.<em>) is the same as /about/:path</em></p>
<p>Read more details on path-to-regexp documentation.</p>
<p>Good to know: For backward compatibility, Next.js always considers /public as /public/index. Therefore, a matcher of /public/:path will match.</p>
<p>Conditional Statements</p>
<p>middleware.tsTypeScriptJavaScriptTypeScriptimport { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'</p>
<p>export function middleware(request: NextRequest) {
if (request.nextUrl.pathname.startsWith('/about')) {
return NextResponse.rewrite(new URL('/about-2', request.url))
}</p>
<p>if (request.nextUrl.pathname.startsWith('/dashboard')) {
return NextResponse.rewrite(new URL('/dashboard/user', request.url))
}
}</p>
<p>NextResponse</p>
<p>The NextResponse API allows you to:</p>
<p>redirect the incoming request to a different URL
rewrite the response by displaying a given URL
Set request headers for API Routes, getServerSideProps, and rewrite destinations
Set response cookies
Set response headers</p>
<p>To produce a response from Middleware, you can:
rewrite to a route (Page or Route Handler) that produces a response
return a NextResponse directly. See Producing a Response</p>
<p>Using Cookies</p>
<p>Cookies are regular headers. On a Request, they are stored in the Cookie header. On a Response they are in the Set-Cookie header. Next.js provides a convenient way to access and manipulate these cookies through the cookies extension on NextRequest and NextResponse.</p>
<p>For incoming requests, cookies comes with the following methods: get, getAll, set, and delete cookies. You can check for the existence of a cookie with has or remove all cookies with clear.
For outgoing responses, cookies have the following methods get, getAll, set, and delete.</p>
<p>middleware.tsTypeScriptJavaScriptTypeScriptimport { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'</p>
<p>export function middleware(request: NextRequest) {
// Assume a &quot;Cookie:nextjs=fast&quot; header to be present on the incoming request
// Getting cookies from the request using the <code>RequestCookies</code> API
let cookie = request.cookies.get('nextjs')
console.log(cookie) // =&gt; { name: 'nextjs', value: 'fast', Path: '/' }
const allCookies = request.cookies.getAll()
console.log(allCookies) // =&gt; [{ name: 'nextjs', value: 'fast' }]</p>
<p>request.cookies.has('nextjs') // =&gt; true
request.cookies.delete('nextjs')
request.cookies.has('nextjs') // =&gt; false</p>
<p>// Setting cookies on the response using the <code>ResponseCookies</code> API
const response = NextResponse.next()
response.cookies.set('vercel', 'fast')
response.cookies.set({
name: 'vercel',
value: 'fast',
path: '/',
})
cookie = response.cookies.get('vercel')
console.log(cookie) // =&gt; { name: 'vercel', value: 'fast', Path: '/' }
// The outgoing response will have a <code>Set-Cookie:vercel=fast;path=/</code> header.</p>
<p>return response
}</p>
<p>Setting Headers</p>
<p>You can set request and response headers using the NextResponse API (setting request headers is available since Next.js v13.0.0).
middleware.tsTypeScriptJavaScriptTypeScriptimport { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'</p>
<p>export function middleware(request: NextRequest) {
// Clone the request headers and set a new header <code>x-hello-from-middleware1</code>
const requestHeaders = new Headers(request.headers)
requestHeaders.set('x-hello-from-middleware1', 'hello')</p>
<p>// You can also set request headers in NextResponse.next
const response = NextResponse.next({
request: {
// New request headers
headers: requestHeaders,
},
})</p>
<p>// Set a new response header <code>x-hello-from-middleware2</code>
response.headers.set('x-hello-from-middleware2', 'hello')
return response
}</p>
<p>Good to know: Avoid setting large headers as it might cause 431 Request Header Fields Too Large error depending on your backend web server configuration.</p>
<p>CORS</p>
<p>You can set CORS headers in Middleware to allow cross-origin requests, including simple and preflighted requests.
middleware.tsTypeScriptJavaScriptTypeScriptimport { NextRequest, NextResponse } from 'next/server'</p>
<p>const allowedOrigins = ['https://acme.com', 'https://my-app.org']</p>
<p>const corsOptions = {
'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}</p>
<p>export function middleware(request: NextRequest) {
// Check the origin from the request
const origin = request.headers.get('origin') ?? ''
const isAllowedOrigin = allowedOrigins.includes(origin)</p>
<p>// Handle preflighted requests
const isPreflight = request.method === 'OPTIONS'</p>
<p>if (isPreflight) {
const preflightHeaders = {
...(isAllowedOrigin &amp;&amp; { 'Access-Control-Allow-Origin': origin }),
...corsOptions,
}
return NextResponse.json({}, { headers: preflightHeaders })
}</p>
<p>// Handle simple requests
const response = NextResponse.next()</p>
<p>if (isAllowedOrigin) {
response.headers.set('Access-Control-Allow-Origin', origin)
}</p>
<p>Object.entries(corsOptions).forEach(([key, value]) =&gt; {
response.headers.set(key, value)
})</p>
<p>return response
}</p>
<p>export const config = {
matcher: '/api/:path*',
}</p>
<p>Good to know: You can configure CORS headers for individual routes in Route Handlers.</p>
<p>Producing a Response</p>
<p>You can respond from Middleware directly by returning a Response or NextResponse instance. (This is available since Next.js v13.1.0)
middleware.tsTypeScriptJavaScriptTypeScriptimport type { NextRequest } from 'next/server'
import { isAuthenticated } from '@lib/auth'</p>
<p>// Limit the middleware to paths starting with <code>/api/</code>
export const config = {
matcher: '/api/:function*',
}</p>
<p>export function middleware(request: NextRequest) {
// Call our authentication function to check the request
if (!isAuthenticated(request)) {
// Respond with JSON indicating an error message
return Response.json(
{ success: false, message: 'authentication failed' },
{ status: 401 }
)
}
}</p>
<p>waitUntil and NextFetchEvent</p>
<p>The NextFetchEvent object extends the native FetchEvent object, and includes the waitUntil() method.
The waitUntil() method takes a promise as an argument, and extends the lifetime of the Middleware until the promise settles. This is useful for performing work in the background.
middleware.tsimport { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'</p>
<p>export function middleware(req: NextRequest, event: NextFetchEvent) {
event.waitUntil(
fetch('https://my-analytics-platform.com', {
method: 'POST',
body: JSON.stringify({ pathname: req.nextUrl.pathname }),
})
)</p>
<p>return NextResponse.next()
}
Advanced Middleware Flags</p>
<p>In v13.1 of Next.js two additional flags were introduced for middleware, skipMiddlewareUrlNormalize and skipTrailingSlashRedirect to handle advanced use cases.
skipTrailingSlashRedirect disables Next.js redirects for adding or removing trailing slashes. This allows custom handling inside middleware to maintain the trailing slash for some paths but not others, which can make incremental migrations easier.
next.config.jsmodule.exports = {
skipTrailingSlashRedirect: true,
}
middleware.jsconst legacyPrefixes = ['/docs', '/blog']</p>
<p>export default async function middleware(req) {
const { pathname } = req.nextUrl</p>
<p>if (legacyPrefixes.some((prefix) =&gt; pathname.startsWith(prefix))) {
return NextResponse.next()
}</p>
<p>// apply trailing slash handling
if (
!pathname.endsWith('/') &amp;&amp;
!pathname.match(/((?!.well-known(?:/.<em>)?)(?:[^/]+/)</em>[^/]+.\w+)/)
) {
return NextResponse.redirect(
new URL(<code>${req.nextUrl.pathname}/</code>, req.nextUrl)
)
}
}
skipMiddlewareUrlNormalize allows for disabling the URL normalization in Next.js to make handling direct visits and client-transitions the same. In some advanced cases, this option provides full control by using the original URL.
next.config.jsmodule.exports = {
skipMiddlewareUrlNormalize: true,
}
middleware.jsexport default async function middleware(req) {
const { pathname } = req.nextUrl</p>
<p>// GET /_next/data/build-id/hello.json</p>
<p>console.log(pathname)
// with the flag this now /_next/data/build-id/hello.json
// without the flag this would be normalized to /hello
}
Unit Testing (experimental)</p>
<p>Starting in Next.js 15.1, the next/experimental/testing/server package contains utilities to help unit test middleware files. Unit testing middleware can help ensure that it's only run on desired paths and that custom routing logic works as intended before code reaches production.
The unstable_doesMiddlewareMatch function can be used to assert whether middleware will run for the provided URL, headers, and cookies.
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server'</p>
<p>expect(
unstable_doesMiddlewareMatch({
config,
nextConfig,
url: '/test',
})
).toEqual(false)
The entire middleware function can also be tested.
import { isRewrite, getRewrittenUrl } from 'next/experimental/testing/server'</p>
<p>const request = new NextRequest('https://nextjs.org/docs')
const response = await middleware(request)
expect(isRewrite(response)).toEqual(true)
expect(getRewrittenUrl(response)).toEqual('https://other-domain.com/docs')
// getRedirectUrl could also be used if the response were a redirect
Runtime</p>
<p>Middleware currently only supports APIs compatible with the Edge runtime. APIs exclusive to Node.js are unsupported.
Version History</p>
<p>VersionChangesv13.1.0Advanced Middleware flags addedv13.0.0Middleware can modify request headers, response headers, and send responsesv12.2.0Middleware is stable, please see the upgrade guidev12.0.9Enforce absolute URLs in Edge Runtime (PR)v12.0.0Middleware (Beta) addedWas this helpful?</p>
<p>supported.Send</p>
