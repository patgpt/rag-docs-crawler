# Metadata Files: opengraph-image and twitter-image | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6File ConventionsMetadata Filesopengraph-image and twitter-imageopengraph-image and twitter-imageThe opengraph-image and twitter-image file conventions allow you to set Open Graph and Twitter images for a route segment.
They are useful for setting the images that appear on social networks and messaging apps when a user shares a link to your site.
There are two ways to set Open Graph and Twitter images:</p>
<p>Using image files (.jpg, .png, .gif)
Using code to generate images (.js, .ts, .tsx)</p>
<p>Image files (.jpg, .png, .gif)</p>
<p>Use an image file to set a route segment's shared image by placing an opengraph-image or twitter-image image file in the segment.
Next.js will evaluate the file and automatically add the appropriate tags to your app's &lt;head&gt; element.
File conventionSupported file typesopengraph-image.jpg, .jpeg, .png, .giftwitter-image.jpg, .jpeg, .png, .gifopengraph-image.alt.txttwitter-image.alt.txt</p>
<p>Good to know:
The twitter-image file size must not exceed 5MB, and the opengraph-image file size must not exceed 8MB. If the image file size exceeds these limits, the build will fail.</p>
<p>opengraph-image</p>
<p>Add an opengraph-image.(jpg|jpeg|png|gif) image file to any route segment.
&lt;head&gt; output&lt;meta property=&quot;og:image&quot; content=&quot;&lt;generated&gt;&quot; /&gt;
&lt;meta property=&quot;og:image:type&quot; content=&quot;&lt;generated&gt;&quot; /&gt;
&lt;meta property=&quot;og:image:width&quot; content=&quot;&lt;generated&gt;&quot; /&gt;
&lt;meta property=&quot;og:image:height&quot; content=&quot;&lt;generated&gt;&quot; /&gt;
twitter-image</p>
<p>Add a twitter-image.(jpg|jpeg|png|gif) image file to any route segment.
&lt;head&gt; output&lt;meta name=&quot;twitter:image&quot; content=&quot;&lt;generated&gt;&quot; /&gt;
&lt;meta name=&quot;twitter:image:type&quot; content=&quot;&lt;generated&gt;&quot; /&gt;
&lt;meta name=&quot;twitter:image:width&quot; content=&quot;&lt;generated&gt;&quot; /&gt;
&lt;meta name=&quot;twitter:image:height&quot; content=&quot;&lt;generated&gt;&quot; /&gt;
opengraph-image.alt.txt</p>
<p>Add an accompanying opengraph-image.alt.txt file in the same route segment as the opengraph-image.(jpg|jpeg|png|gif) image it's alt text.
opengraph-image.alt.txtAbout Acme
&lt;head&gt; output&lt;meta property=&quot;og:image:alt&quot; content=&quot;About Acme&quot; /&gt;
twitter-image.alt.txt</p>
<p>Add an accompanying twitter-image.alt.txt file in the same route segment as the twitter-image.(jpg|jpeg|png|gif) image it's alt text.
twitter-image.alt.txtAbout Acme
&lt;head&gt; output&lt;meta property=&quot;twitter:image:alt&quot; content=&quot;About Acme&quot; /&gt;
Generate images using code (.js, .ts, .tsx)</p>
<p>In addition to using literal image files, you can programmatically generate images using code.
Generate a route segment's shared image by creating an opengraph-image or twitter-image route that default exports a function.
File conventionSupported file typesopengraph-image.js, .ts, .tsxtwitter-image.js, .ts, .tsx</p>
<p>Good to know:</p>
<p>By default, generated images are statically optimized (generated at build time and cached) unless they use Dynamic APIs or uncached data.
You can generate multiple Images in the same file using generateImageMetadata.
opengraph-image.js and twitter-image.js are special Route Handlers that is cached by default unless it uses a Dynamic API or dynamic config option.</p>
<p>The easiest way to generate an image is to use the ImageResponse API from next/og.
app/about/opengraph-image.tsxTypeScriptJavaScriptTypeScriptimport { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'</p>
<p>// Image metadata
export const alt = 'About Acme'
export const size = {
width: 1200,
height: 630,
}</p>
<p>export const contentType = 'image/png'</p>
<p>// Image generation
export default async function Image() {
// Font loading, process.cwd() is Next.js project directory
const interSemiBold = await readFile(
join(process.cwd(), 'assets/Inter-SemiBold.ttf')
)</p>
<p>return new ImageResponse(
(
// ImageResponse JSX element
&lt;div
style={{
fontSize: 128,
background: 'white',
width: '100%',
height: '100%',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}}
&gt;
About Acme
&lt;/div&gt;
),
// ImageResponse options
{
// For convenience, we can re-use the exported opengraph-image
// size config to also set the ImageResponse's width and height.
...size,
fonts: [
{
name: 'Inter',
data: interSemiBold,
style: 'normal',
weight: 400,
},
],
}
)
}</p>
<p>&lt;head&gt; output&lt;meta property=&quot;og:image&quot; content=&quot;&lt;generated&gt;&quot; /&gt;
&lt;meta property=&quot;og:image:alt&quot; content=&quot;About Acme&quot; /&gt;
&lt;meta property=&quot;og:image:type&quot; content=&quot;image/png&quot; /&gt;
&lt;meta property=&quot;og:image:width&quot; content=&quot;1200&quot; /&gt;
&lt;meta property=&quot;og:image:height&quot; content=&quot;630&quot; /&gt;
Props</p>
<p>The default export function receives the following props:
params (optional)</p>
<p>An object containing the dynamic route parameters object from the root segment down to the segment opengraph-image or twitter-image is colocated in.
app/shop/[slug]/opengraph-image.tsxTypeScriptJavaScriptTypeScriptexport default function Image({ params }: { params: { slug: string } }) {
// ...
}</p>
<p>RouteURLparamsapp/shop/opengraph-image.js/shopundefinedapp/shop/[slug]/opengraph-image.js/shop/1{ slug: '1' }app/shop/[tag]/[item]/opengraph-image.js/shop/1/2{ tag: '1', item: '2' }
Returns</p>
<p>The default export function should return a Blob | ArrayBuffer | TypedArray | DataView | ReadableStream | Response.</p>
<p>Good to know: ImageResponse satisfies this return type.</p>
<p>Config exports</p>
<p>You can optionally configure the image's metadata by exporting alt, size, and contentType variables from opengraph-image or twitter-image route.
OptionTypealtstringsize{ width: number; height: number }contentTypestring - image MIME type
alt</p>
<p>opengraph-image.tsx | twitter-image.tsxTypeScriptJavaScriptTypeScriptexport const alt = 'My images alt text'</p>
<p>export default function Image() {}</p>
<p>&lt;head&gt; output&lt;meta property=&quot;og:image:alt&quot; content=&quot;My images alt text&quot; /&gt;
size</p>
<p>opengraph-image.tsx | twitter-image.tsxTypeScriptJavaScriptTypeScriptexport const size = { width: 1200, height: 630 }</p>
<p>export default function Image() {}</p>
<p>&lt;head&gt; output&lt;meta property=&quot;og:image:width&quot; content=&quot;1200&quot; /&gt;
&lt;meta property=&quot;og:image:height&quot; content=&quot;630&quot; /&gt;
contentType</p>
<p>opengraph-image.tsx | twitter-image.tsxTypeScriptJavaScriptTypeScriptexport const contentType = 'image/png'</p>
<p>export default function Image() {}</p>
<p>&lt;head&gt; output&lt;meta property=&quot;og:image:type&quot; content=&quot;image/png&quot; /&gt;
Route Segment Config</p>
<p>opengraph-image and twitter-image are specialized Route Handlers that can use the same route segment configuration options as Pages and Layouts.
Examples</p>
<p>Using external data</p>
<p>This example uses the params object and external data to generate the image.</p>
<p>Good to know:
By default, this generated image will be statically optimized. You can configure the individual fetch options or route segments options to change this behavior.</p>
<p>app/posts/[slug]/opengraph-image.tsxTypeScriptJavaScriptTypeScriptimport { ImageResponse } from 'next/og'</p>
<p>export const alt = 'About Acme'
export const size = {
width: 1200,
height: 630,
}
export const contentType = 'image/png'</p>
<p>export default async function Image({ params }: { params: { slug: string } }) {
const post = await fetch(<code>https://.../posts/${params.slug}</code>).then((res) =&gt;
res.json()
)</p>
<p>return new ImageResponse(
(
&lt;div
style={{
fontSize: 48,
background: 'white',
width: '100%',
height: '100%',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}}
&gt;
{post.title}
&lt;/div&gt;
),
{
...size,
}
)
}</p>
<p>Using Node.js runtime with local assets</p>
<p>This example uses the Node.js runtime to fetch a local image on the file system and passes it as an ArrayBuffer to the src attribute of an &lt;img&gt; element. The local asset should be placed relative to the root of your project, rather than the location of the example source file.
app/opengraph-image.tsxTypeScriptJavaScriptTypeScriptimport { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'</p>
<p>export default async function Image() {
const logoData = await readFile(join(process.cwd(), 'logo.png'))
const logoSrc = Uint8Array.from(logoData).buffer</p>
<p>return new ImageResponse(
(
&lt;div
style={{
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}}
&gt;
&lt;img src={logoSrc} height=&quot;100&quot; /&gt;
&lt;/div&gt;
)
)
}</p>
<p>Version History</p>
<p>VersionChangesv13.3.0opengraph-image and twitter-image introduced.Was this helpful?</p>
<p>supported.Send</p>
