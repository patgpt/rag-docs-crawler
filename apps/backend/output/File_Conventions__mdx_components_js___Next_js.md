# File Conventions: mdx-components.js | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile Conventionsmdx-components.jsmdx-components.jsThe mdx-components.js|tsx file is required to use @next/mdx with App Router and will not work without it. Additionally, you can use it to customize styles.
Use the file mdx-components.tsx (or .js) in the root of your project to define MDX Components. For example, at the same level as pages or app, or inside src if applicable.
mdx-components.tsxTypeScriptJavaScriptTypeScriptimport type { MDXComponents } from 'mdx/types'</p>
<p>export function useMDXComponents(components: MDXComponents): MDXComponents {
return {
...components,
}
}</p>
<p>Exports</p>
<p>useMDXComponents function</p>
<p>The file must export a single function, either as a default export or named useMDXComponents.
mdx-components.tsxTypeScriptJavaScriptTypeScriptimport type { MDXComponents } from 'mdx/types'</p>
<p>export function useMDXComponents(components: MDXComponents): MDXComponents {
return {
...components,
}
}</p>
<p>Params</p>
<p>components</p>
<p>When defining MDX Components, the export function accepts a single parameter, components. This parameter is an instance of MDXComponents.</p>
<p>The key is the name of the HTML element to override.
The value is the component to render instead.</p>
<p>Good to know: Remember to pass all other components (i.e. ...components) that do not have overrides.</p>
<p>Version History</p>
<p>VersionChangesv13.1.2MDX Components addedLearn more about MDX ComponentsMDXLearn how to configure MDX and use it in your Next.js apps.Was this helpful?</p>
<p>supported.Send</p>
