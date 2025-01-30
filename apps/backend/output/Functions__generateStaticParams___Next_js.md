# Functions: generateStaticParams | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsgenerateStaticParamsgenerateStaticParamsThe generateStaticParams function can be used in combination with dynamic route segments to statically generate routes at build time instead of on-demand at request time.
app/blog/[slug]/page.tsxTypeScriptJavaScriptTypeScript// Return a list of <code>params</code> to populate the [slug] dynamic segment
export async function generateStaticParams() {
const posts = await fetch('https://.../posts').then((res) =&gt; res.json())</p>
<p>return posts.map((post) =&gt; ({
slug: post.slug,
}))
}</p>
<p>// Multiple versions of this page will be statically generated
// using the <code>params</code> returned by <code>generateStaticParams</code>
export default async function Page({
params,
}: {
params: Promise&lt;{ slug: string }&gt;
}) {
const { slug } = await params
// ...
}</p>
<p>Good to know:</p>
<p>You can use the dynamicParams segment config option to control what happens when a dynamic segment is visited that was not generated with generateStaticParams.
You must return an empty array from generateStaticParams or utilize export const dynamic = 'force-static' in order to revalidate (ISR) paths at runtime.
During next dev, generateStaticParams will be called when you navigate to a route.
During next build, generateStaticParams runs before the corresponding Layouts or Pages are generated.
During revalidation (ISR), generateStaticParams will not be called again.
generateStaticParams replaces the getStaticPaths function in the Pages Router.</p>
<p>Parameters</p>
<p>options.params (optional)
If multiple dynamic segments in a route use generateStaticParams, the child generateStaticParams function is executed once for each set of params the parent generates.
The params object contains the populated params from the parent generateStaticParams, which can be used to generate the params in a child segment.
Returns</p>
<p>generateStaticParams should return an array of objects where each object represents the populated dynamic segments of a single route.</p>
<p>Each property in the object is a dynamic segment to be filled in for the route.
The properties name is the segment's name, and the properties value is what that segment should be filled in with.</p>
<p>Example RoutegenerateStaticParams Return Type/product/[id]{ id: string }[]/products/[category]/[product]{ category: string, product: string }[]/products/[...slug]{ slug: string[] }[]
Single Dynamic Segment</p>
<p>app/product/[id]/page.tsxTypeScriptJavaScriptTypeScriptexport function generateStaticParams() {
return [{ id: '1' }, { id: '2' }, { id: '3' }]
}</p>
<p>// Three versions of this page will be statically generated
// using the <code>params</code> returned by <code>generateStaticParams</code>
// - /product/1
// - /product/2
// - /product/3
export default async function Page({
params,
}: {
params: Promise&lt;{ id: string }&gt;
}) {
const { id } = await params
// ...
}</p>
<p>Multiple Dynamic Segments</p>
<p>app/products/[category]/[product]/page.tsxTypeScriptJavaScriptTypeScriptexport function generateStaticParams() {
return [
{ category: 'a', product: '1' },
{ category: 'b', product: '2' },
{ category: 'c', product: '3' },
]
}</p>
<p>// Three versions of this page will be statically generated
// using the <code>params</code> returned by <code>generateStaticParams</code>
// - /products/a/1
// - /products/b/2
// - /products/c/3
export default async function Page({
params,
}: {
params: Promise&lt;{ category: string; product: string }&gt;
}) {
const { category, product } = await params
// ...
}</p>
<p>Catch-all Dynamic Segment</p>
<p>app/product/[...slug]/page.tsxTypeScriptJavaScriptTypeScriptexport function generateStaticParams() {
return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }]
}</p>
<p>// Three versions of this page will be statically generated
// using the <code>params</code> returned by <code>generateStaticParams</code>
// - /product/a/1
// - /product/b/2
// - /product/c/3
export default async function Page({
params,
}: {
params: Promise&lt;{ slug: string[] }&gt;
}) {
const { slug } = await params
// ...
}</p>
<p>Examples</p>
<p>Static Rendering</p>
<p>All paths at build time</p>
<p>To statically render all paths at build time, supply the full list of paths to generateStaticParams:
app/blog/[slug]/page.tsxTypeScriptJavaScriptTypeScriptexport async function generateStaticParams() {
const posts = await fetch('https://.../posts').then((res) =&gt; res.json())</p>
<p>return posts.map((post) =&gt; ({
slug: post.slug,
}))
}</p>
<p>Subset of paths at build time</p>
<p>To statically render a subset of paths at build time, and the rest the first time they're visited at runtime, return a partial list of paths:
app/blog/[slug]/page.tsxTypeScriptJavaScriptTypeScriptexport async function generateStaticParams() {
const posts = await fetch('https://.../posts').then((res) =&gt; res.json())</p>
<p>// Render the first 10 posts at build time
return posts.slice(0, 10).map((post) =&gt; ({
slug: post.slug,
}))
}</p>
<p>Then, by using the dynamicParams segment config option, you can control what happens when a dynamic segment is visited that was not generated with generateStaticParams.
app/blog/[slug]/page.tsxTypeScriptJavaScriptTypeScript// All posts besides the top 10 will be a 404
export const dynamicParams = false</p>
<p>export async function generateStaticParams() {
const posts = await fetch('https://.../posts').then((res) =&gt; res.json())
const topPosts = posts.slice(0, 10)</p>
<p>return topPosts.map((post) =&gt; ({
slug: post.slug,
}))
}</p>
<p>All paths at runtime</p>
<p>To statically render all paths the first time they're visited, return an empty array (no paths will be rendered at build time) or utilize export const dynamic = 'force-static':
app/blog/[slug]/page.jsexport async function generateStaticParams() {
return []
}</p>
<p>Good to know: You must always return an array from generateStaticParams, even if it's empty. Otherwise, the route will be dynamically rendered.</p>
<p>app/changelog/[slug]/page.jsexport const dynamic = 'force-static'
Disable rendering for unspecified paths</p>
<p>To prevent unspecified paths from being statically rendered at runtime, add the export const dynamicParams = false option in a route segment. When this config option is used, only paths provided by generateStaticParams will be served, and unspecified routes will 404 or match (in the case of catch-all routes).
Multiple Dynamic Segments in a Route</p>
<p>You can generate params for dynamic segments above the current layout or page, but not below. For example, given the app/products/[category]/[product] route:</p>
<p>app/products/[category]/[product]/page.js can generate params for both [category] and [product].
app/products/[category]/layout.js can only generate params for [category].</p>
<p>There are two approaches to generating params for a route with multiple dynamic segments:
Generate params from the bottom up</p>
<p>Generate multiple dynamic segments from the child route segment.
app/products/[category]/[product]/page.tsxTypeScriptJavaScriptTypeScript// Generate segments for both [category] and [product]
export async function generateStaticParams() {
const products = await fetch('https://.../products').then((res) =&gt; res.json())</p>
<p>return products.map((product) =&gt; ({
category: product.category.slug,
product: product.id,
}))
}</p>
<p>export default function Page({
params,
}: {
params: Promise&lt;{ category: string; product: string }&gt;
}) {
// ...
}</p>
<p>Generate params from the top down</p>
<p>Generate the parent segments first and use the result to generate the child segments.
app/products/[category]/layout.tsxTypeScriptJavaScriptTypeScript// Generate segments for [category]
export async function generateStaticParams() {
const products = await fetch('https://.../products').then((res) =&gt; res.json())</p>
<p>return products.map((product) =&gt; ({
category: product.category.slug,
}))
}</p>
<p>export default function Layout({
params,
}: {
params: Promise&lt;{ category: string }&gt;
}) {
// ...
}</p>
<p>A child route segment's generateStaticParams function is executed once for each segment a parent generateStaticParams generates.
The child generateStaticParams function can use the params returned from the parent generateStaticParams function to dynamically generate its own segments.
app/products/[category]/[product]/page.tsxTypeScriptJavaScriptTypeScript// Generate segments for [product] using the <code>params</code> passed from
// the parent segment's <code>generateStaticParams</code> function
export async function generateStaticParams({
params: { category },
}: {
params: { category: string }
}) {
const products = await fetch(
<code>https://.../products?category=${category}</code>
).then((res) =&gt; res.json())</p>
<p>return products.map((product) =&gt; ({
product: product.id,
}))
}</p>
<p>export default function Page({
params,
}: {
params: Promise&lt;{ category: string; product: string }&gt;
}) {
// ...
}</p>
<p>Good to know: fetch requests are automatically memoized for the same data across all generate-prefixed functions, Layouts, Pages, and Server Components. React cache can be used if fetch is unavailable.</p>
<p>Version History</p>
<p>VersionChangesv13.0.0generateStaticParams introduced.Was this helpful?</p>
<p>supported.Send</p>
