# File Conventions: template.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionstemplate.jstemplate.jsA template file is similar to a layout in that it wraps a layout or page. Unlike layouts that persist across routes and maintain state, templates are given a unique key, meaning children Client Components reset their state on navigation.
app/template.tsxTypeScriptJavaScriptTypeScriptexport default function Template({ children }: { children: React.ReactNode }) {
return &lt;div&gt;{children}&lt;/div&gt;
}</p>
<p>While less common, you might choose to use a template over a layout if you want:</p>
<p>Features that rely on useEffect (e.g logging page views) and useState (e.g a per-page feedback form).
To change the default framework behavior. For example, Suspense Boundaries inside layouts only show the fallback the first time the Layout is loaded and not when switching pages. For templates, the fallback is shown on each navigation.</p>
<p>Props</p>
<p>children (required)</p>
<p>Template accepts a children prop. For example:
Output&lt;Layout&gt;
{/* Note that the template is automatically given a unique key. */}
&lt;Template key={routeParam}&gt;{children}&lt;/Template&gt;
&lt;/Layout&gt;</p>
<p>Good to know:</p>
<p>By default, template is a Server Component, but can also be used as a Client Component through the &quot;use client&quot; directive.
When a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreated, state is not preserved in Client Components, and effects are re-synchronized.</p>
<p>Version History</p>
<p>VersionChangesv13.0.0template introduced.Was this helpful?</p>
<p>supported.Send</p>
