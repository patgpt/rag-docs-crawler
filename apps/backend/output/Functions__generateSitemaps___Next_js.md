# Functions: generateSitemaps | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsgenerateSitemapsgenerateSitemapsYou can use the generateSitemaps function to generate multiple sitemaps for your application.
Returns</p>
<p>The generateSitemaps returns an array of objects with an id property.
URLs</p>
<p>Your generated sitemaps will be available at /.../sitemap/[id].xml. For example, /product/sitemap/1.xml.
Example</p>
<p>For example, to split a sitemap using generateSitemaps, return an array of objects with the sitemap id. Then, use the id to generate the unique sitemaps.
app/product/sitemap.tsTypeScriptJavaScriptTypeScriptimport { BASE_URL } from '@/app/lib/constants'</p>
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
<p>Version History</p>
<p>VersionChangesv15.0.0generateSitemaps now generates consistent URLs between development and productionv13.3.2generateSitemaps introduced. In development, you can view the generated sitemap on /.../sitemap.xml/[id]. For example, /product/sitemap.xml/1.Next StepsLearn how to create sitemaps for your Next.js application.sitemap.xmlAPI Reference for the sitemap.xml file.Was this helpful?</p>
<p>supported.Send</p>
