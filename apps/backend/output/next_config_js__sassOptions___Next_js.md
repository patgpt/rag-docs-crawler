# next.config.js: sassOptions | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jssassOptionssassOptionssassOptions allow you to configure the Sass compiler.
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const sassOptions = {
additionalData: <code>    $var: red;  </code>,
}</p>
<p>const nextConfig: NextConfig = {
sassOptions: {
...sassOptions,
implementation: 'sass-embedded',
},
}</p>
<p>export default nextConfig</p>
<p>Good to know: sassOptions are not typed outside of implementation because Next.js does not maintain the other possible properties.
Was this helpful?</p>
<p>supported.Send</p>
