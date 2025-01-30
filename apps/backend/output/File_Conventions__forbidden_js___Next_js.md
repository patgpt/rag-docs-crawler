# File Conventions: forbidden.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionsforbidden.jsforbidden.jsThis feature is currently experimental and subject to change, it's not recommended for production. Try it out and share your feedback on GitHub.The forbidden file is used to render UI when the forbidden function is invoked during authentication. Along with allowing you to customize the UI, Next.js will return a 403 status code.
app/forbidden.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Forbidden() {
return (
&lt;div&gt;
&lt;h2&gt;Forbidden&lt;/h2&gt;
&lt;p&gt;You are not authorized to access this resource.&lt;/p&gt;
&lt;Link href=&quot;/&quot;&gt;Return Home&lt;/Link&gt;
&lt;/div&gt;
)
}</p>
<p>Reference</p>
<p>Props</p>
<p>forbidden.js components do not accept any props.
Version History</p>
<p>VersionChangesv15.1.0forbidden.js introduced.Next StepsforbiddenAPI Reference for the forbidden function.Was this helpful?</p>
<p>supported.Send</p>
