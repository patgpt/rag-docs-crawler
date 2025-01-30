# Getting Started: Fetching Data | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6App RouterGetting StartedFetching DataHow to fetch data and streamThis page will walk you through how you can fetch data in Server Components and Client Components. As well as how to stream content that depends on data.
Fetching data</p>
<p>Server Components</p>
<p>You can fetch data in Server Components using:</p>
<p>The fetch API
An ORM or database</p>
<p>With the fetch API</p>
<p>To fetch data with the fetch API, turn your component into an asynchronous function, and await the fetch call. For example:
app/blog/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page() {
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
<p>With an ORM or database</p>
<p>You can fetch data with an ORM or database by turning your component into an asynchronous function, and awaiting the call:
app/blog/page.tsxTypeScriptJavaScriptTypeScriptimport { db, posts } from '@/lib/db'</p>
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
<p>Client Components</p>
<p>There are two ways to fetch data in Client Components, using:</p>
<p>React's use hook
A community library like SWR or React Query</p>
<p>With the use hook</p>
<p>You can use React's use hook to stream data from the server to client. Start by fetching data in your Server component, and pass the promise to your Client Component as prop:
app/blog/page.tsxTypeScriptJavaScriptTypeScriptimport Posts from '@/app/ui/posts
import { Suspense } from 'react'</p>
<p>export default function Page() {
// Don't await the data fetching function
const posts = getPosts()</p>
<p>return (
&lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
&lt;Posts posts={posts} /&gt;
&lt;/Suspense&gt;
)
}</p>
<p>Then, in your Client Component, use the use hook read the promise:
app/ui/posts.tsxTypeScriptJavaScriptTypeScript'use client'
import { use } from 'react'</p>
<p>export default function Posts({
posts,
}: {
posts: Promise&lt;{ id: string; title: string }[]&gt;
}) {
const allPosts = use(posts)</p>
<p>return (
&lt;ul&gt;
{allPosts.map((post) =&gt; (
&lt;li key={post.id}&gt;{post.title}&lt;/li&gt;
))}
&lt;/ul&gt;
)
}</p>
<p>In the example above, you need to wrap the &lt;Posts /&gt; component in a &lt;Suspense&gt; boundary. This means the fallback will be shown while the promise is being resolved. Learn more about streaming.
Community libraries</p>
<p>You can use a community library like SWR or React Query to fetch data in Client Components. These libraries have their own semantics for caching, streaming, and other features. For example, with SWR:
app/blog/page.tsxTypeScriptJavaScriptTypeScript'use client'
import useSWR from 'swr'</p>
<p>const fetcher = (url) =&gt; fetch(url).then((r) =&gt; r.json())</p>
<p>export default function BlogPage() {
const { data, error, isLoading } = useSWR(
'https://api.vercel.app/blog',
fetcher
)</p>
<p>if (isLoading) return &lt;div&gt;Loading...&lt;/div&gt;
if (error) return &lt;div&gt;Error: {error.message}&lt;/div&gt;</p>
<p>return (
&lt;ul&gt;
{data.map((post: { id: string; title: string }) =&gt; (
&lt;li key={post.id}&gt;{post.title}&lt;/li&gt;
))}
&lt;/ul&gt;
)
}</p>
<p>Streaming</p>
<p>Warning: The content below assumes the dynamicIO config option is enabled in your application. The flag was introduced in Next.js 15 canary.</p>
<p>When using async/await in Server Components, Next.js will opt into dynamic rendering. This means the data will be fetched and rendered on the server for every user request. If there are any slow data requests, the whole route will be blocked from rendering.
To improve the initial load time and user experience, you can use streaming to break up the page's HTML into smaller chunks and progressively send those chunks from the server to the client.</p>
<p>There are two ways you can implement streaming in your application:</p>
<p>With the loading.js file
With React's &lt;Suspense&gt; component</p>
<p>With loading.js</p>
<p>You can create a loading.js file in the same folder as your page to stream the entire page while the data is being fetched. For example, to stream app/blog/page.js, add the file inside the app/blog folder.</p>
<p>app/blog/loading.tsxTypeScriptJavaScriptTypeScriptexport default function Loading() {
// Define the Loading UI here
return &lt;div&gt;Loading...&lt;/div&gt;
}</p>
<p>On navigation, the user will immediately see the layout and a loading state while the page is being rendered. The new content will then be automatically swapped in once rendering is complete.</p>
<p>Behind-the-scenes, loading.js will be nested inside layout.js, and will automatically wrap the page.js file and any children below in a &lt;Suspense&gt; boundary.</p>
<p>This approach works well for route segments (layouts and pages), but for more granular streaming, you can use &lt;Suspense&gt;.
With &lt;Suspense&gt;</p>
<p>&lt;Suspense&gt; allows you to be more granular about what parts of the page to stream. For example, you can immediately show any page content that falls outside of the &lt;Suspense&gt; boundary, and stream in the list of blog posts inside the boundary.
app/blog/page.tsxTypeScriptJavaScriptTypeScriptimport { Suspense } from 'react'
import BlogList from '@/components/BlogList'
import BlogListSkeleton from '@/components/BlogListSkeleton'</p>
<p>export default function BlogPage() {
return (
&lt;div&gt;
{/* This content will be sent to the client immediately <em>/}
&lt;header&gt;
&lt;h1&gt;Welcome to the Blog&lt;/h1&gt;
&lt;p&gt;Read the latest posts below.&lt;/p&gt;
&lt;/header&gt;
&lt;main&gt;
{/</em> Any content wrapped in a &lt;Suspense&gt; boundary will be streamed */}
&lt;Suspense fallback={&lt;BlogListSkeleton /&gt;}&gt;
&lt;BlogList /&gt;
&lt;/Suspense&gt;
&lt;/main&gt;
&lt;/div&gt;
)
}</p>
<p>Creating meaningful loading states</p>
<p>An instant loading state is fallback UI that is shown immediately to the user after navigation. For the best user experience, we recommend designing loading states that are meaningful and help users understand the app is responding. For example, you can use skeletons and spinners, or a small but meaningful part of future screens such as a cover photo, title, etc.
In development, you can preview and inspect the loading state of your components using the React Devtools.API ReferenceLearn more about the features mentioned in this page by reading the API Reference.fetchAPI reference for the extended fetch function.loading.jsAPI reference for the loading.js file.Was this helpful?</p>
<p>supported.Send</p>
