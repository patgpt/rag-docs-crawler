# next.config.js: reactCompiler | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsreactCompilerreactCompilerThis feature is currently experimental and subject to change, it's not recommended for production. Try it out and share your feedback on GitHub.Next.js 15 introduced support for the React Compiler. The compiler improves performance by automatically optimizing component rendering. This reduces the amount of manual memoization developers have to do through APIs such as useMemo and useCallback.
To use it, upgrade to Next.js 15, install the babel-plugin-react-compiler:
Terminalnpm install babel-plugin-react-compiler
Then, add experimental.reactCompiler option in next.config.js:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
reactCompiler: true,
},
}</p>
<p>export default nextConfig</p>
<p>Note: The React Compiler is currently only possible to use in Next.js through a Babel plugin. This will opt-out of Next.js's default Rust-based compiler, which could result in slower build times. We are working on support for the React Compiler as our default compiler.</p>
<p>Annotations</p>
<p>You can configure the compiler to run in &quot;opt-in&quot; mode as follows:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
reactCompiler: {
compilationMode: 'annotation',
},
},
}</p>
<p>export default nextConfig</p>
<p>Then, you can annotate specific components or hooks with the &quot;use memo&quot; directive from React to opt-in:
app/page.tsxTypeScriptJavaScriptTypeScriptexport default function Page() {
'use memo'
// ...
}</p>
<p>Note: You can also use the &quot;use no memo&quot; directive from React for the opposite effect, to opt-out a component or hook.
Was this helpful?</p>
<p>supported.Send</p>
