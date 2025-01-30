# File Conventions: middleware.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionsmiddleware.jsmiddleware.jsThe middleware.js|ts file is used to write Middleware and run code on the server before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.
Middleware executes before routes are rendered. It's particularly useful for implementing custom server-side logic like authentication, logging, or handling redirects.
Use the file middleware.ts (or .js) in the root of your project to define Middleware. For example, at the same level as app or pages, or inside src if applicable.
middleware.tsTypeScriptJavaScriptTypeScriptimport { NextResponse, NextRequest } from 'next/server'</p>
<p>// This function can be marked <code>async</code> if using <code>await</code> inside
export function middleware(request: NextRequest) {
return NextResponse.redirect(new URL('/home', request.url))
}</p>
<p>export const config = {
matcher: '/about/:path*',
}</p>
<p>Exports</p>
<p>Middleware function</p>
<p>The file must export a single function, either as a default export or named middleware. Note that multiple middleware from the same file are not supported.
middleware.js// Example of default export
export default function middleware(request) {
// Middleware logic
}
Config object (optional)</p>
<p>Optionally, a config object can be exported alongside the Middleware function. This object includes the matcher to specify paths where the Middleware applies.
Matcher</p>
<p>The matcher option allows you to target specific paths for the Middleware to run on. You can specify these paths in several ways:</p>
<p>For a single path: Directly use a string to define the path, like '/about'.
For multiple paths: Use an array to list multiple paths, such as matcher: ['/about', '/contact'], which applies the Middleware to both /about and /contact.</p>
<p>Additionally, matcher supports complex path specifications through regular expressions, such as matcher: ['/((?!api|_next/static|_next/image|.<em>\.png$).</em>)'], enabling precise control over which paths to include or exclude.
The matcher option also accepts an array of objects with the following keys:</p>
<p>source: The path or pattern used to match the request paths. It can be a string for direct path matching or a pattern for more complex matching.
regexp (optional): A regular expression string that fine-tunes the matching based on the source. It provides additional control over which paths are included or excluded.
locale (optional): A boolean that, when set to false, ignores locale-based routing in path matching.
has (optional): Specifies conditions based on the presence of specific request elements such as headers, query parameters, or cookies.
missing (optional): Focuses on conditions where certain request elements are absent, like missing headers or cookies.</p>
<p>middleware.jsexport const config = {
matcher: [
{
source: '/api/<em>',
regexp: '^/api/(.</em>)',
locale: false,
has: [
{ type: 'header', key: 'Authorization', value: 'Bearer Token' },
{ type: 'query', key: 'userId', value: '123' },
],
missing: [{ type: 'cookie', key: 'session', value: 'active' }],
},
],
}
Params</p>
<p>request</p>
<p>When defining Middleware, the default export function accepts a single parameter, request. This parameter is an instance of NextRequest, which represents the incoming HTTP request.
middleware.tsTypeScriptJavaScriptTypeScriptimport type { NextRequest } from 'next/server'</p>
<p>export function middleware(request: NextRequest) {
// Middleware logic goes here
}</p>
<p>Good to know:</p>
<p>NextRequest is a type that represents incoming HTTP requests in Next.js Middleware, whereas NextResponse is a class used to manipulate and send back HTTP responses.</p>
<p>NextResponse</p>
<p>Middleware can use the NextResponse object which extends the Web Response API. By returning a NextResponse object, you can directly manipulate cookies, set headers, implement redirects, and rewrite paths.</p>
<p>Good to know: For redirects, you can also use Response.redirect instead of NextResponse.redirect.</p>
<p>Runtime</p>
<p>Middleware only supports the Edge runtime. The Node.js runtime cannot be used.
Version History</p>
<p>VersionChangesv13.1.0Advanced Middleware flags addedv13.0.0Middleware can modify request headers, response headers, and send responsesv12.2.0Middleware is stable, please see the upgrade guidev12.0.9Enforce absolute URLs in Edge Runtime (PR)v12.0.0Middleware (Beta) addedLearn more about MiddlewareMiddlewareLearn how to use Middleware to run code before a request is completed.Was this helpful?</p>
<p>supported.Send</p>
