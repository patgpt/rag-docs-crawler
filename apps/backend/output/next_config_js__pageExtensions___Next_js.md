# next.config.js: pageExtensions | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jspageExtensionspageExtensions
By default, Next.js accepts files with the following extensions: .tsx, .ts, .jsx, .js. This can be modified to allow other extensions like markdown (.md, .mdx).next.config.jsconst withMDX = require('@next/mdx')()</p>
<p>/** @type {import('next').NextConfig} */
const nextConfig = {
pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}</p>
<p>module.exports = withMDX(nextConfig)
Was this helpful?</p>
<p>supported.Send</p>
