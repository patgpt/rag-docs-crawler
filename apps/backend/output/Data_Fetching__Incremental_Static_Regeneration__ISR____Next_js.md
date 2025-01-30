# Data Fetching: Incremental Static Regeneration (ISR) | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationData FetchingIncremental Static Regeneration (ISR)Incremental Static Regeneration (ISR)Examples
Next.js Commerce
On-Demand ISR
Next.js Forms</p>
<p>Incremental Static Regeneration (ISR) enables you to:</p>
<p>Update static content without rebuilding the entire site
Reduce server load by serving prerendered, static pages for most requests
Ensure proper cache-control headers are automatically added to pages
Handle large amounts of content pages without long next build times</p>
<p>Here's a minimal example:
app/blog/[id]/page.tsxTypeScriptJavaScriptTypeScriptinterface Post {
id: string
title: string
content: string
}</p>
<p>// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60</p>
<p>// We'll prerender only the params from <code>generateStaticParams</code> at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths</p>
<p>export async function generateStaticParams() {
const posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) =&gt;
res.json()
)
return posts.map((post) =&gt; ({
id: String(post.id),
}))
}</p>
<p>export default async function Page({
params,
}: {
params: Promise&lt;{ id: string }&gt;
}) {
const id = (await params).id
const post: Post = await fetch(<code>https://api.vercel.app/blog/${id}</code>).then(
(res) =&gt; res.json()
)
return (
&lt;main&gt;
&lt;h1&gt;{post.title}&lt;/h1&gt;
&lt;p&gt;{post.content}&lt;/p&gt;
&lt;/main&gt;
)
}</p>
<p>Here's how this example works:</p>
<p>During next build, all known blog posts are generated (there are 25 in this example)
All requests made to these pages (e.g. /blog/1) are cached and instantaneous
After 60 seconds has passed, the next request will still show the cached (stale) page
The cache is invalidated and a new version of the page begins generating in the background
Once generated successfully, Next.js will display and cache the updated page
If /blog/26 is requested, Next.js will generate and cache this page on-demand</p>
<p>Reference</p>
<p>Route segment config</p>
<p>revalidate
dynamicParams
Functions</p>
<p>revalidatePath
revalidateTag</p>
<p>Examples</p>
<p>Time-based revalidation</p>
<p>This fetches and displays a list of blog posts on /blog. After an hour, the cache for this page is invalidated on the next visit to the page. Then, in the background, a new version of the page is generated with the latest blog posts.app/blog/page.tsxTypeScriptJavaScriptTypeScriptinterface Post {
id: string
title: string
content: string
}</p>
<p>export const revalidate = 3600 // invalidate every hour</p>
<p>export default async function Page() {
const data = await fetch('https://api.vercel.app/blog')
const posts: Post[] = await data.json()
return (
&lt;main&gt;
&lt;h1&gt;Blog Posts&lt;/h1&gt;
&lt;ul&gt;
{posts.map((post) =&gt; (
&lt;li key={post.id}&gt;{post.title}&lt;/li&gt;
))}
&lt;/ul&gt;
&lt;/main&gt;
)
}We recommend setting a high revalidation time. For instance, 1 hour instead of 1 second. If you need more precision, consider using on-demand revalidation. If you need real-time data, consider switching to dynamic rendering.On-demand revalidation with revalidatePath</p>
<p>For a more precise method of revalidation, invalidate pages on-demand with the revalidatePath function.For example, this Server Action would get called after adding a new post. Regardless of how you retrieve your data in your Server Component, either using fetch or connecting to a database, this will clear the cache for the entire route and allow the Server Component to fetch fresh data.app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { revalidatePath } from 'next/cache'</p>
<p>export async function createPost() {
// Invalidate the /posts route in the cache
revalidatePath('/posts')
}View a demo and explore the source code.On-demand revalidation with revalidateTag</p>
<p>For most use cases, prefer revalidating entire paths. If you need more granular control, you can use the revalidateTag function. For example, you can tag individual fetch calls:app/blog/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page() {
const data = await fetch('https://api.vercel.app/blog', {
next: { tags: ['posts'] },
})
const posts = await data.json()
// ...
}If you are using an ORM or connecting to a database, you can use unstable_cache:app/blog/page.tsxTypeScriptJavaScriptTypeScriptimport { unstable_cache } from 'next/cache'
import { db, posts } from '@/lib/db'</p>
<p>const getCachedPosts = unstable_cache(
async () =&gt; {
return await db.select().from(posts)
},
['posts'],
{ revalidate: 3600, tags: ['posts'] }
)</p>
<p>export default async function Page() {
const posts = getCachedPosts()
// ...
}You can then use revalidateTag in a Server Actions or Route Handler:app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { revalidateTag } from 'next/cache'</p>
<p>export async function createPost() {
// Invalidate all data tagged with 'posts' in the cache
revalidateTag('posts')
}</p>
<p>Handling uncaught exceptions</p>
<p>If an error is thrown while attempting to revalidate data, the last successfully generated data will continue to be served from the cache. On the next subsequent request, Next.js will retry revalidating the data. Learn more about error handling.</p>
<p>Customizing the cache location</p>
<p>Caching and revalidating pages (with Incremental Static Regeneration) use the same shared cache. When deploying to Vercel, the ISR cache is automatically persisted to durable storage.
When self-hosting, the ISR cache is stored to the filesystem (on disk) on your Next.js server. This works automatically when self-hosting using both the Pages and App Router.
You can configure the Next.js cache location if you want to persist cached pages and data to durable storage, or share the cache across multiple containers or instances of your Next.js application. Learn more.
Troubleshooting</p>
<p>Debugging cached data in local development</p>
<p>If you are using the fetch API, you can add additional logging to understand which requests are cached or uncached. Learn more about the logging option.
next.config.jsmodule.exports = {
logging: {
fetches: {
fullUrl: true,
},
},
}
Verifying correct production behavior</p>
<p>To verify your pages are cached and revalidated correctly in production, you can test locally by running next build and then next start to run the production Next.js server.
This will allow you to test ISR behavior as it would work in a production environment. For further debugging, add the following environment variable to your .env file:
.envNEXT_PRIVATE_DEBUG_CACHE=1
This will make the Next.js server console log ISR cache hits and misses. You can inspect the output to see which pages are generated during next build, as well as how pages are updated as paths are accessed on-demand.
Caveats</p>
<p>ISR is only supported when using the Node.js runtime (default).
ISR is not supported when creating a Static Export.
If you have multiple fetch requests in a statically rendered route, and each has a different revalidate frequency, the lowest time will be used for ISR. However, those revalidate frequencies will still be respected by the Data Cache.
If any of the fetch requests used on a route have a revalidate time of 0, or an explicit no-store, the route will be dynamically rendered.
Middleware won't be executed for on-demand ISR requests, meaning any path rewrites or logic in Middleware will not be applied. Ensure you are revalidating the exact path. For example, /post/1 instead of a rewritten /post-1.</p>
<p>Version history</p>
<p>VersionChangesv14.1.0Custom cacheHandler is stable.v13.0.0App Router is introduced.v12.2.0Pages Router: On-Demand ISR is stablev12.0.0Pages Router: Bot-aware ISR fallback added.v9.5.0Pages Router: Stable ISR introduced.Was this helpful?</p>
<p>supported.Send</p>
