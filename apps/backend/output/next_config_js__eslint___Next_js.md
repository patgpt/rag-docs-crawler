# next.config.js: eslint | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jseslinteslint
When ESLint is detected in your project, Next.js fails your production build (next build) when errors are present.
If you'd like Next.js to produce production code even when your application has ESLint errors, you can disable the built-in linting step completely. This is not recommended unless you already have ESLint configured to run in a separate part of your workflow (for example, in CI or a pre-commit hook).
Open next.config.js and enable the ignoreDuringBuilds option in the eslint config:
next.config.jsmodule.exports = {
eslint: {
// Warning: This allows production builds to successfully complete even if
// your project has ESLint errors.
ignoreDuringBuilds: true,
},
}Was this helpful?</p>
<p>supported.Send</p>
