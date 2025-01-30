# Upgrading: Single-Page Apps | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationUpgradingSingle-Page AppsSingle-Page Applications with Next.jsNext.js fully supports building Single-Page Applications (SPAs).
This includes fast route transitions with prefetching, client-side data fetching, using browser APIs, integrating with third-party client libraries, creating static routes, and more.
If you have an existing SPA, you can migrate to Next.js without large changes to your code. Next.js then allows you to progressively add server features as needed.
What is a Single-Page Application?</p>
<p>The definition of a SPA varies. We’ll define a “strict SPA” as:</p>
<p>Client-side rendering (CSR): The app is served by one HTML file (e.g. index.html). Every route, page transition, and data fetch is handled by JavaScript in the browser.
No full-page reloads: Rather than requesting a new document for each route, client-side JavaScript manipulates the current page’s DOM and fetches data as needed.</p>
<p>Strict SPAs often require large amounts of JavaScript to load before the page can be interactive. Further, client data waterfalls can be challenging to manage. Building SPAs with Next.js can address these issues.
Why use Next.js for SPAs?</p>
<p>Next.js can automatically code split your JavaScript bundles, and generate multiple HTML entry points into different routes. This avoids loading unnecessary JavaScript code on the client-side, reducing the bundle size and enabling faster page loads.
The next/link component automatically prefetches routes, giving you the fast page transitions of a strict SPA, but with the advantage of persisting application routing state to the URL for linking and sharing.
Next.js can start as a static site or even a strict SPA where everything is rendered client-side. If your project grows, Next.js allows you to progressively add more server features (e.g. React Server Components, Server Actions, and more) as needed.
Examples</p>
<p>Let's explore common patterns used to build SPAs and how Next.js solves them.
Using React’s use within a Context Provider</p>
<p>We recommend fetching data in a parent component (or layout), returning the Promise, and then unwrapping the value in a client component with React’s use hook.
Next.js can start data fetching early on the server. In this example, that’s the root layout — the entry point to your application. The server can immediately begin streaming a response to the client.
By “hoisting” your data fetching to the root layout, Next.js starts the specified requests on the server early before any other components in your application. This eliminates client waterfalls and prevents having multiple roundtrips between client and server. It can also significantly improve performance, as your server is closer (and ideally colocated) to where your database is located.
For example, update your root layout to call the Promise, but do not await it.
app/layout.tsxTypeScriptJavaScriptTypeScriptimport { UserProvider } from './user-provider'
import { getUser } from './user' // some server-side function</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
let userPromise = getUser() // do NOT await</p>
<p>return (
&lt;html lang=&quot;en&quot;&gt;
&lt;body&gt;
&lt;UserProvider userPromise={userPromise}&gt;{children}&lt;/UserProvider&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>While you can defer and pass a single Promise as a prop to a client component, we generally see this pattern paired with a React context provider. This enables easier access from client components with a custom React hook.
You can forward a Promise to the React context provider:
app/user-provider.tsTypeScriptJavaScriptTypeScript'use client';</p>
<p>import { use, createContext, ReactNode } from 'react';</p>
<p>type User = any;
type UserContextType = {
user: User;
};</p>
<p>const UserContext = createContext&lt;UserContextType | null&gt;(null);</p>
<p>export function UserProvider({
children,
userPromise,
}: {
children: ReactNode;
userPromise: Promise&lt;User | null&gt;;
}) {
let initialUser = use(userPromise);</p>
<p>return (
&lt;UserContext.Provider value={{ user: initialUser }}&gt;
{children}
&lt;/UserContext.Provider&gt;
);
}</p>
<p>export function useUser(): UserContextType {
let context = use(UserContext);
if (context === null) {
throw new Error('useUser must be used within a UserProvider');
}
return context;
}</p>
<p>Finally, you can call the useUser() custom hook in any client component:
app/profile.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useUser } from './user-provider'</p>
<p>export function Profile() {
const { user } = useUser()</p>
<p>return '...'
}</p>
<p>The component that consumes the Promise (e.g. Profile above) will be suspended. This enables partial hydration. You can see the streamed and prerendered HTML before JavaScript has finished loading.
SPAs with SWR</p>
<p>SWR is a popular React library for data fetching.
With SWR 2.3.0 (and React 19+), you can gradually adopt server features alongside your existing SWR-based client data fetching code. This is an abstraction of the above use() pattern. This means you can move data fetching between the client and server-side, or use both:</p>
<p>Client-only: useSWR(key, fetcher)
Server-only: useSWR(key) + RSC-provided data
Mixed: useSWR(key, fetcher) + RSC-provided data</p>
<p>For example, wrap your application with &lt;SWRConfig&gt; and a fallback:
app/layout.tsxTypeScriptJavaScriptTypeScriptimport { SWRConfig } from 'swr'
import { getUser } from './user' // some server-side function</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;SWRConfig
value={{
fallback: {
// We do NOT await getUser() here
// Only components that read this data will suspend
'/api/user': getUser(),
},
}}
&gt;
{children}
&lt;/SWRConfig&gt;
)
}</p>
<p>Because this is a server component, getUser() can securely read cookies, headers, or talk to your database. No separate API route is needed. Client components below the &lt;SWRConfig&gt; can call useSWR() with the same key to retrieve the user data. The component code with useSWR does not require any changes from your existing client-fetching solution.
app/profile.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import useSWR from 'swr'</p>
<p>export function Profile() {
const fetcher = (url) =&gt; fetch(url).then((res) =&gt; res.json())
// The same SWR pattern you already know
const { data, error } = useSWR('/api/user', fetcher)</p>
<p>return '...'
}</p>
<p>The fallback data can be prerendered and included in the initial HTML response, then immediately read in the child components using useSWR. SWR’s polling, revalidation, and caching still run client-side only, so it preserves all the interactivity you rely on for an SPA.
Since the initial fallback data is automatically handled by Next.js, you can now delete any conditional logic previously needed to check if data was undefined. When the data is loading, the closest &lt;Suspense&gt; boundary will be suspended.
SWRRSCRSC + SWRSSR dataStreaming while SSRDeduplicate requestsClient-side features
SPAs with React Query</p>
<p>You can use React Query with Next.js on both the client and server. This enables you to build both strict SPAs, as well as take advantage of server features in Next.js paired with React Query.
Learn more in the React Query documentation.
Rendering components only in the browser</p>
<p>Client components are prerendered during next build. If you want to disable prerendering for a client component and only load it in the browser environment, you can use next/dynamic:
import dynamic from 'next/dynamic'</p>
<p>const ClientOnlyComponent = dynamic(() =&gt; import('./component'), {
ssr: false,
})
This can be useful for third-party libraries that rely on browser APIs like window or document. You can also add a useEffect that checks for the existence of these APIs, and if they do not exist, return null or a loading state which would be prerendered.
Shallow routing on the client</p>
<p>If you are migrating from a strict SPA like Create React App or Vite, you might have existing code which shallow routes to update the URL state. This can be useful for manual transitions between views in your application without using the default Next.js file-system routing.
Next.js allows you to use the native window.history.pushState and window.history.replaceState methods to update the browser's history stack without reloading the page.
pushState and replaceState calls integrate into the Next.js Router, allowing you to sync with usePathname and useSearchParams.
'use client'</p>
<p>import { useSearchParams } from 'next/navigation'</p>
<p>export default function SortProducts() {
const searchParams = useSearchParams()</p>
<p>function updateSorting(sortOrder: string) {
const urlSearchParams = new URLSearchParams(searchParams.toString())
urlSearchParams.set('sort', sortOrder)
window.history.pushState(null, '', <code>?${urlSearchParams.toString()}</code>)
}</p>
<p>return (
&lt;&gt;
&lt;button onClick={() =&gt; updateSorting('asc')}&gt;Sort Ascending&lt;/button&gt;
&lt;button onClick={() =&gt; updateSorting('desc')}&gt;Sort Descending&lt;/button&gt;
&lt;/&gt;
)
}</p>
<p>Learn more about how routing and navigation work in Next.js.
Using Server Actions in client components</p>
<p>You can progressively adopt Server Actions while still using client components. This allows you to remove boilerplate code to call an API route, and instead use React features like useActionState to handle loading and error states.
For example, create your first Server Action:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>export async function create() {}</p>
<p>You can import and use a Server Action from the client, similar to calling a JavaScript function. You do not need to create an API endpoint manually:
app/button.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { create } from './actions'</p>
<p>export function Button() {
return &lt;button onClick={() =&gt; create()}&gt;Create&lt;/button&gt;
}</p>
<p>Learn more about mutating data with Server Actions.
Static export (optional)</p>
<p>Next.js also supports generating a fully static site. This has some advantages over strict SPAs:</p>
<p>Automatic code-splitting: Instead of shipping a single index.html, Next.js will generate an HTML file per route, so your visitors get the content faster without waiting for the client JavaScript bundle.
Improved user experience: Instead of a minimal skeleton for all routes, you get fully rendered pages for each route. When users navigate client side, transitions remain instant and SPA-like.</p>
<p>To enable a static export, update your configuration:
next.config.tsimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
output: 'export',
}</p>
<p>export default nextConfig
After running next build, Next.js will create an out folder with the HTML/CSS/JS assets for your application.</p>
<p>Note: Next.js server features are not supported with static exports. Learn more.</p>
<p>Migrating existing projects to Next.js</p>
<p>You can incrementally migrate to Next.js by following our guides:</p>
<p>Migrating from Create React App
Migrating from Vite</p>
<p>If you are already using a SPA with the Pages Router, you can learn how to incrementally adopt the App Router.Was this helpful?</p>
<p>supported.Send</p>
