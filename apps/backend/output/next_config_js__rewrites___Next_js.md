# next.config.js: rewrites | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsrewritesrewrites
Rewrites allow you to map an incoming request path to a different destination path.
Rewrites act as a URL proxy and mask the destination path, making it appear the user hasn't changed their location on the site. In contrast, redirects will reroute to a new page and show the URL changes.</p>
<p>To use rewrites you can use the rewrites key in next.config.js:
next.config.jsmodule.exports = {
async rewrites() {
return [
{
source: '/about',
destination: '/',
},
]
},
}
Rewrites are applied to client-side routing, a &lt;Link href=&quot;/about&quot;&gt; will have the rewrite applied in the above example.
rewrites is an async function that expects to return either an array or an object of arrays (see below) holding objects with source and destination properties:</p>
<p>source: String - is the incoming request path pattern.
destination: String is the path you want to route to.
basePath: false or undefined - if false the basePath won't be included when matching, can be used for external rewrites only.
locale: false or undefined - whether the locale should not be included when matching.
has is an array of has objects with the type, key and value properties.
missing is an array of missing objects with the type, key and value properties.</p>
<p>When the rewrites function returns an array, rewrites are applied after checking the filesystem (pages and /public files) and before dynamic routes. When the rewrites function returns an object of arrays with a specific shape, this behavior can be changed and more finely controlled, as of v10.1 of Next.js:
next.config.jsmodule.exports = {
async rewrites() {
return {
beforeFiles: [
// These rewrites are checked after headers/redirects
// and before all files including _next/public files which
// allows overriding page files
{
source: '/some-page',
destination: '/somewhere-else',
has: [{ type: 'query', key: 'overrideMe' }],
},
],
afterFiles: [
// These rewrites are checked after pages/public files
// are checked but before dynamic routes
{
source: '/non-existent',
destination: '/somewhere-else',
},
],
fallback: [
// These rewrites are checked after both pages/public files
// and dynamic routes are checked
{
source: '/:path*',
destination: <code>https://my-old-site.com/:path*</code>,
},
],
}
},
}</p>
<p>Good to know: rewrites in beforeFiles do not check the filesystem/dynamic routes immediately after matching a source, they continue until all beforeFiles have been checked.</p>
<p>The order Next.js routes are checked is:</p>
<p>headers are checked/applied
redirects are checked/applied
beforeFiles rewrites are checked/applied
static files from the public directory, _next/static files, and non-dynamic pages are checked/served
afterFiles rewrites are checked/applied, if one of these rewrites is matched we check dynamic routes/static files after each match
fallback rewrites are checked/applied, these are applied before rendering the 404 page and after dynamic routes/all static assets have been checked. If you use fallback: true/'blocking' in getStaticPaths, the fallback rewrites defined in your next.config.js will not be run.</p>
<p>Rewrite parameters</p>
<p>When using parameters in a rewrite the parameters will be passed in the query by default when none of the parameters are used in the destination.
next.config.jsmodule.exports = {
async rewrites() {
return [
{
source: '/old-about/:path*',
destination: '/about', // The :path parameter isn't used here so will be automatically passed in the query
},
]
},
}
If a parameter is used in the destination none of the parameters will be automatically passed in the query.
next.config.jsmodule.exports = {
async rewrites() {
return [
{
source: '/docs/:path*',
destination: '/:path*', // The :path parameter is used here so will not be automatically passed in the query
},
]
},
}
You can still pass the parameters manually in the query if one is already used in the destination by specifying the query in the destination.
next.config.jsmodule.exports = {
async rewrites() {
return [
{
source: '/:first/:second',
destination: '/:first?second=:second',
// Since the :first parameter is used in the destination the :second parameter
// will not automatically be added in the query although we can manually add it
// as shown above
},
]
},
}</p>
<p>Good to know: Static pages from Automatic Static Optimization or prerendering params from rewrites will be parsed on the client after hydration and provided in the query.</p>
<p>Path Matching</p>
<p>Path matches are allowed, for example /blog/:slug will match /blog/hello-world (no nested paths):
next.config.jsmodule.exports = {
async rewrites() {
return [
{
source: '/blog/:slug',
destination: '/news/:slug', // Matched parameters can be used in the destination
},
]
},
}
Wildcard Path Matching</p>
<p>To match a wildcard path you can use * after a parameter, for example /blog/:slug* will match /blog/a/b/c/d/hello-world:
next.config.jsmodule.exports = {
async rewrites() {
return [
{
source: '/blog/:slug*',
destination: '/news/:slug*', // Matched parameters can be used in the destination
},
]
},
}
Regex Path Matching</p>
<p>To match a regex path you can wrap the regex in parenthesis after a parameter, for example /blog/:slug(\d{1,}) will match /blog/123 but not /blog/abc:
next.config.jsmodule.exports = {
async rewrites() {
return [
{
source: '/old-blog/:post(\d{1,})',
destination: '/blog/:post', // Matched parameters can be used in the destination
},
]
},
}
The following characters (, ), {, }, [, ], |, , ^, ., :, *, +, -, ?, $ are used for regex path matching, so when used in the source as non-special values they must be escaped by adding \ before them:
next.config.jsmodule.exports = {
async rewrites() {
return [
{
// this will match <code>/english(default)/something</code> being requested
source: '/english\(default\)/:slug',
destination: '/en-us/:slug',
},
]
},
}
Header, Cookie, and Query Matching</p>
<p>To only match a rewrite when header, cookie, or query values also match the has field or don't match the missing field can be used. Both the source and all has items must match and all missing items must not match for the rewrite to be applied.
has and missing items can have the following fields:</p>
<p>type: String - must be either header, cookie, host, or query.
key: String - the key from the selected type to match against.
value: String or undefined - the value to check for, if undefined any value will match. A regex like string can be used to capture a specific part of the value, e.g. if the value first-(?&lt;paramName&gt;.*) is used for first-second then second will be usable in the destination with :paramName.</p>
<p>next.config.jsmodule.exports = {
async rewrites() {
return [
// if the header <code>x-rewrite-me</code> is present,
// this rewrite will be applied
{
source: '/:path*',
has: [
{
type: 'header',
key: 'x-rewrite-me',
},
],
destination: '/another-page',
},
// if the header <code>x-rewrite-me</code> is not present,
// this rewrite will be applied
{
source: '/:path*',
missing: [
{
type: 'header',
key: 'x-rewrite-me',
},
],
destination: '/another-page',
},
// if the source, query, and cookie are matched,
// this rewrite will be applied
{
source: '/specific/:path*',
has: [
{
type: 'query',
key: 'page',
// the page value will not be available in the
// destination since value is provided and doesn't
// use a named capture group e.g. (?&lt;page&gt;home)
value: 'home',
},
{
type: 'cookie',
key: 'authorized',
value: 'true',
},
],
destination: '/:path*/home',
},
// if the header <code>x-authorized</code> is present and
// contains a matching value, this rewrite will be applied
{
source: '/:path*',
has: [
{
type: 'header',
key: 'x-authorized',
value: '(?&lt;authorized&gt;yes|true)',
},
],
destination: '/home?authorized=:authorized',
},
// if the host is <code>example.com</code>,
// this rewrite will be applied
{
source: '/:path*',
has: [
{
type: 'host',
value: 'example.com',
},
],
destination: '/another-page',
},
]
},
}
Rewriting to an external URL</p>
<p>Examples
Incremental adoption of Next.js
Using Multiple Zones</p>
<p>Rewrites allow you to rewrite to an external URL. This is especially useful for incrementally adopting Next.js. The following is an example rewrite for redirecting the /blog route of your main app to an external site.
next.config.jsmodule.exports = {
async rewrites() {
return [
{
source: '/blog',
destination: 'https://example.com/blog',
},
{
source: '/blog/:slug',
destination: 'https://example.com/blog/:slug', // Matched parameters can be used in the destination
},
]
},
}
If you're using trailingSlash: true, you also need to insert a trailing slash in the source parameter. If the destination server is also expecting a trailing slash it should be included in the destination parameter as well.
next.config.jsmodule.exports = {
trailingSlash: true,
async rewrites() {
return [
{
source: '/blog/',
destination: 'https://example.com/blog/',
},
{
source: '/blog/:path*/',
destination: 'https://example.com/blog/:path*/',
},
]
},
}
Incremental adoption of Next.js</p>
<p>You can also have Next.js fall back to proxying to an existing website after checking all Next.js routes.
This way you don't have to change the rewrites configuration when migrating more pages to Next.js
next.config.jsmodule.exports = {
async rewrites() {
return {
fallback: [
{
source: '/:path*',
destination: <code>https://custom-routes-proxying-endpoint.vercel.app/:path*</code>,
},
],
}
},
}
Rewrites with basePath support</p>
<p>When leveraging basePath support with rewrites each source and destination is automatically prefixed with the basePath unless you add basePath: false to the rewrite:
next.config.jsmodule.exports = {
basePath: '/docs',</p>
<p>async rewrites() {
return [
{
source: '/with-basePath', // automatically becomes /docs/with-basePath
destination: '/another', // automatically becomes /docs/another
},
{
// does not add /docs to /without-basePath since basePath: false is set
// Note: this can not be used for internal rewrites e.g. <code>destination: '/another'</code>
source: '/without-basePath',
destination: 'https://example.com',
basePath: false,
},
]
},
}
Rewrites with i18n support</p>
<p>When leveraging i18n support with rewrites each source and destination is automatically prefixed to handle the configured locales unless you add locale: false to the rewrite. If locale: false is used you must prefix the source and destination with a locale for it to be matched correctly.</p>
<p>next.config.jsmodule.exports = {
i18n: {
locales: ['en', 'fr', 'de'],
defaultLocale: 'en',
},</p>
<p>async rewrites() {
return [
{
source: '/with-locale', // automatically handles all locales
destination: '/another', // automatically passes the locale on
},
{
// does not handle locales automatically since locale: false is set
source: '/nl/with-locale-manual',
destination: '/nl/another',
locale: false,
},
{
// this matches '/' since <code>en</code> is the defaultLocale
source: '/en',
destination: '/en/another',
locale: false,
},
{
// it's possible to match all locales even when locale: false is set
source: '/:locale/api-alias/:path*',
destination: '/api/:path*',
locale: false,
},
{
// this gets converted to /(en|fr|de)/(.<em>) so will not match the top-level
// <code>/</code> or <code>/fr</code> routes like /:path</em> would
source: '/(.*)',
destination: '/another',
},
]
},
}
Version History</p>
<p>VersionChangesv13.3.0missing added.v10.2.0has added.v9.5.0Headers added.Was this helpful?</p>
<p>supported.Send</p>
