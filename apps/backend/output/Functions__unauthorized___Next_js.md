# Functions: unauthorized | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsunauthorizedunauthorizedThis feature is currently experimental and subject to change, it's not recommended for production. Try it out and share your feedback on GitHub.The unauthorized function throws an error that renders a Next.js 401 error page. It's useful for handling authorization errors in your application. You can customize the UI using the unauthorized.js file.
To start using unauthorized, enable the experimental authInterrupts configuration option in your next.config.js file:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
authInterrupts: true,
},
}</p>
<p>export default nextConfig</p>
<p>unauthorized can be invoked in Server Components, Server Actions, and Route Handlers.
app/dashboard/page.tsxTypeScriptJavaScriptTypeScriptimport { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'</p>
<p>export default async function DashboardPage() {
const session = await verifySession()</p>
<p>if (!session) {
unauthorized()
}</p>
<p>// Render the dashboard for authenticated users
return (
&lt;main&gt;
&lt;h1&gt;Welcome to the Dashboard&lt;/h1&gt;
&lt;p&gt;Hi, {session.user.name}.&lt;/p&gt;
&lt;/main&gt;
)
}</p>
<p>Good to know</p>
<p>The unauthorized function cannot be called in the root layout.</p>
<p>Examples</p>
<p>Displaying login UI to unauthenticated users</p>
<p>You can use unauthorized function to display the unauthorized.js file with a login UI.
app/dashboard/page.tsxTypeScriptJavaScriptTypeScriptimport { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'</p>
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
<p>Mutations with Server Actions</p>
<p>You can invoke unauthorized in Server Actions to ensure only authenticated users can perform specific mutations.
app/actions/update-profile.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'
import db from '@/app/lib/db'</p>
<p>export async function updateProfile(data: FormData) {
const session = await verifySession()</p>
<p>// If the user is not authenticated, return a 401
if (!session) {
unauthorized()
}</p>
<p>// Proceed with mutation
// ...
}</p>
<p>Fetching data with Route Handlers</p>
<p>You can use unauthorized in Route Handlers to ensure only authenticated users can access the endpoint.
app/api/profile/route.tsTypeScriptJavaScriptTypeScriptimport { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'</p>
<p>export async function GET(req: NextRequest): Promise&lt;NextResponse&gt; {
// Verify the user's session
const session = await verifySession()</p>
<p>// If no session exists, return a 401 and render unauthorized.tsx
if (!session) {
unauthorized()
}</p>
<p>// Fetch data
// ...
}</p>
<p>Version History</p>
<p>VersionChangesv15.1.0unauthorized introduced.Next Stepsunauthorized.jsAPI reference for the unauthorized.js special file.Was this helpful?</p>
<p>supported.Send</p>
