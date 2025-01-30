# next.config.js: images | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsimagesimages
If you want to use a cloud provider to optimize images instead of using the Next.js built-in Image Optimization API, you can configure next.config.js with the following:
next.config.jsmodule.exports = {
images: {
loader: 'custom',
loaderFile: './my/image/loader.js',
},
}
This loaderFile must point to a file relative to the root of your Next.js application. The file must export a default function that returns a string, for example:
my/image/loader.js'use client'</p>
<p>export default function myImageLoader({ src, width, quality }) {
return <code>https://example.com/${src}?w=${width}&amp;q=${quality || 75}</code>
}Alternatively, you can use the loader prop to pass the function to each instance of next/image.
Good to know: Customizing the image loader file, which accepts a function, requires using Client Components to serialize the provided function.
To learn more about configuring the behavior of the built-in Image Optimization API and the Image Component, see Image Configuration Options for available options.</p>
<p>Example Loader Configuration</p>
<p>Akamai
AWS CloudFront
Cloudinary
Cloudflare
Contentful
Fastly
Gumlet
ImageEngine
Imgix
PixelBin
Sanity
Sirv
Supabase
Thumbor
Imagekit
Nitrogen AIO</p>
<p>Akamai</p>
<p>// Docs: https://techdocs.akamai.com/ivm/reference/test-images-on-demand
export default function akamaiLoader({ src, width, quality }) {
return <code>https://example.com/${src}?imwidth=${width}</code>
}
AWS CloudFront</p>
<p>// Docs: https://aws.amazon.com/developer/application-security-performance/articles/image-optimization
export default function cloudfrontLoader({ src, width, quality }) {
const url = new URL(<code>https://example.com${src}</code>)
url.searchParams.set('format', 'auto')
url.searchParams.set('width', width.toString())
url.searchParams.set('quality', (quality || 75).toString())
return url.href
}
Cloudinary</p>
<p>// Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
export default function cloudinaryLoader({ src, width, quality }) {
const params = ['f_auto', 'c_limit', <code>w_${width}</code>, <code>q_${quality || 'auto'}</code>]
return <code>https://example.com/${params.join(',')}${src}</code>
}
Cloudflare</p>
<p>// Docs: https://developers.cloudflare.com/images/transform-images
export default function cloudflareLoader({ src, width, quality }) {
const params = [<code>width=${width}</code>, <code>quality=${quality || 75}</code>, 'format=auto']
return <code>https://example.com/cdn-cgi/image/${params.join(',')}/${src}</code>
}
Contentful</p>
<p>// Docs: https://www.contentful.com/developers/docs/references/images-api/
export default function contentfulLoader({ src, width, quality }) {
const url = new URL(<code>https://example.com${src}</code>)
url.searchParams.set('fm', 'webp')
url.searchParams.set('w', width.toString())
url.searchParams.set('q', (quality || 75).toString())
return url.href
}
Fastly</p>
<p>// Docs: https://developer.fastly.com/reference/io/
export default function fastlyLoader({ src, width, quality }) {
const url = new URL(<code>https://example.com${src}</code>)
url.searchParams.set('auto', 'webp')
url.searchParams.set('width', width.toString())
url.searchParams.set('quality', (quality || 75).toString())
return url.href
}
Gumlet</p>
<p>// Docs: https://docs.gumlet.com/reference/image-transform-size
export default function gumletLoader({ src, width, quality }) {
const url = new URL(<code>https://example.com${src}</code>)
url.searchParams.set('format', 'auto')
url.searchParams.set('w', width.toString())
url.searchParams.set('q', (quality || 75).toString())
return url.href
}
ImageEngine</p>
<p>// Docs: https://support.imageengine.io/hc/en-us/articles/360058880672-Directives
export default function imageengineLoader({ src, width, quality }) {
const compression = 100 - (quality || 50)
const params = [<code>w_${width}</code>, <code>cmpr_${compression}</code>)]
return <code>https://example.com${src}?imgeng=/${params.join('/')</code>
}
Imgix</p>
<p>// Demo: https://static.imgix.net/daisy.png?format=auto&amp;fit=max&amp;w=300
export default function imgixLoader({ src, width, quality }) {
const url = new URL(<code>https://example.com${src}</code>)
const params = url.searchParams
params.set('auto', params.getAll('auto').join(',') || 'format')
params.set('fit', params.get('fit') || 'max')
params.set('w', params.get('w') || width.toString())
params.set('q', (quality || 50).toString())
return url.href
}
PixelBin</p>
<p>// Doc (Resize): https://www.pixelbin.io/docs/transformations/basic/resize/#width-w
// Doc (Optimise): https://www.pixelbin.io/docs/optimizations/quality/#image-quality-when-delivering
// Doc (Auto Format Delivery): https://www.pixelbin.io/docs/optimizations/format/#automatic-format-selection-with-f_auto-url-parameter
export default function pixelBinLoader({ src, width, quality }) {
const name = '&lt;your-cloud-name&gt;'
const opt = <code>t.resize(w:${width})~t.compress(q:${quality || 75})</code>
return <code>https://cdn.pixelbin.io/v2/${name}/${opt}/${src}?f_auto=true</code>
}
Sanity</p>
<p>// Docs: https://www.sanity.io/docs/image-urls
export default function sanityLoader({ src, width, quality }) {
const prj = 'zp7mbokg'
const dataset = 'production'
const url = new URL(<code>https://cdn.sanity.io/images/${prj}/${dataset}${src}</code>)
url.searchParams.set('auto', 'format')
url.searchParams.set('fit', 'max')
url.searchParams.set('w', width.toString())
if (quality) {
url.searchParams.set('q', quality.toString())
}
return url.href
}
Sirv</p>
<p>// Docs: https://sirv.com/help/articles/dynamic-imaging/
export default function sirvLoader({ src, width, quality }) {
const url = new URL(<code>https://example.com${src}</code>)
const params = url.searchParams
params.set('format', params.getAll('format').join(',') || 'optimal')
params.set('w', params.get('w') || width.toString())
params.set('q', (quality || 85).toString())
return url.href
}
Supabase</p>
<p>// Docs: https://supabase.com/docs/guides/storage/image-transformations#nextjs-loader
export default function supabaseLoader({ src, width, quality }) {
const url = new URL(<code>https://example.com${src}</code>)
url.searchParams.set('width', width.toString())
url.searchParams.set('quality', (quality || 75).toString())
return url.href
}
Thumbor</p>
<p>// Docs: https://thumbor.readthedocs.io/en/latest/
export default function thumborLoader({ src, width, quality }) {
const params = [<code>${width}x0</code>, <code>filters:quality(${quality || 75})</code>]
return <code>https://example.com${params.join('/')}${src}</code>
}
ImageKit.io</p>
<p>// Docs: https://imagekit.io/docs/image-transformation
export default function imageKitLoader({ src, width, quality }) {
const params = [<code>w-${width}</code>, <code>q-${quality || 80}</code>]
return <code>https://ik.imagekit.io/your_imagekit_id/${src}?tr=${params.join(',')}</code>
}
Nitrogen AIO</p>
<p>// Docs: https://docs.n7.io/aio/intergrations/
export default function aioLoader({ src, width, quality }) {
const url = new URL(src, window.location.href)
const params = url.searchParams
const aioParams = params.getAll('aio')
aioParams.push(<code>w-${width}</code>)
if (quality) {
aioParams.push(<code>q-${quality.toString()}</code>)
}
params.set('aio', aioParams.join(';'))
return url.href
}Was this helpful?</p>
<p>supported.Send</p>
