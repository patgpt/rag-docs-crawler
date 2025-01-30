# next.config.js: webpack | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jswebpackCustom Webpack Config</p>
<p>Good to know: changes to webpack config are not covered by semver so proceed at your own risk</p>
<p>Before continuing to add custom webpack configuration to your application make sure Next.js doesn't already support your use-case:</p>
<p>CSS imports
CSS modules
Sass/SCSS imports
Sass/SCSS modules</p>
<p>Some commonly asked for features are available as plugins:</p>
<p>@next/mdx
@next/bundle-analyzer</p>
<p>In order to extend our usage of webpack, you can define a function that extends its config inside next.config.js, like so:
next.config.jsmodule.exports = {
webpack: (
config,
{ buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
) =&gt; {
// Important: return the modified config
return config
},
}</p>
<p>The webpack function is executed three times, twice for the server (nodejs / edge runtime) and once for the client. This allows you to distinguish between client and server configuration using the isServer property.</p>
<p>The second argument to the webpack function is an object with the following properties:</p>
<p>buildId: String - The build id, used as a unique identifier between builds.
dev: Boolean - Indicates if the compilation will be done in development.
isServer: Boolean - It's true for server-side compilation, and false for client-side compilation.
nextRuntime: String | undefined - The target runtime for server-side compilation; either &quot;edge&quot; or &quot;nodejs&quot;, it's undefined for client-side compilation.
defaultLoaders: Object - Default loaders used internally by Next.js:</p>
<p>babel: Object - Default babel-loader configuration.</p>
<p>Example usage of defaultLoaders.babel:
// Example config for adding a loader that depends on babel-loader
// This source was taken from the @next/mdx plugin source:
// https://github.com/vercel/next.js/tree/canary/packages/next-mdx
module.exports = {
webpack: (config, options) =&gt; {
config.module.rules.push({
test: /.mdx/,
use: [
options.defaultLoaders.babel,
{
loader: '@mdx-js/loader',
options: pluginOptions.options,
},
],
})</p>
<pre><code>return config
</code></pre>
<p>},
}
nextRuntime</p>
<p>Notice that isServer is true when nextRuntime is &quot;edge&quot; or &quot;nodejs&quot;, nextRuntime &quot;edge&quot; is currently for middleware and Server Components in edge runtime only.Was this helpful?</p>
<p>supported.Send</p>
