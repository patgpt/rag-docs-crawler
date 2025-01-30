# Metadata Files: sitemap.xml | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6File ConventionsMetadata Filessitemap.xmlsitemap.xmlsitemap.(xml|js|ts) is a special file that matches the Sitemaps XML format to help search engine crawlers index your site more efficiently.
Sitemap files (.xml)</p>
<p>For smaller applications, you can create a sitemap.xml file and place it in the root of your app directory.
app/sitemap.xml&lt;urlset xmlns=&quot;http://www.sitemaps.org/schemas/sitemap/0.9&quot;&gt;
&lt;url&gt;
&lt;loc&gt;https://acme.com&lt;/loc&gt;
&lt;lastmod&gt;2023-04-06T15:02:24.021Z&lt;/lastmod&gt;
&lt;changefreq&gt;yearly&lt;/changefreq&gt;
&lt;priority&gt;1&lt;/priority&gt;
&lt;/url&gt;
&lt;url&gt;
&lt;loc&gt;https://acme.com/about&lt;/loc&gt;
&lt;lastmod&gt;2023-04-06T15:02:24.021Z&lt;/lastmod&gt;
&lt;changefreq&gt;monthly&lt;/changefreq&gt;
&lt;priority&gt;0.8&lt;/priority&gt;
&lt;/url&gt;
&lt;url&gt;
&lt;loc&gt;https://acme.com/blog&lt;/loc&gt;
&lt;lastmod&gt;2023-04-06T15:02:24.021Z&lt;/lastmod&gt;
&lt;changefreq&gt;weekly&lt;/changefreq&gt;
&lt;priority&gt;0.5&lt;/priority&gt;
&lt;/url&gt;
&lt;/urlset&gt;
Generating a sitemap using code (.js, .ts)</p>
<p>You can use the sitemap.(js|ts) file convention to programmatically generate a sitemap by exporting a default function that returns an array of URLs. If using TypeScript, a Sitemap type is available.</p>
<p>Good to know: sitemap.js is a special Route Handler that is cached by default unless it uses a Dynamic API or dynamic config option.</p>
<p>app/sitemap.tsTypeScriptJavaScriptTypeScriptimport type { MetadataRoute } from 'next'</p>
<p>export default function sitemap(): MetadataRoute.Sitemap {
return [
{
url: 'https://acme.com',
lastModified: new Date(),
changeFrequency: 'yearly',
priority: 1,
},
{
url: 'https://acme.com/about',
lastModified: new Date(),
changeFrequency: 'monthly',
priority: 0.8,
},
{
url: 'https://acme.com/blog',
lastModified: new Date(),
changeFrequency: 'weekly',
priority: 0.5,
},
]
}</p>
<p>Output:
acme.com/sitemap.xml&lt;urlset xmlns=&quot;http://www.sitemaps.org/schemas/sitemap/0.9&quot;&gt;
&lt;url&gt;
&lt;loc&gt;https://acme.com&lt;/loc&gt;
&lt;lastmod&gt;2023-04-06T15:02:24.021Z&lt;/lastmod&gt;
&lt;changefreq&gt;yearly&lt;/changefreq&gt;
&lt;priority&gt;1&lt;/priority&gt;
&lt;/url&gt;
&lt;url&gt;
&lt;loc&gt;https://acme.com/about&lt;/loc&gt;
&lt;lastmod&gt;2023-04-06T15:02:24.021Z&lt;/lastmod&gt;
&lt;changefreq&gt;monthly&lt;/changefreq&gt;
&lt;priority&gt;0.8&lt;/priority&gt;
&lt;/url&gt;
&lt;url&gt;
&lt;loc&gt;https://acme.com/blog&lt;/loc&gt;
&lt;lastmod&gt;2023-04-06T15:02:24.021Z&lt;/lastmod&gt;
&lt;changefreq&gt;weekly&lt;/changefreq&gt;
&lt;priority&gt;0.5&lt;/priority&gt;
&lt;/url&gt;
&lt;/urlset&gt;
Image Sitemaps</p>
<p>You can use images property to create image sitemaps. Learn more details in the Google Developer Docs.
app/sitemap.tsTypeScriptJavaScriptTypeScriptimport type { MetadataRoute } from 'next'</p>
<p>export default function sitemap(): MetadataRoute.Sitemap {
return [
{
url: 'https://example.com',
lastModified: '2021-01-01',
changeFrequency: 'weekly',
priority: 0.5,
images: ['https://example.com/image.jpg'],
},
]
}
Output:
acme.com/sitemap.xml&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;urlset
xmlns=&quot;http://www.sitemaps.org/schemas/sitemap/0.9&quot;
xmlns:image=&quot;http://www.google.com/schemas/sitemap-image/1.1&quot;</p>
<blockquote></blockquote>
<p>&lt;url&gt;
&lt;loc&gt;https://example.com&lt;/loc&gt;
<a href="image:image">image:image</a>
<a href="image:loc">image:loc</a>https://example.com/image.jpg&lt;/image:loc&gt;
&lt;/image:image&gt;
&lt;lastmod&gt;2021-01-01&lt;/lastmod&gt;
&lt;changefreq&gt;weekly&lt;/changefreq&gt;
&lt;priority&gt;0.5&lt;/priority&gt;
&lt;/url&gt;
&lt;/urlset&gt;
Video Sitemaps</p>
<p>You can use videos property to create video sitemaps. Learn more details in the Google Developer Docs.
app/sitemap.tsTypeScriptJavaScriptTypeScriptimport type { MetadataRoute } from 'next'</p>
<p>export default function sitemap(): MetadataRoute.Sitemap {
return [
{
url: 'https://example.com',
lastModified: '2021-01-01',
changeFrequency: 'weekly',
priority: 0.5,
videos: [
{
title: 'example',
thumbnail_loc: 'https://example.com/image.jpg',
description: 'this is the description',
},
],
},
]
}
Output:
acme.com/sitemap.xml&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;urlset
xmlns=&quot;http://www.sitemaps.org/schemas/sitemap/0.9&quot;
xmlns:video=&quot;http://www.google.com/schemas/sitemap-video/1.1&quot;</p>
<blockquote></blockquote>
<p>&lt;url&gt;
&lt;loc&gt;https://example.com&lt;/loc&gt;
<a href="video:video">video:video</a>
<a href="video:title">video:title</a>example&lt;/video:title&gt;
<a href="video:thumbnail_loc">video:thumbnail_loc</a>https://example.com/image.jpg&lt;/video:thumbnail_loc&gt;
<a href="video:description">video:description</a>this is the description&lt;/video:description&gt;
&lt;/video:video&gt;
&lt;lastmod&gt;2021-01-01&lt;/lastmod&gt;
&lt;changefreq&gt;weekly&lt;/changefreq&gt;
&lt;priority&gt;0.5&lt;/priority&gt;
&lt;/url&gt;
&lt;/urlset&gt;
Generate a localized Sitemap</p>
<p>app/sitemap.tsTypeScriptJavaScriptTypeScriptimport type { MetadataRoute } from 'next'</p>
<p>export default function sitemap(): MetadataRoute.Sitemap {
return [
{
url: 'https://acme.com',
lastModified: new Date(),
alternates: {
languages: {
es: 'https://acme.com/es',
de: 'https://acme.com/de',
},
},
},
{
url: 'https://acme.com/about',
lastModified: new Date(),
alternates: {
languages: {
es: 'https://acme.com/es/about',
de: 'https://acme.com/de/about',
},
},
},
{
url: 'https://acme.com/blog',
lastModified: new Date(),
alternates: {
languages: {
es: 'https://acme.com/es/blog',
de: 'https://acme.com/de/blog',
},
},
},
]
}</p>
<p>Output:
acme.com/sitemap.xml&lt;urlset xmlns=&quot;http://www.sitemaps.org/schemas/sitemap/0.9&quot; xmlns:xhtml=&quot;http://www.w3.org/1999/xhtml&quot;&gt;
&lt;url&gt;
&lt;loc&gt;https://acme.com&lt;/loc&gt;
&lt;xhtml:link
rel=&quot;alternate&quot;
hreflang=&quot;es&quot;
href=&quot;https://acme.com/es&quot;/&gt;
&lt;xhtml:link
rel=&quot;alternate&quot;
hreflang=&quot;de&quot;
href=&quot;https://acme.com/de&quot;/&gt;
&lt;lastmod&gt;2023-04-06T15:02:24.021Z&lt;/lastmod&gt;
&lt;/url&gt;
&lt;url&gt;
&lt;loc&gt;https://acme.com/about&lt;/loc&gt;
&lt;xhtml:link
rel=&quot;alternate&quot;
hreflang=&quot;es&quot;
href=&quot;https://acme.com/es/about&quot;/&gt;
&lt;xhtml:link
rel=&quot;alternate&quot;
hreflang=&quot;de&quot;
href=&quot;https://acme.com/de/about&quot;/&gt;
&lt;lastmod&gt;2023-04-06T15:02:24.021Z&lt;/lastmod&gt;
&lt;/url&gt;
&lt;url&gt;
&lt;loc&gt;https://acme.com/blog&lt;/loc&gt;
&lt;xhtml:link
rel=&quot;alternate&quot;
hreflang=&quot;es&quot;
href=&quot;https://acme.com/es/blog&quot;/&gt;
&lt;xhtml:link
rel=&quot;alternate&quot;
hreflang=&quot;de&quot;
href=&quot;https://acme.com/de/blog&quot;/&gt;
&lt;lastmod&gt;2023-04-06T15:02:24.021Z&lt;/lastmod&gt;
&lt;/url&gt;
&lt;/urlset&gt;
Generating multiple sitemaps</p>
<p>While a single sitemap will work for most applications. For large web applications, you may need to split a sitemap into multiple files.
There are two ways you can create multiple sitemaps:</p>
<p>By nesting sitemap.(xml|js|ts) inside multiple route segments e.g. app/sitemap.xml and app/products/sitemap.xml.
By using the generateSitemaps function.</p>
<p>For example, to split a sitemap using generateSitemaps, return an array of objects with the sitemap id. Then, use the id to generate the unique sitemaps.
app/product/sitemap.tsTypeScriptJavaScriptTypeScriptimport type { MetadataRoute } from 'next'
import { BASE_URL } from '@/app/lib/constants'</p>
<p>export async function generateSitemaps() {
// Fetch the total number of products and calculate the number of sitemaps needed
return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}</p>
<p>export default async function sitemap({
id,
}: {
id: number
}): Promise&lt;MetadataRoute.Sitemap&gt; {
// Google's limit is 50,000 URLs per sitemap
const start = id * 50000
const end = start + 50000
const products = await getProducts(
<code>SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}</code>
)
return products.map((product) =&gt; ({
url: <code>${BASE_URL}/product/${product.id}</code>,
lastModified: product.date,
}))
}</p>
<p>Your generated sitemaps will be available at /.../sitemap/[id]. For example, /product/sitemap/1.xml.
See the generateSitemaps API reference for more information.
Returns</p>
<p>The default function exported from sitemap.(xml|ts|js) should return an array of objects with the following properties:
type Sitemap = Array&lt;{
url: string
lastModified?: string | Date
changeFrequency?:
| 'always'
| 'hourly'
| 'daily'
| 'weekly'
| 'monthly'
| 'yearly'
| 'never'
priority?: number
alternates?: {
languages?: Languages&lt;string&gt;
}
}&gt;
Version History</p>
<p>VersionChangesv14.2.0Add localizations support.v13.4.14Add changeFrequency and priority attributes to sitemaps.v13.3.0sitemap introduced.Next StepsLearn how to use the generateSitemaps function.generateSitemapsLearn how to use the generateSiteMaps function to create multiple sitemaps for your application.Was this helpful?</p>
<p>supported.Send</p>
