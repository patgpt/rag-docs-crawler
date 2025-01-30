# Getting Started: Images and Fonts | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6App RouterGetting StartedImages and FontsHow to optimize images and fontsNext.js comes with automatic image and font optimization for better performance and user experience. This page will guide you through how to start using them.
Handling static assets</p>
<p>You can store static files, like images and fonts, under a folder called public in the root directory. Files inside public can then be referenced by your code starting from the base URL (/).</p>
<p>Optimizing images</p>
<p>The Next.js &lt;Image&gt; component extends the HTML &lt;img&gt; element to provide:</p>
<p>Size optimization: Automatically serving correctly sized images for each device, using modern image formats like WebP and AVIF.
Visual stability: Preventing layout shift automatically when images are loading.
Faster page loads: Only loading images when they enter the viewport using native browser lazy loading, with optional blur-up placeholders.
Asset flexibility: Resizing images on-demand, even images stored on remote servers.</p>
<p>To start using &lt;Image&gt;, import it from next/image and render it within your component.
app/page.tsxTypeScriptJavaScriptTypeScriptimport Image from 'next/image'</p>
<p>export default function Page() {
return &lt;Image src=&quot;&quot; alt=&quot;&quot; /&gt;
}</p>
<p>The src property can be a local or remote image.
Local images</p>
<p>To use a local image, import your .jpg, .png, or .webp image files from your public folder.
app/page.tsxTypeScriptJavaScriptTypeScriptimport Image from 'next/image'
import profilePic from './me.png'</p>
<p>export default function Page() {
return (
&lt;Image
src={profilePic}
alt=&quot;Picture of the author&quot;
// width={500} automatically provided
// height={500} automatically provided
// blurDataURL=&quot;data:...&quot; automatically provided
// placeholder=&quot;blur&quot; // Optional blur-up while loading
/&gt;
)
}</p>
<p>Next.js will automatically determine the intrinsic width and height of your image based on the imported file. These values are used to determine the image ratio and prevent Cumulative Layout Shift while your image is loading.
Remote images</p>
<p>To use a remote image, you can provide a URL string for the src property.
app/page.tsxTypeScriptJavaScriptTypeScriptimport Image from 'next/image'</p>
<p>export default function Page() {
return (
&lt;Image
src=&quot;https://s3.amazonaws.com/my-bucket/profile.png&quot;
alt=&quot;Picture of the author&quot;
width={500}
height={500}
/&gt;
)
}</p>
<p>Since Next.js does not have access to remote files during the build process, you'll need to provide the width, height and optional blurDataURL props manually. The width and height attributes are used to infer the correct aspect ratio of image and avoid layout shift from the image loading in.
Then, to safely allow images from remote servers, you need to define a list of supported URL patterns in next.config.js. Be as specific as possible to prevent malicious usage. For example, the following configuration will only allow images from a specific AWS S3 bucket:
next.config.tsTypeScriptJavaScriptTypeScriptimport { NextConfig } from 'next'</p>
<p>const config: NextConfig = {
images: {
remotePatterns: [
{
protocol: 'https',
hostname: 's3.amazonaws.com',
port: '',
pathname: '/my-bucket/**',
search: '',
},
],
},
}</p>
<p>export default config</p>
<p>Optimizing fonts</p>
<p>The next/font module automatically optimizes your fonts and removes external network requests for improved privacy and performance.
It includes built-in automatic self-hosting for any font file. This means you can optimally load web fonts with no layout shift.
To start using next/font, import it from next/font/local or next/font/google, call it as a function with the appropriate options, and set the className of the element you want to apply the font to. For example:
app/layout.tsxTypeScriptJavaScriptTypeScriptimport { Geist } from 'next/font/google'</p>
<p>const geist = Geist({
subsets: ['latin'],
})</p>
<p>export default function Layout({ children }: { children: React.ReactNode }) {
return (
&lt;html lang=&quot;en&quot; className={geist.className}&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>Google fonts</p>
<p>You can automatically self-host any Google Font. Fonts are included in the deployment and served from the same domain as your deployment, meaning no requests are sent to Google by the browser when the user visits your site.
To start using a Google Font, import your chosen font from next/font/google:
app/layout.tsxTypeScriptJavaScriptTypeScriptimport { Geist } from 'next/font/google'</p>
<p>const geist = Geist({
subsets: ['latin'],
})</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot; className={geist.className}&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>We recommend using variable fonts for the best performance and flexibility. But if you can't use a variable font, you will need to specify a weight:
app/layout.tsxTypeScriptJavaScriptTypeScriptimport { Roboto } from 'next/font/google'</p>
<p>const roboto = Roboto({
weight: '400',
subsets: ['latin'],
})</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot; className={roboto.className}&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>Local fonts</p>
<p>To use a local font, import your font from next/font/local and specify the src of your local font file in the public folder.
app/layout.tsxTypeScriptJavaScriptTypeScriptimport localFont from 'next/font/local'</p>
<p>const myFont = localFont({
src: './my-font.woff2',
})</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot; className={myFont.className}&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>If you want to use multiple files for a single font family, src can be an array:
const roboto = localFont({
src: [
{
path: './Roboto-Regular.woff2',
weight: '400',
style: 'normal',
},
{
path: './Roboto-Italic.woff2',
weight: '400',
style: 'italic',
},
{
path: './Roboto-Bold.woff2',
weight: '700',
style: 'normal',
},
{
path: './Roboto-BoldItalic.woff2',
weight: '700',
style: 'italic',
},
],
})API ReferenceLearn more about the features mentioned in this page by reading the API Reference.FontOptimizing loading web fonts with the built-in <code>next/font</code> loaders.ImageOptimize Images in your Next.js Application using the built-in <code>next/image</code> Component.Was this helpful?</p>
<p>supported.Send</p>
