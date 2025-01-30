# Components: Form | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceComponentsFormFormThe &lt;Form&gt; component extends the HTML &lt;form&gt; element to provide prefetching of loading UI, client-side navigation on submission, and progressive enhancement.
It's useful for forms that update URL search params as it reduces the boilerplate code needed to achieve the above.
Basic usage:
/app/ui/search.tsxTypeScriptJavaScriptTypeScriptimport Form from 'next/form'</p>
<p>export default function Page() {
return (
&lt;Form action=&quot;/search&quot;&gt;
{/* On submission, the input value will be appended to
the URL, e.g. /search?query=abc */}
&lt;input name=&quot;query&quot; /&gt;
&lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;
&lt;/Form&gt;
)
}</p>
<p>Reference</p>
<p>The behavior of the &lt;Form&gt; component depends on whether the action prop is passed a string or function.</p>
<p>When action is a string, the &lt;Form&gt; behaves like a native HTML form that uses a GET method. The form data is encoded into the URL as search params, and when the form is submitted, it navigates to the specified URL. In addition, Next.js:</p>
<p>Prefetches the path when the form becomes visible, this preloads shared UI (e.g. layout.js and loading.js), resulting in faster navigation.
Performs a client-side navigation instead of a full page reload when the form is submitted. This retains shared UI and client-side state.</p>
<p>When action is a function (Server Action), &lt;Form&gt; behaves like a React form, executing the action when the form is submitted.</p>
<p>action (string) Props</p>
<p>When action is a string, the &lt;Form&gt; component supports the following props:PropExampleTypeRequiredactionaction=&quot;/search&quot;string (URL or relative path)Yesreplacereplace={false}boolean-scrollscroll={true}boolean-prefetchprefetch={true}boolean-
action: The URL or path to navigate to when the form is submitted.</p>
<p>An empty string &quot;&quot; will navigate to the same route with updated search params.</p>
<p>replace: Replaces the current history state instead of pushing a new one to the browser's history stack. Default is false.
scroll: Controls the scroll behavior during navigation. Defaults to true, this means it will scroll to the top of the new route, and maintain the scroll position for backwards and forwards navigation.
prefetch: Controls whether the path should be prefetched when the form becomes visible in the user's viewport. Defaults to true.
action (function) Props</p>
<p>When action is a function, the &lt;Form&gt; component supports the following prop:PropExampleTypeRequiredactionaction={myAction}function (Server Action)Yes
action: The Server Action to be called when the form is submitted. See the React docs for more.</p>
<p>Good to know: When action is a function, the replace and scroll props are ignored.</p>
<p>Caveats</p>
<p>formAction: Can be used in a &lt;button&gt; or &lt;input type=&quot;submit&quot;&gt; fields to override the action prop. Next.js will perform a client-side navigation, however, this approach doesn't support prefetching.</p>
<p>When using basePath, you must also include it in the formAction path. e.g. formAction=&quot;/base-path/search&quot;.</p>
<p>key: Passing a key prop to a string action is not supported. If you'd like to trigger a re-render or perform a mutation, consider using a function action instead.</p>
<p>onSubmit: Can be used to handle form submission logic. However, calling event.preventDefault() will override &lt;Form&gt; behavior such as navigating to the specified URL.
method, encType, target: Are not supported as they override &lt;Form&gt; behavior.</p>
<p>Similarly, formMethod, formEncType, and formTarget can be used to override the method, encType, and target props respectively, and using them will fallback to native browser behavior.
If you need to use these props, use the HTML &lt;form&gt; element instead.</p>
<p>&lt;input type=&quot;file&quot;&gt;: Using this input type when the action is a string will match browser behavior by submitting the filename instead of the file object.</p>
<p>Examples</p>
<p>Search form that leads to a search result page</p>
<p>You can create a search form that navigates to a search results page by passing the path as an action:/app/page.tsxTypeScriptJavaScriptTypeScriptimport Form from 'next/form'</p>
<p>export default function Page() {
return (
&lt;Form action=&quot;/search&quot;&gt;
&lt;input name=&quot;query&quot; /&gt;
&lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;
&lt;/Form&gt;
)
}When the user updates the query input field and submits the form, the form data will be encoded into the URL as search params, e.g. /search?query=abc.
Good to know: If you pass an empty string &quot;&quot; to action, the form will navigate to the same route with updated search params.
On the results page, you can access the query using the searchParams page.js prop and use it to fetch data from an external source./app/search/page.tsxTypeScriptJavaScriptTypeScriptimport { getSearchResults } from '@/lib/search'</p>
<p>export default async function SearchPage({
searchParams,
}: {
searchParams: Promise&lt;{ [key: string]: string | string[] | undefined }&gt;
}) {
const results = await getSearchResults((await searchParams).query)</p>
<p>return &lt;div&gt;...&lt;/div&gt;
}When the &lt;Form&gt; becomes visible in the user's viewport, shared UI (such as layout.js and loading.js) on the /search page will be prefetched. On submission, the form will immediately navigate to the new route and show loading UI while the results are being fetched. You can design the fallback UI using loading.js:/app/search/loading.tsxTypeScriptJavaScriptTypeScriptexport default function Loading() {
return &lt;div&gt;Loading...&lt;/div&gt;
}To cover cases when shared UI hasn't yet loaded, you can show instant feedback to the user using useFormStatus.First, create a component that displays a loading state when the form is pending:/app/ui/search-button.tsxTypeScriptJavaScriptTypeScript'use client'
import { useFormStatus } from 'react-dom'</p>
<p>export default function SearchButton() {
const status = useFormStatus()
return (
&lt;button type=&quot;submit&quot;&gt;{status.pending ? 'Searching...' : 'Search'}&lt;/button&gt;
)
}Then, update the search form page to use the SearchButton component:/app/page.tsxTypeScriptJavaScriptTypeScriptimport Form from 'next/form'
import { SearchButton } from '@/ui/search-button'</p>
<p>export default function Page() {
return (
&lt;Form action=&quot;/search&quot;&gt;
&lt;input name=&quot;query&quot; /&gt;
&lt;SearchButton /&gt;
&lt;/Form&gt;
)
}Mutations with Server Actions</p>
<p>You can perform mutations by passing a function to the action prop./app/posts/create/page.tsxTypeScriptJavaScriptTypeScriptimport Form from 'next/form'
import { createPost } from '@/posts/actions'</p>
<p>export default function Page() {
return (
&lt;Form action={createPost}&gt;
&lt;input name=&quot;title&quot; /&gt;
{/* ... */}
&lt;button type=&quot;submit&quot;&gt;Create Post&lt;/button&gt;
&lt;/Form&gt;
)
}After a mutation, it's common to redirect to the new resource. You can use the redirect function from next/navigation to navigate to the new post page.
Good to know: Since the &quot;destination&quot; of the form submission is not known until the action is executed, &lt;Form&gt; cannot automatically prefetch shared UI.
/app/posts/actions.tsTypeScriptJavaScriptTypeScript'use server'
import { redirect } from 'next/navigation'</p>
<p>export async function createPost(formData: FormData) {
// Create a new post
// ...</p>
<p>// Redirect to the new post
redirect(<code>/posts/${data.id}</code>)
}Then, in the new page, you can fetch data using the params prop:/app/posts/[id]/page.tsxTypeScriptJavaScriptTypeScriptimport { getPost } from '@/posts/data'</p>
<p>export default async function PostPage({
params,
}: {
params: Promise&lt;{ id: string }&gt;
}) {
const data = await getPost((await params).id)</p>
<p>return (
&lt;div&gt;
&lt;h1&gt;{data.title}&lt;/h1&gt;
{/* ... */}
&lt;/div&gt;
)
}See the Server Actions docs for more examples.Was this helpful?</p>
<p>supported.Send</p>
