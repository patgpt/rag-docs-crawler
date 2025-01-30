# Optimizing: Images | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationOptimizingImagesImage Optimization
Examples
Image Component</p>
<p>According to Web Almanac, images account for a huge portion of the typical website’s page weight and can have a sizable impact on your website's LCP performance.
The Next.js Image component extends the HTML &lt;img&gt; element with features for automatic image optimization:</p>
<p>Size Optimization: Automatically serve correctly sized images for each device, using modern image formats like WebP and AVIF.
Visual Stability: Prevent layout shift automatically when images are loading.
Faster Page Loads: Images are only loaded when they enter the viewport using native browser lazy loading, with optional blur-up placeholders.
Asset Flexibility: On-demand image resizing, even for images stored on remote servers</p>
<p>🎥 Watch: Learn more about how to use next/image → YouTube (9 minutes).</p>
<p>Usage</p>
<p>import Image from 'next/image'
You can then define the src for your image (either local or remote).
Local Images</p>
<p>To use a local image, import your .jpg, .png, or .webp image files.
Next.js will automatically determine the intrinsic width and height of your image based on the imported file. These values are used to determine the image ratio and prevent Cumulative Layout Shift while your image is loading.
app/page.jsimport Image from 'next/image'
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
<p>Warning: Dynamic await import() or require() are not supported. The import must be static so it can be analyzed at build time.</p>
<p>You can optionally configure localPatterns in your next.config.js file in order to allow specific images and block all others.
next.config.jsmodule.exports = {
images: {
localPatterns: [
{
pathname: '/assets/images/**',
search: '',
},
],
},
}
Remote Images</p>
<p>To use a remote image, the src property should be a URL string.
Since Next.js does not have access to remote files during the build process, you'll need to provide the width, height and optional blurDataURL props manually.
The width and height attributes are used to infer the correct aspect ratio of image and avoid layout shift from the image loading in. The width and height do not determine the rendered size of the image file. Learn more about Image Sizing.
app/page.jsimport Image from 'next/image'</p>
<p>export default function Page() {
return (
&lt;Image
src=&quot;https://s3.amazonaws.com/my-bucket/profile.png&quot;
alt=&quot;Picture of the author&quot;
width={500}
height={500}
/&gt;
)
}
To safely allow optimizing images, define a list of supported URL patterns in next.config.js. Be as specific as possible to prevent malicious usage. For example, the following configuration will only allow images from a specific AWS S3 bucket:
next.config.jsmodule.exports = {
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
}
Learn more about remotePatterns configuration. If you want to use relative URLs for the image src, use a loader.
Domains</p>
<p>Sometimes you may want to optimize a remote image, but still use the built-in Next.js Image Optimization API. To do this, leave the loader at its default setting and enter an absolute URL for the Image src prop.
To protect your application from malicious users, you must define a list of remote hostnames you intend to use with the next/image component.</p>
<p>Learn more about remotePatterns configuration.</p>
<p>Loaders</p>
<p>Note that in the example earlier, a partial URL (&quot;/me.png&quot;) is provided for a local image. This is possible because of the loader architecture.
A loader is a function that generates the URLs for your image. It modifies the provided src, and generates multiple URLs to request the image at different sizes. These multiple URLs are used in the automatic srcset generation, so that visitors to your site will be served an image that is the right size for their viewport.
The default loader for Next.js applications uses the built-in Image Optimization API, which optimizes images from anywhere on the web, and then serves them directly from the Next.js web server. If you would like to serve your images directly from a CDN or image server, you can write your own loader function with a few lines of JavaScript.
You can define a loader per-image with the loader prop, or at the application level with the loaderFile configuration.
Priority</p>
<p>You should add the priority property to the image that will be the Largest Contentful Paint (LCP) element for each page. Doing so allows Next.js to preload the image, leading to a meaningful boost in LCP.
The LCP element is typically the largest image or text block visible within the viewport of the page. When you run next dev, you'll see a console warning if the LCP element is an &lt;Image&gt; without the priority property.
Once you've identified the LCP image, you can add the property like this:</p>
<p>app/page.jsimport Image from 'next/image'
import profilePic from '../public/me.png'</p>
<p>export default function Page() {
return &lt;Image src={profilePic} alt=&quot;Picture of the author&quot; priority /&gt;
}
See more about priority in the next/image component documentation.
Image Sizing</p>
<p>One of the ways that images most commonly hurt performance is through layout shift, where the image pushes other elements around on the page as it loads in. This performance problem is so annoying to users that it has its own Core Web Vital, called Cumulative Layout Shift. The way to avoid image-based layout shifts is to always size your images. This allows the browser to reserve precisely enough space for the image before it loads.
Because next/image is designed to guarantee good performance results, it cannot be used in a way that will contribute to layout shift, and must be sized in one of three ways:</p>
<p>Automatically, using a static import
Manually, by including a width and height property used to determine the image's aspect ratio.
Implicitly, by using fill which causes the image to expand to fill its parent element.</p>
<p>What if I don't know the size of my images?
If you are accessing images from a source without knowledge of the images' sizes, there are several things you can do:
Use fill
The fill prop allows your image to be sized by its parent element. Consider using CSS to give the image's parent element space on the page along sizes prop to match any media query break points. You can also use object-fit with fill, contain, or cover, and object-position to define how the image should occupy that space.
Normalize your images
If you're serving images from a source that you control, consider modifying your image pipeline to normalize the images to a specific size.
Modify your API calls
If your application is retrieving image URLs using an API call (such as to a CMS), you may be able to modify the API call to return the image dimensions along with the URL.</p>
<p>If none of the suggested methods works for sizing your images, the next/image component is designed to work well on a page alongside standard &lt;img&gt; elements.
Styling</p>
<p>Styling the Image component is similar to styling a normal &lt;img&gt; element, but there are a few guidelines to keep in mind:</p>
<p>Use className or style, not styled-jsx.</p>
<p>In most cases, we recommend using the className prop. This can be an imported CSS Module, a global stylesheet, etc.
You can also use the style prop to assign inline styles.
You cannot use styled-jsx because it's scoped to the current component (unless you mark the style as global).</p>
<p>When using fill, the parent element must have position: relative</p>
<p>This is necessary for the proper rendering of the image element in that layout mode.</p>
<p>When using fill, the parent element must have display: block</p>
<p>This is the default for &lt;div&gt; elements but should be specified otherwise.</p>
<p>Examples</p>
<p>Responsive</p>
<p>import Image from 'next/image'
import mountains from '../public/mountains.jpg'</p>
<p>export default function Responsive() {
return (
&lt;div style={{ display: 'flex', flexDirection: 'column' }}&gt;
&lt;Image
alt=&quot;Mountains&quot;
// Importing an image will
// automatically set the width and height
src={mountains}
sizes=&quot;100vw&quot;
// Make the image display full width
style={{
width: '100%',
height: 'auto',
}}
/&gt;
&lt;/div&gt;
)
}
Fill Container</p>
<p>import Image from 'next/image'
import mountains from '../public/mountains.jpg'</p>
<p>export default function Fill() {
return (
&lt;div
style={{
display: 'grid',
gridGap: '8px',
gridTemplateColumns: 'repeat(auto-fit, minmax(400px, auto))',
}}
&gt;
&lt;div style={{ position: 'relative', height: '400px' }}&gt;
&lt;Image
alt=&quot;Mountains&quot;
src={mountains}
fill
sizes=&quot;(min-width: 808px) 50vw, 100vw&quot;
style={{
objectFit: 'cover', // cover, contain, none
}}
/&gt;
&lt;/div&gt;
{/* And more images in the grid... */}
&lt;/div&gt;
)
}
Background Image</p>
<p>import Image from 'next/image'
import mountains from '../public/mountains.jpg'</p>
<p>export default function Background() {
return (
&lt;Image
alt=&quot;Mountains&quot;
src={mountains}
placeholder=&quot;blur&quot;
quality={100}
fill
sizes=&quot;100vw&quot;
style={{
objectFit: 'cover',
}}
/&gt;
)
}
For examples of the Image component used with the various styles, see the Image Component Demo.
Other Properties</p>
<p>View all properties available to the next/image component.
Configuration</p>
<p>The next/image component and Next.js Image Optimization API can be configured in the next.config.js file. These configurations allow you to enable remote images, define custom image breakpoints, change caching behavior and more.
Read the full image configuration documentation for more information.API ReferenceLearn more about the next/image API.ImageOptimize Images in your Next.js Application using the built-in <code>next/image</code> Component.Was this helpful?</p>
<p>supported.Send</p>
