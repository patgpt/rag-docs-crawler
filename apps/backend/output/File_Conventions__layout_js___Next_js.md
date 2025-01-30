# File Conventions: layout.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionslayout.jslayout.jsThe layout file is used to define a layout in your Next.js application.
app/dashboard/layout.tsxTypeScriptJavaScriptTypeScriptexport default function DashboardLayout({
children,
}: {
children: React.ReactNode
}) {
return &lt;section&gt;{children}&lt;/section&gt;
}</p>
<p>A root layout is the top-most layout in the root app directory. It is used to define the &lt;html&gt; and &lt;body&gt; tags and other globally shared UI.
app/layout.tsxTypeScriptJavaScriptTypeScriptexport default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>Reference</p>
<p>Props</p>
<p>children (required)</p>
<p>Layout components should accept and use a children prop. During rendering, children will be populated with the route segments the layout is wrapping. These will primarily be the component of a child Layout (if it exists) or Page, but could also be other special files like Loading or Error when applicable.
params (optional)</p>
<p>A promise that resolves to an object containing the dynamic route parameters object from the root segment down to that layout.
app/dashboard/[team]/layout.tsxTypeScriptJavaScriptTypeScriptexport default async function Layout({
params,
}: {
params: Promise&lt;{ team: string }&gt;
}) {
const team = (await params).team
}</p>
<p>Example RouteURLparamsapp/dashboard/[team]/layout.js/dashboard/1Promise&lt;{ team: '1' }&gt;app/shop/[tag]/[item]/layout.js/shop/1/2Promise&lt;{ tag: '1', item: '2' }&gt;app/blog/[...slug]/layout.js/blog/1/2Promise&lt;{ slug: ['1', '2'] }&gt;</p>
<p>Since the params prop is a promise. You must use async/await or React's use function to access the values.</p>
<p>In version 14 and earlier, params was a synchronous prop. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.</p>
<p>Root Layouts</p>
<p>The app directory must include a root app/layout.js.
app/layout.tsxTypeScriptJavaScriptTypeScriptexport default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>The root layout must define &lt;html&gt; and &lt;body&gt; tags.</p>
<p>You should not manually add &lt;head&gt; tags such as &lt;title&gt; and &lt;meta&gt; to root layouts. Instead, you should use the Metadata API which automatically handles advanced requirements such as streaming and de-duplicating &lt;head&gt; elements.</p>
<p>You can use route groups to create multiple root layouts.</p>
<p>Navigating across multiple root layouts will cause a full page load (as opposed to a client-side navigation). For example, navigating from /cart that uses app/(shop)/layout.js to /blog that uses app/(marketing)/layout.js will cause a full page load. This only applies to multiple root layouts.</p>
<p>Caveats</p>
<p>Layouts do not receive searchParams</p>
<p>Unlike Pages, Layout components do not receive the searchParams prop. This is because a shared layout is not re-rendered during navigation which could lead to stale searchParams between navigations.
When using client-side navigation, Next.js automatically only renders the part of the page below the common layout between two routes.
For example, in the following directory structure, dashboard/layout.tsx is the common layout for both /dashboard/settings and /dashboard/analytics:</p>
<p>When navigating from /dashboard/settings to /dashboard/analytics, page.tsx in /dashboard/analytics will rerender on the server, while dashboard/layout.tsx will not rerender because it's a common UI shared between the two routes.
This performance optimization allows navigation between pages that share a layout to be quicker as only the data fetching and rendering for the page has to run, instead of the entire route that could include shared layouts that fetch their own data.
Because dashboard/layout.tsx doesn't re-render, the searchParams prop in the layout Server Component might become stale after navigation.
Instead, use the Page searchParams prop or the useSearchParams hook in a Client Component within the layout, which is rerendered on the client with the latest searchParams.
Layouts cannot access pathname</p>
<p>Layouts cannot access pathname. This is because layouts are Server Components by default, and don't rerender during client-side navigation, which could lead to pathname becoming stale between navigations. To prevent staleness, Next.js would need to refetch all segments of a route, losing the benefits of caching and increasing the RSC payload size on navigation.
Instead, you can extract the logic that depends on pathname into a Client Component and import it into your layouts. Since Client Components rerender (but are not refetched) during navigation, you can use Next.js hooks such as usePathname to access the current pathname and prevent staleness.
app/dashboard/layout.tsxTypeScriptJavaScriptTypeScriptimport { ClientComponent } from '@/app/ui/ClientComponent'</p>
<p>export default function Layout({ children }: { children: React.ReactNode }) {
return (
&lt;&gt;
&lt;ClientComponent /&gt;
{/* Other Layout UI */}
&lt;main&gt;{children}&lt;/main&gt;
&lt;/&gt;
)
}</p>
<p>Common pathname patterns can also be implemented with params prop.
See the examples section for more information.
Examples</p>
<p>Displaying content based on params</p>
<p>Using dynamic route segments, you can display or fetch specific content based on the params prop.
app/dashboard/layout.tsxTypeScriptJavaScriptTypeScriptexport default async function DashboardLayout({
children,
params,
}: {
children: React.ReactNode
params: Promise&lt;{ team: string }&gt;
}) {
const { team } = await params</p>
<p>return (
&lt;section&gt;
&lt;header&gt;
&lt;h1&gt;Welcome to {team}'s Dashboard&lt;/h1&gt;
&lt;/header&gt;
&lt;main&gt;{children}&lt;/main&gt;
&lt;/section&gt;
)
}</p>
<p>Reading params in Client Components</p>
<p>To use params in a Client Component (which cannot be async), you can use React's use function to read the promise:
app/page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { use } from 'react'</p>
<p>export default function Page({
params,
}: {
params: Promise&lt;{ slug: string }&gt;
}) {
const { slug } = use(params)
}</p>
<p>Version History</p>
<p>VersionChangesv15.0.0-RCparams is now a promise. A codemod is available.v13.0.0layout introduced.Was this helpful?</p>
<p>supported.Send</p>
