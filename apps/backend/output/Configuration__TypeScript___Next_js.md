# Configuration: TypeScript | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceConfigurationTypeScriptTypeScript
Next.js comes with built-in TypeScript, automatically installing the necessary packages and configuring the proper settings when you create a new project with create-next-app.
To add TypeScript to an existing project, rename a file to .ts / .tsx. Run next dev and next build to automatically install the necessary dependencies and add a tsconfig.json file with the recommended config options.</p>
<p>Good to know: If you already have a jsconfig.json file, copy the paths compiler option from the old jsconfig.json into the new tsconfig.json file, and delete the old jsconfig.json file.</p>
<p>IDE Plugin</p>
<p>Next.js includes a custom TypeScript plugin and type checker, which VSCode and other code editors can use for advanced type-checking and auto-completion.You can enable the plugin in VS Code by:
Opening the command palette (Ctrl/⌘ + Shift + P)
Searching for &quot;TypeScript: Select TypeScript Version&quot;
Selecting &quot;Use Workspace Version&quot;
Now, when editing files, the custom plugin will be enabled. When running next build, the custom type checker will be used.The TypeScript plugin can help with:
Warning if the invalid values for segment config options are passed.
Showing available options and in-context documentation.
Ensuring the use client directive is used correctly.
Ensuring client hooks (like useState) are only used in Client Components.</p>
<p>🎥 Watch: Learn about the built-in TypeScript plugin → YouTube (3 minutes)
End-to-End Type Safety</p>
<p>The Next.js App Router has enhanced type safety. This includes:
No serialization of data between fetching function and page: You can fetch directly in components, layouts, and pages on the server. This data does not need to be serialized (converted to a string) to be passed to the client side for consumption in React. Instead, since app uses Server Components by default, we can use values like Date, Map, Set, and more without any extra steps. Previously, you needed to manually type the boundary between server and client with Next.js-specific types.
Streamlined data flow between components: With the removal of _app in favor of root layouts, it is now easier to visualize the data flow between components and pages. Previously, data flowing between individual pages and _app were difficult to type and could introduce confusing bugs. With colocated data fetching in the App Router, this is no longer an issue.
Data Fetching in Next.js now provides as close to end-to-end type safety as possible without being prescriptive about your database or content provider selection.We're able to type the response data as you would expect with normal TypeScript. For example:app/page.tsxTypeScriptJavaScriptTypeScriptasync function getData() {
const res = await fetch('https://api.example.com/...')
// The return value is <em>not</em> serialized
// You can return Date, Map, Set, etc.
return res.json()
}</p>
<p>export default async function Page() {
const name = await getData()</p>
<p>return '...'
}For complete end-to-end type safety, this also requires your database or content provider to support TypeScript. This could be through using an ORM or type-safe query builder.
Examples</p>
<p>Type checking next.config.ts</p>
<p>You can use TypeScript and import types in your Next.js configuration by using next.config.ts.
next.config.tsimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
/* config options here */
}</p>
<p>export default nextConfig</p>
<p>Good to know: Module resolution in next.config.ts is currently limited to CommonJS. This may cause incompatibilities with ESM only packages being loaded in next.config.ts.</p>
<p>When using the next.config.js file, you can add some type checking in your IDE using JSDoc as below:
next.config.js// @ts-check</p>
<p>/** @type {import('next').NextConfig} <em>/
const nextConfig = {
/</em> config options here */
}</p>
<p>module.exports = nextConfig
Statically Typed Links</p>
<p>Next.js can statically type links to prevent typos and other errors when using next/link, improving type safety when navigating between pages.To opt-into this feature, experimental.typedRoutes need to be enabled and the project needs to be using TypeScript.next.config.tsimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
typedRoutes: true,
},
}</p>
<p>export default nextConfigNext.js will generate a link definition in .next/types that contains information about all existing routes in your application, which TypeScript can then use to provide feedback in your editor about invalid links.Currently, experimental support includes any string literal, including dynamic segments. For non-literal strings, you currently need to manually cast the href with as Route:import type { Route } from 'next';
import Link from 'next/link'</p>
<p>// No TypeScript errors if href is a valid route
&lt;Link href=&quot;/about&quot; /&gt;
&lt;Link href=&quot;/blog/nextjs&quot; /&gt;
&lt;Link href={<code>/blog/${slug}</code>} /&gt;
&lt;Link href={('/blog' + slug) as Route} /&gt;</p>
<p>// TypeScript errors if href is not a valid route
&lt;Link href=&quot;/aboot&quot; /&gt;To accept href in a custom component wrapping next/link, use a generic:import type { Route } from 'next'
import Link from 'next/link'</p>
<p>function Card&lt;T extends string&gt;({ href }: { href: Route&lt;T&gt; | URL }) {
return (
&lt;Link href={href}&gt;
&lt;div&gt;My Card&lt;/div&gt;
&lt;/Link&gt;
)
}
How does it work?
When running next dev or next build, Next.js generates a hidden .d.ts file inside .next that contains information about all existing routes in your application (all valid routes as the href type of Link). This .d.ts file is included in tsconfig.json and the TypeScript compiler will check that .d.ts and provide feedback in your editor about invalid links.
With Async Server Components</p>
<p>To use an async Server Component with TypeScript, ensure you are using TypeScript 5.1.3 or higher and @types/react 18.2.8 or higher.If you are using an older version of TypeScript, you may see a 'Promise&lt;Element&gt;' is not a valid JSX element type error. Updating to the latest version of TypeScript and @types/react should resolve this issue.</p>
<p>Incremental type checking</p>
<p>Since v10.2.1 Next.js supports incremental type checking when enabled in your tsconfig.json, this can help speed up type checking in larger applications.
Disabling TypeScript errors in production</p>
<p>Next.js fails your production build (next build) when TypeScript errors are present in your project.
If you'd like Next.js to dangerously produce production code even when your application has errors, you can disable the built-in type checking step.
If disabled, be sure you are running type checks as part of your build or deploy process, otherwise this can be very dangerous.
Open next.config.ts and enable the ignoreBuildErrors option in the typescript config:
next.config.tsimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
typescript: {
// !! WARN !!
// Dangerously allow production builds to successfully complete even if
// your project has type errors.
// !! WARN !!
ignoreBuildErrors: true,
},
}</p>
<p>export default nextConfig</p>
<p>Good to know: You can run tsc --noEmit to check for TypeScript errors yourself before building. This is useful for CI/CD pipelines where you'd like to check for TypeScript errors before deploying.</p>
<p>Custom type declarations</p>
<p>When you need to declare custom types, you might be tempted to modify next-env.d.ts. However, this file is automatically generated, so any changes you make will be overwritten. Instead, you should create a new file, let's call it new-types.d.ts, and reference it in your tsconfig.json:
tsconfig.json{
&quot;compilerOptions&quot;: {
&quot;skipLibCheck&quot;: true
//...truncated...
},
&quot;include&quot;: [
&quot;new-types.d.ts&quot;,
&quot;next-env.d.ts&quot;,
&quot;.next/types/<strong>/*.ts&quot;,
&quot;</strong>/<em>.ts&quot;,
&quot;**/</em>.tsx&quot;
],
&quot;exclude&quot;: [&quot;node_modules&quot;]
}
Version Changes</p>
<p>VersionChangesv15.0.0next.config.ts support added for TypeScript projects.v13.2.0Statically typed links are available in beta.v12.0.0SWC is now used by default to compile TypeScript and TSX for faster builds.v10.2.1Incremental type checking support added when enabled in your tsconfig.json.Was this helpful?</p>
<p>supported.Send</p>
