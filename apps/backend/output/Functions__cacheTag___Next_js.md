# Functions: cacheTag | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionscacheTagcacheTagThis feature is currently available in the canary channel and subject to change. Try it out by upgrading Next.js, and share your feedback on GitHub.The cacheTag function allows you to tag cached data for on-demand invalidation. By associating tags with cache entries, you can selectively purge or revalidate specific cache entries without affecting other cached data.
Usage</p>
<p>To use cacheTag, enable the dynamicIO flag in your next.config.js file:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
dynamicIO: true,
},
}</p>
<p>export default nextConfig</p>
<p>The cacheTag function takes a single string value, or a string array.
app/data.tsTypeScriptJavaScriptTypeScriptimport { unstable_cacheTag as cacheTag } from 'next/cache'</p>
<p>export async function getData() {
'use cache'
cacheTag('my-data')
const data = await fetch('/api/data')
return data
}</p>
<p>You can then purge the cache on-demand using revalidateTag API in another function, for example, a route handler or Server Action:
app/action.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { revalidateTag } from 'next/cache'</p>
<p>export default async function submit() {
await addPost()
revalidateTag('my-data')
}</p>
<p>Good to know</p>
<p>Idempotent Tags: Applying the same tag multiple times has no additional effect.
Multiple Tags: You can assign multiple tags to a single cache entry by passing an array to cacheTag.</p>
<p>cacheTag('tag-one', 'tag-two')
Examples</p>
<p>Tagging components or functions</p>
<p>Tag your cached data by calling cacheTag within a cached function or component:
app/components/bookings.tsxTypeScriptJavaScriptTypeScriptimport { unstable_cacheTag as cacheTag } from 'next/cache'</p>
<p>interface BookingsProps {
type: string
}</p>
<p>export async function Bookings({ type = 'haircut' }: BookingsProps) {
'use cache'
cacheTag('bookings-data')</p>
<p>async function getBookingsData() {
const data = await fetch(<code>/api/bookings?type=${encodeURIComponent(type)}</code>)
return data
}</p>
<p>return //...
}</p>
<p>Creating tags from external data</p>
<p>You can use the data returned from an async function to tag the cache entry.
app/components/bookings.tsxTypeScriptJavaScriptTypeScriptimport { unstable_cacheTag as cacheTag } from 'next/cache'</p>
<p>interface BookingsProps {
type: string
}</p>
<p>export async function Bookings({ type = 'haircut' }: BookingsProps) {
async function getBookingsData() {
'use cache'
const data = await fetch(<code>/api/bookings?type=${encodeURIComponent(type)}</code>)
cacheTag('bookings-data', data.id)
return data
}
return //...
}</p>
<p>Invalidating tagged cache</p>
<p>Using revalidateTag, you can invalidate the cache for a specific tag when needed:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { revalidateTag } from 'next/cache'</p>
<p>export async function updateBookings() {
await updateBookingData()
revalidateTag('bookings-data')
}
RelatedView related API references.dynamicIOLearn how to enable the dynamicIO flag in Next.js.use cacheLearn how to use the use cache directive to cache data in your Next.js application.revalidateTagAPI Reference for the revalidateTag function.cacheLifeLearn how to use the cacheLife function to set the cache expiration time for a cached function or component.Was this helpful?</p>
<p>supported.Send</p>
