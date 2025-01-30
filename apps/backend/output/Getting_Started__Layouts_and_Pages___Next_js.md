# Getting Started: Layouts and Pages | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6App RouterGetting StartedLayouts and PagesHow to create layouts and pagesNext.js uses file-system based routing, meaning you can use folders and files to define routes. This page will guide you through how to create layouts and pages, and link between them.
Creating a page</p>
<p>A page is UI that is rendered on a specific route. To create a page, add a page file inside the app directory and default export a React component. For example, to create an index page (/):</p>
<p>app/page.tsxTypeScriptJavaScriptTypeScriptexport default function Page() {
return &lt;h1&gt;Hello Next.js!&lt;/h1&gt;
}</p>
<p>Creating a layout</p>
<p>A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender.
You can define a layout by default exporting a React component from a layout file. The component should accept a children prop which can be a page or another layout.
For example, to create a layout that accepts your index page as child, add a layout file inside the app directory:</p>
<p>app/layout.tsxTypeScriptJavaScriptTypeScriptexport default function DashboardLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;body&gt;
{/* Layout UI <em>/}
{/</em> Place children where you want to render a page or nested layout */}
&lt;main&gt;{children}&lt;/main&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>The layout above is called a root layout because it's defined at the root of the app directory. The root layout is required and must contain html and body tags.
Creating a nested route</p>
<p>A nested route is a route composed of multiple URL segments. For example, the /blog/[slug] route is composed of three segments:</p>
<p>/ (Root Segment)
blog (Segment)
[slug] (Leaf Segment)</p>
<p>In Next.js:</p>
<p>Folders are used to define the route segments that map to URL segments.
Files (like page and layout) are used to create UI that is shown for a segment.</p>
<p>To create nested routes, you can nest folders inside each other. For example, to add a route for /blog, create a folder called blog in the app directory. Then, to make /blog publicly accessible, add a page file:</p>
<p>app/blog/page.tsxTypeScriptJavaScriptTypeScriptimport { getPosts } from '@/lib/posts'
import { Post } from '@/ui/post'</p>
<p>export default async function Page() {
const posts = await getPosts()</p>
<p>return (
&lt;ul&gt;
{posts.map((post) =&gt; (
&lt;Post key={post.id} post={post} /&gt;
))}
&lt;/ul&gt;
)
}</p>
<p>You can continue nesting folders to create nested routes. For example, to create a route for a specific blog post, create a new [slug] folder inside blog and add a page file:</p>
<p>app/blog/[slug]/page.tsxTypeScriptJavaScriptTypeScriptfunction generateStaticParams() {}</p>
<p>export default function Page() {
return &lt;h1&gt;Hello, Blog Post Page!&lt;/h1&gt;
}</p>
<p>Good to know: Wrapping a folder name in square brackets (e.g. [slug]) creates a special dynamic route segment used to generate multiple pages from data. This is useful for blog posts, product pages, etc.</p>
<p>Nesting layouts</p>
<p>By default, layouts in the folder hierarchy are also nested, which means they wrap child layouts via their children prop. You can nest layouts by adding layout inside specific route segments (folders).
For example, to create a layout for the /blog route, add a new layout file inside the blog folder.</p>
<p>app/blog/layout.tsxTypeScriptJavaScriptTypeScriptexport default function BlogLayout({
children,
}: {
children: React.ReactNode
}) {
return &lt;section&gt;{children}&lt;/section&gt;
}</p>
<p>If you were to combine the two layouts above, the root layout (app/layout.js) would wrap the blog layout (app/blog/layout.js), which would wrap the blog (app/blog/page.js) and blog post page (app/blog/[slug]/page.js).
Linking between pages</p>
<p>You can use the &lt;Link&gt; component to navigate between routes. &lt;Link&gt; is a built-in Next.js component that extends the HTML &lt;a&gt; tag to provide prefetching and client-side navigation.
For example, to generate a list of blog posts, import &lt;Link&gt; from next/link and pass a href prop to the component:
app/ui/post.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default async function Post({ post }) {
const posts = await getPosts()</p>
<p>return (
&lt;ul&gt;
{posts.map((post) =&gt; (
&lt;li key={post.slug}&gt;
&lt;Link href={<code>/blog/${post.slug}</code>}&gt;{post.title}&lt;/Link&gt;
&lt;/li&gt;
))}
&lt;/ul&gt;
)
}</p>
<p>&lt;Link&gt; is the primary and recommended way to navigate between routes in your Next.js application. However, you can also use the useRouter hook for more advanced navigation.API ReferenceLearn more about the features mentioned in this page by reading the API Reference.layout.jsAPI reference for the layout.js file.page.jsAPI reference for the page.js file.LinkEnable fast client-side navigation with the built-in <code>next/link</code> component.Was this helpful?</p>
<p>supported.Send</p>
