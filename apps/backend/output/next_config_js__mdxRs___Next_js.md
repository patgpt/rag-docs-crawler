# next.config.js: mdxRs | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsmdxRsmdxRsFor experimental use with @next/mdx. Compiles MDX files using the new Rust compiler.
next.config.jsconst withMDX = require('@next/mdx')()</p>
<p>/** @type {import('next').NextConfig} */
const nextConfig = {
pageExtensions: ['ts', 'tsx', 'mdx'],
experimental: {
mdxRs: true,
},
}</p>
<p>module.exports = withMDX(nextConfig)Was this helpful?</p>
<p>supported.Send</p>
