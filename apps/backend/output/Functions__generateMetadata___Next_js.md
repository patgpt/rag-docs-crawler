# Functions: generateMetadata | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsgenerateMetadatagenerateMetadataThis page covers all Config-based Metadata options with generateMetadata and the static metadata object.
layout.tsx | page.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata } from 'next'</p>
<p>// either Static metadata
export const metadata: Metadata = {
title: '...',
}</p>
<p>// or Dynamic metadata
export async function generateMetadata({ params }) {
return {
title: '...',
}
}</p>
<p>Good to know:</p>
<p>The metadata object and generateMetadata function exports are only supported in Server Components.
You cannot export both the metadata object and generateMetadata function from the same route segment.
On the initial load, streaming is blocked until generateMetadata has fully resolved, including any content from loading.js.</p>
<p>The metadata object</p>
<p>To define static metadata, export a Metadata object from a layout.js or page.js file.
layout.tsx | page.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
title: '...',
description: '...',
}</p>
<p>export default function Page() {}</p>
<p>See the Metadata Fields for a complete list of supported options.
generateMetadata function</p>
<p>Dynamic metadata depends on dynamic information, such as the current route parameters, external data, or metadata in parent segments, can be set by exporting a generateMetadata function that returns a Metadata object.
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
<p>Parameters</p>
<p>generateMetadata function accepts the following parameters:</p>
<p>props - An object containing the parameters of the current route:</p>
<p>params - An object containing the dynamic route parameters object from the root segment down to the segment generateMetadata is called from. Examples:
RouteURLparamsapp/shop/[slug]/page.js/shop/1{ slug: '1' }app/shop/[tag]/[item]/page.js/shop/1/2{ tag: '1', item: '2' }app/shop/[...slug]/page.js/shop/1/2{ slug: ['1', '2'] }</p>
<p>searchParams - An object containing the current URL's search params. Examples:
URLsearchParams/shop?a=1{ a: '1' }/shop?a=1&amp;b=2{ a: '1', b: '2' }/shop?a=1&amp;a=2{ a: ['1', '2'] }</p>
<p>parent - A promise of the resolved metadata from parent route segments.</p>
<p>Returns</p>
<p>generateMetadata should return a Metadata object containing one or more metadata fields.</p>
<p>Good to know:</p>
<p>If metadata doesn't depend on runtime information, it should be defined using the static metadata object rather than generateMetadata.
fetch requests are automatically memoized for the same data across generateMetadata, generateStaticParams, Layouts, Pages, and Server Components. React cache can be used if fetch is unavailable.
searchParams are only available in page.js segments.
The redirect() and notFound() Next.js methods can also be used inside generateMetadata.</p>
<p>Metadata Fields</p>
<p>title</p>
<p>The title attribute is used to set the title of the document. It can be defined as a simple string or an optional template object.
String</p>
<p>layout.js | page.jsexport const metadata = {
title: 'Next.js',
}
&lt;head&gt; output&lt;title&gt;Next.js&lt;/title&gt;
Template object</p>
<p>app/layout.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
title: {
template: '...',
default: '...',
absolute: '...',
},
}</p>
<p>Default</p>
<p>title.default can be used to provide a fallback title to child route segments that don't define a title.
app/layout.tsximport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
title: {
default: 'Acme',
},
}
app/about/page.tsximport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {}</p>
<p>// Output: &lt;title&gt;Acme&lt;/title&gt;
Template</p>
<p>title.template can be used to add a prefix or a suffix to titles defined in child route segments.
app/layout.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
title: {
template: '%s | Acme',
default: 'Acme', // a default is required when creating a template
},
}</p>
<p>app/about/page.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
title: 'About',
}</p>
<p>// Output: &lt;title&gt;About | Acme&lt;/title&gt;</p>
<p>Good to know:</p>
<p>title.template applies to child route segments and not the segment it's defined in. This means:</p>
<p>title.default is required when you add a title.template.
title.template defined in layout.js will not apply to a title defined in a page.js of the same route segment.
title.template defined in page.js has no effect because a page is always the terminating segment (it doesn't have any children route segments).</p>
<p>title.template has no effect if a route has not defined a title or title.default.</p>
<p>Absolute</p>
<p>title.absolute can be used to provide a title that ignores title.template set in parent segments.
app/layout.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
title: {
template: '%s | Acme',
},
}</p>
<p>app/about/page.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
title: {
absolute: 'About',
},
}</p>
<p>// Output: &lt;title&gt;About&lt;/title&gt;</p>
<p>Good to know:</p>
<p>layout.js</p>
<p>title (string) and title.default define the default title for child segments (that do not define their own title). It will augment title.template from the closest parent segment if it exists.
title.absolute defines the default title for child segments. It ignores title.template from parent segments.
title.template defines a new title template for child segments.</p>
<p>page.js</p>
<p>If a page does not define its own title the closest parents resolved title will be used.
title (string) defines the routes title. It will augment title.template from the closest parent segment if it exists.
title.absolute defines the route title. It ignores title.template from parent segments.
title.template has no effect in page.js because a page is always the terminating segment of a route.</p>
<p>description</p>
<p>layout.js | page.jsexport const metadata = {
description: 'The React Framework for the Web',
}
&lt;head&gt; output&lt;meta name=&quot;description&quot; content=&quot;The React Framework for the Web&quot; /&gt;
Basic Fields</p>
<p>layout.js | page.jsexport const metadata = {
generator: 'Next.js',
applicationName: 'Next.js',
referrer: 'origin-when-cross-origin',
keywords: ['Next.js', 'React', 'JavaScript'],
authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
creator: 'Jiachi Liu',
publisher: 'Sebastian Markbåge',
formatDetection: {
email: false,
address: false,
telephone: false,
},
}
&lt;head&gt; output&lt;meta name=&quot;application-name&quot; content=&quot;Next.js&quot; /&gt;
&lt;meta name=&quot;author&quot; content=&quot;Seb&quot; /&gt;
&lt;link rel=&quot;author&quot; href=&quot;https://nextjs.org&quot; /&gt;
&lt;meta name=&quot;author&quot; content=&quot;Josh&quot; /&gt;
&lt;meta name=&quot;generator&quot; content=&quot;Next.js&quot; /&gt;
&lt;meta name=&quot;keywords&quot; content=&quot;Next.js,React,JavaScript&quot; /&gt;
&lt;meta name=&quot;referrer&quot; content=&quot;origin-when-cross-origin&quot; /&gt;
&lt;meta name=&quot;color-scheme&quot; content=&quot;dark&quot; /&gt;
&lt;meta name=&quot;creator&quot; content=&quot;Jiachi Liu&quot; /&gt;
&lt;meta name=&quot;publisher&quot; content=&quot;Sebastian Markbåge&quot; /&gt;
&lt;meta name=&quot;format-detection&quot; content=&quot;telephone=no, address=no, email=no&quot; /&gt;
metadataBase</p>
<p>metadataBase is a convenience option to set a base URL prefix for metadata fields that require a fully qualified URL.</p>
<p>metadataBase allows URL-based metadata fields defined in the current route segment and below to use a relative path instead of an otherwise required absolute URL.
The field's relative path will be composed with metadataBase to form a fully qualified URL.
If not configured, metadataBase is automatically populated with a default value.</p>
<p>layout.js | page.jsexport const metadata = {
metadataBase: new URL('https://acme.com'),
alternates: {
canonical: '/',
languages: {
'en-US': '/en-US',
'de-DE': '/de-DE',
},
},
openGraph: {
images: '/og-image.png',
},
}
&lt;head&gt; output&lt;link rel=&quot;canonical&quot; href=&quot;https://acme.com&quot; /&gt;
&lt;link rel=&quot;alternate&quot; hreflang=&quot;en-US&quot; href=&quot;https://acme.com/en-US&quot; /&gt;
&lt;link rel=&quot;alternate&quot; hreflang=&quot;de-DE&quot; href=&quot;https://acme.com/de-DE&quot; /&gt;
&lt;meta property=&quot;og:image&quot; content=&quot;https://acme.com/og-image.png&quot; /&gt;</p>
<p>Good to know:</p>
<p>metadataBase is typically set in root app/layout.js to apply to URL-based metadata fields across all routes.
All URL-based metadata fields that require absolute URLs can be configured with a metadataBase option.
metadataBase can contain a subdomain e.g. https://app.acme.com or base path e.g. https://acme.com/start/from/here
If a metadata field provides an absolute URL, metadataBase will be ignored.
Using a relative path in a URL-based metadata field without configuring a metadataBase will cause a build error.
Next.js will normalize duplicate slashes between metadataBase (e.g. https://acme.com/) and a relative field (e.g. /path) to a single slash (e.g. https://acme.com/path)</p>
<p>Default value</p>
<p>If not configured, metadataBase has a default value.</p>
<p>On Vercel:</p>
<p>For production deployments, VERCEL_PROJECT_PRODUCTION_URL will be used.
For preview deployments, VERCEL_BRANCH_URL will take priority, and fallback to VERCEL_URL if it's not present.</p>
<p>If these values are present they will be used as the default value of metadataBase, otherwise it falls back to http://localhost:${process.env.PORT || 3000}. This allows Open Graph images to work on both local build and Vercel preview and production deployments. When overriding the default, we recommend using environment variables to compute the URL. This allows configuring a URL for local development, staging, and production environments.
See more details about these environment variables in the System Environment Variables docs.</p>
<p>URL Composition</p>
<p>URL composition favors developer intent over default directory traversal semantics.</p>
<p>Trailing slashes between metadataBase and metadata fields are normalized.
An &quot;absolute&quot; path in a metadata field (that typically would replace the whole URL path) is treated as a &quot;relative&quot; path (starting from the end of metadataBase).</p>
<p>For example, given the following metadataBase:
app/layout.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
metadataBase: new URL('https://acme.com'),
}</p>
<p>Any metadata fields that inherit the above metadataBase and set their own value will be resolved as follows:
metadata fieldResolved URL/https://acme.com./https://acme.compaymentshttps://acme.com/payments/paymentshttps://acme.com/payments./paymentshttps://acme.com/payments../paymentshttps://acme.com/paymentshttps://beta.acme.com/paymentshttps://beta.acme.com/payments
openGraph</p>
<p>layout.js | page.jsexport const metadata = {
openGraph: {
title: 'Next.js',
description: 'The React Framework for the Web',
url: 'https://nextjs.org',
siteName: 'Next.js',
images: [
{
url: 'https://nextjs.org/og.png', // Must be an absolute URL
width: 800,
height: 600,
},
{
url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
width: 1800,
height: 1600,
alt: 'My custom alt',
},
],
videos: [
{
url: 'https://nextjs.org/video.mp4', // Must be an absolute URL
width: 800,
height: 600,
},
],
audio: [
{
url: 'https://nextjs.org/audio.mp3', // Must be an absolute URL
},
],
locale: 'en_US',
type: 'website',
},
}
&lt;head&gt; output&lt;meta property=&quot;og:title&quot; content=&quot;Next.js&quot; /&gt;
&lt;meta property=&quot;og:description&quot; content=&quot;The React Framework for the Web&quot; /&gt;
&lt;meta property=&quot;og:url&quot; content=&quot;https://nextjs.org/&quot; /&gt;
&lt;meta property=&quot;og:site_name&quot; content=&quot;Next.js&quot; /&gt;
&lt;meta property=&quot;og:locale&quot; content=&quot;en_US&quot; /&gt;
&lt;meta property=&quot;og:image&quot; content=&quot;https://nextjs.org/og.png&quot; /&gt;
&lt;meta property=&quot;og:image:width&quot; content=&quot;800&quot; /&gt;
&lt;meta property=&quot;og:image:height&quot; content=&quot;600&quot; /&gt;
&lt;meta property=&quot;og:image&quot; content=&quot;https://nextjs.org/og-alt.png&quot; /&gt;
&lt;meta property=&quot;og:image:width&quot; content=&quot;1800&quot; /&gt;
&lt;meta property=&quot;og:image:height&quot; content=&quot;1600&quot; /&gt;
&lt;meta property=&quot;og:image:alt&quot; content=&quot;My custom alt&quot; /&gt;
&lt;meta property=&quot;og:video&quot; content=&quot;https://nextjs.org/video.mp4&quot; /&gt;
&lt;meta property=&quot;og:video:width&quot; content=&quot;800&quot; /&gt;
&lt;meta property=&quot;og:video:height&quot; content=&quot;600&quot; /&gt;
&lt;meta property=&quot;og:audio&quot; content=&quot;https://nextjs.org/audio.mp3&quot; /&gt;
&lt;meta property=&quot;og:type&quot; content=&quot;website&quot; /&gt;
layout.js | page.jsexport const metadata = {
openGraph: {
title: 'Next.js',
description: 'The React Framework for the Web',
type: 'article',
publishedTime: '2023-01-01T00:00:00.000Z',
authors: ['Seb', 'Josh'],
},
}
&lt;head&gt; output&lt;meta property=&quot;og:title&quot; content=&quot;Next.js&quot; /&gt;
&lt;meta property=&quot;og:description&quot; content=&quot;The React Framework for the Web&quot; /&gt;
&lt;meta property=&quot;og:type&quot; content=&quot;article&quot; /&gt;
&lt;meta property=&quot;article:published_time&quot; content=&quot;2023-01-01T00:00:00.000Z&quot; /&gt;
&lt;meta property=&quot;article:author&quot; content=&quot;Seb&quot; /&gt;
&lt;meta property=&quot;article:author&quot; content=&quot;Josh&quot; /&gt;</p>
<p>Good to know:</p>
<p>It may be more convenient to use the file-based Metadata API for Open Graph images. Rather than having to sync the config export with actual files, the file-based API will automatically generate the correct metadata for you.</p>
<p>robots</p>
<p>layout.tsx | page.tsximport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
robots: {
index: true,
follow: true,
nocache: false,
googleBot: {
index: true,
follow: true,
noimageindex: false,
'max-video-preview': -1,
'max-image-preview': 'large',
'max-snippet': -1,
},
},
}
&lt;head&gt; output&lt;meta name=&quot;robots&quot; content=&quot;index, follow&quot; /&gt;
&lt;meta
name=&quot;googlebot&quot;
content=&quot;index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1&quot;
/&gt;
icons</p>
<p>Good to know: We recommend using the file-based Metadata API for icons where possible. Rather than having to sync the config export with actual files, the file-based API will automatically generate the correct metadata for you.</p>
<p>layout.js | page.jsexport const metadata = {
icons: {
icon: '/icon.png',
shortcut: '/shortcut-icon.png',
apple: '/apple-icon.png',
other: {
rel: 'apple-touch-icon-precomposed',
url: '/apple-touch-icon-precomposed.png',
},
},
}
&lt;head&gt; output&lt;link rel=&quot;shortcut icon&quot; href=&quot;/shortcut-icon.png&quot; /&gt;
&lt;link rel=&quot;icon&quot; href=&quot;/icon.png&quot; /&gt;
&lt;link rel=&quot;apple-touch-icon&quot; href=&quot;/apple-icon.png&quot; /&gt;
&lt;link
rel=&quot;apple-touch-icon-precomposed&quot;
href=&quot;/apple-touch-icon-precomposed.png&quot;
/&gt;
layout.js | page.jsexport const metadata = {
icons: {
icon: [
{ url: '/icon.png' },
new URL('/icon.png', 'https://example.com'),
{ url: '/icon-dark.png', media: '(prefers-color-scheme: dark)' },
],
shortcut: ['/shortcut-icon.png'],
apple: [
{ url: '/apple-icon.png' },
{ url: '/apple-icon-x3.png', sizes: '180x180', type: 'image/png' },
],
other: [
{
rel: 'apple-touch-icon-precomposed',
url: '/apple-touch-icon-precomposed.png',
},
],
},
}
&lt;head&gt; output&lt;link rel=&quot;shortcut icon&quot; href=&quot;/shortcut-icon.png&quot; /&gt;
&lt;link rel=&quot;icon&quot; href=&quot;/icon.png&quot; /&gt;
&lt;link rel=&quot;icon&quot; href=&quot;https://example.com/icon.png&quot; /&gt;
&lt;link rel=&quot;icon&quot; href=&quot;/icon-dark.png&quot; media=&quot;(prefers-color-scheme: dark)&quot; /&gt;
&lt;link rel=&quot;apple-touch-icon&quot; href=&quot;/apple-icon.png&quot; /&gt;
&lt;link
rel=&quot;apple-touch-icon-precomposed&quot;
href=&quot;/apple-touch-icon-precomposed.png&quot;
/&gt;
&lt;link
rel=&quot;apple-touch-icon&quot;
href=&quot;/apple-icon-x3.png&quot;
sizes=&quot;180x180&quot;
type=&quot;image/png&quot;
/&gt;</p>
<p>Good to know: The msapplication-* meta tags are no longer supported in Chromium builds of Microsoft Edge, and thus no longer needed.</p>
<p>themeColor</p>
<p>Deprecated: The themeColor option in metadata is deprecated as of Next.js 14. Please use the viewport configuration instead.</p>
<p>manifest</p>
<p>A web application manifest, as defined in the Web Application Manifest specification.
layout.js | page.jsexport const metadata = {
manifest: 'https://nextjs.org/manifest.json',
}
&lt;head&gt; output&lt;link rel=&quot;manifest&quot; href=&quot;https://nextjs.org/manifest.json&quot; /&gt;
twitter</p>
<p>The Twitter specification is (surprisingly) used for more than just X (formerly known as Twitter).
Learn more about the Twitter Card markup reference.
layout.js | page.jsexport const metadata = {
twitter: {
card: 'summary_large_image',
title: 'Next.js',
description: 'The React Framework for the Web',
siteId: '1467726470533754880',
creator: '@nextjs',
creatorId: '1467726470533754880',
images: ['https://nextjs.org/og.png'], // Must be an absolute URL
},
}
&lt;head&gt; output&lt;meta name=&quot;twitter:card&quot; content=&quot;summary_large_image&quot; /&gt;
&lt;meta name=&quot;twitter:site:id&quot; content=&quot;1467726470533754880&quot; /&gt;
&lt;meta name=&quot;twitter:creator&quot; content=&quot;@nextjs&quot; /&gt;
&lt;meta name=&quot;twitter:creator:id&quot; content=&quot;1467726470533754880&quot; /&gt;
&lt;meta name=&quot;twitter:title&quot; content=&quot;Next.js&quot; /&gt;
&lt;meta name=&quot;twitter:description&quot; content=&quot;The React Framework for the Web&quot; /&gt;
&lt;meta name=&quot;twitter:image&quot; content=&quot;https://nextjs.org/og.png&quot; /&gt;
layout.js | page.jsexport const metadata = {
twitter: {
card: 'app',
title: 'Next.js',
description: 'The React Framework for the Web',
siteId: '1467726470533754880',
creator: '@nextjs',
creatorId: '1467726470533754880',
images: {
url: 'https://nextjs.org/og.png',
alt: 'Next.js Logo',
},
app: {
name: 'twitter_app',
id: {
iphone: 'twitter_app://iphone',
ipad: 'twitter_app://ipad',
googleplay: 'twitter_app://googleplay',
},
url: {
iphone: 'https://iphone_url',
ipad: 'https://ipad_url',
},
},
},
}
&lt;head&gt; output&lt;meta name=&quot;twitter:site:id&quot; content=&quot;1467726470533754880&quot; /&gt;
&lt;meta name=&quot;twitter:creator&quot; content=&quot;@nextjs&quot; /&gt;
&lt;meta name=&quot;twitter:creator:id&quot; content=&quot;1467726470533754880&quot; /&gt;
&lt;meta name=&quot;twitter:title&quot; content=&quot;Next.js&quot; /&gt;
&lt;meta name=&quot;twitter:description&quot; content=&quot;The React Framework for the Web&quot; /&gt;
&lt;meta name=&quot;twitter:card&quot; content=&quot;app&quot; /&gt;
&lt;meta name=&quot;twitter:image&quot; content=&quot;https://nextjs.org/og.png&quot; /&gt;
&lt;meta name=&quot;twitter:image:alt&quot; content=&quot;Next.js Logo&quot; /&gt;
&lt;meta name=&quot;twitter:app:name:iphone&quot; content=&quot;twitter_app&quot; /&gt;
&lt;meta name=&quot;twitter:app:id:iphone&quot; content=&quot;twitter_app://iphone&quot; /&gt;
&lt;meta name=&quot;twitter:app:id:ipad&quot; content=&quot;twitter_app://ipad&quot; /&gt;
&lt;meta name=&quot;twitter:app:id:googleplay&quot; content=&quot;twitter_app://googleplay&quot; /&gt;
&lt;meta name=&quot;twitter:app:url:iphone&quot; content=&quot;https://iphone_url&quot; /&gt;
&lt;meta name=&quot;twitter:app:url:ipad&quot; content=&quot;https://ipad_url&quot; /&gt;
&lt;meta name=&quot;twitter:app:name:ipad&quot; content=&quot;twitter_app&quot; /&gt;
&lt;meta name=&quot;twitter:app:name:googleplay&quot; content=&quot;twitter_app&quot; /&gt;
viewport</p>
<p>Deprecated: The viewport option in metadata is deprecated as of Next.js 14. Please use the viewport configuration instead.</p>
<p>verification</p>
<p>layout.js | page.jsexport const metadata = {
verification: {
google: 'google',
yandex: 'yandex',
yahoo: 'yahoo',
other: {
me: ['my-email', 'my-link'],
},
},
}
&lt;head&gt; output&lt;meta name=&quot;google-site-verification&quot; content=&quot;google&quot; /&gt;
&lt;meta name=&quot;y_key&quot; content=&quot;yahoo&quot; /&gt;
&lt;meta name=&quot;yandex-verification&quot; content=&quot;yandex&quot; /&gt;
&lt;meta name=&quot;me&quot; content=&quot;my-email&quot; /&gt;
&lt;meta name=&quot;me&quot; content=&quot;my-link&quot; /&gt;
appleWebApp</p>
<p>layout.js | page.jsexport const metadata = {
itunes: {
appId: 'myAppStoreID',
appArgument: 'myAppArgument',
},
appleWebApp: {
title: 'Apple Web App',
statusBarStyle: 'black-translucent',
startupImage: [
'/assets/startup/apple-touch-startup-image-768x1004.png',
{
url: '/assets/startup/apple-touch-startup-image-1536x2008.png',
media: '(device-width: 768px) and (device-height: 1024px)',
},
],
},
}
&lt;head&gt; output&lt;meta
name=&quot;apple-itunes-app&quot;
content=&quot;app-id=myAppStoreID, app-argument=myAppArgument&quot;
/&gt;
&lt;meta name=&quot;mobile-web-app-capable&quot; content=&quot;yes&quot; /&gt;
&lt;meta name=&quot;apple-mobile-web-app-title&quot; content=&quot;Apple Web App&quot; /&gt;
&lt;link
href=&quot;/assets/startup/apple-touch-startup-image-768x1004.png&quot;
rel=&quot;apple-touch-startup-image&quot;
/&gt;
&lt;link
href=&quot;/assets/startup/apple-touch-startup-image-1536x2008.png&quot;
media=&quot;(device-width: 768px) and (device-height: 1024px)&quot;
rel=&quot;apple-touch-startup-image&quot;
/&gt;
&lt;meta
name=&quot;apple-mobile-web-app-status-bar-style&quot;
content=&quot;black-translucent&quot;
/&gt;
alternates</p>
<p>layout.js | page.jsexport const metadata = {
alternates: {
canonical: 'https://nextjs.org',
languages: {
'en-US': 'https://nextjs.org/en-US',
'de-DE': 'https://nextjs.org/de-DE',
},
media: {
'only screen and (max-width: 600px)': 'https://nextjs.org/mobile',
},
types: {
'application/rss+xml': 'https://nextjs.org/rss',
},
},
}
&lt;head&gt; output&lt;link rel=&quot;canonical&quot; href=&quot;https://nextjs.org&quot; /&gt;
&lt;link rel=&quot;alternate&quot; hreflang=&quot;en-US&quot; href=&quot;https://nextjs.org/en-US&quot; /&gt;
&lt;link rel=&quot;alternate&quot; hreflang=&quot;de-DE&quot; href=&quot;https://nextjs.org/de-DE&quot; /&gt;
&lt;link
rel=&quot;alternate&quot;
media=&quot;only screen and (max-width: 600px)&quot;
href=&quot;https://nextjs.org/mobile&quot;
/&gt;
&lt;link
rel=&quot;alternate&quot;
type=&quot;application/rss+xml&quot;
href=&quot;https://nextjs.org/rss&quot;
/&gt;
appLinks</p>
<p>layout.js | page.jsexport const metadata = {
appLinks: {
ios: {
url: 'https://nextjs.org/ios',
app_store_id: 'app_store_id',
},
android: {
package: 'com.example.android/package',
app_name: 'app_name_android',
},
web: {
url: 'https://nextjs.org/web',
should_fallback: true,
},
},
}
&lt;head&gt; output&lt;meta property=&quot;al:ios:url&quot; content=&quot;https://nextjs.org/ios&quot; /&gt;
&lt;meta property=&quot;al:ios:app_store_id&quot; content=&quot;app_store_id&quot; /&gt;
&lt;meta property=&quot;al:android:package&quot; content=&quot;com.example.android/package&quot; /&gt;
&lt;meta property=&quot;al:android:app_name&quot; content=&quot;app_name_android&quot; /&gt;
&lt;meta property=&quot;al:web:url&quot; content=&quot;https://nextjs.org/web&quot; /&gt;
&lt;meta property=&quot;al:web:should_fallback&quot; content=&quot;true&quot; /&gt;
archives</p>
<p>Describes a collection of records, documents, or other materials of historical interest (source).
layout.js | page.jsexport const metadata = {
archives: ['https://nextjs.org/13'],
}
&lt;head&gt; output&lt;link rel=&quot;archives&quot; href=&quot;https://nextjs.org/13&quot; /&gt;
assets</p>
<p>layout.js | page.jsexport const metadata = {
assets: ['https://nextjs.org/assets'],
}
&lt;head&gt; output&lt;link rel=&quot;assets&quot; href=&quot;https://nextjs.org/assets&quot; /&gt;
bookmarks</p>
<p>layout.js | page.jsexport const metadata = {
bookmarks: ['https://nextjs.org/13'],
}
&lt;head&gt; output&lt;link rel=&quot;bookmarks&quot; href=&quot;https://nextjs.org/13&quot; /&gt;
category</p>
<p>layout.js | page.jsexport const metadata = {
category: 'technology',
}
&lt;head&gt; output&lt;meta name=&quot;category&quot; content=&quot;technology&quot; /&gt;
facebook</p>
<p>You can connect a Facebook app or Facebook account to you webpage for certain Facebook Social Plugins Facebook Documentation</p>
<p>Good to know: You can specify either appId or admins, but not both.</p>
<p>layout.js | page.jsexport const metadata = {
facebook: {
appId: '12345678',
},
}
&lt;head&gt; output&lt;meta property=&quot;fb:app_id&quot; content=&quot;12345678&quot; /&gt;
layout.js | page.jsexport const metadata = {
facebook: {
admins: '12345678',
},
}
&lt;head&gt; output&lt;meta property=&quot;fb:admins&quot; content=&quot;12345678&quot; /&gt;
If you want to generate multiple fb:admins meta tags you can use array value.
layout.js | page.jsexport const metadata = {
facebook: {
admins: ['12345678', '87654321'],
},
}
&lt;head&gt; output&lt;meta property=&quot;fb:admins&quot; content=&quot;12345678&quot; /&gt;
&lt;meta property=&quot;fb:admins&quot; content=&quot;87654321&quot; /&gt;
other</p>
<p>All metadata options should be covered using the built-in support. However, there may be custom metadata tags specific to your site, or brand new metadata tags just released. You can use the other option to render any custom metadata tag.
layout.js | page.jsexport const metadata = {
other: {
custom: 'meta',
},
}
&lt;head&gt; output&lt;meta name=&quot;custom&quot; content=&quot;meta&quot; /&gt;
If you want to generate multiple same key meta tags you can use array value.
layout.js | page.jsexport const metadata = {
other: {
custom: ['meta1', 'meta2'],
},
}
&lt;head&gt; output&lt;meta name=&quot;custom&quot; content=&quot;meta1&quot; /&gt; &lt;meta name=&quot;custom&quot; content=&quot;meta2&quot; /&gt;
Unsupported Metadata</p>
<p>The following metadata types do not currently have built-in support. However, they can still be rendered in the layout or page itself.
MetadataRecommendation&lt;meta http-equiv=&quot;...&quot;&gt;Use appropriate HTTP Headers via redirect(), Middleware, Security Headers&lt;base&gt;Render the tag in the layout or page itself.&lt;noscript&gt;Render the tag in the layout or page itself.&lt;style&gt;Learn more about styling in Next.js.&lt;script&gt;Learn more about using scripts.&lt;link rel=&quot;stylesheet&quot; /&gt;import stylesheets directly in the layout or page itself.&lt;link rel=&quot;preload /&gt;Use ReactDOM preload method&lt;link rel=&quot;preconnect&quot; /&gt;Use ReactDOM preconnect method&lt;link rel=&quot;dns-prefetch&quot; /&gt;Use ReactDOM prefetchDNS method
Resource hints</p>
<p>The &lt;link&gt; element has a number of rel keywords that can be used to hint to the browser that an external resource is likely to be needed. The browser uses this information to apply preloading optimizations depending on the keyword.
While the Metadata API doesn't directly support these hints, you can use new ReactDOM methods to safely insert them into the &lt;head&gt; of the document.
app/preload-resources.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import ReactDOM from 'react-dom'</p>
<p>export function PreloadResources() {
ReactDOM.preload('...', { as: '...' })
ReactDOM.preconnect('...', { crossOrigin: '...' })
ReactDOM.prefetchDNS('...')</p>
<p>return '...'
}</p>
<p>&lt;link rel=&quot;preload&quot;&gt;</p>
<p>Start loading a resource early in the page rendering (browser) lifecycle. MDN Docs.
ReactDOM.preload(href: string, options: { as: string })
&lt;head&gt; output&lt;link rel=&quot;preload&quot; href=&quot;...&quot; as=&quot;...&quot; /&gt;
&lt;link rel=&quot;preconnect&quot;&gt;</p>
<p>Preemptively initiate a connection to an origin. MDN Docs.
ReactDOM.preconnect(href: string, options?: { crossOrigin?: string })
&lt;head&gt; output&lt;link rel=&quot;preconnect&quot; href=&quot;...&quot; crossorigin /&gt;
&lt;link rel=&quot;dns-prefetch&quot;&gt;</p>
<p>Attempt to resolve a domain name before resources get requested. MDN Docs.
ReactDOM.prefetchDNS(href: string)
&lt;head&gt; output&lt;link rel=&quot;dns-prefetch&quot; href=&quot;...&quot; /&gt;</p>
<p>Good to know:</p>
<p>These methods are currently only supported in Client Components, which are still Server Side Rendered on initial page load.
Next.js in-built features such as next/font, next/image and next/script automatically handle relevant resource hints.</p>
<p>Types</p>
<p>You can add type safety to your metadata by using the Metadata type. If you are using the built-in TypeScript plugin in your IDE, you do not need to manually add the type, but you can still explicitly add it if you want.
metadata object</p>
<p>layout.tsx | page.tsximport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
title: 'Next.js',
}
generateMetadata function</p>
<p>Regular function</p>
<p>layout.tsx | page.tsximport type { Metadata } from 'next'</p>
<p>export function generateMetadata(): Metadata {
return {
title: 'Next.js',
}
}
Async function</p>
<p>layout.tsx | page.tsximport type { Metadata } from 'next'</p>
<p>export async function generateMetadata(): Promise&lt;Metadata&gt; {
return {
title: 'Next.js',
}
}
With segment props</p>
<p>layout.tsx | page.tsximport type { Metadata } from 'next'</p>
<p>type Props = {
params: Promise&lt;{ id: string }&gt;
searchParams: Promise&lt;{ [key: string]: string | string[] | undefined }&gt;
}</p>
<p>export function generateMetadata({ params, searchParams }: Props): Metadata {
return {
title: 'Next.js',
}
}</p>
<p>export default function Page({ params, searchParams }: Props) {}
With parent metadata</p>
<p>layout.tsx | page.tsximport type { Metadata, ResolvingMetadata } from 'next'</p>
<p>export async function generateMetadata(
{ params, searchParams }: Props,
parent: ResolvingMetadata
): Promise&lt;Metadata&gt; {
return {
title: 'Next.js',
}
}
JavaScript Projects</p>
<p>For JavaScript projects, you can use JSDoc to add type safety.
layout.js | page.js/** @type {import(&quot;next&quot;).Metadata} */
export const metadata = {
title: 'Next.js',
}
Version History</p>
<p>VersionChangesv13.2.0viewport, themeColor, and colorScheme deprecated in favor of the viewport configuration.v13.2.0metadata and generateMetadata introduced.Next StepsView all the Metadata API options.Metadata FilesAPI documentation for the metadata file conventions.generateViewportAPI Reference for the generateViewport function.MetadataUse the Metadata API to define metadata in any layout or page.Was this helpful?</p>
<p>supported.Send</p>
