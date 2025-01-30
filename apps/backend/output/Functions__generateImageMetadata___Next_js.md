# Functions: generateImageMetadata | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsgenerateImageMetadatagenerateImageMetadataYou can use generateImageMetadata to generate different versions of one image or return multiple images for one route segment. This is useful for when you want to avoid hard-coding metadata values, such as for icons.
Parameters</p>
<p>generateImageMetadata function accepts the following parameters:
params (optional)</p>
<p>An object containing the dynamic route parameters object from the root segment down to the segment generateImageMetadata is called from.
icon.tsxTypeScriptJavaScriptTypeScriptexport function generateImageMetadata({
params,
}: {
params: { slug: string }
}) {
// ...
}</p>
<p>RouteURLparamsapp/shop/icon.js/shopundefinedapp/shop/[slug]/icon.js/shop/1{ slug: '1' }app/shop/[tag]/[item]/icon.js/shop/1/2{ tag: '1', item: '2' }
Returns</p>
<p>The generateImageMetadata function should return an array of objects containing the image's metadata such as alt and size. In addition, each item must include an id value which will be passed to the props of the image generating function.
Image Metadata ObjectTypeidstring (required)altstringsize{ width: number; height: number }contentTypestring
icon.tsxTypeScriptJavaScriptTypeScriptimport { ImageResponse } from 'next/og'</p>
<p>export function generateImageMetadata() {
return [
{
contentType: 'image/png',
size: { width: 48, height: 48 },
id: 'small',
},
{
contentType: 'image/png',
size: { width: 72, height: 72 },
id: 'medium',
},
]
}</p>
<p>export default function Icon({ id }: { id: string }) {
return new ImageResponse(
(
&lt;div
style={{
width: '100%',
height: '100%',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontSize: 88,
background: '#000',
color: '#fafafa',
}}
&gt;
Icon {id}
&lt;/div&gt;
)
)
}</p>
<p>Examples</p>
<p>Using external data</p>
<p>This example uses the params object and external data to generate multiple Open Graph images for a route segment.
app/products/[id]/opengraph-image.tsxTypeScriptJavaScriptTypeScriptimport { ImageResponse } from 'next/og'
import { getCaptionForImage, getOGImages } from '@/app/utils/images'</p>
<p>export async function generateImageMetadata({
params,
}: {
params: { id: string }
}) {
const images = await getOGImages(params.id)</p>
<p>return images.map((image, idx) =&gt; ({
id: idx,
size: { width: 1200, height: 600 },
alt: image.text,
contentType: 'image/png',
}))
}</p>
<p>export default async function Image({
params,
id,
}: {
params: { id: string }
id: number
}) {
const productId = (await params).id
const imageId = id
const text = await getCaptionForImage(productId, imageId)</p>
<p>return new ImageResponse(
(
&lt;div
style={
{
// ...
}
}
&gt;
{text}
&lt;/div&gt;
)
)
}</p>
<p>Version History</p>
<p>VersionChangesv13.3.0generateImageMetadata introduced.Next StepsView all the Metadata API options.Metadata FilesAPI documentation for the metadata file conventions.MetadataUse the Metadata API to define metadata in any layout or page.Was this helpful?</p>
<p>supported.Send</p>
