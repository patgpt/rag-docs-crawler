# Metadata Files: robots.txt | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6File ConventionsMetadata Filesrobots.txtrobots.txtAdd or generate a robots.txt file that matches the Robots Exclusion Standard in the root of app directory to tell search engine crawlers which URLs they can access on your site.
Static robots.txt</p>
<p>app/robots.txtUser-Agent: *
Allow: /
Disallow: /private/</p>
<p>Sitemap: https://acme.com/sitemap.xml
Generate a Robots file</p>
<p>Add a robots.js or robots.ts file that returns a Robots object.</p>
<p>Good to know: robots.js is a special Route Handlers that is cached by default unless it uses a Dynamic API or dynamic config option.</p>
<p>app/robots.tsTypeScriptJavaScriptTypeScriptimport type { MetadataRoute } from 'next'</p>
<p>export default function robots(): MetadataRoute.Robots {
return {
rules: {
userAgent: '*',
allow: '/',
disallow: '/private/',
},
sitemap: 'https://acme.com/sitemap.xml',
}
}</p>
<p>Output:
User-Agent: *
Allow: /
Disallow: /private/</p>
<p>Sitemap: https://acme.com/sitemap.xml
Customizing specific user agents</p>
<p>You can customise how individual search engine bots crawl your site by passing an array of user agents to the rules property. For example:
app/robots.tsTypeScriptJavaScriptTypeScriptimport type { MetadataRoute } from 'next'</p>
<p>export default function robots(): MetadataRoute.Robots {
return {
rules: [
{
userAgent: 'Googlebot',
allow: ['/'],
disallow: '/private/',
},
{
userAgent: ['Applebot', 'Bingbot'],
disallow: ['/'],
},
],
sitemap: 'https://acme.com/sitemap.xml',
}
}</p>
<p>Output:
User-Agent: Googlebot
Allow: /
Disallow: /private/</p>
<p>User-Agent: Applebot
Disallow: /</p>
<p>User-Agent: Bingbot
Disallow: /</p>
<p>Sitemap: https://acme.com/sitemap.xml
Robots object</p>
<p>type Robots = {
rules:
| {
userAgent?: string | string[]
allow?: string | string[]
disallow?: string | string[]
crawlDelay?: number
}
| Array&lt;{
userAgent: string | string[]
allow?: string | string[]
disallow?: string | string[]
crawlDelay?: number
}&gt;
sitemap?: string | string[]
host?: string
}
Version History</p>
<p>VersionChangesv13.3.0robots introduced.Was this helpful?</p>
<p>supported.Send</p>
