# Functions: notFound | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsnotFoundnotFoundThe notFound function allows you to render the not-found file within a route segment as well as inject a &lt;meta name=&quot;robots&quot; content=&quot;noindex&quot; /&gt; tag.
notFound()</p>
<p>Invoking the notFound() function throws a NEXT_NOT_FOUND error and terminates rendering of the route segment in which it was thrown. Specifying a not-found file allows you to gracefully handle such errors by rendering a Not Found UI within the segment.
app/user/[id]/page.jsimport { notFound } from 'next/navigation'</p>
<p>async function fetchUser(id) {
const res = await fetch('https://...')
if (!res.ok) return undefined
return res.json()
}</p>
<p>export default async function Profile({ params }) {
const user = await fetchUser((await params).id)</p>
<p>if (!user) {
notFound()
}</p>
<p>// ...
}</p>
<p>Good to know: notFound() does not require you to use return notFound() due to using the TypeScript never type.</p>
<p>Version History</p>
<p>VersionChangesv13.0.0notFound introduced.Was this helpful?</p>
<p>supported.Send</p>
