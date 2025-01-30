# Components: Link | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceComponentsLinkLink
&lt;Link&gt; is a React component that extends the HTML &lt;a&gt; element to provide prefetching and client-side navigation between routes. It is the primary way to navigate between routes in Next.js.
Basic usage:
app/page.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Page() {
return &lt;Link href=&quot;/dashboard&quot;&gt;Dashboard&lt;/Link&gt;
}</p>
<p>Reference</p>
<p>The following props can be passed to the &lt;Link&gt; component:</p>
<p>PropExampleTypeRequiredhrefhref=&quot;/dashboard&quot;String or ObjectYesreplacereplace={false}Boolean-scrollscroll={false}Boolean-prefetchprefetch={false}Boolean or null-</p>
<p>Good to know: &lt;a&gt; tag attributes such as className or target=&quot;_blank&quot; can be added to &lt;Link&gt; as props and will be passed to the underlying &lt;a&gt; element.</p>
<p>href (required)</p>
<p>The path or URL to navigate to.
app/page.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>// Navigate to /about?name=test
export default function Page() {
return (
&lt;Link
href={{
pathname: '/about',
query: { name: 'test' },
}}
&gt;
About
&lt;/Link&gt;
)
}</p>
<p>replace</p>
<p>Defaults to false. When true, next/link will replace the current history state instead of adding a new URL into the browser's history stack.
app/page.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Page() {
return (
&lt;Link href=&quot;/dashboard&quot; replace&gt;
Dashboard
&lt;/Link&gt;
)
}</p>
<p>scroll</p>
<p>Defaults to true. The default scrolling behavior of &lt;Link&gt; in Next.js is to maintain scroll position, similar to how browsers handle back and forwards navigation. When you navigate to a new Page, scroll position will stay the same as long as the Page is visible in the viewport. However, if the Page is not visible in the viewport, Next.js will scroll to the top of the first Page element.
When scroll = {false}, Next.js will not attempt to scroll to the first Page element.</p>
<p>Good to know: Next.js checks if scroll: false before managing scroll behavior. If scrolling is enabled, it identifies the relevant DOM node for navigation and inspects each top-level element. All non-scrollable elements and those without rendered HTML are bypassed, this includes sticky or fixed positioned elements, and non-visible elements such as those calculated with getBoundingClientRect. Next.js then continues through siblings until it identifies a scrollable element that is visible in the viewport.</p>
<p>app/page.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Page() {
return (
&lt;Link href=&quot;/dashboard&quot; scroll={false}&gt;
Dashboard
&lt;/Link&gt;
)
}</p>
<p>prefetch</p>
<p>Prefetching happens when a &lt;Link /&gt; component enters the user's viewport (initially or through scroll). Next.js prefetches and loads the linked route (denoted by the href) and its data in the background to improve the performance of client-side navigations. If the prefetched data has expired by the time the user hovers over a &lt;Link /&gt;, Next.js will attempt to prefetch it again. Prefetching is only enabled in production.The following values can be passed to the prefetch prop:
null (default): Prefetch behavior depends on whether the route is static or dynamic. For static routes, the full route will be prefetched (including all its data). For dynamic routes, the partial route down to the nearest segment with a loading.js boundary will be prefetched.
true: The full route will be prefetched for both static and dynamic routes.
false: Prefetching will never happen both on entering the viewport and on hover.
app/page.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Page() {
return (
&lt;Link href=&quot;/dashboard&quot; prefetch={false}&gt;
Dashboard
&lt;/Link&gt;
)
}</p>
<p>Examples</p>
<p>The following examples demonstrate how to use the &lt;Link&gt; component in different scenarios.
Linking to dynamic segments</p>
<p>When linking to dynamic segments, you can use template literals and interpolation to generate a list of links. For example, to generate a list of blog posts:app/blog/post-list.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>interface Post {
id: number
title: string
slug: string
}</p>
<p>export default function PostList({ posts }: { posts: Post[] }) {
return (
&lt;ul&gt;
{posts.map((post) =&gt; (
&lt;li key={post.id}&gt;
&lt;Link href={<code>/blog/${post.slug}</code>}&gt;{post.title}&lt;/Link&gt;
&lt;/li&gt;
))}
&lt;/ul&gt;
)
}Checking active links</p>
<p>You can use usePathname() to determine if a link is active. For example, to add a class to the active link, you can check if the current pathname matches the href of the link:app/ui/nav-links.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { usePathname } from 'next/navigation'
import Link from 'next/link'</p>
<p>export function Links() {
const pathname = usePathname()</p>
<p>return (
&lt;nav&gt;
&lt;Link className={<code>link ${pathname === '/' ? 'active' : ''}</code>} href=&quot;/&quot;&gt;
Home
&lt;/Link&gt;</p>
<pre><code>  &lt;Link
    className={`link ${pathname === '/about' ? 'active' : ''}`}
    href=&quot;/about&quot;
  &gt;
    About
  &lt;/Link&gt;
&lt;/nav&gt;
</code></pre>
<p>)
}Scrolling to an id</p>
<p>If you'd like to scroll to a specific id on navigation, you can append your URL with a # hash link or just pass a hash link to the href prop. This is possible since &lt;Link&gt; renders to an &lt;a&gt; element.&lt;Link href=&quot;/dashboard#settings&quot;&gt;Settings&lt;/Link&gt;</p>
<p>// Output
&lt;a href=&quot;/dashboard#settings&quot;&gt;Settings&lt;/a&gt;
Good to know:</p>
<p>Next.js will scroll to the Page if it is not visible in the viewport upon navigation.</p>
<p>Linking to dynamic route segments</p>
<p>For dynamic route segments, it can be handy to use template literals to create the link's path.</p>
<p>For example, you can generate a list of links to the dynamic route app/blog/[slug]/page.js:app/blog/page.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Page({ posts }) {
return (
&lt;ul&gt;
{posts.map((post) =&gt; (
&lt;li key={post.id}&gt;
&lt;Link href={<code>/blog/${post.slug}</code>}&gt;{post.title}&lt;/Link&gt;
&lt;/li&gt;
))}
&lt;/ul&gt;
)
}
If the child is a custom component that wraps an &lt;a&gt; tag</p>
<p>If the child of Link is a custom component that wraps an &lt;a&gt; tag, you must add passHref to Link. This is necessary if you’re using libraries like styled-components. Without this, the &lt;a&gt; tag will not have the href attribute, which hurts your site's accessibility and might affect SEO. If you're using ESLint, there is a built-in rule next/link-passhref to ensure correct usage of passHref.</p>
<p>components/nav-link.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'
import styled from 'styled-components'</p>
<p>// This creates a custom component that wraps an &lt;a&gt; tag
const RedLink = styled.a<code>  color: red;</code></p>
<p>function NavLink({ href, name }) {
return (
&lt;Link href={href} passHref legacyBehavior&gt;
&lt;RedLink&gt;{name}&lt;/RedLink&gt;
&lt;/Link&gt;
)
}</p>
<p>export default NavLink</p>
<p>If you’re using emotion’s JSX pragma feature (@jsx jsx), you must use passHref even if you use an &lt;a&gt; tag directly.
The component should support onClick property to trigger navigation correctly.</p>
<p>Nesting a functional component</p>
<p>If the child of Link is a functional component, in addition to using passHref and legacyBehavior, you must wrap the component in React.forwardRef:
app/page.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'
import React from 'react'</p>
<p>// Define the props type for MyButton
interface MyButtonProps {
onClick?: React.MouseEventHandler&lt;HTMLAnchorElement&gt;
href?: string
}</p>
<p>// Use React.ForwardRefRenderFunction to properly type the forwarded ref
const MyButton: React.ForwardRefRenderFunction&lt;
HTMLAnchorElement,
MyButtonProps</p>
<blockquote>
<p>= ({ onClick, href }, ref) =&gt; {
return (
&lt;a href={href} onClick={onClick} ref={ref}&gt;
Click Me
&lt;/a&gt;
)
}</p>
</blockquote>
<p>// Use React.forwardRef to wrap the component
const ForwardedMyButton = React.forwardRef(MyButton)</p>
<p>export default function Page() {
return (
&lt;Link href=&quot;/about&quot; passHref legacyBehavior&gt;
&lt;ForwardedMyButton /&gt;
&lt;/Link&gt;
)
}</p>
<p>Replace the URL instead of push</p>
<p>The default behavior of the Link component is to push a new URL into the history stack. You can use the replace prop to prevent adding a new entry, as in the following example:
app/page.jsTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Page() {
return (
&lt;Link href=&quot;/about&quot; replace&gt;
About us
&lt;/Link&gt;
)
}</p>
<p>Disable scrolling to the top of the page</p>
<p>The default scrolling behavior of &lt;Link&gt; in Next.js is to maintain scroll position, similar to how browsers handle back and forwards navigation. When you navigate to a new Page, scroll position will stay the same as long as the Page is visible in the viewport.However, if the Page is not visible in the viewport, Next.js will scroll to the top of the first Page element. If you'd like to disable this behavior, you can pass scroll={false} to the &lt;Link&gt; component, or scroll: false to router.push() or router.replace().app/page.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Page() {
return (
&lt;Link href=&quot;/#hashid&quot; scroll={false}&gt;
Disables scrolling to the top
&lt;/Link&gt;
)
}Using router.push() or router.replace():// useRouter
import { useRouter } from 'next/navigation'</p>
<p>const router = useRouter()</p>
<p>router.push('/dashboard', { scroll: false })</p>
<p>Prefetching links in Middleware</p>
<p>It's common to use Middleware for authentication or other purposes that involve rewriting the user to a different page. In order for the &lt;Link /&gt; component to properly prefetch links with rewrites via Middleware, you need to tell Next.js both the URL to display and the URL to prefetch. This is required to avoid un-necessary fetches to middleware to know the correct route to prefetch.
For example, if you want to serve a /dashboard route that has authenticated and visitor views, you can add the following in your Middleware to redirect the user to the correct page:
middleware.tsTypeScriptJavaScriptTypeScriptimport { NextResponse } from 'next/server'</p>
<p>export function middleware(request: Request) {
const nextUrl = request.nextUrl
if (nextUrl.pathname === '/dashboard') {
if (request.cookies.authToken) {
return NextResponse.rewrite(new URL('/auth/dashboard', request.url))
} else {
return NextResponse.rewrite(new URL('/public/dashboard', request.url))
}
}
}</p>
<p>In this case, you would want to use the following code in your &lt;Link /&gt; component:
app/page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import Link from 'next/link'
import useIsAuthed from './hooks/useIsAuthed' // Your auth hook</p>
<p>export default function Page() {
const isAuthed = useIsAuthed()
const path = isAuthed ? '/auth/dashboard' : '/public/dashboard'
return (
&lt;Link as=&quot;/dashboard&quot; href={path}&gt;
Dashboard
&lt;/Link&gt;
)
}</p>
<p>Version history</p>
<p>VersionChangesv13.0.0No longer requires a child &lt;a&gt; tag. A codemod is provided to automatically update your codebase.v10.0.0href props pointing to a dynamic route are automatically resolved and no longer require an as prop.v8.0.0Improved prefetching performance.v1.0.0next/link introduced.Was this helpful?</p>
<p>supported.Send</p>
