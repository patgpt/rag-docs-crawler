# next.config.js: output | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsoutputoutput
During a build, Next.js will automatically trace each page and its dependencies to determine all of the files that are needed for deploying a production version of your application.
This feature helps reduce the size of deployments drastically. Previously, when deploying with Docker you would need to have all files from your package's dependencies installed to run next start. Starting with Next.js 12, you can leverage Output File Tracing in the .next/ directory to only include the necessary files.
Furthermore, this removes the need for the deprecated serverless target which can cause various issues and also creates unnecessary duplication.
How it Works</p>
<p>During next build, Next.js will use @vercel/nft to statically analyze import, require, and fs usage to determine all files that a page might load.
Next.js' production server is also traced for its needed files and output at .next/next-server.js.nft.json which can be leveraged in production.
To leverage the .nft.json files emitted to the .next output directory, you can read the list of files in each trace that are relative to the .nft.json file and then copy them to your deployment location.
Automatically Copying Traced Files</p>
<p>Next.js can automatically create a standalone folder that copies only the necessary files for a production deployment including select files in node_modules.
To leverage this automatic copying you can enable it in your next.config.js:
next.config.jsmodule.exports = {
output: 'standalone',
}
This will create a folder at .next/standalone which can then be deployed on its own without installing node_modules.
Additionally, a minimal server.js file is also output which can be used instead of next start. This minimal server does not copy the public or .next/static folders by default as these should ideally be handled by a CDN instead, although these folders can be copied to the standalone/public and standalone/.next/static folders manually, after which server.js file will serve these automatically.
To copy these manually, you can use the cp command-line tool after you next build:
Terminalcp -r public .next/standalone/ &amp;&amp; cp -r .next/static .next/standalone/.next/
To start your minimal server.js file locally, run the following command:
Terminalnode .next/standalone/server.js</p>
<p>Good to know:</p>
<p>If your project needs to listen to a specific port or hostname, you can define PORT or HOSTNAME environment variables before running server.js. For example, run PORT=8080 HOSTNAME=0.0.0.0 node server.js to start the server on http://0.0.0.0:8080.</p>
<p>Caveats</p>
<p>While tracing in monorepo setups, the project directory is used for tracing by default. For next build packages/web-app, packages/web-app would be the tracing root and any files outside of that folder will not be included. To include files outside of this folder you can set outputFileTracingRoot in your next.config.js.</p>
<p>packages/web-app/next.config.jsmodule.exports = {
// this includes files from the monorepo base two directories up
outputFileTracingRoot: path.join(__dirname, '../../'),
}</p>
<p>There are some cases in which Next.js might fail to include required files, or might incorrectly include unused files. In those cases, you can leverage outputFileTracingExcludes and outputFileTracingIncludes respectively in next.config.js. Each config accepts an object with minimatch globs for the key to match specific pages and a value of an array with globs relative to the project's root to either include or exclude in the trace.</p>
<p>next.config.jsmodule.exports = {
outputFileTracingExcludes: {
'/api/hello': ['./un-necessary-folder/<strong>/*'],
},
outputFileTracingIncludes: {
'/api/another': ['./necessary-folder/</strong>/<em>'],
'/api/login/\[\[\.\.\.slug\]\]': [
'./node_modules/aws-crt/dist/bin/**/</em>',
],
},
}
Note: The key of outputFileTracingIncludes/outputFileTracingExcludes is a glob, so special characters need to be escaped.</p>
<p>Currently, Next.js does not do anything with the emitted .nft.json files. The files must be read by your deployment platform, for example Vercel, to create a minimal deployment. In a future release, a new command is planned to utilize these .nft.json files.</p>
<p>Experimental turbotrace</p>
<p>Tracing dependencies can be slow because it requires very complex computations and analysis. We created turbotrace in Rust as a faster and smarter alternative to the JavaScript implementation.
To enable it, you can add the following configuration to your next.config.js:
next.config.jsmodule.exports = {
experimental: {
turbotrace: {
// control the log level of the turbotrace, default is <code>error</code>
logLevel?:
| 'bug'
| 'fatal'
| 'error'
| 'warning'
| 'hint'
| 'note'
| 'suggestions'
| 'info',
// control if the log of turbotrace should contain the details of the analysis, default is <code>false</code>
logDetail?: boolean
// show all log messages without limit
// turbotrace only show 1 log message for each categories by default
logAll?: boolean
// control the context directory of the turbotrace
// files outside of the context directory will not be traced
// set the <code>outputFileTracingRoot</code> has the same effect
// if the <code>outputFileTracingRoot</code> and this option are both set, the <code>experimental.turbotrace.contextDirectory</code> will be used
contextDirectory?: string
// if there is <code>process.cwd()</code> expression in your code, you can set this option to tell <code>turbotrace</code> the value of <code>process.cwd()</code> while tracing.
// for example the require(process.cwd() + '/package.json') will be traced as require('/path/to/cwd/package.json')
processCwd?: string
// control the maximum memory usage of the <code>turbotrace</code>, in <code>MB</code>, default is <code>6000</code>.
memoryLimit?: number
},
},
}Was this helpful?</p>
<p>supported.Send</p>
