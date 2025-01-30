# Routing: Redirecting | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRoutingRedirectingRedirectingThere are a few ways you can handle redirects in Next.js. This page will go through each available option, use cases, and how to manage large numbers of redirects.
APIPurposeWhereStatus CoderedirectRedirect user after a mutation or eventServer Components, Server Actions, Route Handlers307 (Temporary) or 303 (Server Action)permanentRedirectRedirect user after a mutation or eventServer Components, Server Actions, Route Handlers308 (Permanent)useRouterPerform a client-side navigationEvent Handlers in Client ComponentsN/Aredirects in next.config.jsRedirect an incoming request based on a pathnext.config.js file307 (Temporary) or 308 (Permanent)NextResponse.redirectRedirect an incoming request based on a conditionMiddlewareAny</p>
<p>redirect function</p>
<p>The redirect function allows you to redirect the user to another URL. You can call redirect in Server Components, Route Handlers, and Server Actions.redirect is often used after a mutation or event. For example, creating a post:app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'</p>
<p>export async function createPost(id: string) {
try {
// Call database
} catch (error) {
// Handle errors
}</p>
<p>revalidatePath('/posts') // Update cached posts
redirect(<code>/post/${id}</code>) // Navigate to the new post page
}
Good to know:</p>
<p>redirect returns a 307 (Temporary Redirect) status code by default. When used in a Server Action, it returns a 303 (See Other), which is commonly used for redirecting to a success page as a result of a POST request.
redirect internally throws an error so it should be called outside of try/catch blocks.
redirect can be called in Client Components during the rendering process but not in event handlers. You can use the useRouter hook instead.
redirect also accepts absolute URLs and can be used to redirect to external links.
If you'd like to redirect before the render process, use next.config.js or Middleware.</p>
<p>See the redirect API reference for more information.permanentRedirect function</p>
<p>The permanentRedirect function allows you to permanently redirect the user to another URL. You can call permanentRedirect in Server Components, Route Handlers, and Server Actions.permanentRedirect is often used after a mutation or event that changes an entity's canonical URL, such as updating a user's profile URL after they change their username:app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { permanentRedirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'</p>
<p>export async function updateUsername(username: string, formData: FormData) {
try {
// Call database
} catch (error) {
// Handle errors
}</p>
<p>revalidateTag('username') // Update all references to the username
permanentRedirect(<code>/profile/${username}</code>) // Navigate to the new user profile
}
Good to know:</p>
<p>permanentRedirect returns a 308 (permanent redirect) status code by default.
permanentRedirect also accepts absolute URLs and can be used to redirect to external links.
If you'd like to redirect before the render process, use next.config.js or Middleware.</p>
<p>See the permanentRedirect API reference for more information.
useRouter() hook</p>
<p>If you need to redirect inside an event handler in a Client Component, you can use the push method from the useRouter hook. For example:app/page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useRouter } from 'next/navigation'</p>
<p>export default function Page() {
const router = useRouter()</p>
<p>return (
&lt;button type=&quot;button&quot; onClick={() =&gt; router.push('/dashboard')}&gt;
Dashboard
&lt;/button&gt;
)
}</p>
<p>Good to know:</p>
<p>If you don't need to programmatically navigate a user, you should use a &lt;Link&gt; component.</p>
<p>See the useRouter API reference for more information.</p>
<p>redirects in next.config.js</p>
<p>The redirects option in the next.config.js file allows you to redirect an incoming request path to a different destination path. This is useful when you change the URL structure of pages or have a list of redirects that are known ahead of time.
redirects supports path, header, cookie, and query matching, giving you the flexibility to redirect users based on an incoming request.
To use redirects, add the option to your next.config.js file:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
async redirects() {
return [
// Basic redirect
{
source: '/about',
destination: '/',
permanent: true,
},
// Wildcard path matching
{
source: '/blog/:slug',
destination: '/news/:slug',
permanent: true,
},
]
},
}</p>
<p>export default nextConfig</p>
<p>See the redirects API reference for more information.</p>
<p>Good to know:</p>
<p>redirects can return a 307 (Temporary Redirect) or 308 (Permanent Redirect) status code with the permanent option.
redirects may have a limit on platforms. For example, on Vercel, there's a limit of 1,024 redirects. To manage a large number of redirects (1000+), consider creating a custom solution using Middleware. See managing redirects at scale for more.
redirects runs before Middleware.</p>
<p>NextResponse.redirect in Middleware</p>
<p>Middleware allows you to run code before a request is completed. Then, based on the incoming request, redirect to a different URL using NextResponse.redirect. This is useful if you want to redirect users based on a condition (e.g. authentication, session management, etc) or have a large number of redirects.
For example, to redirect the user to a /login page if they are not authenticated:
middleware.tsTypeScriptJavaScriptTypeScriptimport { NextResponse, NextRequest } from 'next/server'
import { authenticate } from 'auth-provider'</p>
<p>export function middleware(request: NextRequest) {
const isAuthenticated = authenticate(request)</p>
<p>// If the user is authenticated, continue as normal
if (isAuthenticated) {
return NextResponse.next()
}</p>
<p>// Redirect to login page if not authenticated
return NextResponse.redirect(new URL('/login', request.url))
}</p>
<p>export const config = {
matcher: '/dashboard/:path*',
}</p>
<p>Good to know:</p>
<p>Middleware runs after redirects in next.config.js and before rendering.</p>
<p>See the Middleware documentation for more information.
Managing redirects at scale (advanced)</p>
<p>To manage a large number of redirects (1000+), you may consider creating a custom solution using Middleware. This allows you to handle redirects programmatically without having to redeploy your application.
To do this, you'll need to consider:</p>
<p>Creating and storing a redirect map.
Optimizing data lookup performance.</p>
<p>Next.js Example: See our Middleware with Bloom filter example for an implementation of the recommendations below.</p>
<ol>
<li>Creating and storing a redirect map</li>
</ol>
<p>A redirect map is a list of redirects that you can store in a database (usually a key-value store) or JSON file.
Consider the following data structure:
{
&quot;/old&quot;: {
&quot;destination&quot;: &quot;/new&quot;,
&quot;permanent&quot;: true
},
&quot;/blog/post-old&quot;: {
&quot;destination&quot;: &quot;/blog/post-new&quot;,
&quot;permanent&quot;: true
}
}
In Middleware, you can read from a database such as Vercel's Edge Config or Redis, and redirect the user based on the incoming request:
middleware.tsTypeScriptJavaScriptTypeScriptimport { NextResponse, NextRequest } from 'next/server'
import { get } from '@vercel/edge-config'</p>
<p>type RedirectEntry = {
destination: string
permanent: boolean
}</p>
<p>export async function middleware(request: NextRequest) {
const pathname = request.nextUrl.pathname
const redirectData = await get(pathname)</p>
<p>if (redirectData &amp;&amp; typeof redirectData === 'string') {
const redirectEntry: RedirectEntry = JSON.parse(redirectData)
const statusCode = redirectEntry.permanent ? 308 : 307
return NextResponse.redirect(redirectEntry.destination, statusCode)
}</p>
<p>// No redirect found, continue without redirecting
return NextResponse.next()
}</p>
<ol start="2">
<li>Optimizing data lookup performance</li>
</ol>
<p>Reading a large dataset for every incoming request can be slow and expensive. There are two ways you can optimize data lookup performance:</p>
<p>Use a database that is optimized for fast reads, such as Vercel Edge Config or Redis.
Use a data lookup strategy such as a Bloom filter to efficiently check if a redirect exists before reading the larger redirects file or database.</p>
<p>Considering the previous example, you can import a generated bloom filter file into Middleware, then, check if the incoming request pathname exists in the bloom filter.
If it does, forward the request to a Route Handler  which will check the actual file and redirect the user to the appropriate URL. This avoids importing a large redirects file into Middleware, which can slow down every incoming request.
middleware.tsTypeScriptJavaScriptTypeScriptimport { NextResponse, NextRequest } from 'next/server'
import { ScalableBloomFilter } from 'bloom-filters'
import GeneratedBloomFilter from './redirects/bloom-filter.json'</p>
<p>type RedirectEntry = {
destination: string
permanent: boolean
}</p>
<p>// Initialize bloom filter from a generated JSON file
const bloomFilter = ScalableBloomFilter.fromJSON(GeneratedBloomFilter as any)</p>
<p>export async function middleware(request: NextRequest) {
// Get the path for the incoming request
const pathname = request.nextUrl.pathname</p>
<p>// Check if the path is in the bloom filter
if (bloomFilter.has(pathname)) {
// Forward the pathname to the Route Handler
const api = new URL(
<code>/api/redirects?pathname=${encodeURIComponent(request.nextUrl.pathname)}</code>,
request.nextUrl.origin
)</p>
<pre><code>try {
  // Fetch redirect data from the Route Handler
  const redirectData = await fetch(api)

  if (redirectData.ok) {
    const redirectEntry: RedirectEntry | undefined =
      await redirectData.json()

    if (redirectEntry) {
      // Determine the status code
      const statusCode = redirectEntry.permanent ? 308 : 307

      // Redirect to the destination
      return NextResponse.redirect(redirectEntry.destination, statusCode)
    }
  }
} catch (error) {
  console.error(error)
}
</code></pre>
<p>}</p>
<p>// No redirect found, continue the request without redirecting
return NextResponse.next()
}</p>
<p>Then, in the Route Handler:app/api/redirects/route.tsTypeScriptJavaScriptTypeScriptimport { NextRequest, NextResponse } from 'next/server'
import redirects from '@/app/redirects/redirects.json'</p>
<p>type RedirectEntry = {
destination: string
permanent: boolean
}</p>
<p>export function GET(request: NextRequest) {
const pathname = request.nextUrl.searchParams.get('pathname')
if (!pathname) {
return new Response('Bad Request', { status: 400 })
}</p>
<p>// Get the redirect entry from the redirects.json file
const redirect = (redirects as Record&lt;string, RedirectEntry&gt;)[pathname]</p>
<p>// Account for bloom filter false positives
if (!redirect) {
return new Response('No redirect', { status: 400 })
}</p>
<p>// Return the redirect entry
return NextResponse.json(redirect)
}</p>
<p>Good to know:</p>
<p>To generate a bloom filter, you can use a library like bloom-filters.
You should validate requests made to your Route Handler to prevent malicious requests.</p>
<p>Next StepsredirectAPI Reference for the redirect function.permanentRedirectAPI Reference for the permanentRedirect function.MiddlewareLearn how to use Middleware to run code before a request is completed.redirectsAdd redirects to your Next.js app.Was this helpful?</p>
<p>supported.Send</p>
