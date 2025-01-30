# Functions: revalidateTag | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsrevalidateTagrevalidateTagrevalidateTag allows you to purge cached data on-demand for a specific cache tag.</p>
<p>Good to know:</p>
<p>revalidateTag only invalidates the cache when the path is next visited. This means calling revalidateTag with a dynamic route segment will not immediately trigger many revalidations at once. The invalidation only happens when the path is next visited.</p>
<p>Parameters</p>
<p>revalidateTag(tag: string): void;</p>
<p>tag: A string representing the cache tag associated with the data you want to revalidate. Must be less than or equal to 256 characters. This value is case-sensitive.</p>
<p>You can add tags to fetch as follows:
fetch(url, { next: { tags: [...] } });
Returns</p>
<p>revalidateTag does not return a value.
Examples</p>
<p>Server Action</p>
<p>app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { revalidateTag } from 'next/cache'</p>
<p>export default async function submit() {
await addPost()
revalidateTag('posts')
}</p>
<p>Route Handler</p>
<p>app/api/revalidate/route.tsTypeScriptJavaScriptTypeScriptimport type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'</p>
<p>export async function GET(request: NextRequest) {
const tag = request.nextUrl.searchParams.get('tag')
revalidateTag(tag)
return Response.json({ revalidated: true, now: Date.now() })
}
Was this helpful?</p>
<p>supported.Send</p>
