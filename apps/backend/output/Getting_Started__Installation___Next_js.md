# Getting Started: Installation | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6App RouterGetting StartedInstallationHow to set up a new Next.js project
System requirements</p>
<p>Node.js 18.18 or later.
macOS, Windows (including WSL), and Linux are supported.</p>
<p>Automatic installation</p>
<p>We recommend starting a new Next.js app using create-next-app, which sets up everything automatically for you. To create a project, run:
Terminalnpx create-next-app@latest
On installation, you'll see the following prompts:
TerminalWhat is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a <code>src/</code> directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack for <code>next dev</code>?  No / Yes
Would you like to customize the import alias (<code>@/*</code> by default)? No / Yes
What import alias would you like configured? @/*
After the prompts, create-next-app will create a folder with your project name and install the required dependencies.
Manual installation</p>
<p>To manually create a new Next.js app, install the required packages:
Terminalnpm install next@latest react@latest react-dom@latest
Open your package.json file and add the following scripts:
package.json{
&quot;scripts&quot;: {
&quot;dev&quot;: &quot;next dev&quot;,
&quot;build&quot;: &quot;next build&quot;,
&quot;start&quot;: &quot;next start&quot;,
&quot;lint&quot;: &quot;next lint&quot;
}
}
These scripts refer to the different stages of developing an application:</p>
<p>dev: runs next dev to start Next.js in development mode.
build: runs next build to build the application for production usage.
start: runs next start to start a Next.js production server.
lint: runs next lint to set up Next.js' built-in ESLint configuration.</p>
<p>Create the app directory</p>
<p>Next.js uses file-system routing, which means the routes in your application are determined by how you structure your files.Create an app folder, then add a layout.tsx and page.tsx file. These will be rendered when the user visits the root of your application (/).Create a root layout inside app/layout.tsx with the required &lt;html&gt; and &lt;body&gt; tags:app/layout.tsxTypeScriptJavaScriptTypeScriptexport default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}Finally, create a home page app/page.tsx with some initial content:app/page.tsxTypeScriptJavaScriptTypeScriptexport default function Page() {
return &lt;h1&gt;Hello, Next.js!&lt;/h1&gt;
}
Good to know:</p>
<p>If you forget to create layout.tsx, Next.js will automatically create this file when running the development server with next dev.
You can optionally use a src directory in the root of your project to separate your application's code from configuration files.</p>
<p>Create the public folder (optional)</p>
<p>You can optionally create a public folder at the root of your project to store static assets such as images, fonts, etc. Files inside public can then be referenced by your code starting from the base URL (/).
Run the development server</p>
<p>Run npm run dev to start the development server.
Visit http://localhost:3000 to view your application.
Edit theapp/page.tsx  file and save it to see the updated result in your browser.</p>
<p>Set up TypeScript</p>
<p>Minimum TypeScript version: v4.5.2</p>
<p>Next.js comes with built-in TypeScript support. To add TypeScript to your project, rename a file to .ts / .tsx. Run next dev, Next.js will automatically install the necessary dependencies and add a tsconfig.json file with the recommended config options.
IDE Plugin</p>
<p>Next.js includes a custom TypeScript plugin and type checker, which VSCode and other code editors can use for advanced type-checking and auto-completion.You can enable the plugin in VS Code by:
Opening the command palette (Ctrl/⌘ + Shift + P)
Searching for &quot;TypeScript: Select TypeScript Version&quot;
Selecting &quot;Use Workspace Version&quot;
Now, when editing files, the custom plugin will be enabled. When running next build, the custom type checker will be used.
See the TypeScript configuration page for more information on how to use TypeScript in your project.
Set up ESLint</p>
<p>Next.js comes with built-in ESLint, automatically installing the necessary packages and configuring the proper settings when you create a new project with create-next-app.
To add ESLint to an existing project, add next lint as a script to package.json:
package.json{
&quot;scripts&quot;: {
&quot;lint&quot;: &quot;next lint&quot;
}
}
Then, run npm run lint and you will be guided through the installation and configuration process.
Terminalpnpm lint
You'll see a prompt like this:</p>
<p>? How would you like to configure ESLint?
❯ Strict (recommended)
Base
Cancel</p>
<p>Strict: Includes Next.js' base ESLint configuration along with a stricter Core Web Vitals rule-set. This is the recommended configuration for developers setting up ESLint for the first time.
Base: Includes Next.js' base ESLint configuration.
Cancel: Does not include any ESLint configuration. Only select this option if you plan on setting up your own custom ESLint configuration.</p>
<p>If either of the two configuration options are selected, Next.js will automatically install eslint and eslint-config-next as dependencies in your application and create an .eslintrc.json file in the root of your project that includes your selected configuration.
You can now run next lint every time you want to run ESLint to catch errors. Once ESLint has been set up, it will also automatically run during every build (next build). Errors will fail the build, while warnings will not.
See the ESLint Plugin page for more information on how to configure ESLint in your project.
Set up Absolute Imports and Module Path Aliases</p>
<p>Next.js has in-built support for the &quot;paths&quot; and &quot;baseUrl&quot; options of tsconfig.json and jsconfig.json files. These options allow you to alias project directories to absolute paths, making it easier to import modules. For example:
// Before
import { Button } from '../../../components/button'</p>
<p>// After
import { Button } from '@/components/button'
To configure absolute imports, add the baseUrl configuration option to your tsconfig.json or jsconfig.json file. For example:
tsconfig.json or jsconfig.json{
&quot;compilerOptions&quot;: {
&quot;baseUrl&quot;: &quot;src/&quot;
}
}
In addition to configuring the baseUrl path, you can use the &quot;paths&quot; option to &quot;alias&quot; module paths.
For example, the following configuration maps @/components/* to components/<em>:
tsconfig.json or jsconfig.json{
&quot;compilerOptions&quot;: {
&quot;baseUrl&quot;: &quot;src/&quot;,
&quot;paths&quot;: {
&quot;@/styles/</em>&quot;: [&quot;styles/<em>&quot;],
&quot;@/components/</em>&quot;: [&quot;components/*&quot;]
}
}
}
Each of the &quot;paths&quot; are relative to the baseUrl location. For example:
src/app/page.tsxTypeScriptJavaScriptTypeScriptimport Button from '@/components/button'
import '@/styles/styles.css'</p>
<p>export default function HomePage() {
return (
&lt;div&gt;
&lt;h1&gt;Hello World&lt;/h1&gt;
&lt;Button /&gt;
&lt;/div&gt;
)
}
Was this helpful?</p>
<p>supported.Send</p>
