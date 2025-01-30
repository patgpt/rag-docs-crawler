# Routing: Dynamic Routes | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRoutingDynamic RoutesDynamic RoutesWhen you don't know the exact segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time or prerendered at build time.
Convention</p>
<p>A Dynamic Segment can be created by wrapping a folder's name in square brackets: [folderName]. For example, [id] or [slug].
Dynamic Segments are passed as the params prop to layout, page, route, and generateMetadata functions.
Example</p>
<p>For example, a blog could include the following route app/blog/[slug]/page.js where [slug] is the Dynamic Segment for blog posts.
app/blog/[slug]/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page({
params,
}: {
params: Promise&lt;{ slug: string }&gt;
}) {
const slug = (await params).slug
return &lt;div&gt;My Post: {slug}&lt;/div&gt;
}</p>
<p>RouteExample URLparamsapp/blog/[slug]/page.js/blog/a{ slug: 'a' }app/blog/[slug]/page.js/blog/b{ slug: 'b' }app/blog/[slug]/page.js/blog/c{ slug: 'c' }
See the generateStaticParams() page to learn how to generate the params for the segment.
Good to know</p>
<p>Since the params prop is a promise. You must use async/await or React's use function to access the values.</p>
<p>In version 14 and earlier, params was a synchronous prop. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.</p>
<p>Dynamic Segments are equivalent to Dynamic Routes in the pages directory.</p>
<p>Generating Static Params</p>
<p>The generateStaticParams function can be used in combination with dynamic route segments to statically generate routes at build time instead of on-demand at request time.
app/blog/[slug]/page.tsxTypeScriptJavaScriptTypeScriptexport async function generateStaticParams() {
const posts = await fetch('https://.../posts').then((res) =&gt; res.json())</p>
<p>return posts.map((post) =&gt; ({
slug: post.slug,
}))
}</p>
<p>The primary benefit of the generateStaticParams function is its smart retrieval of data. If content is fetched within the generateStaticParams function using a fetch request, the requests are automatically memoized. This means a fetch request with the same arguments across multiple generateStaticParams, Layouts, and Pages will only be made once, which decreases build times.
Use the migration guide if you are migrating from the pages directory.
See generateStaticParams server function documentation for more information and advanced use cases.
Catch-all Segments</p>
<p>Dynamic Segments can be extended to catch-all subsequent segments by adding an ellipsis inside the brackets [...folderName].
For example, app/shop/[...slug]/page.js will match /shop/clothes, but also /shop/clothes/tops, /shop/clothes/tops/t-shirts, and so on.
RouteExample URLparamsapp/shop/[...slug]/page.js/shop/a{ slug: ['a'] }app/shop/[...slug]/page.js/shop/a/b{ slug: ['a', 'b'] }app/shop/[...slug]/page.js/shop/a/b/c{ slug: ['a', 'b', 'c'] }
Optional Catch-all Segments</p>
<p>Catch-all Segments can be made optional by including the parameter in double square brackets: [[...folderName]].
For example, app/shop/[[...slug]]/page.js will also match /shop, in addition to /shop/clothes, /shop/clothes/tops, /shop/clothes/tops/t-shirts.
The difference between catch-all and optional catch-all segments is that with optional, the route without the parameter is also matched (/shop in the example above).
RouteExample URLparamsapp/shop/[[...slug]]/page.js/shop{ slug: undefined }app/shop/[[...slug]]/page.js/shop/a{ slug: ['a'] }app/shop/[[...slug]]/page.js/shop/a/b{ slug: ['a', 'b'] }app/shop/[[...slug]]/page.js/shop/a/b/c{ slug: ['a', 'b', 'c'] }
TypeScript</p>
<p>When using TypeScript, you can add types for params depending on your configured route segment.
app/blog/[slug]/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page({
params,
}: {
params: Promise&lt;{ slug: string }&gt;
}) {
return &lt;h1&gt;My Page&lt;/h1&gt;
}</p>
<p>Routeparams Type Definitionapp/blog/[slug]/page.js{ slug: string }app/shop/[...slug]/page.js{ slug: string[] }app/shop/[[...slug]]/page.js{ slug?: string[] }app/[categoryId]/[itemId]/page.js{ categoryId: string, itemId: string }</p>
<p>Good to know: This may be done automatically by the TypeScript plugin in the future.
Next StepsFor more information on what to do next, we recommend the following sectionsLinking and NavigatingLearn how navigation works in Next.js, and how to use the Link Component and <code>useRouter</code> hook.generateStaticParamsAPI reference for the generateStaticParams function.Was this helpful?</p>
<p>supported.Send</p>
