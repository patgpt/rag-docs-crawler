# Rendering: Server Components | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRenderingServer ComponentsServer ComponentsReact Server Components allow you to write UI that can be rendered and optionally cached on the server. In Next.js, the rendering work is further split by route segments to enable streaming and partial rendering, and there are three different server rendering strategies:</p>
<p>Static Rendering
Dynamic Rendering
Streaming</p>
<p>This page will go through how Server Components work, when you might use them, and the different server rendering strategies.
Benefits of Server Rendering</p>
<p>There are a couple of benefits to doing the rendering work on the server, including:</p>
<p>Data Fetching: Server Components allow you to move data fetching to the server, closer to your data source. This can improve performance by reducing time it takes to fetch data needed for rendering, and the number of requests the client needs to make.
Security: Server Components allow you to keep sensitive data and logic on the server, such as tokens and API keys, without the risk of exposing them to the client.
Caching: By rendering on the server, the result can be cached and reused on subsequent requests and across users. This can improve performance and reduce cost by reducing the amount of rendering and data fetching done on each request.
Performance: Server Components give you additional tools to optimize performance from the baseline. For example, if you start with an app composed of entirely Client Components, moving non-interactive pieces of your UI to Server Components can reduce the amount of client-side JavaScript needed. This is beneficial for users with slower internet or less powerful devices, as the browser has less client-side JavaScript to download, parse, and execute.
Initial Page Load and First Contentful Paint (FCP): On the server, we can generate HTML to allow users to view the page immediately, without waiting for the client to download, parse and execute the JavaScript needed to render the page.
Search Engine Optimization and Social Network Shareability: The rendered HTML can be used by search engine bots to index your pages and social network bots to generate social card previews for your pages.
Streaming: Server Components allow you to split the rendering work into chunks and stream them to the client as they become ready. This allows the user to see parts of the page earlier without having to wait for the entire page to be rendered on the server.</p>
<p>Using Server Components in Next.js</p>
<p>By default, Next.js uses Server Components. This allows you to automatically implement server rendering with no additional configuration, and you can opt into using Client Components when needed, see Client Components.
How are Server Components rendered?</p>
<p>On the server, Next.js uses React's APIs to orchestrate rendering. The rendering work is split into chunks: by individual route segments and Suspense Boundaries.
Each chunk is rendered in two steps:</p>
<p>React renders Server Components into a special data format called the React Server Component Payload (RSC Payload).
Next.js uses the RSC Payload and Client Component JavaScript instructions to render HTML on the server.</p>
<p>Then, on the client:</p>
<p>The HTML is used to immediately show a fast non-interactive preview of the route - this is for the initial page load only.
The React Server Components Payload is used to reconcile the Client and Server Component trees, and update the DOM.
The JavaScript instructions are used to hydrate Client Components and make the application interactive.</p>
<p>What is the React Server Component Payload (RSC)?</p>
<p>The RSC Payload is a compact binary representation of the rendered React Server Components tree. It's used by React on the client to update the browser's DOM. The RSC Payload contains:</p>
<p>The rendered result of Server Components
Placeholders for where Client Components should be rendered and references to their JavaScript files
Any props passed from a Server Component to a Client Component</p>
<p>Server Rendering Strategies</p>
<p>There are three subsets of server rendering: Static, Dynamic, and Streaming.
Static Rendering (Default)</p>
<p>With Static Rendering, routes are rendered at build time, or in the background after data revalidation. The result is cached and can be pushed to a Content Delivery Network (CDN). This optimization allows you to share the result of the rendering work between users and server requests.
Static rendering is useful when a route has data that is not personalized to the user and can be known at build time, such as a static blog post or a product page.
Dynamic Rendering</p>
<p>With Dynamic Rendering, routes are rendered for each user at request time.
Dynamic rendering is useful when a route has data that is personalized to the user or has information that can only be known at request time, such as cookies or the URL's search params.</p>
<p>Dynamic Routes with Cached Data
In most websites, routes are not fully static or fully dynamic - it's a spectrum. For example, you can have an e-commerce page that uses cached product data that's revalidated at an interval, but also has uncached, personalized customer data.
In Next.js, you can have dynamically rendered routes that have both cached and uncached data. This is because the RSC Payload and data are cached separately. This allows you to opt into dynamic rendering without worrying about the performance impact of fetching all the data at request time.
Learn more about the full-route cache and Data Cache.</p>
<p>Switching to Dynamic Rendering</p>
<p>During rendering, if a Dynamic API or a fetch option of { cache: 'no-store' } is discovered, Next.js will switch to dynamically rendering the whole route. This table summarizes how Dynamic APIs and data caching affect whether a route is statically or dynamically rendered:
Dynamic APIsDataRouteNoCachedStatically RenderedYesCachedDynamically RenderedNoNot CachedDynamically RenderedYesNot CachedDynamically Rendered
In the table above, for a route to be fully static, all data must be cached. However, you can have a dynamically rendered route that uses both cached and uncached data fetches.
As a developer, you do not need to choose between static and dynamic rendering as Next.js will automatically choose the best rendering strategy for each route based on the features and APIs used. Instead, you choose when to cache or revalidate specific data, and you may choose to stream parts of your UI.
Dynamic APIs</p>
<p>Dynamic APIs rely on information that can only be known at request time (and not ahead of time during prerendering). Using any of these APIs signals the developer's intention and will opt the whole route into dynamic rendering at the request time. These APIs include:</p>
<p>cookies
headers
connection
draftMode
searchParams prop
unstable_noStore</p>
<p>Streaming</p>
<p>Streaming enables you to progressively render UI from the server. Work is split into chunks and streamed to the client as it becomes ready. This allows the user to see parts of the page immediately, before the entire content has finished rendering.</p>
<p>Streaming is built into the Next.js App Router by default. This helps improve both the initial page loading performance, as well as UI that depends on slower data fetches that would block rendering the whole route. For example, reviews on a product page.
You can start streaming route segments using loading.js and UI components with React Suspense. See the Loading UI and Streaming section for more information.Next StepsLearn how Next.js caches data and the result of static rendering.CachingAn overview of caching mechanisms in Next.js.Was this helpful?</p>
<p>supported.Send</p>
