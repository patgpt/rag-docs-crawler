# Routing: Loading UI and Streaming | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRoutingLoading UI and StreamingLoading UI and StreamingThe special file loading.js helps you create meaningful Loading UI with React Suspense. With this convention, you can show an instant loading state from the server while the content of a route segment loads. The new content is automatically swapped in once rendering is complete.</p>
<p>Instant Loading States</p>
<p>An instant loading state is fallback UI that is shown immediately upon navigation. You can pre-render loading indicators such as skeletons and spinners, or a small but meaningful part of future screens such as a cover photo, title, etc. This helps users understand the app is responding and provides a better user experience.
Create a loading state by adding a loading.js file inside a folder.</p>
<p>app/dashboard/loading.tsxTypeScriptJavaScriptTypeScriptexport default function Loading() {
// You can add any UI inside Loading, including a Skeleton.
return &lt;LoadingSkeleton /&gt;
}</p>
<p>In the same folder, loading.js will be nested inside layout.js. It will automatically wrap the page.js file and any children below in a &lt;Suspense&gt; boundary.</p>
<p>Good to know:</p>
<p>Navigation is immediate, even with server-centric routing.
Navigation is interruptible, meaning changing routes does not need to wait for the content of the route to fully load before navigating to another route.
Shared layouts remain interactive while new route segments load.</p>
<p>Recommendation: Use the loading.js convention for route segments (layouts and pages) as Next.js optimizes this functionality.</p>
<p>Streaming with Suspense</p>
<p>In addition to loading.js, you can also manually create Suspense Boundaries for your own UI components. The App Router supports streaming with Suspense.</p>
<p>Good to know:</p>
<p>Some browsers buffer a streaming response. You may not see the streamed response until the response exceeds 1024 bytes. This typically only affects “hello world” applications, but not real applications.</p>
<p>What is Streaming?</p>
<p>To learn how Streaming works in React and Next.js, it's helpful to understand Server-Side Rendering (SSR) and its limitations.
With SSR, there's a series of steps that need to be completed before a user can see and interact with a page:</p>
<p>First, all data for a given page is fetched on the server.
The server then renders the HTML for the page.
The HTML, CSS, and JavaScript for the page are sent to the client.
A non-interactive user interface is shown using the generated HTML, and CSS.
Finally, React hydrates the user interface to make it interactive.</p>
<p>These steps are sequential and blocking, meaning the server can only render the HTML for a page once all the data has been fetched. And, on the client, React can only hydrate the UI once the code for all components in the page has been downloaded.
SSR with React and Next.js helps improve the perceived loading performance by showing a non-interactive page to the user as soon as possible.</p>
<p>However, it can still be slow as all data fetching on server needs to be completed before the page can be shown to the user.
Streaming allows you to break down the page's HTML into smaller chunks and progressively send those chunks from the server to the client.</p>
<p>This enables parts of the page to be displayed sooner, without waiting for all the data to load before any UI can be rendered.
Streaming works well with React's component model because each component can be considered a chunk. Components that have higher priority (e.g. product information) or that don't rely on data can be sent first (e.g. layout), and React can start hydration earlier. Components that have lower priority (e.g. reviews, related products) can be sent in the same server request after their data has been fetched.</p>
<p>Streaming is particularly beneficial when you want to prevent long data requests from blocking the page from rendering as it can reduce the Time To First Byte (TTFB) and First Contentful Paint (FCP). It also helps improve Time to Interactive (TTI), especially on slower devices.
Example</p>
<p>&lt;Suspense&gt; works by wrapping a component that performs an asynchronous action (e.g. fetch data), showing fallback UI (e.g. skeleton, spinner) while it's happening, and then swapping in your component once the action completes.
app/dashboard/page.tsxTypeScriptJavaScriptTypeScriptimport { Suspense } from 'react'
import { PostFeed, Weather } from './Components'</p>
<p>export default function Posts() {
return (
&lt;section&gt;
&lt;Suspense fallback={&lt;p&gt;Loading feed...&lt;/p&gt;}&gt;
&lt;PostFeed /&gt;
&lt;/Suspense&gt;
&lt;Suspense fallback={&lt;p&gt;Loading weather...&lt;/p&gt;}&gt;
&lt;Weather /&gt;
&lt;/Suspense&gt;
&lt;/section&gt;
)
}</p>
<p>By using Suspense, you get the benefits of:</p>
<p>Streaming Server Rendering - Progressively rendering HTML from the server to the client.
Selective Hydration - React prioritizes what components to make interactive first based on user interaction.</p>
<p>For more Suspense examples and use cases, please see the React Documentation.
SEO</p>
<p>Next.js will wait for data fetching inside generateMetadata to complete before streaming UI to the client. This guarantees the first part of a streamed response includes &lt;head&gt; tags.
Since streaming is server-rendered, it does not impact SEO. You can use the Rich Results Test tool from Google to see how your page appears to Google's web crawlers and view the serialized HTML (source).</p>
<p>Status Codes</p>
<p>When streaming, a 200 status code will be returned to signal that the request was successful.
The server can still communicate errors or issues to the client within the streamed content itself, for example, when using redirect or notFound. Since the response headers have already been sent to the client, the status code of the response cannot be updated. This does not affect SEO.Was this helpful?</p>
<p>supported.Send</p>
