# Getting Started: Error Handling | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6App RouterGetting StartedError HandlingHow to handle errorsErrors can be divided into two categories: expected errors and uncaught exceptions. This page will walk you through how you can handle these errors in your Next.js application.
Handling expected errors</p>
<p>Expected errors are those that can occur during the normal operation of the application, such as those from server-side form validation or failed requests. These errors should be handled explicitly and returned to the client.
Server Actions</p>
<p>You can use the useActionState hook to manage the state of Server Functions and handle expected errors. Avoid using try/catch blocks for expected errors. Instead, you can model expected errors as return values, not as thrown exceptions.
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>export async function createPost(prevState: any, formData: FormData) {
const title = formData.get('title')
const content = formData.get('content')</p>
<p>const res = await fetch('https://api.vercel.app/posts', {
method: 'POST',
body: { title, content },
})
const json = await res.json()</p>
<p>if (!res.ok) {
return { message: 'Failed to create post' }
}
}</p>
<p>Then, you can pass your action to the useActionState hook and use the returned state to display an error message.
app/ui/form.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useActionState } from 'react'
import { createPost } from '@/app/actions'</p>
<p>const initialState = {
message: '',
}</p>
<p>export function Form() {
const [state, formAction, pending] = useActionState(createPost, initialState)</p>
<p>return (
&lt;form action={formAction}&gt;
&lt;label htmlFor=&quot;title&quot;&gt;Title&lt;/label&gt;
&lt;input type=&quot;text&quot; id=&quot;title&quot; name=&quot;title&quot; required /&gt;
&lt;label htmlFor=&quot;content&quot;&gt;Content&lt;/label&gt;
&lt;textarea id=&quot;content&quot; name=&quot;content&quot; required /&gt;
{state?.message &amp;&amp; &lt;p aria-live=&quot;polite&quot;&gt;{state.message}&lt;/p&gt;}
&lt;button disabled={pending}&gt;Create Post&lt;/button&gt;
&lt;/form&gt;
)
}</p>
<p>Server Components</p>
<p>When fetching data inside of a Server Component, you can use the response to conditionally render an error message or redirect.
app/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page() {
const res = await fetch(<code>https://...</code>)
const data = await res.json()</p>
<p>if (!res.ok) {
return 'There was an error.'
}</p>
<p>return '...'
}</p>
<p>Not found</p>
<p>You can call the notFound function within a route segment and use the not-found.js file to show a 404 UI.
app/blog/[slug]/page.tsxTypeScriptJavaScriptTypeScriptimport { getPostBySlug } from '@/lib/posts'</p>
<p>export default async function Page({ params }: { params: { slug: string } }) {
const post = getPostBySlug((await params).slug)</p>
<p>if (!post) {
notFound()
}</p>
<p>return &lt;div&gt;{post.title}&lt;/div&gt;
}</p>
<p>app/blog/[slug]/not-found.tsxTypeScriptJavaScriptTypeScriptexport default function NotFound() {
return &lt;div&gt;404 - Page Not Found&lt;/div&gt;
}</p>
<p>Handling uncaught exceptions</p>
<p>Uncaught exceptions are unexpected errors that indicate bugs or issues that should not occur during the normal flow of your application. These should be handled by throwing errors, which will then be caught by error boundaries.
Nested error boundaries</p>
<p>Next.js uses error boundaries to handle uncaught exceptions. Error boundaries catch errors in their child components and display a fallback UI instead of the component tree that crashed.
Create an error boundary by adding an error.js file inside a route segment and exporting a React component:
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
<p>Errors will bubble up to the nearest parent error boundary. This allows for granular error handling by placing error.tsx files at different levels in the route hierarchy.</p>
<p>Global errors</p>
<p>While less common, you can handle errors in the root layout using the global-error.js file, located in the root app directory, even when leveraging internationalization. Global error UI must define its own &lt;html&gt; and &lt;body&gt; tags, since it is replacing the root layout or template when active.
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
API ReferenceLearn more about the features mentioned in this page by reading the API Reference.redirectAPI Reference for the redirect function.error.jsAPI reference for the error.js special file.notFoundAPI Reference for the notFound function.not-found.jsAPI reference for the not-found.js file.Was this helpful?</p>
<p>supported.Send</p>
