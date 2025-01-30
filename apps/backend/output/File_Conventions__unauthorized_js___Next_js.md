# File Conventions: unauthorized.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionsunauthorized.jsunauthorized.jsThis feature is currently experimental and subject to change, it's not recommended for production. Try it out and share your feedback on GitHub.The unauthorized file is used to render UI when the unauthorized function is invoked during authentication. Along with allowing you to customize the UI, Next.js will return a 401 status code.
app/unauthorized.tsxTypeScriptJavaScriptTypeScriptimport Login from '@/app/components/Login'</p>
<p>export default function Unauthorized() {
return (
&lt;main&gt;
&lt;h1&gt;401 - Unauthorized&lt;/h1&gt;
&lt;p&gt;Please log in to access this page.&lt;/p&gt;
&lt;Login /&gt;
&lt;/main&gt;
)
}</p>
<p>Reference</p>
<p>Props</p>
<p>unauthorized.js components do not accept any props.
Examples</p>
<p>Displaying login UI to unauthenticated users</p>
<p>You can use unauthorized function to render the unauthorized.js file with a login UI.
app/dashboard/page.tsxTypeScriptJavaScriptTypeScriptimport { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/server'</p>
<p>export default async function DashboardPage() {
const session = await verifySession()</p>
<p>if (!session) {
unauthorized()
}</p>
<p>return &lt;div&gt;Dashboard&lt;/div&gt;
}</p>
<p>app/unauthorized.tsxTypeScriptJavaScriptTypeScriptimport Login from '@/app/components/Login'</p>
<p>export default function UnauthorizedPage() {
return (
&lt;main&gt;
&lt;h1&gt;401 - Unauthorized&lt;/h1&gt;
&lt;p&gt;Please log in to access this page.&lt;/p&gt;
&lt;Login /&gt;
&lt;/main&gt;
)
}</p>
<p>Version History</p>
<p>VersionChangesv15.1.0unauthorized.js introduced.Next StepsunauthorizedAPI Reference for the unauthorized function.Was this helpful?</p>
<p>supported.Send</p>
