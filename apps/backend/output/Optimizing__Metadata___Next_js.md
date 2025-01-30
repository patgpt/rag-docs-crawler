# Optimizing: Metadata | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationOptimizingMetadataMetadataNext.js has a Metadata API that can be used to define your application metadata (e.g. meta and link tags inside your HTML head element) for improved SEO and web shareability.
There are two ways you can add metadata to your application:</p>
<p>Config-based Metadata: Export a static metadata object or a dynamic generateMetadata function in a layout.js or page.js file.
File-based Metadata: Add static or dynamically generated special files to route segments.</p>
<p>With both these options, Next.js will automatically generate the relevant &lt;head&gt; elements for your pages. You can also create dynamic OG images using the ImageResponse constructor.
Static Metadata</p>
<p>To define static metadata, export a Metadata object from a layout.js or static page.js file.
layout.tsx | page.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
title: '...',
description: '...',
}</p>
<p>export default function Page() {}</p>
<p>For all the available options, see the API Reference.
Dynamic Metadata</p>
<p>You can use generateMetadata function to fetch metadata that requires dynamic values.
app/products/[id]/page.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata, ResolvingMetadata } from 'next'</p>
<p>type Props = {
params: Promise&lt;{ id: string }&gt;
searchParams: Promise&lt;{ [key: string]: string | string[] | undefined }&gt;
}</p>
<p>export async function generateMetadata(
{ params, searchParams }: Props,
parent: ResolvingMetadata
): Promise&lt;Metadata&gt; {
// read route params
const id = (await params).id</p>
<p>// fetch data
const product = await fetch(<code>https://.../${id}</code>).then((res) =&gt; res.json())</p>
<p>// optionally access and extend (rather than replace) parent metadata
const previousImages = (await parent).openGraph?.images || []</p>
<p>return {
title: product.title,
openGraph: {
images: ['/some-specific-page-image.jpg', ...previousImages],
},
}
}</p>
<p>export default function Page({ params, searchParams }: Props) {}</p>
<p>For all the available params, see the API Reference.</p>
<p>Good to know:</p>
<p>Both static and dynamic metadata through generateMetadata are only supported in Server Components.
fetch requests are automatically memoized for the same data across generateMetadata, generateStaticParams, Layouts, Pages, and Server Components. React cache can be used if fetch is unavailable.
Next.js will wait for data fetching inside generateMetadata to complete before streaming UI to the client. This guarantees the first part of a streamed response includes &lt;head&gt; tags.</p>
<p>File-based metadata</p>
<p>These special files are available for metadata:</p>
<p>favicon.ico, apple-icon.jpg, and icon.jpg
opengraph-image.jpg and twitter-image.jpg
robots.txt
sitemap.xml</p>
<p>You can use these for static metadata, or you can programmatically generate these files with code.
For implementation and examples, see the Metadata Files API Reference and Dynamic Image Generation.
Behavior</p>
<p>File-based metadata has the higher priority and will override any config-based metadata.
Default Fields</p>
<p>There are two default meta tags that are always added even if a route doesn't define metadata:</p>
<p>The meta charset tag sets the character encoding for the website.
The meta viewport tag sets the viewport width and scale for the website to adjust for different devices.</p>
<p>&lt;meta charset=&quot;utf-8&quot; /&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot; /&gt;</p>
<p>Good to know: You can overwrite the default viewport meta tag.</p>
<p>Ordering</p>
<p>Metadata is evaluated in order, starting from the root segment down to the segment closest to the final page.js segment. For example:</p>
<p>app/layout.tsx (Root Layout)
app/blog/layout.tsx (Nested Blog Layout)
app/blog/[slug]/page.tsx (Blog Page)</p>
<p>Merging</p>
<p>Following the evaluation order, Metadata objects exported from multiple segments in the same route are shallowly merged together to form the final metadata output of a route. Duplicate keys are replaced based on their ordering.
This means metadata with nested fields such as openGraph and robots that are defined in an earlier segment are overwritten by the last segment to define them.
Overwriting fields</p>
<p>app/layout.jsexport const metadata = {
title: 'Acme',
openGraph: {
title: 'Acme',
description: 'Acme is a...',
},
}
app/blog/page.jsexport const metadata = {
title: 'Blog',
openGraph: {
title: 'Blog',
},
}</p>
<p>// Output:
// &lt;title&gt;Blog&lt;/title&gt;
// &lt;meta property=&quot;og:title&quot; content=&quot;Blog&quot; /&gt;
In the example above:</p>
<p>title from app/layout.js is replaced by title in app/blog/page.js.
All openGraph fields from app/layout.js are replaced in app/blog/page.js because app/blog/page.js sets openGraph metadata. Note the absence of openGraph.description.</p>
<p>If you'd like to share some nested fields between segments while overwriting others, you can pull them out into a separate variable:
app/shared-metadata.jsexport const openGraphImage = { images: ['http://...'] }
app/page.jsimport { openGraphImage } from './shared-metadata'</p>
<p>export const metadata = {
openGraph: {
...openGraphImage,
title: 'Home',
},
}
app/about/page.jsimport { openGraphImage } from '../shared-metadata'</p>
<p>export const metadata = {
openGraph: {
...openGraphImage,
title: 'About',
},
}
In the example above, the OG image is shared between app/layout.js and app/about/page.js while the titles are different.
Inheriting fields</p>
<p>app/layout.jsexport const metadata = {
title: 'Acme',
openGraph: {
title: 'Acme',
description: 'Acme is a...',
},
}
app/about/page.jsexport const metadata = {
title: 'About',
}</p>
<p>// Output:
// &lt;title&gt;About&lt;/title&gt;
// &lt;meta property=&quot;og:title&quot; content=&quot;Acme&quot; /&gt;
// &lt;meta property=&quot;og:description&quot; content=&quot;Acme is a...&quot; /&gt;
Notes</p>
<p>title from app/layout.js is replaced by title in app/about/page.js.
All openGraph fields from app/layout.js are inherited in app/about/page.js because app/about/page.js doesn't set openGraph metadata.</p>
<p>Dynamic Image Generation</p>
<p>The ImageResponse constructor allows you to generate dynamic images using JSX and CSS. This is useful for creating social media images such as Open Graph images, Twitter cards, and more.
To use it, you can import ImageResponse from next/og:
app/about/route.jsimport { ImageResponse } from 'next/og'</p>
<p>export async function GET() {
return new ImageResponse(
(
&lt;div
style={{
fontSize: 128,
background: 'white',
width: '100%',
height: '100%',
display: 'flex',
textAlign: 'center',
alignItems: 'center',
justifyContent: 'center',
}}
&gt;
Hello world!
&lt;/div&gt;
),
{
width: 1200,
height: 600,
}
)
}
ImageResponse integrates well with other Next.js APIs, including Route Handlers and file-based Metadata. For example, you can use ImageResponse in a opengraph-image.tsx file to generate Open Graph images at build time or dynamically at request time.
ImageResponse supports common CSS properties including flexbox and absolute positioning, custom fonts, text wrapping, centering, and nested images. See the full list of supported CSS properties.</p>
<p>Good to know:</p>
<p>Examples are available in the Vercel OG Playground.
ImageResponse uses @vercel/og, Satori, and Resvg to convert HTML and CSS into PNG.
Only flexbox and a subset of CSS properties are supported. Advanced layouts (e.g. display: grid) will not work.
Maximum bundle size of 500KB. The bundle size includes your JSX, CSS, fonts, images, and any other assets. If you exceed the limit, consider reducing the size of any assets or fetching at runtime.
Only ttf, otf, and woff font formats are supported. To maximize the font parsing speed, ttf or otf are preferred over woff.</p>
<p>JSON-LD</p>
<p>JSON-LD is a format for structured data that can be used by search engines to understand your content. For example, you can use it to describe a person, an event, an organization, a movie, a book, a recipe, and many other types of entities.
Our current recommendation for JSON-LD is to render structured data as a &lt;script&gt; tag in your layout.js or page.js components. For example:
app/products/[id]/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page({ params }) {
const product = await getProduct((await params).id)</p>
<p>const jsonLd = {
'@context': 'https://schema.org',
'@type': 'Product',
name: product.name,
image: product.image,
description: product.description,
}</p>
<p>return (
&lt;section&gt;
{/* Add JSON-LD to your page <em>/}
&lt;script
type=&quot;application/ld+json&quot;
dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/&gt;
{/</em> ... */}
&lt;/section&gt;
)
}</p>
<p>You can validate and test your structured data with the Rich Results Test for Google or the generic Schema Markup Validator.
You can type your JSON-LD with TypeScript using community packages like schema-dts:
import { Product, WithContext } from 'schema-dts'</p>
<p>const jsonLd: WithContext&lt;Product&gt; = {
'@context': 'https://schema.org',
'@type': 'Product',
name: 'Next.js Sticker',
image: 'https://nextjs.org/imgs/sticker.png',
description: 'Dynamic at the speed of static.',
}Next StepsView all the Metadata API options.generateMetadataLearn how to add Metadata to your Next.js application for improved search engine optimization (SEO) and web shareability.Metadata FilesAPI documentation for the metadata file conventions.generateViewportAPI Reference for the generateViewport function.Was this helpful?</p>
<p>supported.Send</p>
