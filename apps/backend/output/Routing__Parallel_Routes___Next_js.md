# Routing: Parallel Routes | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRoutingParallel RoutesParallel RoutesParallel Routes allows you to simultaneously or conditionally render one or more pages within the same layout. They are useful for highly dynamic sections of an app, such as dashboards and feeds on social sites.
For example, considering a dashboard, you can use parallel routes to simultaneously render the team and analytics pages:</p>
<p>Slots</p>
<p>Parallel routes are created using named slots. Slots are defined with the @folder convention. For example, the following file structure defines two slots: @analytics and @team:</p>
<p>Slots are passed as props to the shared parent layout. For the example above, the component in app/layout.js now accepts the @analytics and @team slots props, and can render them in parallel alongside the children prop:
app/layout.tsxTypeScriptJavaScriptTypeScriptexport default function Layout({
children,
team,
analytics,
}: {
children: React.ReactNode
analytics: React.ReactNode
team: React.ReactNode
}) {
return (
&lt;&gt;
{children}
{team}
{analytics}
&lt;/&gt;
)
}</p>
<p>However, slots are not route segments and do not affect the URL structure. For example, for /@analytics/views, the URL will be /views since @analytics is a slot. Slots are combined with the regular Page component to form the final page associated with the route segment. Because of this, you cannot have separate static and dynamic slots at the same route segment level. If one slot is dynamic, all slots at that level must be dynamic.</p>
<p>Good to know:</p>
<p>The children prop is an implicit slot that does not need to be mapped to a folder. This means app/page.js is equivalent to app/@children/page.js.</p>
<p>Active state and navigation</p>
<p>By default, Next.js keeps track of the active state (or subpage) for each slot. However, the content rendered within a slot will depend on the type of navigation:</p>
<p>Soft Navigation: During client-side navigation, Next.js will perform a partial render, changing the subpage within the slot, while maintaining the other slot's active subpages, even if they don't match the current URL.
Hard Navigation: After a full-page load (browser refresh), Next.js cannot determine the active state for the slots that don't match the current URL. Instead, it will render a default.js file for the unmatched slots, or 404 if default.js doesn't exist.</p>
<p>Good to know:</p>
<p>The 404 for unmatched routes helps ensure that you don't accidentally render a parallel route on a page that it was not intended for.</p>
<p>default.js</p>
<p>You can define a default.js file to render as a fallback for unmatched slots during the initial load or full-page reload.
Consider the following folder structure. The @team slot has a /settings page, but @analytics does not.</p>
<p>When navigating to /settings, the @team slot will render the /settings page while maintaining the currently active page for the @analytics slot.
On refresh, Next.js will render a default.js for @analytics. If default.js doesn't exist, a 404 is rendered instead.
Additionally, since children is an implicit slot, you also need to create a default.js file to render a fallback for children when Next.js cannot recover the active state of the parent page.
useSelectedLayoutSegment(s)</p>
<p>Both useSelectedLayoutSegment and useSelectedLayoutSegments accept a parallelRoutesKey parameter, which allows you to read the active route segment within a slot.
app/layout.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useSelectedLayoutSegment } from 'next/navigation'</p>
<p>export default function Layout({ auth }: { auth: React.ReactNode }) {
const loginSegment = useSelectedLayoutSegment('auth')
// ...
}</p>
<p>When a user navigates to app/@auth/login (or /login in the URL bar), loginSegment will be equal to the string &quot;login&quot;.
Examples</p>
<p>Conditional Routes</p>
<p>You can use Parallel Routes to conditionally render routes based on certain conditions, such as user role. For example, to render a different dashboard page for the /admin or /user roles:</p>
<p>app/dashboard/layout.tsxTypeScriptJavaScriptTypeScriptimport { checkUserRole } from '@/lib/auth'</p>
<p>export default function Layout({
user,
admin,
}: {
user: React.ReactNode
admin: React.ReactNode
}) {
const role = checkUserRole()
return role === 'admin' ? admin : user
}</p>
<p>Tab Groups</p>
<p>You can add a layout inside a slot to allow users to navigate the slot independently. This is useful for creating tabs.
For example, the @analytics slot has two subpages: /page-views and /visitors.</p>
<p>Within @analytics, create a layout file to share the tabs between the two pages:
app/@analytics/layout.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Layout({ children }: { children: React.ReactNode }) {
return (
&lt;&gt;
&lt;nav&gt;
&lt;Link href=&quot;/page-views&quot;&gt;Page Views&lt;/Link&gt;
&lt;Link href=&quot;/visitors&quot;&gt;Visitors&lt;/Link&gt;
&lt;/nav&gt;
&lt;div&gt;{children}&lt;/div&gt;
&lt;/&gt;
)
}</p>
<p>Modals</p>
<p>Parallel Routes can be used together with Intercepting Routes to create modals that support deep linking. This allows you to solve common challenges when building modals, such as:</p>
<p>Making the modal content shareable through a URL.
Preserving context when the page is refreshed, instead of closing the modal.
Closing the modal on backwards navigation rather than going to the previous route.
Reopening the modal on forwards navigation.</p>
<p>Consider the following UI pattern, where a user can open a login modal from a layout using client-side navigation, or access a separate /login page:</p>
<p>To implement this pattern, start by creating a /login route that renders your main login page.</p>
<p>app/login/page.tsxTypeScriptJavaScriptTypeScriptimport { Login } from '@/app/ui/login'</p>
<p>export default function Page() {
return &lt;Login /&gt;
}</p>
<p>Then, inside the @auth slot, add default.js file that returns null. This ensures that the modal is not rendered when it's not active.
app/@auth/default.tsxTypeScriptJavaScriptTypeScriptexport default function Default() {
return null
}</p>
<p>Inside your @auth slot, intercept the /login route by updating the /(.)login folder. Import the &lt;Modal&gt; component and its children into the /(.)login/page.tsx file:
app/@auth/(.)login/page.tsxTypeScriptJavaScriptTypeScriptimport { Modal } from '@/app/ui/modal'
import { Login } from '@/app/ui/login'</p>
<p>export default function Page() {
return (
&lt;Modal&gt;
&lt;Login /&gt;
&lt;/Modal&gt;
)
}</p>
<p>Good to know:</p>
<p>The convention used to intercept the route, e.g. (.), depends on your file-system structure. See Intercepting Routes convention.
By separating the &lt;Modal&gt; functionality from the modal content (&lt;Login&gt;), you can ensure any content inside the modal, e.g. forms, are Server Components. See Interleaving Client and Server Components for more information.</p>
<p>Opening the modal</p>
<p>Now, you can leverage the Next.js router to open and close the modal. This ensures the URL is correctly updated when the modal is open, and when navigating backwards and forwards.
To open the modal, pass the @auth slot as a prop to the parent layout and render it alongside the children prop.
app/layout.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Layout({
auth,
children,
}: {
auth: React.ReactNode
children: React.ReactNode
}) {
return (
&lt;&gt;
&lt;nav&gt;
&lt;Link href=&quot;/login&quot;&gt;Open modal&lt;/Link&gt;
&lt;/nav&gt;
&lt;div&gt;{auth}&lt;/div&gt;
&lt;div&gt;{children}&lt;/div&gt;
&lt;/&gt;
)
}</p>
<p>When the user clicks the &lt;Link&gt;, the modal will open instead of navigating to the /login page. However, on refresh or initial load, navigating to /login will take the user to the main login page.
Closing the modal</p>
<p>You can close the modal by calling router.back() or by using the Link component.
app/ui/modal.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useRouter } from 'next/navigation'</p>
<p>export function Modal({ children }: { children: React.ReactNode }) {
const router = useRouter()</p>
<p>return (
&lt;&gt;
&lt;button
onClick={() =&gt; {
router.back()
}}
&gt;
Close modal
&lt;/button&gt;
&lt;div&gt;{children}&lt;/div&gt;
&lt;/&gt;
)
}</p>
<p>When using the Link component to navigate away from a page that shouldn't render the @auth slot anymore, we need to make sure the parallel route matches to a component that returns null. For example, when navigating back to the root page, we create a @auth/page.tsx component:
app/ui/modal.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export function Modal({ children }: { children: React.ReactNode }) {
return (
&lt;&gt;
&lt;Link href=&quot;/&quot;&gt;Close modal&lt;/Link&gt;
&lt;div&gt;{children}&lt;/div&gt;
&lt;/&gt;
)
}</p>
<p>app/@auth/page.tsxTypeScriptJavaScriptTypeScriptexport default function Page() {
return null
}</p>
<p>Or if navigating to any other page (such as /foo, /foo/bar, etc), you can use a catch-all slot:
app/@auth/[...catchAll]/page.tsxTypeScriptJavaScriptTypeScriptexport default function CatchAll() {
return null
}</p>
<p>Good to know:</p>
<p>We use a catch-all route in our @auth slot to close the modal because of the behavior described in Active state and navigation. Since client-side navigations to a route that no longer match the slot will remain visible, we need to match the slot to a route that returns null to close the modal.
Other examples could include opening a photo modal in a gallery while also having a dedicated /photo/[id] page, or opening a shopping cart in a side modal.
View an example of modals with Intercepted and Parallel Routes.</p>
<p>Loading and Error UI</p>
<p>Parallel Routes can be streamed independently, allowing you to define independent error and loading states for each route:</p>
<p>See the Loading UI and Error Handling documentation for more information.Next Stepsdefault.jsAPI Reference for the default.js file.Was this helpful?</p>
<p>supported.Send</p>
