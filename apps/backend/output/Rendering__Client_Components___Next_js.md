# Rendering: Client Components | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRenderingClient ComponentsClient ComponentsClient Components allow you to write interactive UI that is prerendered on the server and can use client JavaScript to run in the browser.
This page will go through how Client Components work, how they're rendered, and when you might use them.
Benefits of Client Rendering</p>
<p>There are a couple of benefits to doing the rendering work on the client, including:</p>
<p>Interactivity: Client Components can use state, effects, and event listeners, meaning they can provide immediate feedback to the user and update the UI.
Browser APIs: Client Components have access to browser APIs, like geolocation or localStorage.</p>
<p>Using Client Components in Next.js</p>
<p>To use Client Components, you can add the React &quot;use client&quot; directive at the top of a file, above your imports.
&quot;use client&quot; is used to declare a boundary between a Server and Client Component modules. This means that by defining a &quot;use client&quot; in a file, all other modules imported into it, including child components, are considered part of the client bundle.
app/counter.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useState } from 'react'</p>
<p>export default function Counter() {
const [count, setCount] = useState(0)</p>
<p>return (
&lt;div&gt;
&lt;p&gt;You clicked {count} times&lt;/p&gt;
&lt;button onClick={() =&gt; setCount(count + 1)}&gt;Click me&lt;/button&gt;
&lt;/div&gt;
)
}</p>
<p>The diagram below shows that using onClick and useState in a nested component (toggle.js) will cause an error if the &quot;use client&quot; directive is not defined. This is because, by default, all components in the App Router are Server Components where these APIs are not available. By defining the &quot;use client&quot; directive in toggle.js, you can tell React to enter the client boundary where these APIs are available.</p>
<p>Defining multiple use client entry points:
You can define multiple &quot;use client&quot; entry points in your React Component tree. This allows you to split your application into multiple client bundles.
However, &quot;use client&quot; doesn't need to be defined in every component that needs to be rendered on the client. Once you define the boundary, all child components and modules imported into it are considered part of the client bundle.</p>
<p>How are Client Components Rendered?</p>
<p>In Next.js, Client Components are rendered differently depending on whether the request is part of a full page load (an initial visit to your application or a page reload triggered by a browser refresh) or a subsequent navigation.
Full page load</p>
<p>To optimize the initial page load, Next.js will use React's APIs to render a static HTML preview on the server for both Client and Server Components. This means, when the user first visits your application, they will see the content of the page immediately, without having to wait for the client to download, parse, and execute the Client Component JavaScript bundle.
On the server:</p>
<p>React renders Server Components into a special data format called the React Server Component Payload (RSC Payload), which includes references to Client Components.
Next.js uses the RSC Payload and Client Component JavaScript instructions to render HTML for the route on the server.</p>
<p>Then, on the client:</p>
<p>The HTML is used to immediately show a fast non-interactive initial preview of the route.
The React Server Components Payload is used to reconcile the Client and Server Component trees, and update the DOM.
The JavaScript instructions are used to hydrate Client Components and make their UI interactive.</p>
<p>What is hydration?
Hydration is the process of attaching event listeners to the DOM, to make the static HTML interactive. Behind the scenes, hydration is done with the hydrateRoot React API.</p>
<p>Subsequent Navigations</p>
<p>On subsequent navigations, Client Components are rendered entirely on the client, without the server-rendered HTML.
This means the Client Component JavaScript bundle is downloaded and parsed. Once the bundle is ready, React will use the RSC Payload to reconcile the Client and Server Component trees, and update the DOM.
Going back to the Server Environment</p>
<p>Sometimes, after you've declared the &quot;use client&quot; boundary, you may want to go back to the server environment. For example, you may want to reduce the client bundle size, fetch data on the server, or use an API that is only available on the server.
You can keep code on the server even though it's theoretically nested inside Client Components by interleaving Client and Server Components and Server Actions. See the Composition Patterns page for more information.Was this helpful?</p>
<p>supported.Send</p>
