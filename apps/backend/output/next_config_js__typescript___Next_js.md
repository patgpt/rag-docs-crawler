# next.config.js: typescript | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jstypescripttypescript
Next.js fails your production build (next build) when TypeScript errors are present in your project.
If you'd like Next.js to dangerously produce production code even when your application has errors, you can disable the built-in type checking step.
If disabled, be sure you are running type checks as part of your build or deploy process, otherwise this can be very dangerous.
Open next.config.js and enable the ignoreBuildErrors option in the typescript config:
next.config.jsmodule.exports = {
typescript: {
// !! WARN !!
// Dangerously allow production builds to successfully complete even if
// your project has type errors.
// !! WARN !!
ignoreBuildErrors: true,
},
}Was this helpful?</p>
<p>supported.Send</p>
