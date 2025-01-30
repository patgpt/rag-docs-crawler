# Data Fetching: Server Actions and Mutations | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationData FetchingServer Actions and MutationsServer Actions and MutationsServer Actions are asynchronous functions that are executed on the server. They can be called in Server and Client Components to handle form submissions and data mutations in Next.js applications.</p>
<p>🎥 Watch: Learn more about mutations with Server Actions → YouTube (10 minutes).</p>
<p>Convention</p>
<p>A Server Action can be defined with the React &quot;use server&quot; directive. You can place the directive at the top of an async function to mark the function as a Server Action, or at the top of a separate file to mark all exports of that file as Server Actions.
Server Components</p>
<p>Server Components can use the inline function level or module level &quot;use server&quot; directive. To inline a Server Action, add &quot;use server&quot; to the top of the function body:
app/page.tsxTypeScriptJavaScriptTypeScriptexport default function Page() {
// Server Action
async function create() {
'use server'
// Mutate data
}</p>
<p>return '...'
}</p>
<p>Client Components</p>
<p>To call a Server Action in a Client Component, create a new file and add the &quot;use server&quot; directive at the top of it. All exported functions within the file will be marked as Server Actions that can be reused in both Client and Server Components:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>export async function create() {}</p>
<p>app/button.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { create } from './actions'</p>
<p>export function Button() {
return &lt;button onClick={() =&gt; create()}&gt;Create&lt;/button&gt;
}</p>
<p>Passing actions as props</p>
<p>You can also pass a Server Action to a Client Component as a prop:
&lt;ClientComponent updateItemAction={updateItem} /&gt;
app/client-component.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>export default function ClientComponent({
updateItemAction,
}: {
updateItemAction: (formData: FormData) =&gt; void
}) {
return &lt;form action={updateItemAction}&gt;{/* ... */}&lt;/form&gt;
}</p>
<p>Usually, the Next.js TypeScript plugin would flag updateItemAction in client-component.tsx since it is a function which generally can't be serialized across client-server boundaries.
However, props named action or ending with Action are assumed to receive Server Actions.
This is only a heuristic since the TypeScript plugin doesn't actually know if it receives a Server Action or an ordinary function.
Runtime type-checking will still ensure you don't accidentally pass a function to a Client Component.
Behavior</p>
<p>Server actions can be invoked using the action attribute in a &lt;form&gt; element:</p>
<p>Server Components support progressive enhancement by default, meaning the form will be submitted even if JavaScript hasn't loaded yet or is disabled.
In Client Components, forms invoking Server Actions will queue submissions if JavaScript isn't loaded yet, prioritizing client hydration.
After hydration, the browser does not refresh on form submission.</p>
<p>Server Actions are not limited to &lt;form&gt; and can be invoked from event handlers, useEffect, third-party libraries, and other form elements like &lt;button&gt;.
Server Actions integrate with the Next.js caching and revalidation architecture. When an action is invoked, Next.js can return both the updated UI and new data in a single server roundtrip.
Behind the scenes, actions use the POST method, and only this HTTP method can invoke them.
The arguments and return value of Server Actions must be serializable by React. See the React docs for a list of serializable arguments and values.
Server Actions are functions. This means they can be reused anywhere in your application.
Server Actions inherit the runtime from the page or layout they are used on.
Server Actions inherit the Route Segment Config from the page or layout they are used on, including fields like maxDuration.</p>
<p>Examples</p>
<p>Forms</p>
<p>React extends the HTML &lt;form&gt; element to allow Server Actions to be invoked with the action prop.
When invoked in a form, the action automatically receives the FormData object. You don't need to use React useState to manage fields, instead, you can extract the data using the native FormData methods:
app/invoices/page.tsxTypeScriptJavaScriptTypeScriptexport default function Page() {
async function createInvoice(formData: FormData) {
'use server'</p>
<pre><code>const rawFormData = {
  customerId: formData.get('customerId'),
  amount: formData.get('amount'),
  status: formData.get('status'),
}

// mutate data
// revalidate cache
</code></pre>
<p>}</p>
<p>return &lt;form action={createInvoice}&gt;...&lt;/form&gt;
}</p>
<p>Good to know:</p>
<p>Example: Form with Loading &amp; Error States
When working with forms that have many fields, you may want to consider using the entries() method with JavaScript's Object.fromEntries(). For example: const rawFormData = Object.fromEntries(formData). One thing to note is that the formData will include additional $ACTION_ properties.
See React &lt;form&gt; documentation to learn more.</p>
<p>Passing additional arguments</p>
<p>You can pass additional arguments to a Server Action using the JavaScript bind method.
app/client-component.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { updateUser } from './actions'</p>
<p>export function UserProfile({ userId }: { userId: string }) {
const updateUserWithId = updateUser.bind(null, userId)</p>
<p>return (
&lt;form action={updateUserWithId}&gt;
&lt;input type=&quot;text&quot; name=&quot;name&quot; /&gt;
&lt;button type=&quot;submit&quot;&gt;Update User Name&lt;/button&gt;
&lt;/form&gt;
)
}</p>
<p>The Server Action will receive the userId argument, in addition to the form data:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>export async function updateUser(userId: string, formData: FormData) {}</p>
<p>Good to know:</p>
<p>An alternative is to pass arguments as hidden input fields in the form (e.g. &lt;input type=&quot;hidden&quot; name=&quot;userId&quot; value={userId} /&gt;). However, the value will be part of the rendered HTML and will not be encoded.
.bind works in both Server and Client Components. It also supports progressive enhancement.</p>
<p>Nested form elements</p>
<p>You can also invoke a Server Action in elements nested inside &lt;form&gt; such as &lt;button&gt;, &lt;input type=&quot;submit&quot;&gt;, and &lt;input type=&quot;image&quot;&gt;. These elements accept the formAction prop or event handlers.
This is useful in cases where you want to call multiple server actions within a form. For example, you can create a specific &lt;button&gt; element for saving a post draft in addition to publishing it. See the React &lt;form&gt; docs for more information.
Programmatic form submission</p>
<p>You can trigger a form submission programmatically using the requestSubmit() method. For example, when the user submits a form using the ⌘ + Enter keyboard shortcut, you can listen for the onKeyDown event:
app/entry.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>export function Entry() {
const handleKeyDown = (e: React.KeyboardEvent&lt;HTMLTextAreaElement&gt;) =&gt; {
if (
(e.ctrlKey || e.metaKey) &amp;&amp;
(e.key === 'Enter' || e.key === 'NumpadEnter')
) {
e.preventDefault()
e.currentTarget.form?.requestSubmit()
}
}</p>
<p>return (
&lt;div&gt;
&lt;textarea name=&quot;entry&quot; rows={20} required onKeyDown={handleKeyDown} /&gt;
&lt;/div&gt;
)
}</p>
<p>This will trigger the submission of the nearest &lt;form&gt; ancestor, which will invoke the Server Action.
Server-side form validation</p>
<p>You can use the HTML attributes like required and type=&quot;email&quot; for basic client-side form validation.
For more advanced server-side validation, you can use a library like zod to validate the form fields before mutating the data:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { z } from 'zod'</p>
<p>const schema = z.object({
email: z.string({
invalid_type_error: 'Invalid Email',
}),
})</p>
<p>export default async function createUser(formData: FormData) {
const validatedFields = schema.safeParse({
email: formData.get('email'),
})</p>
<p>// Return early if the form data is invalid
if (!validatedFields.success) {
return {
errors: validatedFields.error.flatten().fieldErrors,
}
}</p>
<p>// Mutate data
}</p>
<p>Once the fields have been validated on the server, you can return a serializable object in your action and use the React useActionState hook to show a message to the user.</p>
<p>By passing the action to useActionState, the action's function signature changes to receive a new prevState or initialState parameter as its first argument.
useActionState is a React hook and therefore must be used in a Client Component.</p>
<p>app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
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
<p>Pending states</p>
<p>The useActionState hook exposes a pending boolean that can be used to show a loading indicator while the action is being executed.
Alternatively, you can use the useFormStatus hook to show a loading indicator while the action is being executed. When using this hook, you'll need to create a separate component to render the loading indicator. For example, to disable the button when the action is pending:
app/ui/button.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useFormStatus } from 'react-dom'</p>
<p>export function SubmitButton() {
const { pending } = useFormStatus()</p>
<p>return (
&lt;button disabled={pending} type=&quot;submit&quot;&gt;
Sign Up
&lt;/button&gt;
)
}</p>
<p>You can then nest the SubmitButton component inside the form:
app/ui/signup.tsxTypeScriptJavaScriptTypeScriptimport { SubmitButton } from './button'
import { createUser } from '@/app/actions'</p>
<p>export function Signup() {
return (
&lt;form action={createUser}&gt;
{/* Other form elements */}
&lt;SubmitButton /&gt;
&lt;/form&gt;
)
}</p>
<p>Good to know: In React 19, useFormStatus includes additional keys on the returned object, like data, method, and action. If you are not using React 19, only the pending key is available.</p>
<p>Optimistic updates</p>
<p>You can use the React useOptimistic hook to optimistically update the UI before the Server Action finishes executing, rather than waiting for the response:
app/page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useOptimistic } from 'react'
import { send } from './actions'</p>
<p>type Message = {
message: string
}</p>
<p>export function Thread({ messages }: { messages: Message[] }) {
const [optimisticMessages, addOptimisticMessage] = useOptimistic&lt;
Message[],
string</p>
<blockquote>
<p>(messages, (state, newMessage) =&gt; [...state, { message: newMessage }])</p>
</blockquote>
<p>const formAction = async (formData: FormData) =&gt; {
const message = formData.get('message') as string
addOptimisticMessage(message)
await send(message)
}</p>
<p>return (
&lt;div&gt;
{optimisticMessages.map((m, i) =&gt; (
&lt;div key={i}&gt;{m.message}&lt;/div&gt;
))}
&lt;form action={formAction}&gt;
&lt;input type=&quot;text&quot; name=&quot;message&quot; /&gt;
&lt;button type=&quot;submit&quot;&gt;Send&lt;/button&gt;
&lt;/form&gt;
&lt;/div&gt;
)
}</p>
<p>Event handlers</p>
<p>While it's common to use Server Actions within &lt;form&gt; elements, they can also be invoked with event handlers such as onClick. For example, to increment a like count:
app/like-button.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { incrementLike } from './actions'
import { useState } from 'react'</p>
<p>export default function LikeButton({ initialLikes }: { initialLikes: number }) {
const [likes, setLikes] = useState(initialLikes)</p>
<p>return (
&lt;&gt;
&lt;p&gt;Total Likes: {likes}&lt;/p&gt;
&lt;button
onClick={async () =&gt; {
const updatedLikes = await incrementLike()
setLikes(updatedLikes)
}}
&gt;
Like
&lt;/button&gt;
&lt;/&gt;
)
}</p>
<p>You can also add event handlers to form elements, for example, to save a form field onChange:
app/ui/edit-post.tsx'use client'</p>
<p>import { publishPost, saveDraft } from './actions'</p>
<p>export default function EditPost() {
return (
&lt;form action={publishPost}&gt;
&lt;textarea
name=&quot;content&quot;
onChange={async (e) =&gt; {
await saveDraft(e.target.value)
}}
/&gt;
&lt;button type=&quot;submit&quot;&gt;Publish&lt;/button&gt;
&lt;/form&gt;
)
}
For cases like this, where multiple events might be fired in quick succession, we recommend debouncing to prevent unnecessary Server Action invocations.
useEffect</p>
<p>You can use the React useEffect hook to invoke a Server Action when the component mounts or a dependency changes. This is useful for mutations that depend on global events or need to be triggered automatically. For example, onKeyDown for app shortcuts, an intersection observer hook for infinite scrolling, or when the component mounts to update a view count:
app/view-count.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { incrementViews } from './actions'
import { useState, useEffect } from 'react'</p>
<p>export default function ViewCount({ initialViews }: { initialViews: number }) {
const [views, setViews] = useState(initialViews)</p>
<p>useEffect(() =&gt; {
const updateViews = async () =&gt; {
const updatedViews = await incrementViews()
setViews(updatedViews)
}</p>
<pre><code>updateViews()
</code></pre>
<p>}, [])</p>
<p>return &lt;p&gt;Total Views: {views}&lt;/p&gt;
}</p>
<p>Remember to consider the behavior and caveats of useEffect.
Error Handling</p>
<p>When an error is thrown, it'll be caught by the nearest error.js or &lt;Suspense&gt; boundary on the client. See Error Handling for more information.</p>
<p>Good to know:</p>
<p>Aside from throwing the error, you can also return an object to be handled by useActionState. See Server-side validation and error handling.</p>
<p>Revalidating data</p>
<p>You can revalidate the Next.js Cache inside your Server Actions with the revalidatePath API:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { revalidatePath } from 'next/cache'</p>
<p>export async function createPost() {
try {
// ...
} catch (error) {
// ...
}</p>
<p>revalidatePath('/posts')
}</p>
<p>Or invalidate a specific data fetch with a cache tag using revalidateTag:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { revalidateTag } from 'next/cache'</p>
<p>export async function createPost() {
try {
// ...
} catch (error) {
// ...
}</p>
<p>revalidateTag('posts')
}</p>
<p>Redirecting</p>
<p>If you would like to redirect the user to a different route after the completion of a Server Action, you can use redirect API. redirect needs to be called outside of the try/catch block:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'</p>
<p>export async function createPost(id: string) {
try {
// ...
} catch (error) {
// ...
}</p>
<p>revalidateTag('posts') // Update cached posts
redirect(<code>/post/${id}</code>) // Navigate to the new post page
}</p>
<p>Cookies</p>
<p>You can get, set, and delete cookies inside a Server Action using the cookies API:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { cookies } from 'next/headers'</p>
<p>export async function exampleAction() {
const cookieStore = await cookies()</p>
<p>// Get cookie
cookieStore.get('name')?.value</p>
<p>// Set cookie
cookieStore.set('name', 'Delba')</p>
<p>// Delete cookie
cookieStore.delete('name')
}</p>
<p>See additional examples for deleting cookies from Server Actions.
Security</p>
<p>By default, when a Server Action is created and exported, it creates a public HTTP endpoint
and should be treated with the same security assumptions and authorization checks. This means, even if a Server Action or utility function is not imported elsewhere in your code, it’s still publicly accessible.
To improve security, Next.js has the following built-in features:</p>
<p>Secure action IDs: Next.js creates encrypted, non-deterministic IDs to allow the client to reference and call the Server Action. These IDs are periodically recalculated between builds for enhanced security.
Dead code elimination: Unused Server Actions (referenced by their IDs) are removed from client bundle to avoid public access by third-party.</p>
<p>Good to know:
The IDs are created during compilation and are cached for a maximum of 14 days. They will be regenerated when a new build is initiated or when the build cache is invalidated.
This security improvement reduces the risk in cases where an authentication layer is missing. However, you should still treat Server Actions like public HTTP endpoints.</p>
<p>// app/actions.js
'use server'</p>
<p>// This action <strong>is</strong> used in our application, so Next.js
// will create a secure ID to allow the client to reference
// and call the Server Action.
export async function updateUserAction(formData) {}</p>
<p>// This action <strong>is not</strong> used in our application, so Next.js
// will automatically remove this code during <code>next build</code>
// and will not create a public endpoint.
export async function deleteUserAction(formData) {}
Authentication and authorization</p>
<p>You should ensure that the user is authorized to perform the action. For example:
app/actions.ts'use server'</p>
<p>import { auth } from './lib'</p>
<p>export function addItem() {
const { user } = auth()
if (!user) {
throw new Error('You must be signed in to perform this action')
}</p>
<p>// ...
}
Closures and encryption</p>
<p>Defining a Server Action inside a component creates a closure where the action has access to the outer function's scope. For example, the publish action has access to the publishVersion variable:
app/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page() {
const publishVersion = await getLatestVersion();</p>
<p>async function publish() {
&quot;use server&quot;;
if (publishVersion !== await getLatestVersion()) {
throw new Error('The version has changed since pressing publish');
}
...
}</p>
<p>return (
&lt;form&gt;
&lt;button formAction={publish}&gt;Publish&lt;/button&gt;
&lt;/form&gt;
);
}</p>
<p>Closures are useful when you need to capture a snapshot of data (e.g. publishVersion) at the time of rendering so that it can be used later when the action is invoked.
However, for this to happen, the captured variables are sent to the client and back to the server when the action is invoked. To prevent sensitive data from being exposed to the client, Next.js automatically encrypts the closed-over variables. A new private key is generated for each action every time a Next.js application is built. This means actions can only be invoked for a specific build.</p>
<p>Good to know: We don't recommend relying on encryption alone to prevent sensitive values from being exposed on the client. Instead, you should use the React taint APIs to proactively prevent specific data from being sent to the client.</p>
<p>Overwriting encryption keys (advanced)</p>
<p>When self-hosting your Next.js application across multiple servers, each server instance may end up with a different encryption key, leading to potential inconsistencies.
To mitigate this, you can overwrite the encryption key using the process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY environment variable. Specifying this variable ensures that your encryption keys are persistent across builds, and all server instances use the same key. This variable must be AES-GCM encrypted.
This is an advanced use case where consistent encryption behavior across multiple deployments is critical for your application. You should consider standard security practices such key rotation and signing.</p>
<p>Good to know: Next.js applications deployed to Vercel automatically handle this.</p>
<p>Allowed origins (advanced)</p>
<p>Since Server Actions can be invoked in a &lt;form&gt; element, this opens them up to CSRF attacks.
Behind the scenes, Server Actions use the POST method, and only this HTTP method is allowed to invoke them. This prevents most CSRF vulnerabilities in modern browsers, particularly with SameSite cookies being the default.
As an additional protection, Server Actions in Next.js also compare the Origin header to the Host header (or X-Forwarded-Host). If these don't match, the request will be aborted. In other words, Server Actions can only be invoked on the same host as the page that hosts it.
For large applications that use reverse proxies or multi-layered backend architectures (where the server API differs from the production domain), it's recommended to use the configuration option serverActions.allowedOrigins option to specify a list of safe origins. The option accepts an array of strings.
next.config.js/** @type {import('next').NextConfig} <em>/
module.exports = {
experimental: {
serverActions: {
allowedOrigins: ['my-proxy.com', '</em>.my-proxy.com'],
},
},
}
Learn more about Security and Server Actions.
Additional resources</p>
<p>For more information, check out the following React docs:</p>
<p>Server Actions
&quot;use server&quot;
&lt;form&gt;
useFormStatus
useActionState
useOptimistic
Next StepsLearn how to configure Server Actions in Next.jsserverActionsConfigure Server Actions behavior in your Next.js application.Was this helpful?</p>
<p>supported.Send</p>
