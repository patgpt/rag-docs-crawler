# File Conventions: default.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionsdefault.jsdefault.jsThe default.js file is used to render a fallback within Parallel Routes when Next.js cannot recover a slot's active state after a full-page load.
During soft navigation, Next.js keeps track of the active state (subpage) for each slot. However, for hard navigations (full-page load), Next.js cannot recover the active state. In this case, a default.js file can be rendered for subpages that don't match the current URL.
Consider the following folder structure. The @team slot has a settings page, but @analytics does not.</p>
<p>When navigating to /settings, the @team slot will render the settings page while maintaining the currently active page for the @analytics slot.
On refresh, Next.js will render a default.js for @analytics. If default.js doesn't exist, a 404 is rendered instead.
Additionally, since children is an implicit slot, you also need to create a default.js file to render a fallback for children when Next.js cannot recover the active state of the parent page.
Reference</p>
<p>params (optional)</p>
<p>A promise that resolves to an object containing the dynamic route parameters from the root segment down to the slot's subpages. For example:
app/[artist]/@sidebar/default.jsTypeScriptJavaScriptTypeScriptexport default async function Default({
params,
}: {
params: Promise&lt;{ artist: string }&gt;
}) {
const artist = (await params).artist
}</p>
<p>ExampleURLparamsapp/[artist]/@sidebar/default.js/zackPromise&lt;{ artist: 'zack' }&gt;app/[artist]/[album]/@sidebar/default.js/zack/nextPromise&lt;{ artist: 'zack', album: 'next' }&gt;</p>
<p>Since the params prop is a promise. You must use async/await or React's use function to access the values.</p>
<p>In version 14 and earlier, params was a synchronous prop. To help with backwards compatibility, you can still access it synchronously in Next.js 15, but this behavior will be deprecated in the future.</p>
<p>Learn more about Parallel RoutesParallel RoutesSimultaneously render one or more pages in the same view that can be navigated independently. A pattern for highly dynamic applications.Was this helpful?</p>
<p>supported.Send</p>
