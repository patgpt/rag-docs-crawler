# Building Your Application: Authentication | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6App RouterBuilding Your ApplicationAuthenticationAuthenticationUnderstanding authentication is crucial for protecting your application's data. This page will guide you through what React and Next.js features to use to implement auth.
Before starting, it helps to break down the process into three concepts:</p>
<p>Authentication: Verifies if the user is who they say they are. It requires the user to prove their identity with something they have, such as a username and password.
Session Management: Tracks the user's auth state across requests.
Authorization: Decides what routes and data the user can access.</p>
<p>This diagram shows the authentication flow using React and Next.js features:</p>
<p>The examples on this page walk through basic username and password auth for educational purposes. While you can implement a custom auth solution, for increased security and simplicity, we recommend using an authentication library. These offer built-in solutions for authentication, session management, and authorization, as well as additional features such as social logins, multi-factor authentication, and role-based access control. You can find a list in the Auth Libraries section.
Authentication</p>
<p>Sign-up and login functionality</p>
<p>You can use the &lt;form&gt; element with React's Server Actions and useActionState to capture user credentials, validate form fields, and call your Authentication Provider's API or database.Since Server Actions always execute on the server, they provide a secure environment for handling authentication logic.Here are the steps to implement signup/login functionality:1. Capture user credentials</p>
<p>To capture user credentials, create a form that invokes a Server Action on submission. For example, a signup form that accepts the user's name, email, and password:app/ui/signup-form.tsxTypeScriptJavaScriptTypeScriptimport { signup } from '@/app/actions/auth'</p>
<p>export function SignupForm() {
return (
&lt;form action={signup}&gt;
&lt;div&gt;
&lt;label htmlFor=&quot;name&quot;&gt;Name&lt;/label&gt;
&lt;input id=&quot;name&quot; name=&quot;name&quot; placeholder=&quot;Name&quot; /&gt;
&lt;/div&gt;
&lt;div&gt;
&lt;label htmlFor=&quot;email&quot;&gt;Email&lt;/label&gt;
&lt;input id=&quot;email&quot; name=&quot;email&quot; type=&quot;email&quot; placeholder=&quot;Email&quot; /&gt;
&lt;/div&gt;
&lt;div&gt;
&lt;label htmlFor=&quot;password&quot;&gt;Password&lt;/label&gt;
&lt;input id=&quot;password&quot; name=&quot;password&quot; type=&quot;password&quot; /&gt;
&lt;/div&gt;
&lt;button type=&quot;submit&quot;&gt;Sign Up&lt;/button&gt;
&lt;/form&gt;
)
}app/actions/auth.tsTypeScriptJavaScriptTypeScriptexport async function signup(formData: FormData) {}2. Validate form fields on the server</p>
<p>Use the Server Action to validate the form fields on the server. If your authentication provider doesn't provide form validation, you can use a schema validation library like Zod or Yup.Using Zod as an example, you can define a form schema with appropriate error messages:app/lib/definitions.tsTypeScriptJavaScriptTypeScriptimport { z } from 'zod'</p>
<p>export const SignupFormSchema = z.object({
name: z
.string()
.min(2, { message: 'Name must be at least 2 characters long.' })
.trim(),
email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
password: z
.string()
.min(8, { message: 'Be at least 8 characters long' })
.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
.regex(/[0-9]/, { message: 'Contain at least one number.' })
.regex(/[^a-zA-Z0-9]/, {
message: 'Contain at least one special character.',
})
.trim(),
})</p>
<p>export type FormState =
| {
errors?: {
name?: string[]
email?: string[]
password?: string[]
}
message?: string
}
| undefinedTo prevent unnecessary calls to your authentication provider's API or database, you can return early in the Server Action if any form fields do not match the defined schema.app/actions/auth.tsTypeScriptJavaScriptTypeScriptimport { SignupFormSchema, FormState } from '@/app/lib/definitions'</p>
<p>export async function signup(state: FormState, formData: FormData) {
// Validate form fields
const validatedFields = SignupFormSchema.safeParse({
name: formData.get('name'),
email: formData.get('email'),
password: formData.get('password'),
})</p>
<p>// If any form fields are invalid, return early
if (!validatedFields.success) {
return {
errors: validatedFields.error.flatten().fieldErrors,
}
}</p>
<p>// Call the provider or db to create a user...
}Back in your &lt;SignupForm /&gt;, you can use React's useActionState hook to display validation errors while the form is submitting:app/ui/signup-form.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'</p>
<p>export default function SignupForm() {
const [state, action, pending] = useActionState(signup, undefined)</p>
<p>return (
&lt;form action={action}&gt;
&lt;div&gt;
&lt;label htmlFor=&quot;name&quot;&gt;Name&lt;/label&gt;
&lt;input id=&quot;name&quot; name=&quot;name&quot; placeholder=&quot;Name&quot; /&gt;
&lt;/div&gt;
{state?.errors?.name &amp;&amp; &lt;p&gt;{state.errors.name}&lt;/p&gt;}</p>
<pre><code>  &lt;div&gt;
    &lt;label htmlFor=&quot;email&quot;&gt;Email&lt;/label&gt;
    &lt;input id=&quot;email&quot; name=&quot;email&quot; placeholder=&quot;Email&quot; /&gt;
  &lt;/div&gt;
  {state?.errors?.email &amp;&amp; &lt;p&gt;{state.errors.email}&lt;/p&gt;}

  &lt;div&gt;
    &lt;label htmlFor=&quot;password&quot;&gt;Password&lt;/label&gt;
    &lt;input id=&quot;password&quot; name=&quot;password&quot; type=&quot;password&quot; /&gt;
  &lt;/div&gt;
  {state?.errors?.password &amp;&amp; (
    &lt;div&gt;
      &lt;p&gt;Password must:&lt;/p&gt;
      &lt;ul&gt;
        {state.errors.password.map((error) =&gt; (
          &lt;li key={error}&gt;- {error}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  )}
  &lt;button disabled={pending} type=&quot;submit&quot;&gt;
    Sign Up
  &lt;/button&gt;
&lt;/form&gt;
</code></pre>
<p>)
}
Good to know:</p>
<p>In React 19, useFormStatus includes additional keys on the returned object, like data, method, and action. If you are not using React 19, only the pending key is available.
Before mutating data, you should always ensure a user is also authorized to perform the action. See Authentication and Authorization.</p>
<ol start="3">
<li>Create a user or check user credentials</li>
</ol>
<p>After validating form fields, you can create a new user account or check if the user exists by calling your authentication provider's API or database.Continuing from the previous example:app/actions/auth.tsxTypeScriptJavaScriptTypeScriptexport async function signup(state: FormState, formData: FormData) {
// 1. Validate form fields
// ...</p>
<p>// 2. Prepare data for insertion into database
const { name, email, password } = validatedFields.data
// e.g. Hash the user's password before storing it
const hashedPassword = await bcrypt.hash(password, 10)</p>
<p>// 3. Insert the user into the database or call an Auth Library's API
const data = await db
.insert(users)
.values({
name,
email,
password: hashedPassword,
})
.returning({ id: users.id })</p>
<p>const user = data[0]</p>
<p>if (!user) {
return {
message: 'An error occurred while creating your account.',
}
}</p>
<p>// TODO:
// 4. Create user session
// 5. Redirect user
}After successfully creating the user account or verifying the user credentials, you can create a session to manage the user's auth state. Depending on your session management strategy, the session can be stored in a cookie or database, or both. Continue to the Session Management section to learn more.
Tips:</p>
<p>The example above is verbose since it breaks down the authentication steps for the purpose of education. This highlights that implementing your own secure solution can quickly become complex. Consider using an Auth Library to simplify the process.
To improve the user experience, you may want to check for duplicate emails or usernames earlier in the registration flow. For example, as the user types in a username or the input field loses focus. This can help prevent unnecessary form submissions and provide immediate feedback to the user. You can debounce requests with libraries such as use-debounce to manage the frequency of these checks.</p>
<p>Session Management</p>
<p>Session management ensures that the user's authenticated state is preserved across requests. It involves creating, storing, refreshing, and deleting sessions or tokens.
There are two types of sessions:</p>
<p>Stateless: Session data (or a token) is stored in the browser's cookies. The cookie is sent with each request, allowing the session to be verified on the server. This method is simpler, but can be less secure if not implemented correctly.
Database: Session data is stored in a database, with the user's browser only receiving the encrypted session ID. This method is more secure, but can be complex and use more server resources.</p>
<p>Good to know: While you can use either method, or both, we recommend using a session management library such as iron-session or Jose.</p>
<p>Stateless Sessions</p>
<p>To create and manage stateless sessions, there are a few steps you need to follow:
Generate a secret key, which will be used to sign your session, and store it as an environment variable.
Write logic to encrypt/decrypt session data using a session management library.
Manage cookies using the Next.js cookies API.
In addition to the above, consider adding functionality to update (or refresh) the session when the user returns to the application, and delete the session when the user logs out.
Good to know: Check if your auth library includes session management.</p>
<ol>
<li>Generating a secret key</li>
</ol>
<p>There are a few ways you can generate secret key to sign your session. For example, you may choose to use the openssl command in your terminal:terminalopenssl rand -base64 32This command generates a 32-character random string that you can use as your secret key and store in your environment variables file:.envSESSION_SECRET=your_secret_keyYou can then reference this key in your session management logic:app/lib/session.jsconst secretKey = process.env.SESSION_SECRET2. Encrypting and decrypting sessions</p>
<p>Next, you can use your preferred session management library to encrypt and decrypt sessions. Continuing from the previous example, we'll use Jose (compatible with the Edge Runtime) and React's server-only package to ensure that your session management logic is only executed on the server.app/lib/session.tsTypeScriptJavaScriptTypeScriptimport 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/app/lib/definitions'</p>
<p>const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)</p>
<p>export async function encrypt(payload: SessionPayload) {
return new SignJWT(payload)
.setProtectedHeader({ alg: 'HS256' })
.setIssuedAt()
.setExpirationTime('7d')
.sign(encodedKey)
}</p>
<p>export async function decrypt(session: string | undefined = '') {
try {
const { payload } = await jwtVerify(session, encodedKey, {
algorithms: ['HS256'],
})
return payload
} catch (error) {
console.log('Failed to verify session')
}
}
Tips:</p>
<p>The payload should contain the minimum, unique user data that'll be used in subsequent requests, such as the user's ID, role, etc. It should not contain personally identifiable information like phone number, email address, credit card information, etc, or sensitive data like passwords.</p>
<ol start="3">
<li>Setting cookies (recommended options)</li>
</ol>
<p>To store the session in a cookie, use the Next.js cookies API. The cookie should be set on the server, and include the recommended options:
HttpOnly: Prevents client-side JavaScript from accessing the cookie.
Secure: Use https to send the cookie.
SameSite: Specify whether the cookie can be sent with cross-site requests.
Max-Age or Expires: Delete the cookie after a certain period.
Path: Define the URL path for the cookie.
Please refer to MDN for more information on each of these options.app/lib/session.tsTypeScriptJavaScriptTypeScriptimport 'server-only'
import { cookies } from 'next/headers'</p>
<p>export async function createSession(userId: string) {
const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
const session = await encrypt({ userId, expiresAt })
const cookieStore = await cookies()</p>
<p>cookieStore.set('session', session, {
httpOnly: true,
secure: true,
expires: expiresAt,
sameSite: 'lax',
path: '/',
})
}Back in your Server Action, you can invoke the createSession() function, and use the redirect() API to redirect the user to the appropriate page:app/actions/auth.tsTypeScriptJavaScriptTypeScriptimport { createSession } from '@/app/lib/session'</p>
<p>export async function signup(state: FormState, formData: FormData) {
// Previous steps:
// 1. Validate form fields
// 2. Prepare data for insertion into database
// 3. Insert the user into the database or call an Library API</p>
<p>// Current steps:
// 4. Create user session
await createSession(user.id)
// 5. Redirect user
redirect('/profile')
}
Tips:</p>
<p>Cookies should be set on the server to prevent client-side tampering.
🎥 Watch: Learn more about stateless sessions and authentication with Next.js → YouTube (11 minutes).</p>
<p>Updating (or refreshing) sessions</p>
<p>You can also extend the session's expiration time. This is useful for keeping the user logged in after they access the application again. For example:app/lib/session.tsTypeScriptJavaScriptTypeScriptimport 'server-only'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'</p>
<p>export async function updateSession() {
const session = (await cookies()).get('session')?.value
const payload = await decrypt(session)</p>
<p>if (!session || !payload) {
return null
}</p>
<p>const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)</p>
<p>const cookieStore = await cookies()
cookieStore.set('session', session, {
httpOnly: true,
secure: true,
expires: expires,
sameSite: 'lax',
path: '/',
})
}
Tip: Check if your auth library supports refresh tokens, which can be used to extend the user's session.
Deleting the session</p>
<p>To delete the session, you can delete the cookie:app/lib/session.tsTypeScriptJavaScriptTypeScriptimport 'server-only'
import { cookies } from 'next/headers'</p>
<p>export async function deleteSession() {
const cookieStore = await cookies()
cookieStore.delete('session')
}Then you can reuse the deleteSession() function in your application, for example, on logout:app/actions/auth.tsTypeScriptJavaScriptTypeScriptimport { cookies } from 'next/headers'
import { deleteSession } from '@/app/lib/session'</p>
<p>export async function logout() {
deleteSession()
redirect('/login')
}</p>
<p>Database Sessions</p>
<p>To create and manage database sessions, you'll need to follow these steps:</p>
<p>Create a table in your database to store session and data (or check if your Auth Library handles this).
Implement functionality to insert, update, and delete sessions
Encrypt the session ID before storing it in the user's browser, and ensure the database and cookie stay in sync (this is optional, but recommended for optimistic auth checks in Middleware).</p>
<p>For example:app/lib/session.tsTypeScriptJavaScriptTypeScriptimport cookies from 'next/headers'
import { db } from '@/app/lib/db'
import { encrypt } from '@/app/lib/session'</p>
<p>export async function createSession(id: number) {
const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)</p>
<p>// 1. Create a session in the database
const data = await db
.insert(sessions)
.values({
userId: id,
expiresAt,
})
// Return the session ID
.returning({ id: sessions.id })</p>
<p>const sessionId = data[0].id</p>
<p>// 2. Encrypt the session ID
const session = await encrypt({ sessionId, expiresAt })</p>
<p>// 3. Store the session in cookies for optimistic auth checks
const cookieStore = await cookies()
cookieStore.set('session', session, {
httpOnly: true,
secure: true,
expires: expiresAt,
sameSite: 'lax',
path: '/',
})
}
Tips:</p>
<p>For faster data retrieval, consider using a database like Vercel Redis. However, you can also keep the session data in your primary database, and combine data requests to reduce the number of queries.
You may opt to use database sessions for more advanced use cases, such as keeping track of the last time a user logged in, or number of active devices, or give users the ability to log out of all devices.</p>
<p>After implementing session management, you'll need to add authorization logic to control what users can access and do within your application. Continue to the Authorization section to learn more.</p>
<p>Authorization</p>
<p>Once a user is authenticated and a session is created, you can implement authorization to control what the user can access and do within your application.
There are two main types of authorization checks:</p>
<p>Optimistic: Checks if the user is authorized to access a route or perform an action using the session data stored in the cookie. These checks are useful for quick operations, such as showing/hiding UI elements or redirecting users based on permissions or roles.
Secure: Checks if the user is authorized to access a route or perform an action using the session data stored in the database. These checks are more secure and are used for operations that require access to sensitive data or actions.</p>
<p>For both cases, we recommend:</p>
<p>Creating a Data Access Layer to centralize your authorization logic
Using Data Transfer Objects (DTO) to only return the necessary data
Optionally use Middleware to perform optimistic checks.</p>
<p>Optimistic checks with Middleware (Optional)</p>
<p>There are some cases where you may want to use Middleware and redirect users based on permissions:</p>
<p>To perform optimistic checks. Since Middleware runs on every route, it's a good way to centralize redirect logic and pre-filter unauthorized users.
To protect static routes that share data between users (e.g. content behind a paywall).</p>
<p>However, since Middleware runs on every route, including prefetched routes, it's important to only read the session from the cookie (optimistic checks), and avoid database checks to prevent performance issues.
For example:
middleware.tsTypeScriptJavaScriptTypeScriptimport { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'</p>
<p>// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']</p>
<p>export default async function middleware(req: NextRequest) {
// 2. Check if the current route is protected or public
const path = req.nextUrl.pathname
const isProtectedRoute = protectedRoutes.includes(path)
const isPublicRoute = publicRoutes.includes(path)</p>
<p>// 3. Decrypt the session from the cookie
const cookie = (await cookies()).get('session')?.value
const session = await decrypt(cookie)</p>
<p>// 4. Redirect to /login if the user is not authenticated
if (isProtectedRoute &amp;&amp; !session?.userId) {
return NextResponse.redirect(new URL('/login', req.nextUrl))
}</p>
<p>// 5. Redirect to /dashboard if the user is authenticated
if (
isPublicRoute &amp;&amp;
session?.userId &amp;&amp;
!req.nextUrl.pathname.startsWith('/dashboard')
) {
return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
}</p>
<p>return NextResponse.next()
}</p>
<p>// Routes Middleware should not run on
export const config = {
matcher: ['/((?!api|_next/static|_next/image|.<em>\.png$).</em>)'],
}</p>
<p>While Middleware can be useful for initial checks, it should not be your only line of defense in protecting your data. The majority of security checks should be performed as close as possible to your data source, see Data Access Layer for more information.</p>
<p>Tips:</p>
<p>In Middleware, you can also read cookies using req.cookies.get('session').value.
Middleware uses the Edge Runtime, check if your Auth library and session management library are compatible.
You can use the matcher property in the Middleware to specify which routes Middleware should run on. Although, for auth, it's recommended Middleware runs on all routes.</p>
<p>Creating a Data Access Layer (DAL)</p>
<p>We recommend creating a DAL to centralize your data requests and authorization logic.The DAL should include a function that verifies the user's session as they interact with your application. At the very least, the function should check if the session is valid, then redirect or return the user information needed to make further requests.For example, create a separate file for your DAL that includes a verifySession() function. Then use React's cache API to memoize the return value of the function during a React render pass:app/lib/dal.tsTypeScriptJavaScriptTypeScriptimport 'server-only'</p>
<p>import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'</p>
<p>export const verifySession = cache(async () =&gt; {
const cookie = (await cookies()).get('session')?.value
const session = await decrypt(cookie)</p>
<p>if (!session?.userId) {
redirect('/login')
}</p>
<p>return { isAuth: true, userId: session.userId }
})You can then invoke the verifySession() function in your data requests, Server Actions, Route Handlers:app/lib/dal.tsTypeScriptJavaScriptTypeScriptexport const getUser = cache(async () =&gt; {
const session = await verifySession()
if (!session) return null</p>
<p>try {
const data = await db.query.users.findMany({
where: eq(users.id, session.userId),
// Explicitly return the columns you need rather than the whole user object
columns: {
id: true,
name: true,
email: true,
},
})</p>
<pre><code>const user = data[0]

return user
</code></pre>
<p>} catch (error) {
console.log('Failed to fetch user')
return null
}
})
Tip:</p>
<p>A DAL can be used to protect data fetched at request time. However, for static routes that share data between users, data will be fetched at build time and not at request time. Use Middleware to protect static routes.
For secure checks, you can check if the session is valid by comparing the session ID with your database. Use React's cache function to avoid unnecessary duplicate requests to the database during a render pass.
You may wish to consolidate related data requests in a JavaScript class that runs verifySession() before any methods.</p>
<p>Using Data Transfer Objects (DTO)</p>
<p>When retrieving data, it's recommended you return only the necessary data that will be used in your application, and not entire objects. For example, if you're fetching user data, you might only return the user's ID and name, rather than the entire user object which could contain passwords, phone numbers, etc.However, if you have no control over the returned data structure, or are working in a team where you want to avoid whole objects being passed to the client, you can use strategies such as specifying what fields are safe to be exposed to the client.app/lib/dto.tsTypeScriptJavaScriptTypeScriptimport 'server-only'
import { getUser } from '@/app/lib/dal'</p>
<p>function canSeeUsername(viewer: User) {
return true
}</p>
<p>function canSeePhoneNumber(viewer: User, team: string) {
return viewer.isAdmin || team === viewer.team
}</p>
<p>export async function getProfileDTO(slug: string) {
const data = await db.query.users.findMany({
where: eq(users.slug, slug),
// Return specific columns here
})
const user = data[0]</p>
<p>const currentUser = await getUser(user.id)</p>
<p>// Or return only what's specific to the query here
return {
username: canSeeUsername(currentUser) ? user.username : null,
phonenumber: canSeePhoneNumber(currentUser, user.team)
? user.phonenumber
: null,
}
}By centralizing your data requests and authorization logic in a DAL and using DTOs, you can ensure that all data requests are secure and consistent, making it easier to maintain, audit, and debug as your application scales.
Good to know:</p>
<p>There are a couple of different ways you can define a DTO, from using toJSON(), to individual functions like the example above, or JS classes. Since these are JavaScript patterns and not a React or Next.js feature, we recommend doing some research to find the best pattern for your application.
Learn more about security best practices in our Security in Next.js article.</p>
<p>Server Components</p>
<p>Auth check in Server Components are useful for role-based access. For example, to conditionally render components based on the user's role:app/dashboard/page.tsxTypeScriptJavaScriptTypeScriptimport { verifySession } from '@/app/lib/dal'</p>
<p>export default function Dashboard() {
const session = await verifySession()
const userRole = session?.user?.role // Assuming 'role' is part of the session object</p>
<p>if (userRole === 'admin') {
return &lt;AdminDashboard /&gt;
} else if (userRole === 'user') {
return &lt;UserDashboard /&gt;
} else {
redirect('/login')
}
}In the example, we use the verifySession() function from our DAL to check for 'admin', 'user', and unauthorized roles. This pattern ensures that each user interacts only with components appropriate to their role.Layouts and auth checks</p>
<p>Due to Partial Rendering, be cautious when doing checks in Layouts as these don't re-render on navigation, meaning the user session won't be checked on every route change.Instead, you should do the checks close to your data source or the component that'll be conditionally rendered.For example, consider a shared layout that fetches the user data and displays the user image in a nav. Instead of doing the auth check in the layout, you should fetch the user data (getUser()) in the layout and do the auth check in your DAL.This guarantees that wherever getUser() is called within your application, the auth check is performed, and prevents developers forgetting to check the user is authorized to access the data.app/layout.tsxTypeScriptJavaScriptTypeScriptexport default async function Layout({
children,
}: {
children: React.ReactNode;
}) {
const user = await getUser();</p>
<p>return (
// ...
)
}app/lib/dal.tsTypeScriptJavaScriptTypeScriptexport const getUser = cache(async () =&gt; {
const session = await verifySession()
if (!session) return null</p>
<p>// Get user ID from session and fetch data
})
Good to know:</p>
<p>A common pattern in SPAs is to return null in a layout or a top-level component if a user is not authorized. This pattern is not recommended since Next.js applications have multiple entry points, which will not prevent nested route segments and Server Actions from being accessed.</p>
<p>Server Actions</p>
<p>Treat Server Actions with the same security considerations as public-facing API endpoints, and verify if the user is allowed to perform a mutation.In the example below, we check the user's role before allowing the action to proceed:app/lib/actions.tsTypeScriptJavaScriptTypeScript'use server'
import { verifySession } from '@/app/lib/dal'</p>
<p>export async function serverAction(formData: FormData) {
const session = await verifySession()
const userRole = session?.user?.role</p>
<p>// Return early if user is not authorized to perform the action
if (userRole !== 'admin') {
return null
}</p>
<p>// Proceed with the action for authorized users
}Route Handlers</p>
<p>Treat Route Handlers with the same security considerations as public-facing API endpoints, and verify if the user is allowed to access the Route Handler.For example:app/api/route.tsTypeScriptJavaScriptTypeScriptimport { verifySession } from '@/app/lib/dal'</p>
<p>export async function GET() {
// User authentication and role verification
const session = await verifySession()</p>
<p>// Check if the user is authenticated
if (!session) {
// User is not authenticated
return new Response(null, { status: 401 })
}</p>
<p>// Check if the user has the 'admin' role
if (session.user.role !== 'admin') {
// User is authenticated but does not have the right permissions
return new Response(null, { status: 403 })
}</p>
<p>// Continue for authorized users
}The example above demonstrates a Route Handler with a two-tier security check. It first checks for an active session, and then verifies if the logged-in user is an 'admin'.Context Providers</p>
<p>Using context providers for auth works due to interleaving. However, React context is not supported in Server Components, making them only applicable to Client Components.This works, but any child Server Components will be rendered on the server first, and will not have access to the context provider’s session data:app/layout.tsTypeScriptJavaScriptTypeScriptimport { ContextProvider } from 'auth-lib'</p>
<p>export default function RootLayout({ children }) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;body&gt;
&lt;ContextProvider&gt;{children}&lt;/ContextProvider&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}&quot;use client&quot;;</p>
<p>import { useSession } from &quot;auth-lib&quot;;</p>
<p>export default function Profile() {
const { userId } = useSession();
const { data } = useSWR(<code>/api/user/${userId}</code>, fetcher)</p>
<p>return (
// ...
);
}If session data is needed in Client Components (e.g. for client-side data fetching), use React’s taintUniqueValue API to prevent sensitive session data from being exposed to the client.</p>
<p>Resources</p>
<p>Now that you've learned about authentication in Next.js, here are Next.js-compatible libraries and resources to help you implement secure authentication and session management:
Auth Libraries</p>
<p>Auth0
Clerk
Kinde
NextAuth.js
Ory
Stack Auth
Supabase
Stytch
WorkOS</p>
<p>Session Management Libraries</p>
<p>Iron Session
Jose</p>
<p>Further Reading</p>
<p>To continue learning about authentication and security, check out the following resources:</p>
<p>How to think about security in Next.js
Understanding XSS Attacks
Understanding CSRF Attacks
The Copenhagen Book
Was this helpful?</p>
<p>supported.Send</p>
