# File Conventions: loading.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionsloading.jsloading.jsA loading file can create instant loading states built on Suspense.
By default, this file is a Server Component - but can also be used as a Client Component through the &quot;use client&quot; directive.
app/feed/loading.tsxTypeScriptJavaScriptTypeScriptexport default function Loading() {
// Or a custom loading skeleton component
return &lt;p&gt;Loading...&lt;/p&gt;
}</p>
<p>Loading UI components do not accept any parameters.</p>
<p>Good to know:</p>
<p>While designing loading UI, you may find it helpful to use the React Developer Tools to manually toggle Suspense boundaries.</p>
<p>Version History</p>
<p>VersionChangesv13.0.0loading introduced.Was this helpful?</p>
<p>supported.Send</p>
