# Functions: redirect | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsredirectredirectThe redirect function allows you to redirect the user to another URL. redirect can be used in Server Components, Route Handlers, and Server Actions.
When used in a streaming context, this will insert a meta tag to emit the redirect on the client side. When used in a server action, it will serve a 303 HTTP redirect response to the caller. Otherwise, it will serve a 307 HTTP redirect response to the caller.
If a resource doesn't exist, you can use the notFound function instead.</p>
<p>Good to know:</p>
<p>In Server Actions and Route Handlers, redirect should be called after the try/catch block.
If you prefer to return a 308 (Permanent) HTTP redirect instead of 307 (Temporary), you can use the permanentRedirect function instead.</p>
<p>Parameters</p>
<p>The redirect function accepts two arguments:
redirect(path, type)
ParameterTypeDescriptionpathstringThe URL to redirect to. Can be a relative or absolute path.type'replace' (default) or 'push' (default in Server Actions)The type of redirect to perform.
By default, redirect will use push (adding a new entry to the browser history stack) in Server Actions and replace (replacing the current URL in the browser history stack) everywhere else. You can override this behavior by specifying the type parameter.
The type parameter has no effect when used in Server Components.
Returns</p>
<p>redirect does not return a value.
Example</p>
<p>Server Component</p>
<p>Invoking the redirect() function throws a NEXT_REDIRECT error and terminates rendering of the route segment in which it was thrown.
app/team/[id]/page.tsxTypeScriptJavaScriptTypeScriptimport { redirect } from 'next/navigation'</p>
<p>async function fetchTeam(id: string) {
const res = await fetch('https://...')
if (!res.ok) return undefined
return res.json()
}</p>
<p>export default async function Profile({
params,
}: {
params: Promise&lt;{ id: string }&gt;
}) {
const { id } = await params
const team = await fetchTeam(id)</p>
<p>if (!team) {
redirect('/login')
}</p>
<p>// ...
}</p>
<p>Good to know: redirect does not require you to use return redirect() as it uses the TypeScript never type.</p>
<p>Client Component</p>
<p>redirect can be used in a Client Component through a Server Action. If you need to use an event handler to redirect the user, you can use the useRouter hook.
app/client-redirect.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { navigate } from './actions'</p>
<p>export function ClientRedirect() {
return (
&lt;form action={navigate}&gt;
&lt;input type=&quot;text&quot; name=&quot;id&quot; /&gt;
&lt;button&gt;Submit&lt;/button&gt;
&lt;/form&gt;
)
}</p>
<p>app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import { redirect } from 'next/navigation'</p>
<p>export async function navigate(data: FormData) {
redirect(<code>/posts/${data.get('id')}</code>)
}</p>
<p>FAQ</p>
<p>Why does redirect use 307 and 308?</p>
<p>When using redirect() you may notice that the status codes used are 307 for a temporary redirect, and 308 for a permanent redirect. While traditionally a 302 was used for a temporary redirect, and a 301 for a permanent redirect, many browsers changed the request method of the redirect, from a POST to GET request when using a 302, regardless of the origins request method.
Taking the following example of a redirect from /users to /people, if you make a POST request to /users to create a new user, and are conforming to a 302 temporary redirect, the request method will be changed from a POST to a GET request. This doesn't make sense, as to create a new user, you should be making a POST request to /people, and not a GET request.
The introduction of the 307 status code means that the request method is preserved as POST.</p>
<p>302 - Temporary redirect, will change the request method from POST to GET
307 - Temporary redirect, will preserve the request method as POST</p>
<p>The redirect() method uses a 307 by default, instead of a 302 temporary redirect, meaning your requests will always be preserved as POST requests.
Learn more about HTTP Redirects.
Version History</p>
<p>VersionChangesv13.0.0redirect introduced.Next StepspermanentRedirectAPI Reference for the permanentRedirect function.Was this helpful?</p>
<p>supported.Send</p>
