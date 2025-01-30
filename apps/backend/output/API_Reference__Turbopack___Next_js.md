# API Reference: Turbopack | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6App RouterAPI ReferenceTurbopackTurbopack
Turbopack is an incremental bundler optimized for JavaScript and TypeScript, written in Rust, and built into Next.js. Turbopack can be used in Next.js in both the pages and app directories for faster local development.
To enable Turbopack, use the --turbopack flag when running the Next.js development server.
package.json{
&quot;scripts&quot;: {
&quot;dev&quot;: &quot;next dev --turbopack&quot;,
&quot;build&quot;: &quot;next build&quot;,
&quot;start&quot;: &quot;next start&quot;,
&quot;lint&quot;: &quot;next lint&quot;
}
}
Reference</p>
<p>Supported features</p>
<p>Turbopack in Next.js requires zero-configuration for most users and can be extended for more advanced use cases. To learn more about the currently supported features for Turbopack, view the API Reference.
Unsupported features</p>
<p>Turbopack currently only supports next dev and does not support next build. We are currently working on support for builds as we move closer towards stability.
These features are currently not supported:</p>
<p>Turbopack leverages Lightning CSS which doesn't support some low usage CSS Modules features</p>
<p>:local and :global as standalone pseudo classes. Only the function variant is supported, for example: :global(a).
The @value rule which has been superseded by CSS variables.
:import and :export ICSS rules.</p>
<p>Invalid CSS comment syntax such as //</p>
<p>CSS comments should be written as /* comment */ per the specification.
Preprocessors such as Sass do support this alternative syntax for comments.</p>
<p>webpack() configuration in next.config.js</p>
<p>Turbopack replaces Webpack, this means that webpack configuration is not supported.
To configure Turbopack, see the documentation.
A subset of Webpack loaders are supported in Turbopack.</p>
<p>Babel (.babelrc)</p>
<p>Turbopack leverages the SWC compiler for all transpilation and optimizations. This means that Babel is not included by default.
If you have a .babelrc file, you might no longer need it because Next.js includes common Babel plugins as SWC transforms that can be enabled. You can read more about this in the compiler documentation.
If you still need to use Babel after verifying your particular use case is not covered, you can leverage Turbopack's support for custom webpack loaders to include babel-loader.</p>
<p>Creating a root layout automatically in App Router.</p>
<p>This behavior is currently not supported since it changes input files, instead, an error will be shown for you to manually add a root layout in the desired location.</p>
<p>@next/font (legacy font support).</p>
<p>@next/font is deprecated in favor of next/font. next/font is fully supported with Turbopack.</p>
<p>Relay transforms</p>
<p>We are planning to implement this in the future.</p>
<p>Blocking .css imports in pages/_document.tsx</p>
<p>Currently with webpack Next.js blocks importing .css files in pages/_document.tsx
We are planning to implement this warning in the future.</p>
<p>experimental.typedRoutes</p>
<p>We are planning to implement this in the future.</p>
<p>experimental.nextScriptWorkers</p>
<p>We are planning to implement this in the future.</p>
<p>experimental.sri.algorithm</p>
<p>We are planning to implement this in the future.</p>
<p>experimental.fallbackNodePolyfills</p>
<p>We are planning to implement this in the future.</p>
<p>experimental.esmExternals</p>
<p>We are currently not planning to support the legacy esmExternals configuration in Next.js with Turbopack.</p>
<p>AMP.</p>
<p>We are currently not planning to support AMP in Next.js with Turbopack.</p>
<p>Yarn PnP</p>
<p>We are currently not planning to support Yarn PnP in Next.js with Turbopack.</p>
<p>experimental.urlImports</p>
<p>We are currently not planning to support experimental.urlImports in Next.js with Turbopack.</p>
<p>:import and :export ICSS rules</p>
<p>We are currently not planning to support :import and :export ICSS rules in Next.js with Turbopack as Lightning CSS the CSS parser Turbopack uses does not support these rules.</p>
<p>unstable_allowDynamic configuration in edge runtime</p>
<p>Examples</p>
<p>Generating Trace Files</p>
<p>Trace files allow the Next.js team to investigate and improve performance metrics and memory usage. To generate a trace file, append NEXT_TURBOPACK_TRACING=1 to the next dev --turbopack command, this will generate a .next/trace-turbopack file.
When reporting issues related to Turbopack performance and memory usage, please include the trace file in your GitHub issue.Was this helpful?</p>
<p>supported.Send</p>
