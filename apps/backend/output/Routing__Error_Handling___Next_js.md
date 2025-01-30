# Routing: Error Handling | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRoutingError HandlingError HandlingErrors can be divided into two categories: expected errors and uncaught exceptions:</p>
<p>Model expected errors as return values: Avoid using try/catch for expected errors in Server Actions. Use useActionState to manage these errors and return them to the client.
Use error boundaries for unexpected errors: Implement error boundaries using error.tsx and global-error.tsx files to handle unexpected errors and provide a fallback UI.</p>
<p>Handling Expected Errors</p>
<p>Expected errors are those that can occur during the normal operation of the application, such as those from server-side form validation or failed requests. These errors should be handled explicitly and returned to the client.
Handling Expected Errors from Server Actions</p>
<p>Use the useActionState hook to manage the state of Server Actions, including handling errors. This approach avoids try/catch blocks for expected errors, which should be modeled as return values rather than thrown exceptions.
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { redirect } from 'next/navigation'</p>
<p>export async function createUser(prevState: any, formData: FormData) {
const res = await fetch('https://...')
const json = await res.json()</p>
<p>if (!res.ok) {
return { message: 'Please enter a valid email' }
}</p>
<p>redirect('/dashboard')
}</p>
<p>Then, you can pass your action to the useActionState hook and use the returned state to display an error message.
app/ui/signup.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useActionState } from 'react'
import { createUser } from '@/app/actions'</p>
<p>const initialState = {
message: '',
}</p>
<p>export function Signup() {
const [state, formAction, pending] = useActionState(createUser, initialState)</p>
<p>return (
&lt;form action={formAction}&gt;
&lt;label htmlFor=&quot;email&quot;&gt;Email&lt;/label&gt;
&lt;input type=&quot;text&quot; id=&quot;email&quot; name=&quot;email&quot; required /&gt;
{/* ... */}
&lt;p aria-live=&quot;polite&quot;&gt;{state?.message}&lt;/p&gt;
&lt;button disabled={pending}&gt;Sign up&lt;/button&gt;
&lt;/form&gt;
)
}</p>
<p>You could also use the returned state to display a toast message from the client component.
Handling Expected Errors from Server Components</p>
<p>When fetching data inside of a Server Component, you can use the response to conditionally render an error message or redirect.
app/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page() {
const res = await fetch(<code>https://...</code>)
const data = await res.json()</p>
<p>if (!res.ok) {
return 'There was an error.'
}</p>
<p>return '...'
}</p>
<p>Uncaught Exceptions</p>
<p>Uncaught exceptions are unexpected errors that indicate bugs or issues that should not occur during the normal flow of your application. These should be handled by throwing errors, which will then be caught by error boundaries.</p>
<p>Common: Handle uncaught errors below the root layout with error.js.
Optional: Handle granular uncaught errors with nested error.js files (e.g. app/dashboard/error.js)
Uncommon: Handle uncaught errors in the root layout with global-error.js.</p>
<p>Using Error Boundaries</p>
<p>Next.js uses error boundaries to handle uncaught exceptions. Error boundaries catch errors in their child components and display a fallback UI instead of the component tree that crashed.
Create an error boundary by adding an error.tsx file inside a route segment and exporting a React component:
app/dashboard/error.tsxTypeScriptJavaScriptTypeScript'use client' // Error boundaries must be Client Components</p>
<p>import { useEffect } from 'react'</p>
<p>export default function Error({
error,
reset,
}: {
error: Error &amp; { digest?: string }
reset: () =&gt; void
}) {
useEffect(() =&gt; {
// Log the error to an error reporting service
console.error(error)
}, [error])</p>
<p>return (
&lt;div&gt;
&lt;h2&gt;Something went wrong!&lt;/h2&gt;
&lt;button
onClick={
// Attempt to recover by trying to re-render the segment
() =&gt; reset()
}
&gt;
Try again
&lt;/button&gt;
&lt;/div&gt;
)
}</p>
<p>If you want errors to bubble up to the parent error boundary, you can throw when rendering the error component.
Handling Errors in Nested Routes</p>
<p>Errors will bubble up to the nearest parent error boundary. This allows for granular error handling by placing error.tsx files at different levels in the route hierarchy.</p>
<p>Handling Global Errors</p>
<p>While less common, you can handle errors in the root layout using app/global-error.js, located in the root app directory, even when leveraging internationalization. Global error UI must define its own &lt;html&gt; and &lt;body&gt; tags, since it is replacing the root layout or template when active.
app/global-error.tsxTypeScriptJavaScriptTypeScript'use client' // Error boundaries must be Client Components</p>
<p>export default function GlobalError({
error,
reset,
}: {
error: Error &amp; { digest?: string }
reset: () =&gt; void
}) {
return (
// global-error must include html and body tags
&lt;html&gt;
&lt;body&gt;
&lt;h2&gt;Something went wrong!&lt;/h2&gt;
&lt;button onClick={() =&gt; reset()}&gt;Try again&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}
Next Stepserror.jsAPI reference for the error.js special file.Was this helpful?</p>
<p>supported.Send</p>
