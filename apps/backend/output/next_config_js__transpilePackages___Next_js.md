# next.config.js: transpilePackages | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jstranspilePackagestranspilePackages
Next.js can automatically transpile and bundle dependencies from local packages (like monorepos) or from external dependencies (node_modules). This replaces the next-transpile-modules package.
next.config.js/** @type {import('next').NextConfig} */
const nextConfig = {
transpilePackages: ['package-name'],
}</p>
<p>module.exports = nextConfig
Version History</p>
<p>VersionChangesv13.0.0transpilePackages added.Was this helpful?</p>
<p>supported.Send</p>
