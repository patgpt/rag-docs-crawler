# Getting Started: Updating Data | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6App RouterGetting StartedUpdating DataHow to update dataYou can update data in Next.js using React's Server Functions. This page will go through how you can create and invoke Server Functions.
Creating Server Functions</p>
<p>A Server Function can be defined by using the use server directive. You can place the directive at the top of an asynchronous function to mark the function as a Server Function, or at the top of a separate file to mark all exports of that file. We recommend using a separate file in most instances.
app/lib/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>export async function createPost(formData: FormData) {}</p>
<p>export async function deletePost(formData: FormData) {}</p>
<p>Server Components</p>
<p>Server Functions can be inlined in Server Components by adding the &quot;use server&quot; directive to the top of the function body:
app/page.tsxTypeScriptJavaScriptTypeScriptexport default function Page() {
// Server Action
async function createPost() {
'use server'
// Update data
// ...</p>
<p>return &lt;&gt;&lt;/&gt;
}</p>
<p>Client Components</p>
<p>It's not possible to define Server Functions in Client Components. However, you can invoke them in Client Components by importing them from a file that has the &quot;use server&quot; directive at the top of it:
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>export async function createPost() {}</p>
<p>app/ui/button.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { createPost } from '@/app/actions'</p>
<p>export function Button() {
return &lt;button formAction={createPost}&gt;Create&lt;/button&gt;
}</p>
<p>Invoking Server Functions</p>
<p>There are two mains ways you can invoke a Server Function:</p>
<p>Forms in Server and Client Components
Event Handlers in Client Components</p>
<p>Forms</p>
<p>React extends the HTML &lt;form&gt; element to allow Server Function to be invoked with the HTML action prop.
When invoked in a form, the function automatically receives the FormData object. You can extract the data using the native FormData methods:
app/ui/form.tsxTypeScriptJavaScriptTypeScriptimport { createPost } from '@/app/actions'</p>
<p>export function Form() {
return (
&lt;form action={createPost}&gt;
&lt;input type=&quot;text&quot; name=&quot;title&quot; /&gt;
&lt;input type=&quot;text&quot; name=&quot;content&quot; /&gt;
&lt;button type=&quot;submit&quot;&gt;Create&lt;/button&gt;
&lt;/form&gt;
)
}</p>
<p>app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>export async function createPost(formData: FormData) {
const title = formData.get('title')
const content = formData.get('content')</p>
<p>// Update data
// Revalidate cache
}</p>
<p>Good to know: When passed to the action prop, Server Functions are also known as Server Actions.</p>
<p>Event Handlers</p>
<p>You can invoke a Server Function in a Client Component by using event handlers such as onClick.
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
<p>Showing a pending state</p>
<p>While executing a Server Function, you can show a loading indicator with React's useActionState hook. This hook returns a pending boolean:
app/ui/button.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useActionState } from 'react'
import { createPost } from '@/app/actions'
import { LoadingSpinner } from '@/app/ui/loading-spinner'</p>
<p>export function Button() {
const [state, action, pending] = useActionState(createPost, false)</p>
<p>return (
&lt;button onClick={async () =&gt; action()}&gt;
{pending ? &lt;LoadingSpinner /&gt; : 'Create Post'}
&lt;/button&gt;
)
}</p>
<p>Revalidating the cache</p>
<p>After performing an update, you can revalidate the Next.js cache and show the updated data by calling revalidatePath or revalidateTag within the Server Function:
app/lib/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { revalidatePath } from 'next/cache'</p>
<p>export async function createPost(formData: FormData) {
// Update data
// ...</p>
<p>revalidatePath('/posts')
}</p>
<p>Redirecting</p>
<p>You may want to redirect the user to a different page after performing an update. You can do this by calling redirect within the Server Function:
app/lib/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { redirect } from 'next/navigation'</p>
<p>export async function createPost(formData: FormData) {
// Update data
// ...</p>
<p>redirect('/posts')
}
API ReferenceLearn more about the features mentioned in this page by reading the API Reference.revalidatePathAPI Reference for the revalidatePath function.revalidateTagAPI Reference for the revalidateTag function.redirectAPI Reference for the redirect function.Was this helpful?</p>
<p>supported.Send</p>
