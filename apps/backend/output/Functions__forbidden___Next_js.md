# Functions: forbidden | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsforbiddenforbiddenThis feature is currently experimental and subject to change, it's not recommended for production. Try it out and share your feedback on GitHub.The forbidden function throws an error that renders a Next.js 403 error page. It's useful for handling authorization errors in your application. You can customize the UI using the forbidden.js file.
To start using forbidden, enable the experimental authInterrupts configuration option in your next.config.js file:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
authInterrupts: true,
},
}</p>
<p>export default nextConfig</p>
<p>forbidden can be invoked in Server Components, Server Actions, and Route Handlers.
app/auth/page.tsxTypeScriptJavaScriptTypeScriptimport { verifySession } from '@/app/lib/dal'
import { forbidden } from 'next/navigation'</p>
<p>export default async function AdminPage() {
const session = await verifySession()</p>
<p>// Check if the user has the 'admin' role
if (session.role !== 'admin') {
forbidden()
}</p>
<p>// Render the admin page for authorized users
return &lt;&gt;&lt;/&gt;
}</p>
<p>Good to know</p>
<p>The forbidden function cannot be called in the root layout.</p>
<p>Examples</p>
<p>Role-based route protection</p>
<p>You can use forbidden to restrict access to certain routes based on user roles. This ensures that users who are authenticated but lack the required permissions cannot access the route.
app/admin/page.tsxTypeScriptJavaScriptTypeScriptimport { verifySession } from '@/app/lib/dal'
import { forbidden } from 'next/navigation'</p>
<p>export default async function AdminPage() {
const session = await verifySession()</p>
<p>// Check if the user has the 'admin' role
if (session.role !== 'admin') {
forbidden()
}</p>
<p>// Render the admin page for authorized users
return (
&lt;main&gt;
&lt;h1&gt;Admin Dashboard&lt;/h1&gt;
&lt;p&gt;Welcome, {session.user.name}!&lt;/p&gt;
&lt;/main&gt;
)
}</p>
<p>Mutations with Server Actions</p>
<p>When implementing mutations in Server Actions, you can use forbidden to only allow users with a specific role to update sensitive data.
app/actions/update-role.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { verifySession } from '@/app/lib/dal'
import { forbidden } from 'next/navigation'
import db from '@/app/lib/db'</p>
<p>export async function updateRole(formData: FormData) {
const session = await verifySession()</p>
<p>// Ensure only admins can update roles
if (session.role !== 'admin') {
forbidden()
}</p>
<p>// Perform the role update for authorized users
// ...
}</p>
<p>Version History</p>
<p>VersionChangesv15.1.0forbidden introduced.Next Stepsforbidden.jsAPI reference for the forbidden.js special file.Was this helpful?</p>
<p>supported.Send</p>
