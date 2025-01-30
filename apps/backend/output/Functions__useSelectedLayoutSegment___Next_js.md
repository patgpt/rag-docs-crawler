# Functions: useSelectedLayoutSegment | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsuseSelectedLayoutSegmentuseSelectedLayoutSegmentuseSelectedLayoutSegment is a Client Component hook that lets you read the active route segment one level below the Layout it is called from.
It is useful for navigation UI, such as tabs inside a parent layout that change style depending on the active child segment.
app/example-client-component.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useSelectedLayoutSegment } from 'next/navigation'</p>
<p>export default function ExampleClientComponent() {
const segment = useSelectedLayoutSegment()</p>
<p>return &lt;p&gt;Active segment: {segment}&lt;/p&gt;
}</p>
<p>Good to know:</p>
<p>Since useSelectedLayoutSegment is a Client Component hook, and Layouts are Server Components by default, useSelectedLayoutSegment is usually called via a Client Component that is imported into a Layout.
useSelectedLayoutSegment only returns the segment one level down. To return all active segments, see useSelectedLayoutSegments</p>
<p>Parameters</p>
<p>const segment = useSelectedLayoutSegment(parallelRoutesKey?: string)
useSelectedLayoutSegment optionally accepts a parallelRoutesKey, which allows you to read the active route segment within that slot.
Returns</p>
<p>useSelectedLayoutSegment returns a string of the active segment or null if one doesn't exist.
For example, given the Layouts and URLs below, the returned segment would be:
LayoutVisited URLReturned Segmentapp/layout.js/nullapp/layout.js/dashboard'dashboard'app/dashboard/layout.js/dashboardnullapp/dashboard/layout.js/dashboard/settings'settings'app/dashboard/layout.js/dashboard/analytics'analytics'app/dashboard/layout.js/dashboard/analytics/monthly'analytics'
Examples</p>
<p>Creating an active link component</p>
<p>You can use useSelectedLayoutSegment to create an active link component that changes style depending on the active segment. For example, a featured posts list in the sidebar of a blog:
app/blog/blog-nav-link.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'</p>
<p>// This <em>client</em> component will be imported into a blog layout
export default function BlogNavLink({
slug,
children,
}: {
slug: string
children: React.ReactNode
}) {
// Navigating to <code>/blog/hello-world</code> will return 'hello-world'
// for the selected layout segment
const segment = useSelectedLayoutSegment()
const isActive = slug === segment</p>
<p>return (
&lt;Link
href={<code>/blog/${slug}</code>}
// Change style depending on whether the link is active
style={{ fontWeight: isActive ? 'bold' : 'normal' }}
&gt;
{children}
&lt;/Link&gt;
)
}</p>
<p>app/blog/layout.tsxTypeScriptJavaScriptTypeScript// Import the Client Component into a parent Layout (Server Component)
import { BlogNavLink } from './blog-nav-link'
import getFeaturedPosts from './get-featured-posts'</p>
<p>export default async function Layout({
children,
}: {
children: React.ReactNode
}) {
const featuredPosts = await getFeaturedPosts()
return (
&lt;div&gt;
{featuredPosts.map((post) =&gt; (
&lt;div key={post.id}&gt;
&lt;BlogNavLink slug={post.slug}&gt;{post.title}&lt;/BlogNavLink&gt;
&lt;/div&gt;
))}
&lt;div&gt;{children}&lt;/div&gt;
&lt;/div&gt;
)
}</p>
<p>Version History</p>
<p>VersionChangesv13.0.0useSelectedLayoutSegment introduced.Was this helpful?</p>
<p>supported.Send</p>
