# File Conventions: error.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionserror.jserror.jsAn error file allows you to handle unexpected runtime errors and display fallback UI.</p>
<p>app/dashboard/error.tsxTypeScriptJavaScriptTypeScript'use client' // Error boundaries must be Client Components</p>
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
<p>error.js wraps a route segment and its nested children in a React Error Boundary. When an error throws within the boundary, the error component shows as the fallback UI.</p>
<p>Good to know:</p>
<p>The React DevTools allow you to toggle error boundaries to test error states.
If you want errors to bubble up to the parent error boundary, you can throw when rendering the error component.</p>
<p>Reference</p>
<p>Props</p>
<p>error</p>
<p>An instance of an Error object forwarded to the error.js Client Component.</p>
<p>Good to know: During development, the Error object forwarded to the client will be serialized and include the message of the original error for easier debugging. However, this behavior is different in production to avoid leaking potentially sensitive details included in the error to the client.</p>
<p>error.message</p>
<p>Errors forwarded from Client Components show the original Error message.
Errors forwarded from Server Components show a generic message with an identifier. This is to prevent leaking sensitive details. You can use the identifier, under errors.digest, to match the corresponding server-side logs.</p>
<p>error.digest</p>
<p>An automatically generated hash of the error thrown. It can be used to match the corresponding error in server-side logs.
reset</p>
<p>The cause of an error can sometimes be temporary. In these cases, trying again might resolve the issue.
An error component can use the reset() function to prompt the user to attempt to recover from the error. When executed, the function will try to re-render the error boundary's contents. If successful, the fallback error component is replaced with the result of the re-render.
app/dashboard/error.tsxTypeScriptJavaScriptTypeScript'use client' // Error boundaries must be Client Components</p>
<p>export default function Error({
error,
reset,
}: {
error: Error &amp; { digest?: string }
reset: () =&gt; void
}) {
return (
&lt;div&gt;
&lt;h2&gt;Something went wrong!&lt;/h2&gt;
&lt;button onClick={() =&gt; reset()}&gt;Try again&lt;/button&gt;
&lt;/div&gt;
)
}</p>
<p>Examples</p>
<p>Global Error</p>
<p>While less common, you can handle errors in the root layout or template using global-error.js, located in the root app directory, even when leveraging internationalization. Global error UI must define its own &lt;html&gt; and &lt;body&gt; tags. This file replaces the root layout or template when active.
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
}</p>
<p>Good to know: global-error.js is always displayed In development, error overlay will show instead.</p>
<p>Version History</p>
<p>VersionChangesv15.2.0display global-error also in development.v13.1.0global-error introduced.v13.0.0error introduced.Learn more about error handlingError HandlingLearn how to display expected errors and handle uncaught exceptions.Was this helpful?</p>
<p>supported.Send</p>
