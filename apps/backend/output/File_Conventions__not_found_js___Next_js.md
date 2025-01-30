# File Conventions: not-found.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionsnot-found.jsnot-found.jsThe not-found file is used to render UI when the notFound function is thrown within a route segment. Along with serving a custom UI, Next.js will return a 200 HTTP status code for streamed responses, and 404 for non-streamed responses.
app/not-found.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function NotFound() {
return (
&lt;div&gt;
&lt;h2&gt;Not Found&lt;/h2&gt;
&lt;p&gt;Could not find requested resource&lt;/p&gt;
&lt;Link href=&quot;/&quot;&gt;Return Home&lt;/Link&gt;
&lt;/div&gt;
)
}</p>
<p>Reference</p>
<p>Props</p>
<p>not-found.js components do not accept any props.</p>
<p>Good to know: In addition to catching expected notFound() errors, the root app/not-found.js file also handles any unmatched URLs for your whole application. This means users that visit a URL that is not handled by your app will be shown the UI exported by the app/not-found.js file.</p>
<p>Examples</p>
<p>Data Fetching</p>
<p>By default, not-found is a Server Component. You can mark it as async to fetch and display data:
app/not-found.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'
import { headers } from 'next/headers'</p>
<p>export default async function NotFound() {
const headersList = await headers()
const domain = headersList.get('host')
const data = await getSiteData(domain)
return (
&lt;div&gt;
&lt;h2&gt;Not Found: {data.name}&lt;/h2&gt;
&lt;p&gt;Could not find requested resource&lt;/p&gt;
&lt;p&gt;
View &lt;Link href=&quot;/blog&quot;&gt;all posts&lt;/Link&gt;
&lt;/p&gt;
&lt;/div&gt;
)
}</p>
<p>If you need to use Client Component hooks like usePathname to display content based on the path, you must fetch data on the client-side instead.
Version History</p>
<p>VersionChangesv13.3.0Root app/not-found handles global unmatched URLs.v13.0.0not-found introduced.Was this helpful?</p>
<p>supported.Send</p>
