# File Conventions: page.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionspage.jspage.jsThe page file allows you to define UI that is unique to a route. You can create a page by default exporting a component from the file:
app/blog/[slug]/page.tsxTypeScriptJavaScriptTypeScriptexport default function Page({
params,
searchParams,
}: {
params: Promise&lt;{ slug: string }&gt;
searchParams: Promise&lt;{ [key: string]: string | string[] | undefined }&gt;
}) {
return &lt;h1&gt;My Page&lt;/h1&gt;
}</p>
<p>Good to know</p>
<p>The .js, .jsx, or .tsx file extensions can be used for page.
A page is always the leaf of the route subtree.
A page file is required to make a route segment publicly accessible.
Pages are Server Components by default, but can be set to a Client Component.</p>
<p>Reference</p>
<p>Props</p>
<p>params (optional)</p>
<p>A promise that resolves to an object containing the dynamic route parameters from the root segment down to that page.
app/shop/[slug]/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page({
params,
}: {
params: Promise&lt;{ slug: string }&gt;
}) {
const slug = (await params).slug
}</p>
<p>Example RouteURLparamsapp/shop/[slug]/page.js/shop/1Promise&lt;{ slug: '1' }&gt;app/shop/[category]/[item]/page.js/shop/1/2Promise&lt;{ category: '1', item: '2' }&gt;app/shop/[...slug]/page.js/shop/1/2Promise&lt;{ slug: ['1', '2'] }&gt;</p>
<p>Since the params prop is a promise. You must use async/await or React's use function to access the values.</p>
<p>In version 14 and earlier, params was a synchronous prop. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.</p>
<p>searchParams (optional)</p>
<p>A promise that resolves to an object containing the search parameters of the current URL. For example:
app/shop/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page({
searchParams,
}: {
searchParams: Promise&lt;{ [key: string]: string | string[] | undefined }&gt;
}) {
const filters = (await searchParams).filters
}</p>
<p>Example URLsearchParams/shop?a=1Promise&lt;{ a: '1' }&gt;/shop?a=1&amp;b=2Promise&lt;{ a: '1', b: '2' }&gt;/shop?a=1&amp;a=2Promise&lt;{ a: ['1', '2'] }&gt;</p>
<p>Since the searchParams prop is a promise. You must use async/await or React's use function to access the values.</p>
<p>In version 14 and earlier, searchParams was a synchronous prop. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.</p>
<p>searchParams is a Dynamic API whose values cannot be known ahead of time. Using it will opt the page into dynamic rendering at request time.
searchParams is a plain JavaScript object, not a URLSearchParams instance.</p>
<p>Examples</p>
<p>Displaying content based on params</p>
<p>Using dynamic route segments, you can display or fetch specific content for the page based on the params prop.
app/blog/[slug]/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page({
params,
}: {
params: Promise&lt;{ slug: string }&gt;
}) {
const { slug } = await params
return &lt;h1&gt;Blog Post: {slug}&lt;/h1&gt;
}</p>
<p>Handling filtering with searchParams</p>
<p>You can use the searchParams prop to handle filtering, pagination, or sorting based on the query string of the URL.
app/shop/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page({
searchParams,
}: {
searchParams: Promise&lt;{ [key: string]: string | string[] | undefined }&gt;
}) {
const { page = '1', sort = 'asc', query = '' } = await searchParams</p>
<p>return (
&lt;div&gt;
&lt;h1&gt;Product Listing&lt;/h1&gt;
&lt;p&gt;Search query: {query}&lt;/p&gt;
&lt;p&gt;Current page: {page}&lt;/p&gt;
&lt;p&gt;Sort order: {sort}&lt;/p&gt;
&lt;/div&gt;
)
}</p>
<p>Reading searchParams and params in Client Components</p>
<p>To use searchParams and params in a Client Component (which cannot be async), you can use React's use function to read the promise:
app/page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { use } from 'react'</p>
<p>export default function Page({
params,
searchParams,
}: {
params: Promise&lt;{ slug: string }&gt;
searchParams: Promise&lt;{ [key: string]: string | string[] | undefined }&gt;
}) {
const { slug } = use(params)
const { query } = use(searchParams)
}</p>
<p>Version History</p>
<p>VersionChangesv15.0.0-RCparams and searchParams are now promises. A codemod is available.v13.0.0page introduced.Was this helpful?</p>
<p>supported.Send</p>
