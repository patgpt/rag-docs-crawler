# Configuring: Content Security Policy | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationConfiguringContent Security PolicyContent Security Policy
Content Security Policy (CSP) is important to guard your Next.js application against various security threats such as cross-site scripting (XSS), clickjacking, and other code injection attacks.
By using CSP, developers can specify which origins are permissible for content sources, scripts, stylesheets, images, fonts, objects, media (audio, video), iframes, and more.
Examples
Strict CSP</p>
<p>Nonces</p>
<p>A nonce is a unique, random string of characters created for a one-time use. It is used in conjunction with CSP to selectively allow certain inline scripts or styles to execute, bypassing strict CSP directives.
Why use a nonce?</p>
<p>Even though CSPs are designed to block malicious scripts, there are legitimate scenarios where inline scripts are necessary. In such cases, nonces offer a way to allow these scripts to execute if they have the correct nonce.
Adding a nonce with Middleware</p>
<p>Middleware enables you to add headers and generate nonces before the page renders.
Every time a page is viewed, a fresh nonce should be generated. This means that you must use dynamic rendering to add nonces.
For example:
middleware.tsTypeScriptJavaScriptTypeScriptimport { NextRequest, NextResponse } from 'next/server'</p>
<p>export function middleware(request: NextRequest) {
const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
const cspHeader = <code>    default-src 'self';     script-src 'self' 'nonce-${nonce}' 'strict-dynamic';     style-src 'self' 'nonce-${nonce}';     img-src 'self' blob: data:;     font-src 'self';     object-src 'none';     base-uri 'self';     form-action 'self';     frame-ancestors 'none';     upgrade-insecure-requests;</code>
// Replace newline characters and spaces
const contentSecurityPolicyHeaderValue = cspHeader
.replace(/\s{2,}/g, ' ')
.trim()</p>
<p>const requestHeaders = new Headers(request.headers)
requestHeaders.set('x-nonce', nonce)</p>
<p>requestHeaders.set(
'Content-Security-Policy',
contentSecurityPolicyHeaderValue
)</p>
<p>const response = NextResponse.next({
request: {
headers: requestHeaders,
},
})
response.headers.set(
'Content-Security-Policy',
contentSecurityPolicyHeaderValue
)</p>
<p>return response
}</p>
<p>By default, Middleware runs on all requests. You can filter Middleware to run on specific paths using a matcher.
We recommend ignoring matching prefetches (from next/link) and static assets that don't need the CSP header.
middleware.tsTypeScriptJavaScriptTypeScriptexport const config = {
matcher: [
/*
* Match all request paths except for the ones starting with:
* - api (API routes)
* - _next/static (static files)
* - _next/image (image optimization files)
* - favicon.ico (favicon file)
<em>/
{
source: '/((?!api|_next/static|_next/image|favicon.ico).</em>)',
missing: [
{ type: 'header', key: 'next-router-prefetch' },
{ type: 'header', key: 'purpose', value: 'prefetch' },
],
},
],
}</p>
<p>Reading the nonce</p>
<p>You can now read the nonce from a Server Component using headers:
app/page.tsxTypeScriptJavaScriptTypeScriptimport { headers } from 'next/headers'
import Script from 'next/script'</p>
<p>export default async function Page() {
const nonce = (await headers()).get('x-nonce')</p>
<p>return (
&lt;Script
src=&quot;https://www.googletagmanager.com/gtag/js&quot;
strategy=&quot;afterInteractive&quot;
nonce={nonce}
/&gt;
)
}</p>
<p>Without Nonces</p>
<p>For applications that do not require nonces, you can set the CSP header directly in your next.config.js file:
next.config.jsconst cspHeader = <code>    default-src 'self';     script-src 'self' 'unsafe-eval' 'unsafe-inline';     style-src 'self' 'unsafe-inline';     img-src 'self' blob: data:;     font-src 'self';     object-src 'none';     base-uri 'self';     form-action 'self';     frame-ancestors 'none';     upgrade-insecure-requests;</code></p>
<p>module.exports = {
async headers() {
return [
{
source: '/(.*)',
headers: [
{
key: 'Content-Security-Policy',
value: cspHeader.replace(/\n/g, ''),
},
],
},
]
},
}
Version History</p>
<p>We recommend using v13.4.20+ of Next.js to properly handle and apply nonces.Next StepsMiddlewareLearn how to use Middleware to run code before a request is completed.headersAPI reference for the headers function.Was this helpful?</p>
<p>supported.Send</p>
