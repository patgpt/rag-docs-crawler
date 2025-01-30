# Styling: Sass | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationStylingSassSass
Next.js has built-in support for integrating with Sass after the package is installed using both the .scss and .sass extensions. You can use component-level Sass via CSS Modules and the .module.scssor .module.sass extension.
First, install sass:
Terminalnpm install --save-dev sass</p>
<p>Good to know:
Sass supports two different syntaxes, each with their own extension.
The .scss extension requires you use the SCSS syntax,
while the .sass extension requires you use the Indented Syntax (&quot;Sass&quot;).
If you're not sure which to choose, start with the .scss extension which is a superset of CSS, and doesn't require you learn the
Indented Syntax (&quot;Sass&quot;).</p>
<p>Customizing Sass Options</p>
<p>If you want to configure your Sass options, use sassOptions in next.config.
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
sassOptions: {
additionalData: <code>$var: red;</code>,
},
}</p>
<p>export default nextConfig</p>
<p>Implementation</p>
<p>You can use the implementation property to specify the Sass implementation to use. By default, Next.js uses the sass package.
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
sassOptions: {
implementation: 'sass-embedded',
},
}</p>
<p>export default nextConfig</p>
<p>Sass Variables</p>
<p>Next.js supports Sass variables exported from CSS Module files.
For example, using the exported primaryColor Sass variable:
app/variables.module.scss$primary-color: #64ff00;</p>
<p>:export {
primaryColor: $primary-color;
}
app/page.js// maps to root <code>/</code> URL</p>
<p>import variables from './variables.module.scss'</p>
<p>export default function Page() {
return &lt;h1 style={{ color: variables.primaryColor }}&gt;Hello, Next.js!&lt;/h1&gt;
}
Was this helpful?</p>
<p>supported.Send</p>
