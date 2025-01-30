# Configuring: MDX | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationConfiguringMDXMarkdown and MDX
Markdown is a lightweight markup language used to format text. It allows you to write using plain text syntax and convert it to structurally valid HTML. It's commonly used for writing content on websites and blogs.
You write...
I <strong>love</strong> using <a href="https://nextjs.org/">Next.js</a>
Output:
&lt;p&gt;I &lt;strong&gt;love&lt;/strong&gt; using &lt;a href=&quot;https://nextjs.org/&quot;&gt;Next.js&lt;/a&gt;&lt;/p&gt;
MDX is a superset of markdown that lets you write JSX directly in your markdown files. It is a powerful way to add dynamic interactivity and embed React components within your content.
Next.js can support both local MDX content inside your application, as well as remote MDX files fetched dynamically on the server. The Next.js plugin handles transforming markdown and React components into HTML, including support for usage in Server Components (the default in App Router).</p>
<p>Good to know: View the Portfolio Starter Kit template for a complete working example.</p>
<p>Install dependencies</p>
<p>The @next/mdx package, and related packages, are used to configure Next.js so it can process markdown and MDX. It sources data from local files, allowing you to create pages with a .md or .mdx extension, directly in your /pages or /app directory.
Install these packages to render MDX with Next.js:
Terminalnpm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
Configure next.config.mjs</p>
<p>Update the next.config.mjs file at your project's root to configure it to use MDX:
next.config.mjsimport createMDX from '@next/mdx'</p>
<p>/** @type {import('next').NextConfig} */
const nextConfig = {
// Configure <code>pageExtensions</code> to include markdown and MDX files
pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
// Optionally, add any other Next.js config below
}</p>
<p>const withMDX = createMDX({
// Add markdown plugins here, as desired
})</p>
<p>// Merge MDX config with Next.js config
export default withMDX(nextConfig)
This allows .md and .mdx files to act as pages, routes, or imports in your application.
Add an mdx-components.tsx file</p>
<p>Create an mdx-components.tsx (or .js) file in the root of your project to define global MDX Components. For example, at the same level as pages or app, or inside src if applicable.
mdx-components.tsxTypeScriptJavaScriptTypeScriptimport type { MDXComponents } from 'mdx/types'</p>
<p>export function useMDXComponents(components: MDXComponents): MDXComponents {
return {
...components,
}
}</p>
<p>Good to know:</p>
<p>mdx-components.tsx is required to use @next/mdx with App Router and will not work without it.
Learn more about the mdx-components.tsx file convention.
Learn how to use custom styles and components.</p>
<p>Rendering MDX</p>
<p>You can render MDX using Next.js's file based routing or by importing MDX files into other pages.
Using file based routing</p>
<p>When using file based routing, you can use MDX pages like any other page.
In App Router apps, that includes being able to use metadata.Create a new MDX page within the /app directory:  my-project
├── app
│   └── mdx-page
│       └── page.(mdx/md)
|── mdx-components.(tsx/js)
└── package.json</p>
<p>You can use MDX in these files, and even import React components, directly inside your MDX page:
import { MyComponent } from 'my-component'</p>
<h1>Welcome to my MDX page!</h1>
<p>This is some <strong>bold</strong> and <em>italics</em> text.</p>
<p>This is a list in markdown:</p>
<ul>
<li>One</li>
<li>Two</li>
<li>Three</li>
</ul>
<p>Checkout my React component:</p>
<p>&lt;MyComponent /&gt;
Navigating to the /mdx-page route should display your rendered MDX page.
Using imports</p>
<p>Create a new page within the /app directory and an MDX file wherever you'd like:  my-project
├── app
│   └── mdx-page
│       └── page.(tsx/js)
├── markdown
│   └── welcome.(mdx/md)
|── mdx-components.(tsx/js)
└── package.json</p>
<p>You can use MDX in these files, and even import React components, directly inside your MDX page:</p>
<p>Import the MDX file inside the page to display the content:
app/mdx-page/page.tsxTypeScriptJavaScriptTypeScriptimport Welcome from '@/markdown/welcome.mdx'</p>
<p>export default function Page() {
return &lt;Welcome /&gt;
}</p>
<p>Navigating to the /mdx-page route should display your rendered MDX page.
Using dynamic imports</p>
<p>You can import dynamic MDX components instead of using filesystem routing for MDX files.For example, you can have a dynamic route segment which loads MDX components from a separate directory:generateStaticParams can be used to prerender the provided routes. By marking dynamicParams as false, accessing a route not defined in generateStaticParams will 404.app/blog/[slug]/page.tsxTypeScriptJavaScriptTypeScriptexport default async function Page({
params,
}: {
params: Promise&lt;{ slug: string }&gt;
}) {
const slug = (await params).slug
const { default: Post } = await import(<code>@/content/${slug}.mdx</code>)</p>
<p>return &lt;Post /&gt;
}</p>
<p>export function generateStaticParams() {
return [{ slug: 'welcome' }, { slug: 'about' }]
}</p>
<p>export const dynamicParams = false
Good to know: Ensure you specify the .mdx file extension in your import. While it is not required to use module path aliases (e.g., @/content), it does simplify your import path.</p>
<p>Using custom styles and components</p>
<p>Markdown, when rendered, maps to native HTML elements. For example, writing the following markdown:</p>
<h2>This is a heading</h2>
<p>This is a list in markdown:</p>
<ul>
<li>One</li>
<li>Two</li>
<li>Three
Generates the following HTML:
&lt;h2&gt;This is a heading&lt;/h2&gt;</li>
</ul>
<p>&lt;p&gt;This is a list in markdown:&lt;/p&gt;</p>
<p>&lt;ul&gt;
&lt;li&gt;One&lt;/li&gt;
&lt;li&gt;Two&lt;/li&gt;
&lt;li&gt;Three&lt;/li&gt;
&lt;/ul&gt;
To style your markdown, you can provide custom components that map to the generated HTML elements. Styles and components can be implemented globally, locally, and with shared layouts.
Global styles and components</p>
<p>Adding styles and components in mdx-components.tsx will affect all MDX files in your application.
mdx-components.tsxTypeScriptJavaScriptTypeScriptimport type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'</p>
<p>// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.</p>
<p>export function useMDXComponents(components: MDXComponents): MDXComponents {
return {
// Allows customizing built-in components, e.g. to add styling.
h1: ({ children }) =&gt; (
&lt;h1 style={{ color: 'red', fontSize: '48px' }}&gt;{children}&lt;/h1&gt;
),
img: (props) =&gt; (
&lt;Image
sizes=&quot;100vw&quot;
style={{ width: '100%', height: 'auto' }}
{...(props as ImageProps)}
/&gt;
),
...components,
}
}</p>
<p>Local styles and components</p>
<p>You can apply local styles and components to specific pages by passing them into imported MDX components. These will merge with and override global styles and components.
app/mdx-page/page.tsxTypeScriptJavaScriptTypeScriptimport Welcome from '@/markdown/welcome.mdx'</p>
<p>function CustomH1({ children }) {
return &lt;h1 style={{ color: 'blue', fontSize: '100px' }}&gt;{children}&lt;/h1&gt;
}</p>
<p>const overrideComponents = {
h1: CustomH1,
}</p>
<p>export default function Page() {
return &lt;Welcome components={overrideComponents} /&gt;
}</p>
<p>Shared layouts</p>
<p>To share a layout across MDX pages, you can use the built-in layouts support with the App Router.app/mdx-page/layout.tsxTypeScriptJavaScriptTypeScriptexport default function MdxLayout({ children }: { children: React.ReactNode }) {
// Create any shared layout or styles here
return &lt;div style={{ color: 'blue' }}&gt;{children}&lt;/div&gt;
}</p>
<p>Using Tailwind typography plugin</p>
<p>If you are using Tailwind to style your application, using the @tailwindcss/typography plugin will allow you to reuse your Tailwind configuration and styles in your markdown files.
The plugin adds a set of prose classes that can be used to add typographic styles to content blocks that come from sources, like markdown.
Install Tailwind typography and use with shared layouts to add the prose you want.
app/mdx-page/layout.tsxTypeScriptJavaScriptTypeScriptexport default function MdxLayout({ children }: { children: React.ReactNode }) {
// Create any shared layout or styles here
return (
&lt;div className=&quot;prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white&quot;&gt;
{children}
&lt;/div&gt;
)
}</p>
<p>Frontmatter</p>
<p>Frontmatter is a YAML like key/value pairing that can be used to store data about a page. @next/mdx does not support frontmatter by default, though there are many solutions for adding frontmatter to your MDX content, such as:</p>
<p>remark-frontmatter
remark-mdx-frontmatter
gray-matter</p>
<p>@next/mdx does allow you to use exports like any other JavaScript component:</p>
<p>Metadata can now be referenced outside of the MDX file:
app/blog/page.tsxTypeScriptJavaScriptTypeScriptimport BlogPost, { metadata } from '@/content/blog-post.mdx'</p>
<p>export default function Page() {
console.log('metadata: ', metadata)
//=&gt; { author: 'John Doe' }
return &lt;BlogPost /&gt;
}</p>
<p>A common use case for this is when you want to iterate over a collection of MDX and extract data. For example, creating a blog index page from all blog posts. You can use packages like Node's fs module or globby to read a directory of posts and extract the metadata.</p>
<p>Good to know:</p>
<p>Using fs, globby, etc. can only be used server-side.
View the Portfolio Starter Kit template for a complete working example.</p>
<p>remark and rehype Plugins</p>
<p>You can optionally provide remark and rehype plugins to transform the MDX content.
For example, you can use remark-gfm to support GitHub Flavored Markdown.
Since the remark and rehype ecosystem is ESM only, you'll need to use next.config.mjs or next.config.ts as the configuration file.
next.config.mjsimport remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'</p>
<p>/** @type {import('next').NextConfig} */
const nextConfig = {
// Allow .mdx extensions for files
pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
// Optionally, add any other Next.js config below
}</p>
<p>const withMDX = createMDX({
// Add markdown plugins here, as desired
options: {
remarkPlugins: [remarkGfm],
rehypePlugins: [],
},
})</p>
<p>// Combine MDX and Next.js config
export default withMDX(nextConfig)
Using Plugins with Turbopack</p>
<p>To use plugins with Turbopack, upgrade to the latest @next/mdx and specify plugin names using a string:
next.config.mjsimport createMDX from '@next/mdx'</p>
<p>/** @type {import('next').NextConfig} */
const nextConfig = {
pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}</p>
<p>const withMDX = createMDX({
options: {
remarkPlugins: [],
rehypePlugins: [['rehype-katex', { strict: true, throwOnError: true }]],
},
})</p>
<p>export default withMDX(nextConfig)</p>
<p>Good to know:
remark and rehype plugins without serializable options cannot be used yet with Turbopack, due to inability to pass JavaScript functions to Rust</p>
<p>Remote MDX</p>
<p>If your MDX files or content lives somewhere else, you can fetch it dynamically on the server. This is useful for content stored in a CMS, database, or anywhere else. A popular community package for this use is next-mdx-remote.</p>
<p>Good to know: Please proceed with caution. MDX compiles to JavaScript and is executed on the server. You should only fetch MDX content from a trusted source, otherwise this can lead to remote code execution (RCE).</p>
<p>The following example uses next-mdx-remote:
app/mdx-page-remote/page.tsxTypeScriptJavaScriptTypeScriptimport { MDXRemote } from 'next-mdx-remote/rsc'</p>
<p>export default async function RemoteMdxPage() {
// MDX text - can be from a database, CMS, fetch, anywhere...
const res = await fetch('https://...')
const markdown = await res.text()
return &lt;MDXRemote source={markdown} /&gt;
}</p>
<p>Navigating to the /mdx-page-remote route should display your rendered MDX.
Deep Dive: How do you transform markdown into HTML?</p>
<p>React does not natively understand markdown. The markdown plaintext needs to first be transformed into HTML. This can be accomplished with remark and rehype.
remark is an ecosystem of tools around markdown. rehype is the same, but for HTML. For example, the following code snippet transforms markdown into HTML:
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'</p>
<p>main()</p>
<p>async function main() {
const file = await unified()
.use(remarkParse) // Convert into markdown AST
.use(remarkRehype) // Transform to HTML AST
.use(rehypeSanitize) // Sanitize HTML input
.use(rehypeStringify) // Convert AST into serialized HTML
.process('Hello, Next.js!')</p>
<p>console.log(String(file)) // &lt;p&gt;Hello, Next.js!&lt;/p&gt;
}
The remark and rehype ecosystem contains plugins for syntax highlighting, linking headings, generating a table of contents, and more.
When using @next/mdx as shown above, you do not need to use remark or rehype directly, as it is handled for you. We're describing it here for a deeper understanding of what the @next/mdx package is doing underneath.
Using the Rust-based MDX compiler (experimental)</p>
<p>Next.js supports a new MDX compiler written in Rust. This compiler is still experimental and is not recommended for production use. To use the new compiler, you need to configure next.config.js when you pass it to withMDX:
next.config.jsmodule.exports = withMDX({
experimental: {
mdxRs: true,
},
})
mdxRs also accepts an object to configure how to transform mdx files.
next.config.jsmodule.exports = withMDX({
experimental: {
mdxRs: {
jsxRuntime?: string            // Custom jsx runtime
jsxImportSource?: string       // Custom jsx import source,
mdxType?: 'gfm' | 'commonmark' // Configure what kind of mdx syntax will be used to parse &amp; transform
},
},
})
Helpful Links</p>
<p>MDX
@next/mdx
remark
rehype
Markdoc
Was this helpful?</p>
<p>supported.Send</p>
