# Functions: permanentRedirect | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionspermanentRedirectpermanentRedirectThe permanentRedirect function allows you to redirect the user to another URL. permanentRedirect can be used in Server Components, Client Components, Route Handlers, and Server Actions.
When used in a streaming context, this will insert a meta tag to emit the redirect on the client side. When used in a server action, it will serve a 303 HTTP redirect response to the caller. Otherwise, it will serve a 308 (Permanent) HTTP redirect response to the caller.
If a resource doesn't exist, you can use the notFound function instead.</p>
<p>Good to know: If you prefer to return a 307 (Temporary) HTTP redirect instead of 308 (Permanent), you can use the redirect function instead.</p>
<p>Parameters</p>
<p>The permanentRedirect function accepts two arguments:
permanentRedirect(path, type)
ParameterTypeDescriptionpathstringThe URL to redirect to. Can be a relative or absolute path.type'replace' (default) or 'push' (default in Server Actions)The type of redirect to perform.
By default, permanentRedirect will use push (adding a new entry to the browser history stack) in Server Actions and replace (replacing the current URL in the browser history stack) everywhere else. You can override this behavior by specifying the type parameter.
The type parameter has no effect when used in Server Components.
Returns</p>
<p>permanentRedirect does not return a value.
Example</p>
<p>Invoking the permanentRedirect() function throws a NEXT_REDIRECT error and terminates rendering of the route segment in which it was thrown.
app/team/[id]/page.jsimport { permanentRedirect } from 'next/navigation'</p>
<p>async function fetchTeam(id) {
const res = await fetch('https://...')
if (!res.ok) return undefined
return res.json()
}</p>
<p>export default async function Profile({ params }) {
const team = await fetchTeam((await params).id)
if (!team) {
permanentRedirect('/login')
}</p>
<p>// ...
}</p>
<p>Good to know: permanentRedirect does not require you to use return permanentRedirect() as it uses the TypeScript never type.
Next StepsredirectAPI Reference for the redirect function.Was this helpful?</p>
<p>supported.Send</p>
