# Rendering: Composition Patterns | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRenderingComposition PatternsServer and Client Composition PatternsWhen building React applications, you will need to consider what parts of your application should be rendered on the server or the client. This page covers some recommended composition patterns when using Server and Client Components.
When to use Server and Client Components?</p>
<p>Here's a quick summary of the different use cases for Server and Client Components:
What do you need to do?Server ComponentClient ComponentFetch dataAccess backend resources (directly)Keep sensitive information on the server (access tokens, API keys, etc)Keep large dependencies on the server / Reduce client-side JavaScriptAdd interactivity and event listeners (onClick(), onChange(), etc)Use State and Lifecycle Effects (useState(), useReducer(), useEffect(), etc)Use browser-only APIsUse custom hooks that depend on state, effects, or browser-only APIsUse React Class components
Server Component Patterns</p>
<p>Before opting into client-side rendering, you may wish to do some work on the server like fetching data, or accessing your database or backend services.
Here are some common patterns when working with Server Components:
Sharing data between components</p>
<p>When fetching data on the server, there may be cases where you need to share data across different components. For example, you may have a layout and a page that depend on the same data.
Instead of using React Context (which is not available on the server) or passing data as props, you can use fetch or React's cache function to fetch the same data in the components that need it, without worrying about making duplicate requests for the same data. This is because React extends fetch to automatically memoize data requests, and the cache function can be used when fetch is not available.
View an example of this pattern.
Keeping Server-only Code out of the Client Environment</p>
<p>Since JavaScript modules can be shared between both Server and Client Components modules, it's possible for code that was only ever intended to be run on the server to sneak its way into the client.
For example, take the following data-fetching function:
lib/data.tsTypeScriptJavaScriptTypeScriptexport async function getData() {
const res = await fetch('https://external-service.com/data', {
headers: {
authorization: process.env.API_KEY,
},
})</p>
<p>return res.json()
}</p>
<p>At first glance, it appears that getData works on both the server and the client. However, this function contains an API_KEY, written with the intention that it would only ever be executed on the server.
Since the environment variable API_KEY is not prefixed with NEXT_PUBLIC, it's a private variable that can only be accessed on the server. To prevent your environment variables from being leaked to the client, Next.js replaces private environment variables with an empty string.
As a result, even though getData() can be imported and executed on the client, it won't work as expected. And while making the variable public would make the function work on the client, you may not want to expose sensitive information to the client.
To prevent this sort of unintended client usage of server code, we can use the server-only package to give other developers a build-time error if they ever accidentally import one of these modules into a Client Component.
To use server-only, first install the package:
Terminalnpm install server-only
Then import the package into any module that contains server-only code:
lib/data.jsimport 'server-only'</p>
<p>export async function getData() {
const res = await fetch('https://external-service.com/data', {
headers: {
authorization: process.env.API_KEY,
},
})</p>
<p>return res.json()
}
Now, any Client Component that imports getData() will receive a build-time error explaining that this module can only be used on the server.
The corresponding package client-only can be used to mark modules that contain client-only code – for example, code that accesses the window object.
Using Third-party Packages and Providers</p>
<p>Since Server Components are a new React feature, third-party packages and providers in the ecosystem are just beginning to add the &quot;use client&quot; directive to components that use client-only features like useState, useEffect, and createContext.
Today, many components from npm packages that use client-only features do not yet have the directive. These third-party components will work as expected within Client Components since they have the &quot;use client&quot; directive, but they won't work within Server Components.
For example, let's say you've installed the hypothetical acme-carousel package which has a &lt;Carousel /&gt; component. This component uses useState, but it doesn't yet have the &quot;use client&quot; directive.
If you use &lt;Carousel /&gt; within a Client Component, it will work as expected:
app/gallery.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useState } from 'react'
import { Carousel } from 'acme-carousel'</p>
<p>export default function Gallery() {
const [isOpen, setIsOpen] = useState(false)</p>
<p>return (
&lt;div&gt;
&lt;button onClick={() =&gt; setIsOpen(true)}&gt;View pictures&lt;/button&gt;</p>
<pre><code>  {/* Works, since Carousel is used within a Client Component */}
  {isOpen &amp;&amp; &lt;Carousel /&gt;}
&lt;/div&gt;
</code></pre>
<p>)
}</p>
<p>However, if you try to use it directly within a Server Component, you'll see an error:
app/page.tsxTypeScriptJavaScriptTypeScriptimport { Carousel } from 'acme-carousel'</p>
<p>export default function Page() {
return (
&lt;div&gt;
&lt;p&gt;View pictures&lt;/p&gt;</p>
<pre><code>  {/* Error: `useState` can not be used within Server Components */}
  &lt;Carousel /&gt;
&lt;/div&gt;
</code></pre>
<p>)
}</p>
<p>This is because Next.js doesn't know &lt;Carousel /&gt; is using client-only features.
To fix this, you can wrap third-party components that rely on client-only features in your own Client Components:
app/carousel.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { Carousel } from 'acme-carousel'</p>
<p>export default Carousel</p>
<p>Now, you can use &lt;Carousel /&gt; directly within a Server Component:
app/page.tsxTypeScriptJavaScriptTypeScriptimport Carousel from './carousel'</p>
<p>export default function Page() {
return (
&lt;div&gt;
&lt;p&gt;View pictures&lt;/p&gt;</p>
<pre><code>  {/*  Works, since Carousel is a Client Component */}
  &lt;Carousel /&gt;
&lt;/div&gt;
</code></pre>
<p>)
}</p>
<p>We don't expect you to need to wrap most third-party components since it's likely you'll be using them within Client Components. However, one exception is providers, since they rely on React state and context, and are typically needed at the root of an application. Learn more about third-party context providers below.
Using Context Providers</p>
<p>Context providers are typically rendered near the root of an application to share global concerns, like the current theme. Since React context is not supported in Server Components, trying to create a context at the root of your application will cause an error:
app/layout.tsxTypeScriptJavaScriptTypeScriptimport { createContext } from 'react'</p>
<p>//  createContext is not supported in Server Components
export const ThemeContext = createContext({})</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html&gt;
&lt;body&gt;
&lt;ThemeContext.Provider value=&quot;dark&quot;&gt;{children}&lt;/ThemeContext.Provider&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>To fix this, create your context and render its provider inside of a Client Component:
app/theme-provider.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { createContext } from 'react'</p>
<p>export const ThemeContext = createContext({})</p>
<p>export default function ThemeProvider({
children,
}: {
children: React.ReactNode
}) {
return &lt;ThemeContext.Provider value=&quot;dark&quot;&gt;{children}&lt;/ThemeContext.Provider&gt;
}</p>
<p>Your Server Component will now be able to directly render your provider since it's been marked as a Client Component:
app/layout.tsxTypeScriptJavaScriptTypeScriptimport ThemeProvider from './theme-provider'</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html&gt;
&lt;body&gt;
&lt;ThemeProvider&gt;{children}&lt;/ThemeProvider&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>With the provider rendered at the root, all other Client Components throughout your app will be able to consume this context.</p>
<p>Good to know: You should render providers as deep as possible in the tree – notice how ThemeProvider only wraps {children} instead of the entire &lt;html&gt; document. This makes it easier for Next.js to optimize the static parts of your Server Components.</p>
<p>Advice for Library Authors</p>
<p>In a similar fashion, library authors creating packages to be consumed by other developers can use the &quot;use client&quot; directive to mark client entry points of their package. This allows users of the package to import package components directly into their Server Components without having to create a wrapping boundary.
You can optimize your package by using 'use client' deeper in the tree, allowing the imported modules to be part of the Server Component module graph.
It's worth noting some bundlers might strip out &quot;use client&quot; directives. You can find an example of how to configure esbuild to include the &quot;use client&quot; directive in the React Wrap Balancer and Vercel Analytics repositories.
Client Components</p>
<p>Moving Client Components Down the Tree</p>
<p>To reduce the Client JavaScript bundle size, we recommend moving Client Components down your component tree.
For example, you may have a Layout that has static elements (e.g. logo, links, etc) and an interactive search bar that uses state.
Instead of making the whole layout a Client Component, move the interactive logic to a Client Component (e.g. &lt;SearchBar /&gt;) and keep your layout as a Server Component. This means you don't have to send all the component JavaScript of the layout to the client.
app/layout.tsxTypeScriptJavaScriptTypeScript// SearchBar is a Client Component
import SearchBar from './searchbar'
// Logo is a Server Component
import Logo from './logo'</p>
<p>// Layout is a Server Component by default
export default function Layout({ children }: { children: React.ReactNode }) {
return (
&lt;&gt;
&lt;nav&gt;
&lt;Logo /&gt;
&lt;SearchBar /&gt;
&lt;/nav&gt;
&lt;main&gt;{children}&lt;/main&gt;
&lt;/&gt;
)
}</p>
<p>Passing props from Server to Client Components (Serialization)</p>
<p>If you fetch data in a Server Component, you may want to pass data down as props to Client Components. Props passed from the Server to Client Components need to be serializable by React.
If your Client Components depend on data that is not serializable, you can fetch data on the client with a third party library or on the server with a Route Handler.
Interleaving Server and Client Components</p>
<p>When interleaving Client and Server Components, it may be helpful to visualize your UI as a tree of components. Starting with the root layout, which is a Server Component, you can then render certain subtrees of components on the client by adding the &quot;use client&quot; directive.</p>
<p>Within those client subtrees, you can still nest Server Components or call Server Actions, however there are some things to keep in mind:</p>
<p>During a request-response lifecycle, your code moves from the server to the client. If you need to access data or resources on the server while on the client, you'll be making a new request to the server - not switching back and forth.
When a new request is made to the server, all Server Components are rendered first, including those nested inside Client Components. The rendered result (RSC Payload) will contain references to the locations of Client Components. Then, on the client, React uses the RSC Payload to reconcile Server and Client Components into a single tree.</p>
<p>Since Client Components are rendered after Server Components, you cannot import a Server Component into a Client Component module (since it would require a new request back to the server). Instead, you can pass a Server Component as props to a Client Component. See the unsupported pattern and supported pattern sections below.</p>
<p>Unsupported Pattern: Importing Server Components into Client Components</p>
<p>The following pattern is not supported. You cannot import a Server Component into a Client Component:
app/client-component.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>// You cannot import a Server Component into a Client Component.
import ServerComponent from './Server-Component'</p>
<p>export default function ClientComponent({
children,
}: {
children: React.ReactNode
}) {
const [count, setCount] = useState(0)</p>
<p>return (
&lt;&gt;
&lt;button onClick={() =&gt; setCount(count + 1)}&gt;{count}&lt;/button&gt;</p>
<pre><code>  &lt;ServerComponent /&gt;
&lt;/&gt;
</code></pre>
<p>)
}</p>
<p>Supported Pattern: Passing Server Components to Client Components as Props</p>
<p>The following pattern is supported. You can pass Server Components as a prop to a Client Component.
A common pattern is to use the React children prop to create a &quot;slot&quot; in your Client Component.
In the example below, &lt;ClientComponent&gt; accepts a children prop:
app/client-component.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useState } from 'react'</p>
<p>export default function ClientComponent({
children,
}: {
children: React.ReactNode
}) {
const [count, setCount] = useState(0)</p>
<p>return (
&lt;&gt;
&lt;button onClick={() =&gt; setCount(count + 1)}&gt;{count}&lt;/button&gt;
{children}
&lt;/&gt;
)
}</p>
<p>&lt;ClientComponent&gt; doesn't know that children will eventually be filled in by the result of a Server Component. The only responsibility &lt;ClientComponent&gt; has is to decide where children will eventually be placed.
In a parent Server Component, you can import both the &lt;ClientComponent&gt; and &lt;ServerComponent&gt; and pass &lt;ServerComponent&gt; as a child of &lt;ClientComponent&gt;:
app/page.tsxTypeScriptJavaScriptTypeScript// This pattern works:
// You can pass a Server Component as a child or prop of a
// Client Component.
import ClientComponent from './client-component'
import ServerComponent from './server-component'</p>
<p>// Pages in Next.js are Server Components by default
export default function Page() {
return (
&lt;ClientComponent&gt;
&lt;ServerComponent /&gt;
&lt;/ClientComponent&gt;
)
}</p>
<p>With this approach, &lt;ClientComponent&gt; and &lt;ServerComponent&gt; are decoupled and can be rendered independently. In this case, the child &lt;ServerComponent&gt; can be rendered on the server, well before &lt;ClientComponent&gt; is rendered on the client.</p>
<p>Good to know:</p>
<p>The pattern of &quot;lifting content up&quot; has been used to avoid re-rendering a nested child component when a parent component re-renders.
You're not limited to the children prop. You can use any prop to pass JSX.</p>
<p>Was this helpful?</p>
<p>supported.Send</p>
