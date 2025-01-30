# Data Fetching: Data Fetching and Caching | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationData FetchingData Fetching and CachingData Fetching and CachingExamples
Next.js Commerce
On-Demand ISR
Next.js Forms</p>
<p>This guide will walk you through the basics of data fetching and caching in Next.js, providing practical examples and best practices.
Here's a minimal example of data fetching in Next.js:
app/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page() {
const data = await fetch('https://api.vercel.app/blog')
const posts = await data.json()
return (
&lt;ul&gt;
{posts.map((post) =&gt; (
&lt;li key={post.id}&gt;{post.title}&lt;/li&gt;
))}
&lt;/ul&gt;
)
}</p>
<p>This example demonstrates a basic server-side data fetch using the fetch API in an asynchronous React Server Component.
Reference</p>
<p>fetch
React cache
Next.js unstable_cache</p>
<p>Examples</p>
<p>Fetching data on the server with the fetch API</p>
<p>This component will fetch and display a list of blog posts. The response from fetch is not cached by default.
app/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page() {
const data = await fetch('https://api.vercel.app/blog')
const posts = await data.json()
return (
&lt;ul&gt;
{posts.map((post) =&gt; (
&lt;li key={post.id}&gt;{post.title}&lt;/li&gt;
))}
&lt;/ul&gt;
)
}</p>
<p>If you are not using any Dynamic APIs anywhere else in this route, it will be prerendered during next build to a static page. The data can then be updated using Incremental Static Regeneration.
To prevent the page from prerendering, you can add the following to your file:
export const dynamic = 'force-dynamic'
However, you will commonly use functions like cookies, headers, or reading the incoming searchParams from the page props, which will automatically make the page render dynamically. In this case, you do not need to explicitly use force-dynamic.
Fetching data on the server with an ORM or database</p>
<p>This component will fetch and display a list of blog posts. The response from the database is not cached by default but could be with additional configuration.
app/page.tsxTypeScriptJavaScriptTypeScriptimport { db, posts } from '@/lib/db'</p>
<p>export default async function Page() {
const allPosts = await db.select().from(posts)
return (
&lt;ul&gt;
{allPosts.map((post) =&gt; (
&lt;li key={post.id}&gt;{post.title}&lt;/li&gt;
))}
&lt;/ul&gt;
)
}</p>
<p>If you are not using any Dynamic APIs anywhere else in this route, it will be prerendered during next build to a static page. The data can then be updated using Incremental Static Regeneration.
To prevent the page from prerendering, you can add the following to your file:
export const dynamic = 'force-dynamic'
However, you will commonly use functions like cookies, headers, or reading the incoming searchParams from the page props, which will automatically make the page render dynamically. In this case, you do not need to explicitly use force-dynamic.
Fetching data on the client</p>
<p>We recommend first attempting to fetch data on the server-side.
However, there are still cases where client-side data fetching makes sense. In these scenarios, you can manually call fetch in a useEffect (not recommended), or lean on popular React libraries in the community (such as SWR or React Query) for client fetching.
app/page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useState, useEffect } from 'react'</p>
<p>export function Posts() {
const [posts, setPosts] = useState(null)</p>
<p>useEffect(() =&gt; {
async function fetchPosts() {
const res = await fetch('https://api.vercel.app/blog')
const data = await res.json()
setPosts(data)
}
fetchPosts()
}, [])</p>
<p>if (!posts) return &lt;div&gt;Loading...&lt;/div&gt;</p>
<p>return (
&lt;ul&gt;
{posts.map((post) =&gt; (
&lt;li key={post.id}&gt;{post.title}&lt;/li&gt;
))}
&lt;/ul&gt;
)
}</p>
<p>Caching data with an ORM or Database</p>
<p>You can use the unstable_cache API to cache the response to allow pages to be prerendered when running next build.
app/page.tsxTypeScriptJavaScriptTypeScriptimport { unstable_cache } from 'next/cache'
import { db, posts } from '@/lib/db'</p>
<p>const getPosts = unstable_cache(
async () =&gt; {
return await db.select().from(posts)
},
['posts'],
{ revalidate: 3600, tags: ['posts'] }
)</p>
<p>export default async function Page() {
const allPosts = await getPosts()</p>
<p>return (
&lt;ul&gt;
{allPosts.map((post) =&gt; (
&lt;li key={post.id}&gt;{post.title}&lt;/li&gt;
))}
&lt;/ul&gt;
)
}</p>
<p>This example caches the result of the database query for 1 hour (3600 seconds). It also adds the cache tag posts which can then be invalidated with Incremental Static Regeneration.
Reusing data across multiple functions</p>
<p>Next.js uses APIs like generateMetadata and generateStaticParams where you will need to use the same data fetched in the page.
If you are using fetch, requests can be memoized by adding cache: 'force-cache'. This means you can safely call the same URL with the same options, and only one request will be made.</p>
<p>Good to know:</p>
<p>In previous versions of Next.js, using fetch would have a default cache value of force-cache. This changed in version 15, to a default of cache: no-store.</p>
<p>app/blog/[id]/page.tsxTypeScriptJavaScriptTypeScriptimport { notFound } from 'next/navigation'</p>
<p>interface Post {
id: string
title: string
content: string
}</p>
<p>async function getPost(id: string) {
const res = await fetch(<code>https://api.vercel.app/blog/${id}</code>, {
cache: 'force-cache',
})
const post: Post = await res.json()
if (!post) notFound()
return post
}</p>
<p>export async function generateStaticParams() {
const posts = await fetch('https://api.vercel.app/blog', {
cache: 'force-cache',
}).then((res) =&gt; res.json())</p>
<p>return posts.map((post: Post) =&gt; ({
id: String(post.id),
}))
}</p>
<p>export async function generateMetadata({
params,
}: {
params: Promise&lt;{ id: string }&gt;
}) {
const { id } = await params
const post = await getPost(id)</p>
<p>return {
title: post.title,
}
}</p>
<p>export default async function Page({
params,
}: {
params: Promise&lt;{ id: string }&gt;
}) {
const { id } = await params
const post = await getPost(id)</p>
<p>return (
&lt;article&gt;
&lt;h1&gt;{post.title}&lt;/h1&gt;
&lt;p&gt;{post.content}&lt;/p&gt;
&lt;/article&gt;
)
}</p>
<p>If you are not using fetch, and instead using an ORM or database directly, you can wrap your data fetch with the React cache function. This will de-duplicate and only make one query.
import { cache } from 'react'
import { db, posts, eq } from '@/lib/db' // Example with Drizzle ORM
import { notFound } from 'next/navigation'</p>
<p>export const getPost = cache(async (id) =&gt; {
const post = await db.query.posts.findFirst({
where: eq(posts.id, parseInt(id)),
})</p>
<p>if (!post) notFound()
return post
})
Revalidating cached data</p>
<p>Learn more about revalidating cached data with Incremental Static Regeneration.
Patterns</p>
<p>Parallel and sequential data fetching</p>
<p>When fetching data inside components, you need to be aware of two data fetching patterns: Parallel and Sequential.</p>
<p>Sequential: requests in a component tree are dependent on each other. This can lead to longer loading times.
Parallel: requests in a route are eagerly initiated and will load data at the same time. This reduces the total time it takes to load data.</p>
<p>Sequential data fetching</p>
<p>If you have nested components, and each component fetches its own data, then data fetching will happen sequentially if those data requests are not memoized.
There may be cases where you want this pattern because one fetch depends on the result of the other. For example, the Playlists component will only start fetching data once the Artist component has finished fetching data because Playlists depends on the artistID prop:
app/artist/[username]/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page({
params,
}: {
params: Promise&lt;{ username: string }&gt;
}) {
const { username } = await params
// Get artist information
const artist = await getArtist(username)</p>
<p>return (
&lt;&gt;
&lt;h1&gt;{artist.name}&lt;/h1&gt;
{/* Show fallback UI while the Playlists component is loading <em>/}
&lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
{/</em> Pass the artist ID to the Playlists component */}
&lt;Playlists artistID={artist.id} /&gt;
&lt;/Suspense&gt;
&lt;/&gt;
)
}</p>
<p>async function Playlists({ artistID }: { artistID: string }) {
// Use the artist ID to fetch playlists
const playlists = await getArtistPlaylists(artistID)</p>
<p>return (
&lt;ul&gt;
{playlists.map((playlist) =&gt; (
&lt;li key={playlist.id}&gt;{playlist.name}&lt;/li&gt;
))}
&lt;/ul&gt;
)
}</p>
<p>You can use loading.js (for route segments) or React &lt;Suspense&gt; (for nested components) to show an instant loading state while React streams in the result.
This will prevent the whole route from being blocked by data requests, and the user will be able to interact with the parts of the page that are ready.
Parallel Data Fetching</p>
<p>By default, layout and page segments are rendered in parallel. This means requests will be initiated in parallel.
However, due to the nature of async/await, an awaited request inside the same segment or component will block any requests below it.
To fetch data in parallel, you can eagerly initiate requests by defining them outside the components that use the data. This saves time by initiating both requests in parallel, however, the user won't see the rendered result until both promises are resolved.
In the example below, the getArtist and getAlbums functions are defined outside the Page component and initiated inside the component using Promise.all:
app/artist/[username]/page.tsxTypeScriptJavaScriptTypeScriptimport Albums from './albums'</p>
<p>async function getArtist(username: string) {
const res = await fetch(<code>https://api.example.com/artist/${username}</code>)
return res.json()
}</p>
<p>async function getAlbums(username: string) {
const res = await fetch(<code>https://api.example.com/artist/${username}/albums</code>)
return res.json()
}</p>
<p>export default async function Page({
params,
}: {
params: Promise&lt;{ username: string }&gt;
}) {
const { username } = await params
const artistData = getArtist(username)
const albumsData = getAlbums(username)</p>
<p>// Initiate both requests in parallel
const [artist, albums] = await Promise.all([artistData, albumsData])</p>
<p>return (
&lt;&gt;
&lt;h1&gt;{artist.name}&lt;/h1&gt;
&lt;Albums list={albums} /&gt;
&lt;/&gt;
)
}</p>
<p>In addition, you can add a Suspense Boundary to break up the rendering work and show part of the result as soon as possible.
Preloading Data</p>
<p>Another way to prevent waterfalls is to use the preload pattern by creating an utility function that you eagerly call above blocking requests. For example, checkIsAvailable() blocks &lt;Item/&gt; from rendering, so you can call preload() before it to eagerly initiate &lt;Item/&gt; data dependencies. By the time &lt;Item/&gt; is rendered, its data has already been fetched.
Note that preload function doesn't block checkIsAvailable() from running.
components/Item.tsxTypeScriptJavaScriptTypeScriptimport { getItem } from '@/utils/get-item'</p>
<p>export const preload = (id: string) =&gt; {
// void evaluates the given expression and returns undefined
// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
void getItem(id)
}
export default async function Item({ id }: { id: string }) {
const result = await getItem(id)
// ...
}</p>
<p>app/item/[id]/page.tsxTypeScriptJavaScriptTypeScriptimport Item, { preload, checkIsAvailable } from '@/components/Item'</p>
<p>export default async function Page({
params,
}: {
params: Promise&lt;{ id: string }&gt;
}) {
const { id } = await params
// starting loading item data
preload(id)
// perform another asynchronous task
const isAvailable = await checkIsAvailable()</p>
<p>return isAvailable ? &lt;Item id={id} /&gt; : null
}</p>
<p>Good to know: The &quot;preload&quot; function can also have any name as it's a pattern, not an API.</p>
<p>Using React cache and server-only with the Preload Pattern</p>
<p>You can combine the cache function, the preload pattern, and the server-only package to create a data fetching utility that can be used throughout your app.
utils/get-item.tsTypeScriptJavaScriptTypeScriptimport { cache } from 'react'
import 'server-only'</p>
<p>export const preload = (id: string) =&gt; {
void getItem(id)
}</p>
<p>export const getItem = cache(async (id: string) =&gt; {
// ...
})</p>
<p>With this approach, you can eagerly fetch data, cache responses, and guarantee that this data fetching only happens on the server.
The utils/get-item exports can be used by Layouts, Pages, or other components to give them control over when an item's data is fetched.</p>
<p>Good to know:</p>
<p>We recommend using the server-only package to make sure server data fetching functions are never used on the client.</p>
<p>Preventing sensitive data from being exposed to the client</p>
<p>We recommend using React's taint APIs, taintObjectReference and taintUniqueValue, to prevent whole object instances or sensitive values from being passed to the client.
To enable tainting in your application, set the Next.js Config experimental.taint option to true:
next.config.jsmodule.exports = {
experimental: {
taint: true,
},
}
Then pass the object or value you want to taint to the experimental_taintObjectReference or experimental_taintUniqueValue functions:
app/utils.tsTypeScriptJavaScriptTypeScriptimport { queryDataFromDB } from './api'
import {
experimental_taintObjectReference,
experimental_taintUniqueValue,
} from 'react'</p>
<p>export async function getUserData() {
const data = await queryDataFromDB()
experimental_taintObjectReference(
'Do not pass the whole user object to the client',
data
)
experimental_taintUniqueValue(
&quot;Do not pass the user's address to the client&quot;,
data,
data.address
)
return data
}</p>
<p>app/page.tsxTypeScriptJavaScriptTypeScriptimport { getUserData } from './data'</p>
<p>export async function Page() {
const userData = getUserData()
return (
&lt;ClientComponent
user={userData} // this will cause an error because of taintObjectReference
address={userData.address} // this will cause an error because of taintUniqueValue
/&gt;
)
}
Was this helpful?</p>
<p>supported.Send</p>
