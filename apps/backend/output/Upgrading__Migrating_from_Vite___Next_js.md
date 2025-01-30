# Upgrading: Migrating from Vite | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationUpgradingMigrating from ViteMigrating from ViteThis guide will help you migrate an existing Vite application to Next.js.
Why Switch?</p>
<p>There are several reasons why you might want to switch from Vite to Next.js:
Slow initial page loading time</p>
<p>If you have built your application with the default Vite plugin for React, your application is a purely client-side application. Client-side only applications, also known as single-page applications (SPAs), often experience slow initial page loading time. This happens due to a couple of reasons:</p>
<p>The browser needs to wait for the React code and your entire application bundle to download and run before your code is able to send requests to load some data.
Your application code grows with every new feature and extra dependency you add.</p>
<p>No automatic code splitting</p>
<p>The previous issue of slow loading times can be somewhat managed with code splitting. However, if you try to do code splitting manually, you'll often make performance worse. It's easy to inadvertently introduce network waterfalls when code-splitting manually. Next.js provides automatic code splitting built into its router.
Network waterfalls</p>
<p>A common cause of poor performance occurs when applications make sequential client-server requests to fetch data. One common pattern for data fetching in an SPA is to initially render a placeholder, and then fetch data after the component has mounted. Unfortunately, this means that a child component that fetches data can't start fetching until the parent component has finished loading its own data.
While fetching data on the client is supported with Next.js, it also gives you the option to shift data fetching to the server, which can eliminate client-server waterfalls.
Fast and intentional loading states</p>
<p>With built-in support for streaming through React Suspense, you can be more intentional about which parts of your UI you want to load first and in what order without introducing network waterfalls.
This enables you to build pages that are faster to load and eliminate layout shifts.
Choose the data fetching strategy</p>
<p>Depending on your needs, Next.js allows you to choose your data fetching strategy on a page and component basis. You can decide to fetch at build time, at request time on the server, or on the client. For example, you can fetch data from your CMS and render your blog posts at build time, which can then be efficiently cached on a CDN.
Middleware</p>
<p>Next.js Middleware allows you to run code on the server before a request is completed. This is especially useful to avoid having a flash of unauthenticated content when the user visits an authenticated-only page by redirecting the user to a login page. The middleware is also useful for experimentation and internationalization.
Built-in Optimizations</p>
<p>Images, fonts, and third-party scripts often have significant impact on an application's performance. Next.js comes with built-in components that automatically optimize those for you.
Migration Steps</p>
<p>Our goal with this migration is to get a working Next.js application as quickly as possible, so that
you can then adopt Next.js features incrementally. To begin with, we'll keep it as a purely
client-side application (SPA) without migrating your existing router. This helps minimize the
chances of encountering issues during the migration process and reduces merge conflicts.
Step 1: Install the Next.js Dependency</p>
<p>The first thing you need to do is to install next as a dependency:
Terminalnpm install next@latest
Step 2: Create the Next.js Configuration File</p>
<p>Create a next.config.mjs at the root of your project. This file will hold your
Next.js configuration options.
next.config.mjs/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export', // Outputs a Single-Page Application (SPA).
distDir: './dist', // Changes the build output directory to <code>./dist/</code>.
}</p>
<p>export default nextConfig</p>
<p>Good to know: You can use either .js or .mjs for your Next.js configuration file.</p>
<p>Step 3: Update TypeScript Configuration</p>
<p>If you're using TypeScript, you need to update your tsconfig.json file with the following changes
to make it compatible with Next.js. If you're not using TypeScript, you can skip this step.</p>
<p>Remove the project reference to tsconfig.node.json
Add ./dist/types/**/*.ts and ./next-env.d.ts to the include array
Add ./node_modules to the exclude array
Add { &quot;name&quot;: &quot;next&quot; } to the plugins array in compilerOptions: &quot;plugins&quot;: [{ &quot;name&quot;: &quot;next&quot; }]
Set esModuleInterop to true: &quot;esModuleInterop&quot;: true
Set jsx to preserve: &quot;jsx&quot;: &quot;preserve&quot;
Set allowJs to true: &quot;allowJs&quot;: true
Set forceConsistentCasingInFileNames to true: &quot;forceConsistentCasingInFileNames&quot;: true
Set incremental to true: &quot;incremental&quot;: true</p>
<p>Here's an example of a working tsconfig.json with those changes:
tsconfig.json{
&quot;compilerOptions&quot;: {
&quot;target&quot;: &quot;ES2020&quot;,
&quot;useDefineForClassFields&quot;: true,
&quot;lib&quot;: [&quot;ES2020&quot;, &quot;DOM&quot;, &quot;DOM.Iterable&quot;],
&quot;module&quot;: &quot;ESNext&quot;,
&quot;esModuleInterop&quot;: true,
&quot;skipLibCheck&quot;: true,
&quot;moduleResolution&quot;: &quot;bundler&quot;,
&quot;allowImportingTsExtensions&quot;: true,
&quot;resolveJsonModule&quot;: true,
&quot;isolatedModules&quot;: true,
&quot;noEmit&quot;: true,
&quot;jsx&quot;: &quot;preserve&quot;,
&quot;strict&quot;: true,
&quot;noUnusedLocals&quot;: true,
&quot;noUnusedParameters&quot;: true,
&quot;noFallthroughCasesInSwitch&quot;: true,
&quot;allowJs&quot;: true,
&quot;forceConsistentCasingInFileNames&quot;: true,
&quot;incremental&quot;: true,
&quot;plugins&quot;: [{ &quot;name&quot;: &quot;next&quot; }]
},
&quot;include&quot;: [&quot;./src&quot;, &quot;./dist/types/**/*.ts&quot;, &quot;./next-env.d.ts&quot;],
&quot;exclude&quot;: [&quot;./node_modules&quot;]
}
You can find more information about configuring TypeScript on the
Next.js docs.
Step 4: Create the Root Layout</p>
<p>A Next.js App Router application must include a
root layout
file, which is a React Server Component
that will wrap all pages in your application. This file is defined at the top level of the app
directory.
The closest equivalent to the root layout file in a Vite application is the
index.html file, which contains your
&lt;html&gt;, &lt;head&gt;, and &lt;body&gt; tags.
In this step, you'll convert your index.html file into a root layout file:</p>
<p>Create a new app directory in your src directory.
Create a new layout.tsx file inside that app directory:</p>
<p>app/layout.tsxTypeScriptJavaScriptTypeScriptexport default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return '...'
}</p>
<p>Good to know: .js, .jsx, or .tsx extensions can be used for Layout files.</p>
<p>Copy the content of your index.html file into the previously created &lt;RootLayout&gt; component while
replacing the body.div#root and body.script tags with &lt;div id=&quot;root&quot;&gt;{children}&lt;/div&gt;:</p>
<p>app/layout.tsxTypeScriptJavaScriptTypeScriptexport default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
&lt;meta charset=&quot;UTF-8&quot; /&gt;
&lt;link rel=&quot;icon&quot; type=&quot;image/svg+xml&quot; href=&quot;/icon.svg&quot; /&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;
&lt;title&gt;My App&lt;/title&gt;
&lt;meta name=&quot;description&quot; content=&quot;My App is a...&quot; /&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;root&quot;&gt;{children}&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>Next.js already includes by default the
meta charset and
meta viewport tags, so you
can safely remove those from your &lt;head&gt;:</p>
<p>app/layout.tsxTypeScriptJavaScriptTypeScriptexport default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
&lt;link rel=&quot;icon&quot; type=&quot;image/svg+xml&quot; href=&quot;/icon.svg&quot; /&gt;
&lt;title&gt;My App&lt;/title&gt;
&lt;meta name=&quot;description&quot; content=&quot;My App is a...&quot; /&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;root&quot;&gt;{children}&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>Any metadata files
such as favicon.ico, icon.png, robots.txt are automatically added to the application
&lt;head&gt; tag as long as you have them placed into the top level of the app directory. After
moving
all supported files
into the app directory you can safely delete their &lt;link&gt; tags:</p>
<p>app/layout.tsxTypeScriptJavaScriptTypeScriptexport default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
&lt;title&gt;My App&lt;/title&gt;
&lt;meta name=&quot;description&quot; content=&quot;My App is a...&quot; /&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;root&quot;&gt;{children}&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>Finally, Next.js can manage your last &lt;head&gt; tags with the
Metadata API. Move your final metadata
info into an exported
metadata object:</p>
<p>app/layout.tsxTypeScriptJavaScriptTypeScriptimport type { Metadata } from 'next'</p>
<p>export const metadata: Metadata = {
title: 'My App',
description: 'My App is a...',
}</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;body&gt;
&lt;div id=&quot;root&quot;&gt;{children}&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>With the above changes, you shifted from declaring everything in your index.html to using Next.js'
convention-based approach built into the framework
(Metadata API). This approach enables you
to more easily improve your SEO and web shareability of your pages.
Step 5: Create the Entrypoint Page</p>
<p>On Next.js you declare an entrypoint for your application by creating a page.tsx file. The
closest equivalent of this file on Vite is your main.tsx file. In this step, you’ll set up the
entrypoint of your application.</p>
<p>Create a [[...slug]] directory in your app directory.</p>
<p>Since in this guide we're aiming first to set up our Next.js as an SPA (Single Page Application), you need your page entrypoint to catch all possible routes of your application. For that, create a new [[...slug]] directory in your app directory.
This directory is what is called an optional catch-all route segment. Next.js uses a file-system based router where folders are used to define routes. This special directory will make sure that all routes of your application will be directed to its containing page.tsx file.</p>
<p>Create a new page.tsx file inside the app/[[...slug]] directory with the following content:</p>
<p>app/[[...slug]]/page.tsxTypeScriptJavaScriptTypeScriptimport '../../index.css'</p>
<p>export function generateStaticParams() {
return [{ slug: [''] }]
}</p>
<p>export default function Page() {
return '...' // We'll update this
}</p>
<p>Good to know: .js, .jsx, or .tsx extensions can be used for Page files.</p>
<p>This file is a Server Component. When you run next build, the file is prerendered into a static asset. It does not require any dynamic code.
This file imports our global CSS and tells generateStaticParams we are only going to generate one route, the index route at /.
Now, let's move the rest of our Vite application which will run client-only.
app/[[...slug]]/client.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import React from 'react'
import dynamic from 'next/dynamic'</p>
<p>const App = dynamic(() =&gt; import('../../App'), { ssr: false })</p>
<p>export function ClientOnly() {
return &lt;App /&gt;
}</p>
<p>This file is a Client Component, defined by the 'use client'
directive. Client Components are still prerendered to HTML on the server before being sent to the client.
Since we want a client-only application to start, we can configure Next.js to disable prerendering from the App component down.
const App = dynamic(() =&gt; import('../../App'), { ssr: false })
Now, update your entrypoint page to use the new component:
app/[[...slug]]/page.tsxTypeScriptJavaScriptTypeScriptimport '../../index.css'
import { ClientOnly } from './client'</p>
<p>export function generateStaticParams() {
return [{ slug: [''] }]
}</p>
<p>export default function Page() {
return &lt;ClientOnly /&gt;
}</p>
<p>Step 6: Update Static Image Imports</p>
<p>Next.js handles static image imports slightly different from Vite. With Vite, importing an image
file will return its public URL as a string:
App.tsximport image from './img.png' // <code>image</code> will be '/assets/img.2d8efhg.png' in production</p>
<p>export default function App() {
return &lt;img src={image} /&gt;
}
With Next.js, static image imports return an object. The object can then be used directly with the
Next.js &lt;Image&gt; component, or you can use the object's
src property with your existing &lt;img&gt; tag.
The &lt;Image&gt; component has the added benefits of
automatic image optimization. The &lt;Image&gt;
component automatically sets the width and height attributes of the resulting &lt;img&gt; based on
the image's dimensions. This prevents layout shifts when the image loads. However, this can cause
issues if your app contains images with only one of their dimensions being styled without the other
styled to auto. When not styled to auto, the dimension will default to the &lt;img&gt; dimension
attribute's value, which can cause the image to appear distorted.
Keeping the &lt;img&gt; tag will reduce the amount of changes in your application and prevent the above
issues. You can then optionally later migrate to the &lt;Image&gt; component to take advantage of optimizing images by configuring a loader, or moving to the default Next.js server which has automatic image optimization.</p>
<p>Convert absolute import paths for images imported from /public into relative imports:</p>
<p>// Before
import logo from '/logo.png'</p>
<p>// After
import logo from '../public/logo.png'</p>
<p>Pass the image src property instead of the whole image object to your &lt;img&gt; tag:</p>
<p>// Before
&lt;img src={logo} /&gt;</p>
<p>// After
&lt;img src={logo.src} /&gt;
Alternatively, you can reference the public URL for the image asset based on the filename. For example, public/logo.png will serve the image at /logo.png for your application, which would be the src value.</p>
<p>Warning: If you're using TypeScript, you might encounter type errors when accessing the src
property. You can safely ignore those for now. They will be fixed by the end of this guide.</p>
<p>Step 7: Migrate the Environment Variables</p>
<p>Next.js has support for .env
environment variables
similar to Vite. The main difference is the prefix used to expose environment variables on the
client-side.</p>
<p>Change all environment variables with the VITE_ prefix to NEXT_PUBLIC_.</p>
<p>Vite exposes a few built-in environment variables on the special import.meta.env object which
aren’t supported by Next.js. You need to update their usage as follows:</p>
<p>import.meta.env.MODE ⇒ process.env.NODE_ENV
import.meta.env.PROD ⇒ process.env.NODE_ENV === 'production'
import.meta.env.DEV ⇒ process.env.NODE_ENV !== 'production'
import.meta.env.SSR ⇒ typeof window !== 'undefined'</p>
<p>Next.js also doesn't provide a built-in BASE_URL environment variable. However, you can still
configure one, if you need it:</p>
<p>Add the following to your .env file:</p>
<p>.env# ...
NEXT_PUBLIC_BASE_PATH=&quot;/some-base-path&quot;</p>
<p>Set basePath to process.env.NEXT_PUBLIC_BASE_PATH in your next.config.mjs file:</p>
<p>next.config.mjs/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export', // Outputs a Single-Page Application (SPA).
distDir: './dist', // Changes the build output directory to <code>./dist/</code>.
basePath: process.env.NEXT_PUBLIC_BASE_PATH, // Sets the base path to <code>/some-base-path</code>.
}</p>
<p>export default nextConfig</p>
<p>Update import.meta.env.BASE_URL usages to process.env.NEXT_PUBLIC_BASE_PATH</p>
<p>Step 8: Update Scripts in package.json</p>
<p>You should now be able to run your application to test if you successfully migrated to Next.js. But
before that, you need to update your scripts in your package.json with Next.js related commands,
and add .next and next-env.d.ts to your .gitignore:
package.json{
&quot;scripts&quot;: {
&quot;dev&quot;: &quot;next dev&quot;,
&quot;build&quot;: &quot;next build&quot;,
&quot;start&quot;: &quot;next start&quot;
}
}
.gitignore# ...
.next
next-env.d.ts
dist
Now run npm run dev, and open http://localhost:3000. You should see your application now running on Next.js.</p>
<p>Example: Check out this pull request for a
working example of a Vite application migrated to Next.js.</p>
<p>Step 9: Clean Up</p>
<p>You can now clean up your codebase from Vite related artifacts:</p>
<p>Delete main.tsx
Delete index.html
Delete vite-env.d.ts
Delete tsconfig.node.json
Delete vite.config.ts
Uninstall Vite dependencies</p>
<p>Next Steps</p>
<p>If everything went according to plan, you now have a functioning Next.js application running as a
single-page application. However, you aren't yet taking advantage of most of Next.js' benefits, but
you can now start making incremental changes to reap all the benefits. Here's what you might want to
do next:</p>
<p>Migrate from React Router to the Next.js App Router to get:</p>
<p>Automatic code splitting
Streaming Server-Rendering
React Server Components</p>
<p>Optimize images with the &lt;Image&gt; component
Optimize fonts with next/font
Optimize third-party scripts with the &lt;Script&gt; component
Update your ESLint configuration to support Next.js rules
Was this helpful?</p>
<p>supported.Send</p>
