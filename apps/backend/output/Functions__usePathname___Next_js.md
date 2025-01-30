# Functions: usePathname | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsusePathnameusePathnameusePathname is a Client Component hook that lets you read the current URL's pathname.
app/example-client-component.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { usePathname } from 'next/navigation'</p>
<p>export default function ExampleClientComponent() {
const pathname = usePathname()
return &lt;p&gt;Current pathname: {pathname}&lt;/p&gt;
}</p>
<p>usePathname intentionally requires using a Client Component. It's important to note Client Components are not a de-optimization. They are an integral part of the Server Components architecture.
For example, a Client Component with usePathname will be rendered into HTML on the initial page load. When navigating to a new route, this component does not need to be re-fetched. Instead, the component is downloaded once (in the client JavaScript bundle), and re-renders based on the current state.</p>
<p>Good to know:</p>
<p>Reading the current URL from a Server Component is not supported. This design is intentional to support layout state being preserved across page navigations.
Compatibility mode:</p>
<p>usePathname can return null when a fallback route is being rendered or when a pages directory page has been automatically statically optimized by Next.js and the router is not ready.
When using usePathname with rewrites in next.config or Middleware, useState and useEffect must also be used in order to avoid hydration mismatch errors. See the rewrites example for more information.
Next.js will automatically update your types if it detects both an app and pages directory in your project.</p>
<p>Parameters</p>
<p>const pathname = usePathname()
usePathname does not take any parameters.
Returns</p>
<p>usePathname returns a string of the current URL's pathname. For example:
URLReturned value/'/'/dashboard'/dashboard'/dashboard?v=2'/dashboard'/blog/hello-world'/blog/hello-world'
Examples</p>
<p>Do something in response to a route change</p>
<p>app/example-client-component.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { usePathname, useSearchParams } from 'next/navigation'</p>
<p>function ExampleClientComponent() {
const pathname = usePathname()
const searchParams = useSearchParams()
useEffect(() =&gt; {
// Do something here...
}, [pathname, searchParams])
}</p>
<p>VersionChangesv13.0.0usePathname introduced.Was this helpful?</p>
<p>supported.Send</p>
