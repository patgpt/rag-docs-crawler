# next.config.js: generateBuildId | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsgenerateBuildIdgenerateBuildId
Next.js generates an ID during next build to identify which version of your application is being served. The same build should be used and boot up multiple containers.
If you are rebuilding for each stage of your environment, you will need to generate a consistent build ID to use between containers. Use the generateBuildId command in next.config.js:
next.config.jsmodule.exports = {
generateBuildId: async () =&gt; {
// This could be anything, using the latest git hash
return process.env.GIT_HASH
},
}Was this helpful?</p>
<p>supported.Send</p>
