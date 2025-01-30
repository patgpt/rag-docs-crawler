# Upgrading: App Router Migration | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationUpgradingApp Router MigrationApp Router Incremental Adoption GuideThis guide will help you:</p>
<p>Update your Next.js application from version 12 to version 13
Upgrade features that work in both the pages and the app directories
Incrementally migrate your existing application from pages to app</p>
<p>Upgrading</p>
<p>Node.js Version</p>
<p>The minimum Node.js version is now v18.17. See the Node.js documentation for more information.
Next.js Version</p>
<p>To update to Next.js version 13, run the following command using your preferred package manager:
Terminalnpm install next@latest react@latest react-dom@latest
ESLint Version</p>
<p>If you're using ESLint, you need to upgrade your ESLint version:
Terminalnpm install -D eslint-config-next@latest</p>
<p>Good to know: You may need to restart the ESLint server in VS Code for the ESLint changes to take effect. Open the Command Palette (cmd+shift+p on Mac; ctrl+shift+p on Windows) and search for ESLint: Restart ESLint Server.</p>
<p>Next Steps</p>
<p>After you've updated, see the following sections for next steps:</p>
<p>Upgrade new features: A guide to help you upgrade to new features such as the improved Image and Link Components.
Migrate from the pages to app directory: A step-by-step guide to help you incrementally migrate from the pages to the app directory.</p>
<p>Upgrading New Features</p>
<p>Next.js 13 introduced the new App Router with new features and conventions. The new Router is available in the app directory and co-exists with the pages directory.
Upgrading to Next.js 13 does not require using the App Router. You can continue using pages with new features that work in both directories, such as the updated Image component, Link component, Script component, and Font optimization.
&lt;Image/&gt; Component</p>
<p>Next.js 12 introduced new improvements to the Image Component with a temporary import: next/future/image. These improvements included less client-side JavaScript, easier ways to extend and style images, better accessibility, and native browser lazy loading.
In version 13, this new behavior is now the default for next/image.
There are two codemods to help you migrate to the new Image Component:</p>
<p>next-image-to-legacy-image codemod: Safely and automatically renames next/image imports to next/legacy/image. Existing components will maintain the same behavior.
next-image-experimental codemod: Dangerously adds inline styles and removes unused props. This will change the behavior of existing components to match the new defaults. To use this codemod, you need to run the next-image-to-legacy-image codemod first.</p>
<p>&lt;Link&gt; Component</p>
<p>The &lt;Link&gt; Component no longer requires manually adding an &lt;a&gt; tag as a child. This behavior was added as an experimental option in version 12.2 and is now the default. In Next.js 13, &lt;Link&gt; always renders &lt;a&gt; and allows you to forward props to the underlying tag.
For example:
import Link from 'next/link'</p>
<p>// Next.js 12: <code>&lt;a&gt;</code> has to be nested otherwise it's excluded
&lt;Link href=&quot;/about&quot;&gt;
&lt;a&gt;About&lt;/a&gt;
&lt;/Link&gt;</p>
<p>// Next.js 13: <code>&lt;Link&gt;</code> always renders <code>&lt;a&gt;</code> under the hood
&lt;Link href=&quot;/about&quot;&gt;
About
&lt;/Link&gt;
To upgrade your links to Next.js 13, you can use the new-link codemod.
&lt;Script&gt; Component</p>
<p>The behavior of next/script has been updated to support both pages and app, but some changes need to be made to ensure a smooth migration:</p>
<p>Move any beforeInteractive scripts you previously included in _document.js to the root layout file (app/layout.tsx).
The experimental worker strategy does not yet work in app and scripts denoted with this strategy will either have to be removed or modified to use a different strategy (e.g. lazyOnload).
onLoad, onReady, and onError handlers will not work in Server Components so make sure to move them to a Client Component or remove them altogether.</p>
<p>Font Optimization</p>
<p>Previously, Next.js helped you optimize fonts by inlining font CSS. Version 13 introduces the new next/font module which gives you the ability to customize your font loading experience while still ensuring great performance and privacy. next/font is supported in both the pages and app directories.
While inlining CSS still works in pages, it does not work in app. You should use next/font instead.
See the Font Optimization page to learn how to use next/font.
Migrating from pages to app</p>
<p>🎥 Watch: Learn how to incrementally adopt the App Router → YouTube (16 minutes).</p>
<p>Moving to the App Router may be the first time using React features that Next.js builds on top of such as Server Components, Suspense, and more. When combined with new Next.js features such as special files and layouts, migration means new concepts, mental models, and behavioral changes to learn.
We recommend reducing the combined complexity of these updates by breaking down your migration into smaller steps. The app directory is intentionally designed to work simultaneously with the pages directory to allow for incremental page-by-page migration.</p>
<p>The app directory supports nested routes and layouts. Learn more.
Use nested folders to define routes and a special page.js file to make a route segment publicly accessible. Learn more.
Special file conventions are used to create UI for each route segment. The most common special files are page.js and layout.js.</p>
<p>Use page.js to define UI unique to a route.
Use layout.js to define UI that is shared across multiple routes.
.js, .jsx, or .tsx file extensions can be used for special files.</p>
<p>You can colocate other files inside the app directory such as components, styles, tests, and more. Learn more.
Data fetching functions like getServerSideProps and getStaticProps have been replaced with a new API inside app. getStaticPaths has been replaced with generateStaticParams.
pages/_app.js and pages/_document.js have been replaced with a single app/layout.js root layout. Learn more.
pages/_error.js has been replaced with more granular error.js special files. Learn more.
pages/404.js has been replaced with the not-found.js file.
pages/api/* API Routes have been replaced with the route.js (Route Handler) special file.</p>
<p>Step 1: Creating the app directory</p>
<p>Update to the latest Next.js version (requires 13.4 or greater):
npm install next@latest
Then, create a new app directory at the root of your project (or src/ directory).
Step 2: Creating a Root Layout</p>
<p>Create a new app/layout.tsx file inside the app directory. This is a root layout that will apply to all routes inside app.
app/layout.tsxTypeScriptJavaScriptTypeScriptexport default function RootLayout({
// Layouts must accept a children prop.
// This will be populated with nested layouts or pages
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
<p>The app directory must include a root layout.
The root layout must define &lt;html&gt;, and &lt;body&gt; tags since Next.js does not automatically create them
The root layout replaces the pages/_app.tsx and pages/_document.tsx files.
.js, .jsx, or .tsx extensions can be used for layout files.</p>
<p>To manage &lt;head&gt; HTML elements, you can use the built-in SEO support:
app/layout.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
title: 'Home',
description: 'Welcome to Next.js',
}</p>
<p>Migrating _document.js and _app.js</p>
<p>If you have an existing _app or _document file, you can copy the contents (e.g. global styles) to the root layout (app/layout.tsx). Styles in app/layout.tsx will not apply to pages/<em>. You should keep _app/_document while migrating to prevent your pages/</em> routes from breaking. Once fully migrated, you can then safely delete them.
If you are using any React Context providers, they will need to be moved to a Client Component.
Migrating the getLayout() pattern to Layouts (Optional)</p>
<p>Next.js recommended adding a property to Page components to achieve per-page layouts in the pages directory. This pattern can be replaced with native support for nested layouts in the app directory.
See before and after exampleBeforecomponents/DashboardLayout.jsexport default function DashboardLayout({ children }) {
return (
&lt;div&gt;
&lt;h2&gt;My Dashboard&lt;/h2&gt;
{children}
&lt;/div&gt;
)
}pages/dashboard/index.jsimport DashboardLayout from '../components/DashboardLayout'</p>
<p>export default function Page() {
return &lt;p&gt;My Page&lt;/p&gt;
}</p>
<p>Page.getLayout = function getLayout(page) {
return &lt;DashboardLayout&gt;{page}&lt;/DashboardLayout&gt;
}After</p>
<p>Remove the Page.getLayout property from pages/dashboard/index.js and follow the steps for migrating pages to the app directory.
app/dashboard/page.jsexport default function Page() {
return &lt;p&gt;My Page&lt;/p&gt;
}</p>
<p>Move the contents of DashboardLayout into a new Client Component to retain pages directory behavior.
app/dashboard/DashboardLayout.js'use client' // this directive should be at top of the file, before any imports.</p>
<p>// This is a Client Component
export default function DashboardLayout({ children }) {
return (
&lt;div&gt;
&lt;h2&gt;My Dashboard&lt;/h2&gt;
{children}
&lt;/div&gt;
)
}</p>
<p>Import the DashboardLayout into a new layout.js file inside the app directory.
app/dashboard/layout.jsimport DashboardLayout from './DashboardLayout'</p>
<p>// This is a Server Component
export default function Layout({ children }) {
return &lt;DashboardLayout&gt;{children}&lt;/DashboardLayout&gt;
}</p>
<p>You can incrementally move non-interactive parts of DashboardLayout.js (Client Component) into layout.js (Server Component) to reduce the amount of component JavaScript you send to the client.</p>
<p>Step 3: Migrating next/head</p>
<p>In the pages directory, the next/head React component is used to manage &lt;head&gt; HTML elements such as title and meta . In the app directory, next/head is replaced with the new built-in SEO support.
Before:
pages/index.tsxTypeScriptJavaScriptTypeScriptimport Head from 'next/head'</p>
<p>export default function Page() {
return (
&lt;&gt;
&lt;Head&gt;
&lt;title&gt;My page title&lt;/title&gt;
&lt;/Head&gt;
&lt;/&gt;
)
}</p>
<p>After:
app/page.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
title: 'My Page Title',
}</p>
<p>export default function Page() {
return '...'
}</p>
<p>See all metadata options.
Step 4: Migrating Pages</p>
<p>Pages in the app directory are Server Components by default. This is different from the pages directory where pages are Client Components.
Data fetching has changed in app. getServerSideProps, getStaticProps and getInitialProps have been replaced with a simpler API.
The app directory uses nested folders to define routes and a special page.js file to make a route segment publicly accessible.</p>
<p>pages Directoryapp DirectoryRouteindex.jspage.js/about.jsabout/page.js/aboutblog/[slug].jsblog/[slug]/page.js/blog/post-1</p>
<p>We recommend breaking down the migration of a page into two main steps:</p>
<p>Step 1: Move the default exported Page Component into a new Client Component.
Step 2: Import the new Client Component into a new page.js file inside the app directory.</p>
<p>Good to know: This is the easiest migration path because it has the most comparable behavior to the pages directory.</p>
<p>Step 1: Create a new Client Component</p>
<p>Create a new separate file inside the app directory (i.e. app/home-page.tsx or similar) that exports a Client Component. To define Client Components, add the 'use client' directive to the top of the file (before any imports).</p>
<p>Similar to the Pages Router, there is an optimization step to prerender Client Components to static HTML on the initial page load.</p>
<p>Move the default exported page component from pages/index.js to app/home-page.tsx.</p>
<p>app/home-page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>// This is a Client Component (same as components in the <code>pages</code> directory)
// It receives data as props, has access to state and effects, and is
// prerendered on the server during the initial page load.
export default function HomePage({ recentPosts }) {
return (
&lt;div&gt;
{recentPosts.map((post) =&gt; (
&lt;div key={post.id}&gt;{post.title}&lt;/div&gt;
))}
&lt;/div&gt;
)
}</p>
<p>Step 2: Create a new page</p>
<p>Create a new app/page.tsx file inside the app directory. This is a Server Component by default.</p>
<p>Import the home-page.tsx Client Component into the page.</p>
<p>If you were fetching data in pages/index.js, move the data fetching logic directly into the Server Component using the new data fetching APIs. See the data fetching upgrade guide for more details.
app/page.tsxTypeScriptJavaScriptTypeScript// Import your Client Component
import HomePage from './home-page'</p>
<p>async function getPosts() {
const res = await fetch('https://...')
const posts = await res.json()
return posts
}</p>
<p>export default async function Page() {
// Fetch data directly in a Server Component
const recentPosts = await getPosts()
// Forward fetched data to your Client Component
return &lt;HomePage recentPosts={recentPosts} /&gt;
}</p>
<p>If your previous page used useRouter, you'll need to update to the new routing hooks. Learn more.</p>
<p>Start your development server and visit http://localhost:3000. You should see your existing index route, now served through the app directory.</p>
<p>Step 5: Migrating Routing Hooks</p>
<p>A new router has been added to support the new behavior in the app directory.
In app, you should use the three new hooks imported from next/navigation: useRouter(), usePathname(), and useSearchParams().</p>
<p>The new useRouter hook is imported from next/navigation and has different behavior to the useRouter hook in pages which is imported from next/router.</p>
<p>The useRouter hook imported from next/router is not supported in the app directory but can continue to be used in the pages directory.</p>
<p>The new useRouter does not return the pathname string. Use the separate usePathname hook instead.
The new useRouter does not return the query object. Search parameters and dynamic route parameters are now separate. Use the useSearchParams and useParams hooks instead.
You can use useSearchParams and usePathname together to listen to page changes. See the Router Events section for more details.
These new hooks are only supported in Client Components. They cannot be used in Server Components.</p>
<p>app/example-client-component.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useRouter, usePathname, useSearchParams } from 'next/navigation'</p>
<p>export default function ExampleClientComponent() {
const router = useRouter()
const pathname = usePathname()
const searchParams = useSearchParams()</p>
<p>// ...
}</p>
<p>In addition, the new useRouter hook has the following changes:</p>
<p>isFallback has been removed because fallback has been replaced.
The locale, locales, defaultLocales, domainLocales values have been removed because built-in i18n Next.js features are no longer necessary in the app directory. Learn more about i18n.
basePath has been removed. The alternative will not be part of useRouter. It has not yet been implemented.
asPath has been removed because the concept of as has been removed from the new router.
isReady has been removed because it is no longer necessary. During static rendering, any component that uses the useSearchParams() hook will skip the prerendering step and instead be rendered on the client at runtime.
route has been removed. usePathname or useSelectedLayoutSegments() provide an alternative.</p>
<p>View the useRouter() API reference.
Sharing components between pages and app</p>
<p>To keep components compatible between the pages and app routers, refer to the useRouter hook from next/compat/router.
This is the useRouter hook from the pages directory, but intended to be used while sharing components between routers. Once you are ready to use it only on the app router, update to the new useRouter from next/navigation.
Step 6: Migrating Data Fetching Methods</p>
<p>The pages directory uses getServerSideProps and getStaticProps to fetch data for pages. Inside the app directory, these previous data fetching functions are replaced with a simpler API built on top of fetch() and async React Server Components.
app/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page() {
// This request should be cached until manually invalidated.
// Similar to <code>getStaticProps</code>.
// <code>force-cache</code> is the default and can be omitted.
const staticData = await fetch(<code>https://...</code>, { cache: 'force-cache' })</p>
<p>// This request should be refetched on every request.
// Similar to <code>getServerSideProps</code>.
const dynamicData = await fetch(<code>https://...</code>, { cache: 'no-store' })</p>
<p>// This request should be cached with a lifetime of 10 seconds.
// Similar to <code>getStaticProps</code> with the <code>revalidate</code> option.
const revalidatedData = await fetch(<code>https://...</code>, {
next: { revalidate: 10 },
})</p>
<p>return &lt;div&gt;...&lt;/div&gt;
}</p>
<p>Server-side Rendering (getServerSideProps)</p>
<p>In the pages directory, getServerSideProps is used to fetch data on the server and forward props to the default exported React component in the file. The initial HTML for the page is prerendered from the server, followed by &quot;hydrating&quot; the page in the browser (making it interactive).
pages/dashboard.js// <code>pages</code> directory</p>
<p>export async function getServerSideProps() {
const res = await fetch(<code>https://...</code>)
const projects = await res.json()</p>
<p>return { props: { projects } }
}</p>
<p>export default function Dashboard({ projects }) {
return (
&lt;ul&gt;
{projects.map((project) =&gt; (
&lt;li key={project.id}&gt;{project.name}&lt;/li&gt;
))}
&lt;/ul&gt;
)
}
In the App Router, we can colocate our data fetching inside our React components using Server Components. This allows us to send less JavaScript to the client, while maintaining the rendered HTML from the server.
By setting the cache option to no-store, we can indicate that the fetched data should never be cached. This is similar to getServerSideProps in the pages directory.
app/dashboard/page.tsxTypeScriptJavaScriptTypeScript// <code>app</code> directory</p>
<p>// This function can be named anything
async function getProjects() {
const res = await fetch(<code>https://...</code>, { cache: 'no-store' })
const projects = await res.json()</p>
<p>return projects
}</p>
<p>export default async function Dashboard() {
const projects = await getProjects()</p>
<p>return (
&lt;ul&gt;
{projects.map((project) =&gt; (
&lt;li key={project.id}&gt;{project.name}&lt;/li&gt;
))}
&lt;/ul&gt;
)
}</p>
<p>Accessing Request Object</p>
<p>In the pages directory, you can retrieve request-based data based on the Node.js HTTP API.
For example, you can retrieve the req object from getServerSideProps and use it to retrieve the request's cookies and headers.
pages/index.js// <code>pages</code> directory</p>
<p>export async function getServerSideProps({ req, query }) {
const authHeader = req.getHeaders()['authorization'];
const theme = req.cookies['theme'];</p>
<p>return { props: { ... }}
}</p>
<p>export default function Page(props) {
return ...
}
The app directory exposes new read-only functions to retrieve request data:</p>
<p>headers: Based on the Web Headers API, and can be used inside Server Components to retrieve request headers.
cookies: Based on the Web Cookies API, and can be used inside Server Components to retrieve cookies.</p>
<p>app/page.tsxTypeScriptJavaScriptTypeScript// <code>app</code> directory
import { cookies, headers } from 'next/headers'</p>
<p>async function getData() {
const authHeader = (await headers()).get('authorization')</p>
<p>return '...'
}</p>
<p>export default async function Page() {
// You can use <code>cookies</code> or <code>headers</code> inside Server Components
// directly or in your data fetching function
const theme = (await cookies()).get('theme')
const data = await getData()
return '...'
}</p>
<p>Static Site Generation (getStaticProps)</p>
<p>In the pages directory, the getStaticProps function is used to pre-render a page at build time. This function can be used to fetch data from an external API or directly from a database, and pass this data down to the entire page as it's being generated during the build.
pages/index.js// <code>pages</code> directory</p>
<p>export async function getStaticProps() {
const res = await fetch(<code>https://...</code>)
const projects = await res.json()</p>
<p>return { props: { projects } }
}</p>
<p>export default function Index({ projects }) {
return projects.map((project) =&gt; &lt;div&gt;{project.name}&lt;/div&gt;)
}
In the app directory, data fetching with fetch() will default to cache: 'force-cache', which will cache the request data until manually invalidated. This is similar to getStaticProps in the pages directory.
app/page.js// <code>app</code> directory</p>
<p>// This function can be named anything
async function getProjects() {
const res = await fetch(<code>https://...</code>)
const projects = await res.json()</p>
<p>return projects
}</p>
<p>export default async function Index() {
const projects = await getProjects()</p>
<p>return projects.map((project) =&gt; &lt;div&gt;{project.name}&lt;/div&gt;)
}
Dynamic paths (getStaticPaths)</p>
<p>In the pages directory, the getStaticPaths function is used to define the dynamic paths that should be pre-rendered at build time.
pages/posts/[id].js// <code>pages</code> directory
import PostLayout from '@/components/post-layout'</p>
<p>export async function getStaticPaths() {
return {
paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
}
}</p>
<p>export async function getStaticProps({ params }) {
const res = await fetch(<code>https://.../posts/${params.id}</code>)
const post = await res.json()</p>
<p>return { props: { post } }
}</p>
<p>export default function Post({ post }) {
return &lt;PostLayout post={post} /&gt;
}
In the app directory, getStaticPaths is replaced with generateStaticParams.
generateStaticParams behaves similarly to getStaticPaths, but has a simplified API for returning route parameters and can be used inside layouts. The return shape of generateStaticParams is an array of segments instead of an array of nested param objects or a string of resolved paths.
app/posts/[id]/page.js// <code>app</code> directory
import PostLayout from '@/components/post-layout'</p>
<p>export async function generateStaticParams() {
return [{ id: '1' }, { id: '2' }]
}</p>
<p>async function getPost(params) {
const res = await fetch(<code>https://.../posts/${(await params).id}</code>)
const post = await res.json()</p>
<p>return post
}</p>
<p>export default async function Post({ params }) {
const post = await getPost(params)</p>
<p>return &lt;PostLayout post={post} /&gt;
}
Using the name generateStaticParams is more appropriate than getStaticPaths for the new model in the app directory. The get prefix is replaced with a more descriptive generate, which sits better alone now that getStaticProps and getServerSideProps are no longer necessary. The Paths suffix is replaced by Params, which is more appropriate for nested routing with multiple dynamic segments.</p>
<p>Replacing fallback</p>
<p>In the pages directory, the fallback property returned from getStaticPaths is used to define the behavior of a page that isn't pre-rendered at build time. This property can be set to true to show a fallback page while the page is being generated, false to show a 404 page, or blocking to generate the page at request time.
pages/posts/[id].js// <code>pages</code> directory</p>
<p>export async function getStaticPaths() {
return {
paths: [],
fallback: 'blocking'
};
}</p>
<p>export async function getStaticProps({ params }) {
...
}</p>
<p>export default function Post({ post }) {
return ...
}
In the app directory the config.dynamicParams property controls how params outside of generateStaticParams are handled:</p>
<p>true: (default) Dynamic segments not included in generateStaticParams are generated on demand.
false: Dynamic segments not included in generateStaticParams will return a 404.</p>
<p>This replaces the fallback: true | false | 'blocking' option of getStaticPaths in the pages directory. The fallback: 'blocking' option is not included in dynamicParams because the difference between 'blocking' and true is negligible with streaming.
app/posts/[id]/page.js// <code>app</code> directory</p>
<p>export const dynamicParams = true;</p>
<p>export async function generateStaticParams() {
return [...]
}</p>
<p>async function getPost(params) {
...
}</p>
<p>export default async function Post({ params }) {
const post = await getPost(params);</p>
<p>return ...
}
With dynamicParams set to true (the default), when a route segment is requested that hasn't been generated, it will be server-rendered and cached.
Incremental Static Regeneration (getStaticProps with revalidate)</p>
<p>In the pages directory, the getStaticProps function allows you to add a revalidate field to automatically regenerate a page after a certain amount of time.
pages/index.js// <code>pages</code> directory</p>
<p>export async function getStaticProps() {
const res = await fetch(<code>https://.../posts</code>)
const posts = await res.json()</p>
<p>return {
props: { posts },
revalidate: 60,
}
}</p>
<p>export default function Index({ posts }) {
return (
&lt;Layout&gt;
&lt;PostList posts={posts} /&gt;
&lt;/Layout&gt;
)
}
In the app directory, data fetching with fetch() can use revalidate, which will cache the request for the specified amount of seconds.
app/page.js// <code>app</code> directory</p>
<p>async function getPosts() {
const res = await fetch(<code>https://.../posts</code>, { next: { revalidate: 60 } })
const data = await res.json()</p>
<p>return data.posts
}</p>
<p>export default async function PostList() {
const posts = await getPosts()</p>
<p>return posts.map((post) =&gt; &lt;div&gt;{post.name}&lt;/div&gt;)
}
API Routes</p>
<p>API Routes continue to work in the pages/api directory without any changes. However, they have been replaced by Route Handlers in the app directory.
Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.
app/api/route.tsTypeScriptJavaScriptTypeScriptexport async function GET(request: Request) {}</p>
<p>Good to know: If you previously used API routes to call an external API from the client, you can now use Server Components instead to securely fetch data. Learn more about data fetching.</p>
<p>Single-Page Applications</p>
<p>If you are also migrating to Next.js from a Single-Page Application (SPA) at the same time, see our documentation to learn more.
Step 7: Styling</p>
<p>In the pages directory, global stylesheets are restricted to only pages/_app.js. With the app directory, this restriction has been lifted. Global styles can be added to any layout, page, or component.</p>
<p>CSS Modules
Tailwind CSS
Global Styles
CSS-in-JS
External Stylesheets
Sass</p>
<p>Tailwind CSS</p>
<p>If you're using Tailwind CSS, you'll need to add the app directory to your tailwind.config.js file:
tailwind.config.jsmodule.exports = {
content: [
'./app/<strong>/*.{js,ts,jsx,tsx,mdx}', // &lt;-- Add this line
'./pages/</strong>/<em>.{js,ts,jsx,tsx,mdx}',
'./components/**/</em>.{js,ts,jsx,tsx,mdx}',
],
}
You'll also need to import your global styles in your app/layout.js file:
app/layout.jsimport '../styles/globals.css'</p>
<p>export default function RootLayout({ children }) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}
Learn more about styling with Tailwind CSS
Using App Router together with Pages Router</p>
<p>When navigating between routes served by the different Next.js routers, there will be a hard navigation. Automatic link prefetching with next/link will not prefetch across routers.
Instead, you can optimize navigations between App Router and Pages Router to retain the prefetched and fast page transitions. Learn more.
Codemods</p>
<p>Next.js provides Codemod transformations to help upgrade your codebase when a feature is deprecated. See Codemods for more information.Was this helpful?</p>
<p>supported.Send</p>
