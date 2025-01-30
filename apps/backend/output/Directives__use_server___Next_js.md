# Directives: use server | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceDirectivesuse serveruse serverThe use server directive designates a function or file to be executed on the server side. It can be used at the top of a file to indicate that all functions in the file are server-side, or inline at the top of a function to mark the function as a Server Function. This is a React feature.
Using use server at the top of a file</p>
<p>The following example shows a file with a use server directive at the top. All functions in the file are executed on the server.
app/actions.tsTypeScriptJavaScriptTypeScript'use server'
import { db } from '@/lib/db' // Your database client</p>
<p>export async function createUser(data: { name: string; email: string }) {
const user = await db.user.create({ data })
return user
}</p>
<p>Using Server Functions in a Client Component</p>
<p>To use Server Functions in Client Components you need to create your Server Functions in a dedicated file using the use server directive at the top of the file. These Server Functions can then be imported into Client and Server Components and executed.
Assuming you have a fetchUsers Server Function in actions.ts:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'
import { db } from '@/lib/db' // Your database client</p>
<p>export async function fetchUsers() {
const users = await db.user.findMany()
return users
}</p>
<p>Then you can import the fetchUsers Server Function into a Client Component and execute it on the client-side.
app/components/my-button.tsxTypeScriptJavaScriptTypeScript'use client'
import { fetchUsers } from '../actions'</p>
<p>export default function MyButton() {
return &lt;button onClick={() =&gt; fetchUsers()}&gt;Fetch Users&lt;/button&gt;
}</p>
<p>Using use server inline</p>
<p>In the following example, use server is used inline at the top of a function to mark it as a Server Function:
app/page.tsxTypeScriptJavaScriptTypeScriptimport { db } from '@/lib/db' // Your database client</p>
<p>export default function UserList() {
async function fetchUsers() {
'use server'
const users = await db.user.findMany()
return users
}</p>
<p>return &lt;button onClick={() =&gt; fetchUsers()}&gt;Fetch Users&lt;/button&gt;
}</p>
<p>Security considerations</p>
<p>When using the use server directive, it's important to ensure that all server-side logic is secure and that sensitive data remains protected.
Authentication and authorization</p>
<p>Always authenticate and authorize users before performing sensitive server-side operations.
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { db } from '@/lib/db' // Your database client
import { authenticate } from '@/lib/auth' // Your authentication library</p>
<p>export async function createUser(
data: { name: string; email: string },
token: string
) {
const user = authenticate(token)
if (!user) {
throw new Error('Unauthorized')
}
const newUser = await db.user.create({ data })
return newUser
}</p>
<p>Reference</p>
<p>See the React documentation for more information on use server.Was this helpful?</p>
<p>supported.Send</p>
