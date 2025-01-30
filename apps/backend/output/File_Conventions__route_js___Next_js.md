# File Conventions: route.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionsroute.jsroute.jsRoute Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.
route.tsTypeScriptJavaScriptTypeScriptexport async function GET() {
return Response.json({ message: 'Hello World' })
}</p>
<p>Reference</p>
<p>HTTP Methods</p>
<p>A route file allows you to create custom request handlers for a given route. The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.
route.tsTypeScriptJavaScriptTypeScriptexport async function GET(request: Request) {}</p>
<p>export async function HEAD(request: Request) {}</p>
<p>export async function POST(request: Request) {}</p>
<p>export async function PUT(request: Request) {}</p>
<p>export async function DELETE(request: Request) {}</p>
<p>export async function PATCH(request: Request) {}</p>
<p>// If <code>OPTIONS</code> is not defined, Next.js will automatically implement <code>OPTIONS</code> and set the appropriate Response <code>Allow</code> header depending on the other methods defined in the Route Handler.
export async function OPTIONS(request: Request) {}</p>
<p>Parameters</p>
<p>request (optional)</p>
<p>The request object is a NextRequest object, which is an extension of the Web Request API. NextRequest gives you further control over the incoming request, including easily accessing cookies and an extended, parsed, URL object nextUrl.
route.tsTypeScriptJavaScriptTypeScriptimport type { NextRequest } from 'next/server'</p>
<p>export async function GET(request: NextRequest) {
const url = request.nextUrl
}</p>
<p>context (optional)</p>
<p>params: a promise that resolves to an object containing the dynamic route parameters for the current route.</p>
<p>app/dashboard/[team]/route.tsTypeScriptJavaScriptTypeScriptexport async function GET(
request: Request,
{ params }: { params: Promise&lt;{ team: string }&gt; }
) {
const team = (await params).team
}</p>
<p>ExampleURLparamsapp/dashboard/[team]/route.js/dashboard/1Promise&lt;{ team: '1' }&gt;app/shop/[tag]/[item]/route.js/shop/1/2Promise&lt;{ tag: '1', item: '2' }&gt;app/blog/[...slug]/route.js/blog/1/2Promise&lt;{ slug: ['1', '2'] }&gt;
Examples</p>
<p>Handling cookies</p>
<p>route.tsTypeScriptJavaScriptTypeScriptimport { cookies } from 'next/headers'</p>
<p>export async function GET(request: NextRequest) {
const cookieStore = await cookies()</p>
<p>const a = cookieStore.get('a')
const b = cookieStore.set('b', '1')
const c = cookieStore.delete('c')
}</p>
<p>Version History</p>
<p>VersionChangesv15.0.0-RCcontext.params is now a promise. A codemod is availablev15.0.0-RCThe default caching for GET handlers was changed from static to dynamicv13.2.0Route Handlers are introduced.Was this helpful?</p>
<p>supported.Send</p>
