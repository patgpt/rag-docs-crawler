# Upgrading: Version 15 | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationUpgradingVersion 15Version 15
Upgrading from 14 to 15</p>
<p>To update to Next.js version 15, you can use the upgrade codemod:
Terminalnpx @next/codemod@canary upgrade latest
If you prefer to do it manually, ensure that you're installing the latest Next &amp; React versions:
Terminalnpm i next@latest react@latest react-dom@latest eslint-config-next@latest</p>
<p>Good to know:</p>
<p>If you see a peer dependencies warning, you may need to update react and react-dom to the suggested versions, or you use the --force or --legacy-peer-deps flag to ignore the warning. This won't be necessary once both Next.js 15 and React 19 are stable.</p>
<p>React 19</p>
<p>The minimum versions of react and react-dom is now 19.
useFormState has been replaced by useActionState. The useFormState hook is still available in React 19, but it is deprecated and will be removed in a future release. useActionState is recommended and includes additional properties like reading the pending state directly. Learn more.
useFormStatus now includes additional keys like data, method, and action. If you are not using React 19, only the pending key is available. Learn more.
Read more in the React 19 upgrade guide.</p>
<p>Good to know: If you are using TypeScript, ensure you also upgrade @types/react and @types/react-dom to their latest versions.</p>
<p>Async Request APIs (Breaking change)</p>
<p>Previously synchronous Dynamic APIs that rely on runtime information are now asynchronous:</p>
<p>cookies
headers
draftMode
params in layout.js, page.js, route.js, default.js, opengraph-image, twitter-image, icon, and apple-icon.
searchParams in page.js</p>
<p>To ease the burden of migration, a codemod is available to automate the process and the APIs can temporarily be accessed synchronously.
cookies</p>
<p>Recommended Async Usage</p>
<p>import { cookies } from 'next/headers'</p>
<p>// Before
const cookieStore = cookies()
const token = cookieStore.get('token')</p>
<p>// After
const cookieStore = await cookies()
const token = cookieStore.get('token')
Temporary Synchronous Usage</p>
<p>app/page.tsxTypeScriptJavaScriptTypeScriptimport { cookies, type UnsafeUnwrappedCookies } from 'next/headers'</p>
<p>// Before
const cookieStore = cookies()
const token = cookieStore.get('token')</p>
<p>// After
const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies
// will log a warning in dev
const token = cookieStore.get('token')</p>
<p>headers</p>
<p>Recommended Async Usage</p>
<p>import { headers } from 'next/headers'</p>
<p>// Before
const headersList = headers()
const userAgent = headersList.get('user-agent')</p>
<p>// After
const headersList = await headers()
const userAgent = headersList.get('user-agent')
Temporary Synchronous Usage</p>
<p>app/page.tsxTypeScriptJavaScriptTypeScriptimport { headers, type UnsafeUnwrappedHeaders } from 'next/headers'</p>
<p>// Before
const headersList = headers()
const userAgent = headersList.get('user-agent')</p>
<p>// After
const headersList = headers() as unknown as UnsafeUnwrappedHeaders
// will log a warning in dev
const userAgent = headersList.get('user-agent')</p>
<p>draftMode</p>
<p>Recommended Async Usage</p>
<p>import { draftMode } from 'next/headers'</p>
<p>// Before
const { isEnabled } = draftMode()</p>
<p>// After
const { isEnabled } = await draftMode()
Temporary Synchronous Usage</p>
<p>app/page.tsxTypeScriptJavaScriptTypeScriptimport { draftMode, type UnsafeUnwrappedDraftMode } from 'next/headers'</p>
<p>// Before
const { isEnabled } = draftMode()</p>
<p>// After
// will log a warning in dev
const { isEnabled } = draftMode() as unknown as UnsafeUnwrappedDraftMode</p>
<p>params &amp; searchParams</p>
<p>Asynchronous Layout</p>
<p>app/layout.tsxTypeScriptJavaScriptTypeScript// Before
type Params = { slug: string }</p>
<p>export function generateMetadata({ params }: { params: Params }) {
const { slug } = params
}</p>
<p>export default async function Layout({
children,
params,
}: {
children: React.ReactNode
params: Params
}) {
const { slug } = params
}</p>
<p>// After
type Params = Promise&lt;{ slug: string }&gt;</p>
<p>export async function generateMetadata({ params }: { params: Params }) {
const { slug } = await params
}</p>
<p>export default async function Layout({
children,
params,
}: {
children: React.ReactNode
params: Params
}) {
const { slug } = await params
}</p>
<p>Synchronous Layout</p>
<p>app/layout.tsxTypeScriptJavaScriptTypeScript// Before
type Params = { slug: string }</p>
<p>export default function Layout({
children,
params,
}: {
children: React.ReactNode
params: Params
}) {
const { slug } = params
}</p>
<p>// After
import { use } from 'react'</p>
<p>type Params = Promise&lt;{ slug: string }&gt;</p>
<p>export default function Layout(props: {
children: React.ReactNode
params: Params
}) {
const params = use(props.params)
const slug = params.slug
}</p>
<p>Asynchronous Page</p>
<p>app/page.tsxTypeScriptJavaScriptTypeScript// Before
type Params = { slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }</p>
<p>export function generateMetadata({
params,
searchParams,
}: {
params: Params
searchParams: SearchParams
}) {
const { slug } = params
const { query } = searchParams
}</p>
<p>export default async function Page({
params,
searchParams,
}: {
params: Params
searchParams: SearchParams
}) {
const { slug } = params
const { query } = searchParams
}</p>
<p>// After
type Params = Promise&lt;{ slug: string }&gt;
type SearchParams = Promise&lt;{ [key: string]: string | string[] | undefined }&gt;</p>
<p>export async function generateMetadata(props: {
params: Params
searchParams: SearchParams
}) {
const params = await props.params
const searchParams = await props.searchParams
const slug = params.slug
const query = searchParams.query
}</p>
<p>export default async function Page(props: {
params: Params
searchParams: SearchParams
}) {
const params = await props.params
const searchParams = await props.searchParams
const slug = params.slug
const query = searchParams.query
}</p>
<p>Synchronous Page</p>
<p>'use client'</p>
<p>// Before
type Params = { slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }</p>
<p>export default function Page({
params,
searchParams,
}: {
params: Params
searchParams: SearchParams
}) {
const { slug } = params
const { query } = searchParams
}</p>
<p>// After
import { use } from 'react'</p>
<p>type Params = Promise&lt;{ slug: string }&gt;
type SearchParams = Promise&lt;{ [key: string]: string | string[] | undefined }&gt;</p>
<p>export default function Page(props: {
params: Params
searchParams: SearchParams
}) {
const params = use(props.params)
const searchParams = use(props.searchParams)
const slug = params.slug
const query = searchParams.query
}
// Before
export default function Page({ params, searchParams }) {
const { slug } = params
const { query } = searchParams
}</p>
<p>// After
import { use } from &quot;react&quot;</p>
<p>export default function Page(props) {
const params = use(props.params)
const searchParams = use(props.searchParams)
const slug = params.slug
const query = searchParams.query
}</p>
<p>Route Handlers</p>
<p>app/api/route.ts// Before
type Params = { slug: string }</p>
<p>export async function GET(request: Request, segmentData: { params: Params }) {
const params = segmentData.params
const slug = params.slug
}</p>
<p>// After
type Params = Promise&lt;{ slug: string }&gt;</p>
<p>export async function GET(request: Request, segmentData: { params: Params }) {
const params = await segmentData.params
const slug = params.slug
}
app/api/route.js// Before
export async function GET(request, segmentData) {
const params = segmentData.params
const slug = params.slug
}</p>
<p>// After
export async function GET(request, segmentData) {
const params = await segmentData.params
const slug = params.slug
}
runtime configuration (Breaking change)</p>
<p>The runtime segment configuration previously supported a value of experimental-edge in addition to edge. Both configurations refer to the same thing, and to simplify the options, we will now error if experimental-edge is used. To fix this, update your runtime configuration to edge. A codemod is available to automatically do this.
fetch requests</p>
<p>fetch requests are no longer cached by default.
To opt specific fetch requests into caching, you can pass the cache: 'force-cache' option.
app/layout.jsexport default async function RootLayout() {
const a = await fetch('https://...') // Not Cached
const b = await fetch('https://...', { cache: 'force-cache' }) // Cached</p>
<p>// ...
}
To opt all fetch requests in a layout or page into caching, you can use the export const fetchCache = 'default-cache' segment config option. If individual fetch requests specify a cache option, that will be used instead.
app/layout.js// Since this is the root layout, all fetch requests in the app
// that don't set their own cache option will be cached.
export const fetchCache = 'default-cache'</p>
<p>export default async function RootLayout() {
const a = await fetch('https://...') // Cached
const b = await fetch('https://...', { cache: 'no-store' }) // Not cached</p>
<p>// ...
}
Route Handlers</p>
<p>GET functions in Route Handlers are no longer cached by default. To opt GET methods into caching, you can use a route config option such as export const dynamic = 'force-static' in your Route Handler file.
app/api/route.jsexport const dynamic = 'force-static'</p>
<p>export async function GET() {}
Client-side Router Cache</p>
<p>When navigating between pages via &lt;Link&gt; or useRouter, page segments are no longer reused from the client-side router cache. However, they are still reused during browser backward and forward navigation and for shared layouts.
To opt page segments into caching, you can use the staleTimes config option:
next.config.js/** @type {import('next').NextConfig} */
const nextConfig = {
experimental: {
staleTimes: {
dynamic: 30,
static: 180,
},
},
}</p>
<p>module.exports = nextConfig
Layouts and loading states are still cached and reused on navigation.
next/font</p>
<p>The @next/font package has been removed in favor of the built-in next/font. A codemod is available to safely and automatically rename your imports.
app/layout.js// Before
import { Inter } from '@next/font/google'</p>
<p>// After
import { Inter } from 'next/font/google'
bundlePagesRouterDependencies</p>
<p>experimental.bundlePagesExternals is now stable and renamed to bundlePagesRouterDependencies.
next.config.js/** @type {import('next').NextConfig} */
const nextConfig = {
// Before
experimental: {
bundlePagesExternals: true,
},</p>
<p>// After
bundlePagesRouterDependencies: true,
}</p>
<p>module.exports = nextConfig
serverExternalPackages</p>
<p>experimental.serverComponentsExternalPackages is now stable and renamed to serverExternalPackages.
next.config.js/** @type {import('next').NextConfig} */
const nextConfig = {
// Before
experimental: {
serverComponentsExternalPackages: ['package-name'],
},</p>
<p>// After
serverExternalPackages: ['package-name'],
}</p>
<p>module.exports = nextConfig
Speed Insights</p>
<p>Auto instrumentation for Speed Insights was removed in Next.js 15.
To continue using Speed Insights, follow the Vercel Speed Insights Quickstart guide.
NextRequest Geolocation</p>
<p>The geo and ip properties on NextRequest have been removed as these values are provided by your hosting provider. A codemod is available to automate this migration.
If you are using Vercel, you can alternatively use the geolocation and ipAddress functions from @vercel/functions instead:
middleware.tsimport { geolocation } from '@vercel/functions'
import type { NextRequest } from 'next/server'</p>
<p>export function middleware(request: NextRequest) {
const { city } = geolocation(request)</p>
<p>// ...
}
middleware.tsimport { ipAddress } from '@vercel/functions'
import type { NextRequest } from 'next/server'</p>
<p>export function middleware(request: NextRequest) {
const ip = ipAddress(request)</p>
<p>// ...
}Was this helpful?</p>
<p>supported.Send</p>
