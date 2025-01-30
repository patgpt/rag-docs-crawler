# Deploying: Static Exports | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationDeployingStatic ExportsStatic Exports
Next.js enables starting as a static site or Single-Page Application (SPA), then later optionally upgrading to use features that require a server.
When running next build, Next.js generates an HTML file per route. By breaking a strict SPA into individual HTML files, Next.js can avoid loading unnecessary JavaScript code on the client-side, reducing the bundle size and enabling faster page loads.
Since Next.js supports this static export, it can be deployed and hosted on any web server that can serve HTML/CSS/JS static assets.
Configuration</p>
<p>To enable a static export, change the output mode inside next.config.js:
next.config.js/**</p>
<ul>
<li>@type {import('next').NextConfig}
*/
const nextConfig = {
output: 'export',</li>
</ul>
<p>// Optional: Change links <code>/me</code> -&gt; <code>/me/</code> and emit <code>/me.html</code> -&gt; <code>/me/index.html</code>
// trailingSlash: true,</p>
<p>// Optional: Prevent automatic <code>/me</code> -&gt; <code>/me/</code>, instead preserve <code>href</code>
// skipTrailingSlashRedirect: true,</p>
<p>// Optional: Change the output directory <code>out</code> -&gt; <code>dist</code>
// distDir: 'dist',
}</p>
<p>module.exports = nextConfig
After running next build, Next.js will create an out folder with the HTML/CSS/JS assets for your application.</p>
<p>Supported Features</p>
<p>The core of Next.js has been designed to support static exports.Server Components</p>
<p>When you run next build to generate a static export, Server Components consumed inside the app directory will run during the build, similar to traditional static-site generation.The resulting component will be rendered into static HTML for the initial page load and a static payload for client navigation between routes. No changes are required for your Server Components when using the static export, unless they consume dynamic server functions.app/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page() {
// This fetch will run on the server during <code>next build</code>
const res = await fetch('https://api.example.com/...')
const data = await res.json()</p>
<p>return &lt;main&gt;...&lt;/main&gt;
}Client Components</p>
<p>If you want to perform data fetching on the client, you can use a Client Component with SWR to memoize requests.app/other/page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import useSWR from 'swr'</p>
<p>const fetcher = (url: string) =&gt; fetch(url).then((r) =&gt; r.json())</p>
<p>export default function Page() {
const { data, error } = useSWR(
<code>https://jsonplaceholder.typicode.com/posts/1</code>,
fetcher
)
if (error) return 'Failed to load'
if (!data) return 'Loading...'</p>
<p>return data.title
}Since route transitions happen client-side, this behaves like a traditional SPA. For example, the following index route allows you to navigate to different posts on the client:app/page.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Page() {
return (
&lt;&gt;
&lt;h1&gt;Index Page&lt;/h1&gt;
&lt;hr /&gt;
&lt;ul&gt;
&lt;li&gt;
&lt;Link href=&quot;/post/1&quot;&gt;Post 1&lt;/Link&gt;
&lt;/li&gt;
&lt;li&gt;
&lt;Link href=&quot;/post/2&quot;&gt;Post 2&lt;/Link&gt;
&lt;/li&gt;
&lt;/ul&gt;
&lt;/&gt;
)
}</p>
<p>Image Optimization</p>
<p>Image Optimization through next/image can be used with a static export by defining a custom image loader in next.config.js. For example, you can optimize images with a service like Cloudinary:
next.config.js/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export',
images: {
loader: 'custom',
loaderFile: './my-loader.ts',
},
}</p>
<p>module.exports = nextConfig
This custom loader will define how to fetch images from a remote source. For example, the following loader will construct the URL for Cloudinary:
my-loader.tsTypeScriptJavaScriptTypeScriptexport default function cloudinaryLoader({
src,
width,
quality,
}: {
src: string
width: number
quality?: number
}) {
const params = ['f_auto', 'c_limit', <code>w_${width}</code>, <code>q_${quality || 'auto'}</code>]
return <code>https://res.cloudinary.com/demo/image/upload/${params.join(     ','   )}${src}</code>
}</p>
<p>You can then use next/image in your application, defining relative paths to the image in Cloudinary:
app/page.tsxTypeScriptJavaScriptTypeScriptimport Image from 'next/image'</p>
<p>export default function Page() {
return &lt;Image alt=&quot;turtles&quot; src=&quot;/turtles.jpg&quot; width={300} height={300} /&gt;
}</p>
<p>Route Handlers</p>
<p>Route Handlers will render a static response when running next build. Only the GET HTTP verb is supported. This can be used to generate static HTML, JSON, TXT, or other files from cached or uncached data. For example:app/data.json/route.tsTypeScriptJavaScriptTypeScriptexport async function GET() {
return Response.json({ name: 'Lee' })
}The above file app/data.json/route.ts will render to a static file during next build, producing data.json containing { name: 'Lee' }.If you need to read dynamic values from the incoming request, you cannot use a static export.Browser APIs</p>
<p>Client Components are pre-rendered to HTML during next build. Because Web APIs like window, localStorage, and navigator are not available on the server, you need to safely access these APIs only when running in the browser. For example:'use client';</p>
<p>import { useEffect } from 'react';</p>
<p>export default function ClientComponent() {
useEffect(() =&gt; {
// You now have access to <code>window</code>
console.log(window.innerHeight);
}, [])</p>
<p>return ...;
}
Unsupported Features</p>
<p>Features that require a Node.js server, or dynamic logic that cannot be computed during the build process, are not supported:</p>
<p>Dynamic Routes with dynamicParams: true
Dynamic Routes without generateStaticParams()
Route Handlers that rely on Request
Cookies
Rewrites
Redirects
Headers
Middleware
Incremental Static Regeneration
Image Optimization with the default loader
Draft Mode
Server Actions
Intercepting Routes
Attempting to use any of these features with next dev will result in an error, similar to setting the dynamic option to error in the root layout.export const dynamic = 'error'</p>
<p>Deploying</p>
<p>With a static export, Next.js can be deployed and hosted on any web server that can serve HTML/CSS/JS static assets.
When running next build, Next.js generates the static export into the out folder. For example, let's say you have the following routes:</p>
<p>/
/blog/[id]</p>
<p>After running next build, Next.js will generate the following files:</p>
<p>/out/index.html
/out/404.html
/out/blog/post-1.html
/out/blog/post-2.html</p>
<p>If you are using a static host like Nginx, you can configure rewrites from incoming requests to the correct files:
nginx.confserver {
listen 80;
server_name acme.com;</p>
<p>root /var/www/out;</p>
<p>location / {
try_files $uri $uri.html $uri/ =404;
}</p>
<h1>This is necessary when <code>trailingSlash: false</code>.</h1>
<h1>You can omit this when <code>trailingSlash: true</code>.</h1>
<p>location /blog/ {
rewrite ^/blog/(.*)$ /blog/$1.html break;
}</p>
<p>error_page 404 /404.html;
location = /404.html {
internal;
}
}
Version History</p>
<p>VersionChangesv14.0.0next export has been removed in favor of &quot;output&quot;: &quot;export&quot;v13.4.0App Router (Stable) adds enhanced static export support, including using React Server Components and Route Handlers.v13.3.0next export is deprecated and replaced with &quot;output&quot;: &quot;export&quot;Was this helpful?</p>
<p>supported.Send</p>
