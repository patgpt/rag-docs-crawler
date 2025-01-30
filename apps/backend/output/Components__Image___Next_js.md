# Components: Image | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceComponentsImageImage
Examples
Image Component</p>
<p>This API reference will help you understand how to use props and configuration options available for the Image Component. For features and usage, please see the Image Component page.
app/page.jsimport Image from 'next/image'</p>
<p>export default function Page() {
return (
&lt;Image
src=&quot;/profile.png&quot;
width={500}
height={500}
alt=&quot;Picture of the author&quot;
/&gt;
)
}
Props</p>
<p>Here's a summary of the props available for the Image Component:
PropExampleTypeStatussrcsrc=&quot;/profile.png&quot;StringRequiredwidthwidth={500}Integer (px)Requiredheightheight={500}Integer (px)Requiredaltalt=&quot;Picture of the author&quot;StringRequiredloaderloader={imageLoader}Function-fillfill={true}Boolean-sizessizes=&quot;(max-width: 768px) 100vw, 33vw&quot;String-qualityquality={80}Integer (1-100)-prioritypriority={true}Boolean-placeholderplaceholder=&quot;blur&quot;String-stylestyle={{objectFit: &quot;contain&quot;}}Object-onLoadingCompleteonLoadingComplete={img =&gt; done())}FunctionDeprecatedonLoadonLoad={event =&gt; done())}Function-onErroronError(event =&gt; fail()}Function-loadingloading=&quot;lazy&quot;String-blurDataURLblurDataURL=&quot;data:image/jpeg...&quot;String-overrideSrcoverrideSrc=&quot;/seo.png&quot;String-
Required Props</p>
<p>The Image Component requires the following properties: src, alt, width and height (or fill).
app/page.jsimport Image from 'next/image'</p>
<p>export default function Page() {
return (
&lt;div&gt;
&lt;Image
src=&quot;/profile.png&quot;
width={500}
height={500}
alt=&quot;Picture of the author&quot;
/&gt;
&lt;/div&gt;
)
}
src</p>
<p>Must be one of the following:</p>
<p>A statically imported image file
A path string. This can be either an absolute external URL, or an internal path depending on the loader prop.</p>
<p>When using the default loader, also consider the following for source images:</p>
<p>When src is an external URL, you must also configure remotePatterns
When src is animated or not a known format (JPEG, PNG, WebP, AVIF, GIF, TIFF) the image will be served as-is
When src is SVG format, it will be blocked unless unoptimized or dangerouslyAllowSVG is enabled</p>
<p>width</p>
<p>The width property represents the intrinsic image width in pixels. This property is used to infer the correct aspect ratio of the image and avoid layout shift during loading. It does not determine the rendered size of the image, which is controlled by CSS, similar to the width attribute in the HTML &lt;img&gt; tag.
Required, except for statically imported images or images with the fill property.
height</p>
<p>The height property represents the intrinsic image height in pixels. This property is used to infer the correct aspect ratio of the image and avoid layout shift during loading. It does not determine the rendered size of the image, which is controlled by CSS, similar to the height attribute in the HTML &lt;img&gt; tag.
Required, except for statically imported images or images with the fill property.</p>
<p>Good to know:</p>
<p>Combined, both width and height properties are used to determine the aspect ratio of the image which used by browsers to reserve space for the image before it loads.
The intrinsic size does not always mean the rendered size in the browser, which will be determined by the parent container. For example, if the parent container is smaller than the intrinsic size, the image will be scaled down to fit the container.
You can use the fill property when the width and height are unknown.</p>
<p>alt</p>
<p>The alt property is used to describe the image for screen readers and search engines. It is also the fallback text if images have been disabled or an error occurs while loading the image.
It should contain text that could replace the image without changing the meaning of the page. It is not meant to supplement the image and should not repeat information that is already provided in the captions above or below the image.
If the image is purely decorative or not intended for the user, the alt property should be an empty string (alt=&quot;&quot;).
Learn more
Optional Props</p>
<p>The &lt;Image /&gt; component accepts a number of additional properties beyond those which are required. This section describes the most commonly-used properties of the Image component. Find details about more rarely-used properties in the Advanced Props section.
loader</p>
<p>A custom function used to resolve image URLs.
A loader is a function returning a URL string for the image, given the following parameters:</p>
<p>src
width
quality</p>
<p>Here is an example of using a custom loader:
'use client'</p>
<p>import Image from 'next/image'</p>
<p>const imageLoader = ({ src, width, quality }) =&gt; {
return <code>https://example.com/${src}?w=${width}&amp;q=${quality || 75}</code>
}</p>
<p>export default function Page() {
return (
&lt;Image
loader={imageLoader}
src=&quot;me.png&quot;
alt=&quot;Picture of the author&quot;
width={500}
height={500}
/&gt;
)
}
Good to know: Using props like loader, which accept a function, requires using Client Components to serialize the provided function.</p>
<p>Alternatively, you can use the loaderFile configuration in next.config.js to configure every instance of next/image in your application, without passing a prop.
fill</p>
<p>fill={true} // {true} | {false}
A boolean that causes the image to fill the parent element, which is useful when the width and height are unknown.
The parent element must assign position: &quot;relative&quot;, position: &quot;fixed&quot;, or position: &quot;absolute&quot; style.
By default, the img element will automatically be assigned the position: &quot;absolute&quot; style.
If no styles are applied to the image, the image will stretch to fit the container. You may prefer to set object-fit: &quot;contain&quot; for an image which is letterboxed to fit the container and preserve aspect ratio.
Alternatively, object-fit: &quot;cover&quot; will cause the image to fill the entire container and be cropped to preserve aspect ratio.
For more information, see also:</p>
<p>position
object-fit
object-position</p>
<p>sizes</p>
<p>A string, similar to a media query, that provides information about how wide the image will be at different breakpoints. The value of sizes will greatly affect performance for images using fill or which are styled to have a responsive size.
The sizes property serves two important purposes related to image performance:</p>
<p>First, the value of sizes is used by the browser to determine which size of the image to download, from next/image's automatically generated srcset. When the browser chooses, it does not yet know the size of the image on the page, so it selects an image that is the same size or larger than the viewport. The sizes property allows you to tell the browser that the image will actually be smaller than full screen. If you don't specify a sizes value in an image with the fill property, a default value of 100vw (full screen width) is used.
Second, the sizes property changes the behavior of the automatically generated srcset value. If no sizes value is present, a small srcset is generated, suitable for a fixed-size image (1x/2x/etc). If sizes is defined, a large srcset is generated, suitable for a responsive image (640w/750w/etc). If the sizes property includes sizes such as 50vw, which represent a percentage of the viewport width, then the srcset is trimmed to not include any values which are too small to ever be necessary.</p>
<p>For example, if you know your styling will cause an image to be full-width on mobile devices, in a 2-column layout on tablets, and a 3-column layout on desktop displays, you should include a sizes property such as the following:
import Image from 'next/image'</p>
<p>export default function Page() {
return (
&lt;div className=&quot;grid-element&quot;&gt;
&lt;Image
fill
src=&quot;/example.png&quot;
sizes=&quot;(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw&quot;
/&gt;
&lt;/div&gt;
)
}
This example sizes could have a dramatic effect on performance metrics. Without the 33vw sizes, the image selected from the server would be 3 times as wide as it needs to be. Because file size is proportional to the square of the width, without sizes the user would download an image that's 9 times larger than necessary.
Learn more about srcset and sizes:</p>
<p>web.dev
mdn</p>
<p>quality</p>
<p>quality={75} // {number 1-100}
The quality of the optimized image, an integer between 1 and 100, where 100 is the best quality and therefore largest file size. Defaults to 75.
If the qualities configuration is defined in next.config.js, the quality prop must match one of the values defined in the configuration.</p>
<p>Good to know: If the original source image was already low quality, setting the quality prop too high could cause the resulting optimized image to be larger than the original source image.</p>
<p>priority</p>
<p>priority={false} // {false} | {true}
When true, Next.js will
preload the image. Lazy loading is automatically disabled for images using priority. If the loading property is also used and set to lazy, the priority property can't be used. The loading property is only meant for advanced use cases. Remove loading when priority is needed.
You should use the priority property on any image detected as the Largest Contentful Paint (LCP) element. It may be appropriate to have multiple priority images, as different images may be the LCP element for different viewport sizes.
Should only be used when the image is visible above the fold. Defaults to false.
placeholder</p>
<p>placeholder = 'empty' // &quot;empty&quot; | &quot;blur&quot; | &quot;data:image/...&quot;
A placeholder to use while the image is loading. Possible values are blur, empty, or data:image/.... Defaults to empty.
When blur, the blurDataURL property will be used as the placeholder. If src is an object from a static import and the imported image is .jpg, .png, .webp, or .avif, then blurDataURL will be automatically populated, except when the image is detected to be animated.
For dynamic images, you must provide the blurDataURL property. Solutions such as Plaiceholder can help with base64 generation.
When data:image/..., the Data URL will be used as the placeholder while the image is loading.
When empty, there will be no placeholder while the image is loading, only empty space.
Try it out:</p>
<p>Demo the blur placeholder
Demo the shimmer effect with data URL placeholder prop
Demo the color effect with blurDataURL prop</p>
<p>Advanced Props</p>
<p>In some cases, you may need more advanced usage. The &lt;Image /&gt; component optionally accepts the following advanced properties.
style</p>
<p>Allows passing CSS styles to the underlying image element.
components/ProfileImage.jsconst imageStyle = {
borderRadius: '50%',
border: '1px solid #fff',
}</p>
<p>export default function ProfileImage() {
return &lt;Image src=&quot;...&quot; style={imageStyle} /&gt;
}
Remember that the required width and height props can interact with your styling. If you use styling to modify an image's width, you should also style its height to auto to preserve its intrinsic aspect ratio, or your image will be distorted.
onLoadingComplete</p>
<p>'use client'</p>
<p>&lt;Image onLoadingComplete={(img) =&gt; console.log(img.naturalWidth)} /&gt;</p>
<p>Warning: Deprecated since Next.js 14 in favor of onLoad.</p>
<p>A callback function that is invoked once the image is completely loaded and the placeholder has been removed.
The callback function will be called with one argument, a reference to the underlying &lt;img&gt; element.</p>
<p>Good to know: Using props like onLoadingComplete, which accept a function, requires using Client Components to serialize the provided function.</p>
<p>onLoad</p>
<p>&lt;Image onLoad={(e) =&gt; console.log(e.target.naturalWidth)} /&gt;
A callback function that is invoked once the image is completely loaded and the placeholder has been removed.
The callback function will be called with one argument, the Event which has a target that references the underlying &lt;img&gt; element.</p>
<p>Good to know: Using props like onLoad, which accept a function, requires using Client Components to serialize the provided function.</p>
<p>onError</p>
<p>&lt;Image onError={(e) =&gt; console.error(e.target.id)} /&gt;
A callback function that is invoked if the image fails to load.</p>
<p>Good to know: Using props like onError, which accept a function, requires using Client Components to serialize the provided function.</p>
<p>loading</p>
<p>loading = 'lazy' // {lazy} | {eager}
The loading behavior of the image. Defaults to lazy.
When lazy, defer loading the image until it reaches a calculated distance from
the viewport.
When eager, load the image immediately.
Learn more about the loading attribute.
blurDataURL</p>
<p>A Data URL to
be used as a placeholder image before the src image successfully loads. Only takes effect when combined
with placeholder=&quot;blur&quot;.
Must be a base64-encoded image. It will be enlarged and blurred, so a very small image (10px or
less) is recommended. Including larger images as placeholders may harm your application performance.
Try it out:</p>
<p>Demo the default blurDataURL prop
Demo the color effect with blurDataURL prop</p>
<p>You can also generate a solid color Data URL to match the image.
unoptimized</p>
<p>unoptimized = {false} // {false} | {true}
When true, the source image will be served as-is from the src instead of changing quality, size, or format. Defaults to false.
This is useful for images that do not benefit from optimization such as small images (less than 1KB), vector images (SVG), or animated images (GIF).
import Image from 'next/image'</p>
<p>const UnoptimizedImage = (props) =&gt; {
return &lt;Image {...props} unoptimized /&gt;
}
Since Next.js 12.3.0, this prop can be assigned to all images by updating next.config.js with the following configuration:
next.config.jsmodule.exports = {
images: {
unoptimized: true,
},
}
overrideSrc</p>
<p>When providing the src prop to the &lt;Image&gt; component, both the srcset and src attributes are generated automatically for the resulting &lt;img&gt;.
input.js&lt;Image src=&quot;/me.jpg&quot; /&gt;
output.html&lt;img
srcset=&quot;
/_next/image?url=%2Fme.jpg&amp;w=640&amp;q=75 1x,
/_next/image?url=%2Fme.jpg&amp;w=828&amp;q=75 2x
&quot;
src=&quot;/_next/image?url=%2Fme.jpg&amp;w=828&amp;q=75&quot;
/&gt;
In some cases, it is not desirable to have the src attribute generated and you may wish to override it using the overrideSrc prop.
For example, when upgrading an existing website from &lt;img&gt; to &lt;Image&gt;, you may wish to maintain the same src attribute for SEO purposes such as image ranking or avoiding recrawl.
input.js&lt;Image src=&quot;/me.jpg&quot; overrideSrc=&quot;/override.jpg&quot; /&gt;
output.html&lt;img
srcset=&quot;
/_next/image?url=%2Fme.jpg&amp;w=640&amp;q=75 1x,
/_next/image?url=%2Fme.jpg&amp;w=828&amp;q=75 2x
&quot;
src=&quot;/override.jpg&quot;
/&gt;
decoding</p>
<p>A hint to the browser indicating if it should wait for the image to be decoded before presenting other content updates or not. Defaults to async.
Possible values are the following:</p>
<p>async - Asynchronously decode the image and allow other content to be rendered before it completes.
sync - Synchronously decode the image for atomic presentation with other content.
auto - No preference for the decoding mode; the browser decides what's best.</p>
<p>Learn more about the decoding attribute.
Other Props</p>
<p>Other properties on the &lt;Image /&gt; component will be passed to the underlying
img element with the exception of the following:</p>
<p>srcSet. Use Device Sizes instead.</p>
<p>Configuration Options</p>
<p>In addition to props, you can configure the Image Component in next.config.js. The following options are available:
localPatterns</p>
<p>You can optionally configure localPatterns in your next.config.js file in order to allow specific paths to be optimized and block all others paths.
next.config.jsmodule.exports = {
images: {
localPatterns: [
{
pathname: '/assets/images/**',
search: '',
},
],
},
}</p>
<p>Good to know: The example above will ensure the src property of next/image must start with /assets/images/ and must not have a query string. Attempting to optimize any other path will respond with 400 Bad Request.</p>
<p>remotePatterns</p>
<p>To protect your application from malicious users, configuration is required in order to use external images. This ensures that only external images from your account can be served from the Next.js Image Optimization API. These external images can be configured with the remotePatterns property in your next.config.js file, as shown below:
next.config.jsmodule.exports = {
images: {
remotePatterns: [
{
protocol: 'https',
hostname: 'example.com',
port: '',
pathname: '/account123/**',
search: '',
},
],
},
}</p>
<p>Good to know: The example above will ensure the src property of next/image must start with https://example.com/account123/ and must not have a query string. Any other protocol, hostname, port, or unmatched path will respond with 400 Bad Request.</p>
<p>Below is an example of the remotePatterns property in the next.config.js file using a wildcard pattern in the hostname:
next.config.jsmodule.exports = {
images: {
remotePatterns: [
{
protocol: 'https',
hostname: '**.example.com',
port: '',
search: '',
},
],
},
}</p>
<p>Good to know: The example above will ensure the src property of next/image must start with https://img1.example.com or https://me.avatar.example.com or any number of subdomains. It cannot have a port or query string. Any other protocol or unmatched hostname will respond with 400 Bad Request.</p>
<p>Wildcard patterns can be used for both pathname and hostname and have the following syntax:</p>
<ul>
<li>match a single path segment or subdomain
** match any number of path segments at the end or subdomains at the beginning</li>
</ul>
<p>The ** syntax does not work in the middle of the pattern.</p>
<p>Good to know: When omitting protocol, port, pathname, or search then the wildcard ** is implied. This is not recommended because it may allow malicious actors to optimize urls you did not intend.</p>
<p>Below is an example of the remotePatterns property in the next.config.js file using search:
next.config.jsmodule.exports = {
images: {
remotePatterns: [
{
protocol: 'https',
hostname: 'assets.example.com',
search: '?v=1727111025337',
},
],
},
}</p>
<p>Good to know: The example above will ensure the src property of next/image must start with https://assets.example.com and must have the exact query string ?v=1727111025337. Any other protocol or query string will respond with 400 Bad Request.</p>
<p>domains</p>
<p>Warning: Deprecated since Next.js 14 in favor of strict remotePatterns in order to protect your application from malicious users. Only use domains if you own all the content served from the domain.</p>
<p>Similar to remotePatterns, the domains configuration can be used to provide a list of allowed hostnames for external images.
However, the domains configuration does not support wildcard pattern matching and it cannot restrict protocol, port, or pathname.
Below is an example of the domains property in the next.config.js file:
next.config.jsmodule.exports = {
images: {
domains: ['assets.acme.com'],
},
}
loaderFile</p>
<p>If you want to use a cloud provider to optimize images instead of using the Next.js built-in Image Optimization API, you can configure the loaderFile in your next.config.js like the following:
next.config.jsmodule.exports = {
images: {
loader: 'custom',
loaderFile: './my/image/loader.js',
},
}
This must point to a file relative to the root of your Next.js application. The file must export a default function that returns a string, for example:
my/image/loader.js'use client'</p>
<p>export default function myImageLoader({ src, width, quality }) {
return <code>https://example.com/${src}?w=${width}&amp;q=${quality || 75}</code>
}</p>
<p>Alternatively, you can use the loader prop to configure each instance of next/image.
Examples:</p>
<p>Custom Image Loader Configuration</p>
<p>Good to know: Customizing the image loader file, which accepts a function, requires using Client Components to serialize the provided function.</p>
<p>Advanced</p>
<p>The following configuration is for advanced use cases and is usually not necessary. If you choose to configure the properties below, you will override any changes to the Next.js defaults in future updates.
deviceSizes</p>
<p>If you know the expected device widths of your users, you can specify a list of device width breakpoints using the deviceSizes property in next.config.js. These widths are used when the next/image component uses sizes prop to ensure the correct image is served for user's device.
If no configuration is provided, the default below is used.
next.config.jsmodule.exports = {
images: {
deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
},
}
imageSizes</p>
<p>You can specify a list of image widths using the images.imageSizes property in your next.config.js file. These widths are concatenated with the array of device sizes to form the full array of sizes used to generate image srcsets.
The reason there are two separate lists is that imageSizes is only used for images which provide a sizes prop, which indicates that the image is less than the full width of the screen. Therefore, the sizes in imageSizes should all be smaller than the smallest size in deviceSizes.
If no configuration is provided, the default below is used.
next.config.jsmodule.exports = {
images: {
imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
},
}
qualities</p>
<p>The default Image Optimization API will automatically allow all qualities from 1 to 100. If you wish to restrict the allowed qualities, you can add configuration to next.config.js.
next.config.jsmodule.exports = {
images: {
qualities: [25, 50, 75],
},
}
In this example above, only three qualities are allowed: 25, 50, and 75. If the quality prop does not match a value in this array, the image will fail with 400 Bad Request.
formats</p>
<p>The default Image Optimization API will automatically detect the browser's supported image formats via the request's Accept header in order to determine the best output format.
If the Accept header matches more than one of the configured formats, the first match in the array is used. Therefore, the array order matters. If there is no match (or the source image is animated), the Image Optimization API will fallback to the original image's format.
If no configuration is provided, the default below is used.
next.config.jsmodule.exports = {
images: {
formats: ['image/webp'],
},
}
You can enable AVIF support and still fallback to WebP with the following configuration.
next.config.jsmodule.exports = {
images: {
formats: ['image/avif', 'image/webp'],
},
}</p>
<p>Good to know:</p>
<p>AVIF generally takes 50% longer to encode but it compresses 20% smaller compared to WebP. This means that the first time an image is requested, it will typically be slower and then subsequent requests that are cached will be faster.
If you self-host with a Proxy/CDN in front of Next.js, you must configure the Proxy to forward the Accept header.</p>
<p>Caching Behavior</p>
<p>The following describes the caching algorithm for the default loader. For all other loaders, please refer to your cloud provider's documentation.
Images are optimized dynamically upon request and stored in the &lt;distDir&gt;/cache/images directory. The optimized image file will be served for subsequent requests until the expiration is reached. When a request is made that matches a cached but expired file, the expired image is served stale immediately. Then the image is optimized again in the background (also called revalidation) and saved to the cache with the new expiration date.
The cache status of an image can be determined by reading the value of the x-nextjs-cache response header. The possible values are the following:</p>
<p>MISS - the path is not in the cache (occurs at most once, on the first visit)
STALE - the path is in the cache but exceeded the revalidate time so it will be updated in the background
HIT - the path is in the cache and has not exceeded the revalidate time</p>
<p>The expiration (or rather Max Age) is defined by either the minimumCacheTTL configuration or the upstream image Cache-Control header, whichever is larger. Specifically, the max-age value of the Cache-Control header is used. If both s-maxage and max-age are found, then s-maxage is preferred. The max-age is also passed-through to any downstream clients including CDNs and browsers.</p>
<p>You can configure minimumCacheTTL to increase the cache duration when the upstream image does not include Cache-Control header or the value is very low.
You can configure deviceSizes and imageSizes to reduce the total number of possible generated images.
You can configure formats to disable multiple formats in favor of a single image format.</p>
<p>minimumCacheTTL</p>
<p>You can configure the Time to Live (TTL) in seconds for cached optimized images. In many cases, it's better to use a Static Image Import which will automatically hash the file contents and cache the image forever with a Cache-Control header of immutable.
next.config.jsmodule.exports = {
images: {
minimumCacheTTL: 60,
},
}
The expiration (or rather Max Age) of the optimized image is defined by either the minimumCacheTTL or the upstream image Cache-Control header, whichever is larger.
If you need to change the caching behavior per image, you can configure headers to set the Cache-Control header on the upstream image (e.g. /some-asset.jpg, not /_next/image itself).
There is no mechanism to invalidate the cache at this time, so its best to keep minimumCacheTTL low. Otherwise you may need to manually change the src prop or delete &lt;distDir&gt;/cache/images.
disableStaticImages</p>
<p>The default behavior allows you to import static files such as import icon from './icon.png' and then pass that to the src property.
In some cases, you may wish to disable this feature if it conflicts with other plugins that expect the import to behave differently.
You can disable static image imports inside your next.config.js:
next.config.jsmodule.exports = {
images: {
disableStaticImages: true,
},
}
dangerouslyAllowSVG</p>
<p>The default loader does not optimize SVG images for a few reasons. First, SVG is a vector format meaning it can be resized losslessly. Second, SVG has many of the same features as HTML/CSS, which can lead to vulnerabilities without proper Content Security Policy (CSP) headers.
Therefore, we recommended using the unoptimized prop when the src prop is known to be SVG. This happens automatically when src ends with &quot;.svg&quot;.
However, if you need to serve SVG images with the default Image Optimization API, you can set dangerouslyAllowSVG inside your next.config.js:
next.config.jsmodule.exports = {
images: {
dangerouslyAllowSVG: true,
contentDispositionType: 'attachment',
contentSecurityPolicy: &quot;default-src 'self'; script-src 'none'; sandbox;&quot;,
},
}
In addition, it is strongly recommended to also set contentDispositionType to force the browser to download the image, as well as contentSecurityPolicy to prevent scripts embedded in the image from executing.
contentDispositionType</p>
<p>The default loader sets the Content-Disposition header to attachment for added protection since the API can serve arbitrary remote images.
The default value is attachment which forces the browser to download the image when visiting directly. This is particularly important when dangerouslyAllowSVG is true.
You can optionally configure inline to allow the browser to render the image when visiting directly, without downloading it.
next.config.jsmodule.exports = {
images: {
contentDispositionType: 'inline',
},
}
Animated Images</p>
<p>The default loader will automatically bypass Image Optimization for animated images and serve the image as-is.
Auto-detection for animated files is best-effort and supports GIF, APNG, and WebP. If you want to explicitly bypass Image Optimization for a given animated image, use the unoptimized prop.
Responsive Images</p>
<p>The default generated srcset contains 1x and 2x images in order to support different device pixel ratios. However, you may wish to render a responsive image that stretches with the viewport. In that case, you'll need to set sizes as well as style (or className).
You can render a responsive image using one of the following methods below.
Responsive image using a static import</p>
<p>If the source image is not dynamic, you can statically import to create a responsive image:
components/author.jsimport Image from 'next/image'
import me from '../photos/me.jpg'</p>
<p>export default function Author() {
return (
&lt;Image
src={me}
alt=&quot;Picture of the author&quot;
sizes=&quot;100vw&quot;
style={{
width: '100%',
height: 'auto',
}}
/&gt;
)
}
Try it out:</p>
<p>Demo the image responsive to viewport</p>
<p>Responsive image with aspect ratio</p>
<p>If the source image is a dynamic or a remote url, you will also need to provide width and height to set the correct aspect ratio of the responsive image:
components/page.jsimport Image from 'next/image'</p>
<p>export default function Page({ photoUrl }) {
return (
&lt;Image
src={photoUrl}
alt=&quot;Picture of the author&quot;
sizes=&quot;100vw&quot;
style={{
width: '100%',
height: 'auto',
}}
width={500}
height={300}
/&gt;
)
}
Try it out:</p>
<p>Demo the image responsive to viewport</p>
<p>Responsive image with fill</p>
<p>If you don't know the aspect ratio, you will need to set the fill prop and set position: relative on the parent. Optionally, you can set object-fit style depending on the desired stretch vs crop behavior:
app/page.jsimport Image from 'next/image'</p>
<p>export default function Page({ photoUrl }) {
return (
&lt;div style={{ position: 'relative', width: '300px', height: '500px' }}&gt;
&lt;Image
src={photoUrl}
alt=&quot;Picture of the author&quot;
sizes=&quot;300px&quot;
fill
style={{
objectFit: 'contain',
}}
/&gt;
&lt;/div&gt;
)
}
Try it out:</p>
<p>Demo the fill prop</p>
<p>Theme Detection CSS</p>
<p>If you want to display a different image for light and dark mode, you can create a new component that wraps two &lt;Image&gt; components and reveals the correct one based on a CSS media query.
components/theme-image.module.css.imgDark {
display: none;
}</p>
<p>@media (prefers-color-scheme: dark) {
.imgLight {
display: none;
}
.imgDark {
display: unset;
}
}
components/theme-image.tsxTypeScriptJavaScriptTypeScriptimport styles from './theme-image.module.css'
import Image, { ImageProps } from 'next/image'</p>
<p>type Props = Omit&lt;ImageProps, 'src' | 'priority' | 'loading'&gt; &amp; {
srcLight: string
srcDark: string
}</p>
<p>const ThemeImage = (props: Props) =&gt; {
const { srcLight, srcDark, ...rest } = props</p>
<p>return (
&lt;&gt;
&lt;Image {...rest} src={srcLight} className={styles.imgLight} /&gt;
&lt;Image {...rest} src={srcDark} className={styles.imgDark} /&gt;
&lt;/&gt;
)
}</p>
<p>Good to know: The default behavior of loading=&quot;lazy&quot; ensures that only the correct image is loaded. You cannot use priority or loading=&quot;eager&quot; because that would cause both images to load. Instead, you can use fetchPriority=&quot;high&quot;.</p>
<p>Try it out:</p>
<p>Demo light/dark mode theme detection</p>
<p>getImageProps</p>
<p>For more advanced use cases, you can call getImageProps() to get the props that would be passed to the underlying &lt;img&gt; element, and instead pass to them to another component, style, canvas, etc.
This also avoid calling React useState() so it can lead to better performance, but it cannot be used with the placeholder prop because the placeholder will never be removed.
Theme Detection Picture</p>
<p>If you want to display a different image for light and dark mode, you can use the &lt;picture&gt; element to display a different image based on the user's preferred color scheme.
app/page.jsimport { getImageProps } from 'next/image'</p>
<p>export default function Page() {
const common = { alt: 'Theme Example', width: 800, height: 400 }
const {
props: { srcSet: dark },
} = getImageProps({ ...common, src: '/dark.png' })
const {
props: { srcSet: light, ...rest },
} = getImageProps({ ...common, src: '/light.png' })</p>
<p>return (
&lt;picture&gt;
&lt;source media=&quot;(prefers-color-scheme: dark)&quot; srcSet={dark} /&gt;
&lt;source media=&quot;(prefers-color-scheme: light)&quot; srcSet={light} /&gt;
&lt;img {...rest} /&gt;
&lt;/picture&gt;
)
}
Art Direction</p>
<p>If you want to display a different image for mobile and desktop, sometimes called Art Direction, you can provide different src, width, height, and quality props to getImageProps().
app/page.jsimport { getImageProps } from 'next/image'</p>
<p>export default function Home() {
const common = { alt: 'Art Direction Example', sizes: '100vw' }
const {
props: { srcSet: desktop },
} = getImageProps({
...common,
width: 1440,
height: 875,
quality: 80,
src: '/desktop.jpg',
})
const {
props: { srcSet: mobile, ...rest },
} = getImageProps({
...common,
width: 750,
height: 1334,
quality: 70,
src: '/mobile.jpg',
})</p>
<p>return (
&lt;picture&gt;
&lt;source media=&quot;(min-width: 1000px)&quot; srcSet={desktop} /&gt;
&lt;source media=&quot;(min-width: 500px)&quot; srcSet={mobile} /&gt;
&lt;img {...rest} style={{ width: '100%', height: 'auto' }} /&gt;
&lt;/picture&gt;
)
}
Background CSS</p>
<p>You can even convert the srcSet string to the image-set() CSS function to optimize a background image.
app/page.jsimport { getImageProps } from 'next/image'</p>
<p>function getBackgroundImage(srcSet = '') {
const imageSet = srcSet
.split(', ')
.map((str) =&gt; {
const [url, dpi] = str.split(' ')
return <code>url(&quot;${url}&quot;) ${dpi}</code>
})
.join(', ')
return <code>image-set(${imageSet})</code>
}</p>
<p>export default function Home() {
const {
props: { srcSet },
} = getImageProps({ alt: '', width: 128, height: 128, src: '/img.png' })
const backgroundImage = getBackgroundImage(srcSet)
const style = { height: '100vh', width: '100vw', backgroundImage }</p>
<p>return (
&lt;main style={style}&gt;
&lt;h1&gt;Hello World&lt;/h1&gt;
&lt;/main&gt;
)
}
Known Browser Bugs</p>
<p>This next/image component uses browser native lazy loading, which may fallback to eager loading for older browsers before Safari 15.4. When using the blur-up placeholder, older browsers before Safari 12 will fallback to empty placeholder. When using styles with width/height of auto, it is possible to cause Layout Shift on older browsers before Safari 15 that don't preserve the aspect ratio. For more details, see this MDN video.</p>
<p>Safari 15 - 16.3 display a gray border while loading. Safari 16.4 fixed this issue. Possible solutions:</p>
<p>Use CSS @supports (font: -apple-system-body) and (-webkit-appearance: none) { img[loading=&quot;lazy&quot;] { clip-path: inset(0.6px) } }
Use priority if the image is above the fold</p>
<p>Firefox 67+ displays a white background while loading. Possible solutions:</p>
<p>Enable AVIF formats
Use placeholder</p>
<p>Version History</p>
<p>VersionChangesv15.0.0contentDispositionType configuration default changed to attachment.v14.2.23qualities configuration added.v14.2.15decoding prop added and localPatterns configuration added.v14.2.14remotePatterns.search prop added.v14.2.0overrideSrc prop added.v14.1.0getImageProps() is stable.v14.0.0onLoadingComplete prop and domains config deprecated.v13.4.14placeholder prop support for data:/image...v13.2.0contentDispositionType configuration added.v13.0.6ref prop added.v13.0.0The next/image import was renamed to next/legacy/image. The next/future/image import was renamed to next/image. A codemod is available to safely and automatically rename your imports. &lt;span&gt; wrapper removed. layout, objectFit, objectPosition, lazyBoundary, lazyRoot props removed. alt is required. onLoadingComplete receives reference to img element. Built-in loader config removed.v12.3.0remotePatterns and unoptimized configuration is stable.v12.2.0Experimental remotePatterns and experimental unoptimized configuration added. layout=&quot;raw&quot; removed.v12.1.1style prop added. Experimental support for layout=&quot;raw&quot; added.v12.1.0dangerouslyAllowSVG and contentSecurityPolicy configuration added.v12.0.9lazyRoot prop added.v12.0.0formats configuration added.AVIF support added.Wrapper &lt;div&gt; changed to &lt;span&gt;.v11.1.0onLoadingComplete and lazyBoundary props added.v11.0.0src prop support for static import.placeholder prop added.blurDataURL prop added.v10.0.5loader prop added.v10.0.1layout prop added.v10.0.0next/image introduced.Was this helpful?</p>
<p>supported.Send</p>
