# Functions: generateViewport | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsgenerateViewportgenerateViewportYou can customize the initial viewport of the page with the static viewport object or the dynamic generateViewport function.</p>
<p>Good to know:</p>
<p>The viewport object and generateViewport function exports are only supported in Server Components.
You cannot export both the viewport object and generateViewport function from the same route segment.
If you're coming from migrating metadata exports, you can use metadata-to-viewport-export codemod to update your changes.</p>
<p>The viewport object</p>
<p>To define the viewport options, export a viewport object from a layout.jsx or page.jsx file.
layout.tsx | page.tsxTypeScriptJavaScriptTypeScriptimport type { Viewport } from 'next'</p>
<p>export const viewport: Viewport = {
themeColor: 'black',
}</p>
<p>export default function Page() {}</p>
<p>generateViewport function</p>
<p>generateViewport should return a Viewport object containing one or more viewport fields.
layout.tsx | page.tsxTypeScriptJavaScriptTypeScriptexport function generateViewport({ params }) {
return {
themeColor: '...',
}
}</p>
<p>Good to know:</p>
<p>If the viewport doesn't depend on runtime information, it should be defined using the static viewport object rather than generateViewport.</p>
<p>Viewport Fields</p>
<p>themeColor</p>
<p>Learn more about theme-color.
Simple theme color
layout.tsx | page.tsxTypeScriptJavaScriptTypeScriptimport type { Viewport } from 'next'</p>
<p>export const viewport: Viewport = {
themeColor: 'black',
}</p>
<p>&lt;head&gt; output&lt;meta name=&quot;theme-color&quot; content=&quot;black&quot; /&gt;
With media attribute
layout.tsx | page.tsxTypeScriptJavaScriptTypeScriptimport type { Viewport } from 'next'</p>
<p>export const viewport: Viewport = {
themeColor: [
{ media: '(prefers-color-scheme: light)', color: 'cyan' },
{ media: '(prefers-color-scheme: dark)', color: 'black' },
],
}</p>
<p>&lt;head&gt; output&lt;meta name=&quot;theme-color&quot; media=&quot;(prefers-color-scheme: light)&quot; content=&quot;cyan&quot; /&gt;
&lt;meta name=&quot;theme-color&quot; media=&quot;(prefers-color-scheme: dark)&quot; content=&quot;black&quot; /&gt;
width, initialScale, maximumScale and userScalable</p>
<p>Good to know: The viewport meta tag is automatically set, and manual configuration is usually unnecessary as the default is sufficient. However, the information is provided for completeness.</p>
<p>layout.tsx | page.tsxTypeScriptJavaScriptTypeScriptimport type { Viewport } from 'next'</p>
<p>export const viewport: Viewport = {
width: 'device-width',
initialScale: 1,
maximumScale: 1,
userScalable: false,
// Also supported but less commonly used
// interactiveWidget: 'resizes-visual',
}</p>
<p>&lt;head&gt; output&lt;meta
name=&quot;viewport&quot;
content=&quot;width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no&quot;
/&gt;
colorScheme</p>
<p>Learn more about color-scheme.
layout.tsx | page.tsxTypeScriptJavaScriptTypeScriptimport type { Viewport } from 'next'</p>
<p>export const viewport: Viewport = {
colorScheme: 'dark',
}</p>
<p>&lt;head&gt; output&lt;meta name=&quot;color-scheme&quot; content=&quot;dark&quot; /&gt;
Types</p>
<p>You can add type safety to your viewport object by using the Viewport type. If you are using the built-in TypeScript plugin in your IDE, you do not need to manually add the type, but you can still explicitly add it if you want.
viewport object</p>
<p>import type { Viewport } from 'next'</p>
<p>export const viewport: Viewport = {
themeColor: 'black',
}
generateViewport function</p>
<p>Regular function</p>
<p>import type { Viewport } from 'next'</p>
<p>export function generateViewport(): Viewport {
return {
themeColor: 'black',
}
}
With segment props</p>
<p>import type { Viewport } from 'next'</p>
<p>type Props = {
params: Promise&lt;{ id: string }&gt;
searchParams: Promise&lt;{ [key: string]: string | string[] | undefined }&gt;
}</p>
<p>export function generateViewport({ params, searchParams }: Props): Viewport {
return {
themeColor: 'black',
}
}</p>
<p>export default function Page({ params, searchParams }: Props) {}
JavaScript Projects</p>
<p>For JavaScript projects, you can use JSDoc to add type safety.
/** @type {import(&quot;next&quot;).Viewport} */
export const viewport = {
themeColor: 'black',
}
Version History</p>
<p>VersionChangesv14.0.0viewport and generateViewport introduced.Next StepsView all the Metadata API options.Metadata FilesAPI documentation for the metadata file conventions.MetadataUse the Metadata API to define metadata in any layout or page.Was this helpful?</p>
<p>supported.Send</p>
