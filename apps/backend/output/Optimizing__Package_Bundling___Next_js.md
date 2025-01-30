# Optimizing: Package Bundling | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationOptimizingPackage BundlingOptimizing Package BundlingBundling external packages can significantly improve the performance of your application. By default, packages imported inside Server Components and Route Handlers are automatically bundled by Next.js. This page will guide you through how to analyze and further optimize package bundling.
Analyzing JavaScript bundles</p>
<p>@next/bundle-analyzer is a plugin for Next.js that helps you manage the size of your application bundles. It generates a visual report of the size of each package and their dependencies. You can use the information to remove large dependencies, split, or lazy-load your code.
Installation</p>
<p>Install the plugin by running the following command:
npm i @next/bundle-analyzer</p>
<h1>or</h1>
<p>yarn add @next/bundle-analyzer</p>
<h1>or</h1>
<p>pnpm add @next/bundle-analyzer
Then, add the bundle analyzer's settings to your next.config.js.
next.config.js/** @type {import('next').NextConfig} */
const nextConfig = {}</p>
<p>const withBundleAnalyzer = require('@next/bundle-analyzer')({
enabled: process.env.ANALYZE === 'true',
})</p>
<p>module.exports = withBundleAnalyzer(nextConfig)
Generating a report</p>
<p>Run the following command to analyze your bundles:
ANALYZE=true npm run build</p>
<h1>or</h1>
<p>ANALYZE=true yarn build</p>
<h1>or</h1>
<p>ANALYZE=true pnpm build
The report will open three new tabs in your browser, which you can inspect. Periodically evaluating your application's bundles can help you maintain application performance over time.
Optimizing package imports</p>
<p>Some packages, such as icon libraries, can export hundreds of modules, which can cause performance issues in development and production.
You can optimize how these packages are imported by adding the optimizePackageImports option to your next.config.js. This option will only load the modules you actually use, while still giving you the convenience of writing import statements with many named exports.
next.config.js/** @type {import('next').NextConfig} */
const nextConfig = {
experimental: {
optimizePackageImports: ['icon-library'],
},
}</p>
<p>module.exports = nextConfig
Next.js also optimizes some libraries automatically, thus they do not need to be included in the optimizePackageImports list. See the full list.</p>
<p>Opting specific packages out of bundling</p>
<p>Since packages imported inside Server Components and Route Handlers are automatically bundled by Next.js, you can opt specific packages out of bundling using the serverExternalPackages option in your next.config.js.next.config.js/** @type {import('next').NextConfig} */
const nextConfig = {
serverExternalPackages: ['package-name'],
}</p>
<p>module.exports = nextConfigNext.js includes a list of popular packages that currently are working on compatibility and automatically opt-ed out. See the full list.Next StepsLearn more about optimizing your application for production.Production ChecklistRecommendations to ensure the best performance and user experience before taking your Next.js application to production.Was this helpful?</p>
<p>supported.Send</p>
