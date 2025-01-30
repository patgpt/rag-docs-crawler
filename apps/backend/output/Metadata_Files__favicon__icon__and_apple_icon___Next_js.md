# Metadata Files: favicon, icon, and apple-icon | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6File ConventionsMetadata Filesfavicon, icon, and apple-iconfavicon, icon, and apple-iconThe favicon, icon, or apple-icon file conventions allow you to set icons for your application.
They are useful for adding app icons that appear in places like web browser tabs, phone home screens, and search engine results.
There are two ways to set app icons:</p>
<p>Using image files (.ico, .jpg, .png)
Using code to generate an icon (.js, .ts, .tsx)</p>
<p>Image files (.ico, .jpg, .png)</p>
<p>Use an image file to set an app icon by placing a favicon, icon, or apple-icon image file within your /app directory.
The favicon image can only be located in the top level of app/.
Next.js will evaluate the file and automatically add the appropriate tags to your app's &lt;head&gt; element.
File conventionSupported file typesValid locationsfavicon.icoapp/icon.ico, .jpg, .jpeg, .png, .svgapp/<strong>/*apple-icon.jpg, .jpeg, .pngapp/</strong>/*
favicon</p>
<p>Add a favicon.ico image file to the root /app route segment.
&lt;head&gt; output&lt;link rel=&quot;icon&quot; href=&quot;/favicon.ico&quot; sizes=&quot;any&quot; /&gt;
icon</p>
<p>Add an icon.(ico|jpg|jpeg|png|svg) image file.
&lt;head&gt; output&lt;link
rel=&quot;icon&quot;
href=&quot;/icon?&lt;generated&gt;&quot;
type=&quot;image/&lt;generated&gt;&quot;
sizes=&quot;&lt;generated&gt;&quot;
/&gt;
apple-icon</p>
<p>Add an apple-icon.(jpg|jpeg|png) image file.
&lt;head&gt; output&lt;link
rel=&quot;apple-touch-icon&quot;
href=&quot;/apple-icon?&lt;generated&gt;&quot;
type=&quot;image/&lt;generated&gt;&quot;
sizes=&quot;&lt;generated&gt;&quot;
/&gt;</p>
<p>Good to know:</p>
<p>You can set multiple icons by adding a number suffix to the file name. For example, icon1.png, icon2.png, etc. Numbered files will sort lexically.
Favicons can only be set in the root /app segment. If you need more granularity, you can use icon.
The appropriate &lt;link&gt; tags and attributes such as rel, href, type, and sizes are determined by the icon type and metadata of the evaluated file.
For example, a 32 by 32px .png file will have type=&quot;image/png&quot; and sizes=&quot;32x32&quot; attributes.
sizes=&quot;any&quot; is added to icons when the extension is .svg or the image size of the file is not determined. More details in this favicon handbook.</p>
<p>Generate icons using code (.js, .ts, .tsx)</p>
<p>In addition to using literal image files, you can programmatically generate icons using code.
Generate an app icon by creating an icon or apple-icon route that default exports a function.
File conventionSupported file typesicon.js, .ts, .tsxapple-icon.js, .ts, .tsx
The easiest way to generate an icon is to use the ImageResponse API from next/og.
app/icon.tsxTypeScriptJavaScriptTypeScriptimport { ImageResponse } from 'next/og'</p>
<p>// Image metadata
export const size = {
width: 32,
height: 32,
}
export const contentType = 'image/png'</p>
<p>// Image generation
export default function Icon() {
return new ImageResponse(
(
// ImageResponse JSX element
&lt;div
style={{
fontSize: 24,
background: 'black',
width: '100%',
height: '100%',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
color: 'white',
}}
&gt;
A
&lt;/div&gt;
),
// ImageResponse options
{
// For convenience, we can re-use the exported icons size metadata
// config to also set the ImageResponse's width and height.
...size,
}
)
}</p>
<p>&lt;head&gt; output&lt;link rel=&quot;icon&quot; href=&quot;/icon?&lt;generated&gt;&quot; type=&quot;image/png&quot; sizes=&quot;32x32&quot; /&gt;</p>
<p>Good to know:</p>
<p>By default, generated icons are statically optimized (generated at build time and cached) unless they use Dynamic APIs or uncached data.
You can generate multiple icons in the same file using generateImageMetadata.
You cannot generate a favicon icon. Use icon or a favicon.ico file instead.
App icons are special Route Handlers that is cached by default unless it uses a Dynamic API or dynamic config option.</p>
<p>Props</p>
<p>The default export function receives the following props:
params (optional)</p>
<p>An object containing the dynamic route parameters object from the root segment down to the segment icon or apple-icon is colocated in.
app/shop/[slug]/icon.tsxTypeScriptJavaScriptTypeScriptexport default function Icon({ params }: { params: { slug: string } }) {
// ...
}</p>
<p>RouteURLparamsapp/shop/icon.js/shopundefinedapp/shop/[slug]/icon.js/shop/1{ slug: '1' }app/shop/[tag]/[item]/icon.js/shop/1/2{ tag: '1', item: '2' }
Returns</p>
<p>The default export function should return a Blob | ArrayBuffer | TypedArray | DataView | ReadableStream | Response.</p>
<p>Good to know: ImageResponse satisfies this return type.</p>
<p>Config exports</p>
<p>You can optionally configure the icon's metadata by exporting size and contentType variables from the icon or apple-icon route.
OptionTypesize{ width: number; height: number }contentTypestring - image MIME type
size</p>
<p>icon.tsx | apple-icon.tsxTypeScriptJavaScriptTypeScriptexport const size = { width: 32, height: 32 }</p>
<p>export default function Icon() {}</p>
<p>&lt;head&gt; output&lt;link rel=&quot;icon&quot; sizes=&quot;32x32&quot; /&gt;
contentType</p>
<p>icon.tsx | apple-icon.tsxTypeScriptJavaScriptTypeScriptexport const contentType = 'image/png'</p>
<p>export default function Icon() {}</p>
<p>&lt;head&gt; output&lt;link rel=&quot;icon&quot; type=&quot;image/png&quot; /&gt;
Route Segment Config</p>
<p>icon and apple-icon are specialized Route Handlers that can use the same route segment configuration options as Pages and Layouts.
Version History</p>
<p>VersionChangesv13.3.0favicon icon and apple-icon introducedWas this helpful?</p>
<p>supported.Send</p>
