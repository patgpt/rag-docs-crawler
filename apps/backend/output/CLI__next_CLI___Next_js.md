# CLI: next CLI | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceCLInext CLInext CLI
The Next.js CLI allows you to develop, build, start your application, and more.
Basic usage:
Terminalnpx next [command] [options]
Reference</p>
<p>The following options are available:
OptionsDescription-h or --helpShows all available options-v or --versionOutputs the Next.js version number
Commands</p>
<p>The following commands are available:
CommandDescriptiondevStarts Next.js in development mode with Hot Module Reloading, error reporting, and more.buildCreates an optimized production build of your application. Displaying information about each route.startStarts Next.js in production mode. The application should be compiled with next build first.infoPrints relevant details about the current system which can be used to report Next.js bugs.lintRuns ESLint for all files in the /src, /app, /pages, /components, and /lib directories. It also provides a guided setup to install any required dependencies if ESLint it is not already configured in your application.telemetryAllows you to enable or disable Next.js' completely anonymous telemetry collection.</p>
<p>Good to know: Running next without a command is an alias for next dev.</p>
<p>next dev options</p>
<p>next dev starts the application in development mode with Hot Module Reloading (HMR), error reporting, and more. The following options are available when running next dev:
OptionDescription-h, --helpShow all available options.[directory]A directory in which to build the application. If not provided, current directory is used.--turbopackStarts development mode using Turbopack.-p or --port &lt;port&gt;Specify a port number on which to start the application. Default: 3000, env: PORT-Hor --hostname &lt;hostname&gt;Specify a hostname on which to start the application. Useful for making the application available for other devices on the network. Default: 0.0.0.0--experimental-httpsStarts the server with HTTPS and generates a self-signed certificate.--experimental-https-key &lt;path&gt;Path to a HTTPS key file.--experimental-https-cert &lt;path&gt;Path to a HTTPS certificate file.--experimental-https-ca &lt;path&gt;Path to a HTTPS certificate authority file.--experimental-upload-trace &lt;traceUrl&gt;Reports a subset of the debugging trace to a remote HTTP URL.
next build options</p>
<p>next build creates an optimized production build of your application. The output displays information about each route. For example:
TerminalRoute (app)                              Size     First Load JS
┌ ○ /_not-found                          0 B               0 kB
└ ƒ /products/[id]                       0 B               0 kB</p>
<p>○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand</p>
<p>Size: The size of assets downloaded when navigating to the page client-side. The size for each route only includes its dependencies.
First Load JS: The size of assets downloaded when visiting the page from the server. The amount of JS shared by all is shown as a separate metric.</p>
<p>Both of these values are compressed with gzip. The first load is indicated by green, yellow, or red. Aim for green for performant applications.
The following options are available for the next build command:
OptionDescription-h, --helpShow all available options.[directory]A directory on which to build the application. If not provided, the current directory will be used.-d or --debugEnables a more verbose build output. With this flag enabled additional build output like rewrites, redirects, and headers will be shown.--profileEnables production profiling for React.--no-lintDisables linting.--no-manglingDisables mangling. This may affect performance and should only be used for debugging purposes.--experimental-app-onlyBuilds only App Router routes.--experimental-build-mode [mode]Uses an experimental build mode. (choices: &quot;compile&quot;, &quot;generate&quot;, default: &quot;default&quot;)
next start options</p>
<p>next start starts the application in production mode. The application should be compiled with next build first.
The following options are available for the next start command:
OptionDescription-h or --helpShow all available options.[directory]A directory on which to start the application. If no directory is provided, the current directory will be used.-p or --port &lt;port&gt;Specify a port number on which to start the application. (default: 3000, env: PORT)-H or --hostname &lt;hostname&gt;Specify a hostname on which to start the application (default: 0.0.0.0).--keepAliveTimeout &lt;keepAliveTimeout&gt;Specify the maximum amount of milliseconds to wait before closing the inactive connections.
next info options</p>
<p>next info prints relevant details about the current system which can be used to report Next.js bugs when opening a GitHub issue. This information includes Operating System platform/arch/version, Binaries (Node.js, npm, Yarn, pnpm), package versions (next, react, react-dom), and more.
The output should look like this:
TerminalOperating System:
Platform: darwin
Arch: arm64
Version: Darwin Kernel Version 23.6.0
Available memory (MB): 65536
Available CPU cores: 10
Binaries:
Node: 20.12.0
npm: 10.5.0
Yarn: 1.22.19
pnpm: 9.6.0
Relevant Packages:
next: 15.0.0-canary.115 // Latest available version is detected (15.0.0-canary.115).
eslint-config-next: 14.2.5
react: 19.0.0-rc
react-dom: 19.0.0
typescript: 5.5.4
Next.js Config:
output: N/A
The following options are available for the next info command:
OptionDescription-h or --helpShow all available options--verboseCollects additional information for debugging.
next lint options</p>
<p>next lint runs ESLint for all files in the pages/, app/, components/, lib/, and src/ directories. It also provides a guided setup to install any required dependencies if ESLint is not already configured in your application.
The following options are available for the next lint command:
OptionDescription[directory]A base directory on which to lint the application. If not provided, the current directory will be used.-d, --dir, &lt;dirs...&gt;Include directory, or directories, to run ESLint.--file, &lt;files...&gt;Include file, or files, to run ESLint.--ext, [exts...]Specify JavaScript file extensions. (default: [&quot;.js&quot;, &quot;.mjs&quot;, &quot;.cjs&quot;, &quot;.jsx&quot;, &quot;.ts&quot;, &quot;.mts&quot;, &quot;.cts&quot;, &quot;.tsx&quot;])-c, --config, &lt;config&gt;Uses this configuration file, overriding all other configuration options.--resolve-plugins-relative-to, &lt;rprt&gt;Specify a directory where plugins should be resolved from.--strictCreates a .eslintrc.json file using the Next.js strict configuration.--rulesdir, &lt;rulesdir...&gt;Uses additional rules from this directory(s).--fixAutomatically fix linting issues.--fix-type &lt;fixType&gt;Specify the types of fixes to apply (e.g., problem, suggestion, layout).--ignore-path &lt;path&gt;Specify a file to ignore.--no-ignore &lt;path&gt;Disables the --ignore-path option.--quietReports errors only.--max-warnings [maxWarnings]Specify the number of warnings before triggering a non-zero exit code. (default: -1)-o, --output-file, &lt;outputFile&gt;Specify a file to write report to.-f, --format, &lt;format&gt;Uses a specific output format.--no-inline-configPrevents comments from changing config or rules.--report-unused-disable-directives-severity &lt;level&gt;Specify severity level for unused eslint-disable directives. (choices: &quot;error&quot;, &quot;off&quot;, &quot;warn&quot;)--no-cacheDisables caching.--cache-location, &lt;cacheLocation&gt;Specify a location for cache.--cache-strategy, [cacheStrategy]Specify a strategy to use for detecting changed files in the cache. (default: &quot;metadata&quot;)--error-on-unmatched-patternReports errors when any file patterns are unmatched.-h, --helpDisplays this message.
next telemetry options</p>
<p>Next.js collects completely anonymous telemetry data about general usage. Participation in this anonymous program is optional, and you can opt-out if you prefer not to share information.
The following options are available for the next telemetry command:
OptionDescription-h, --helpShow all available options.--enableEnables Next.js' telemetry collection.--disableDisables Next.js' telemetry collection.
Learn more about Telemetry.
Examples</p>
<p>Changing the default port</p>
<p>By default, Next.js uses http://localhost:3000 during development and with next start. The default port can be changed with the -p option, like so:
Terminalnext dev -p 4000
Or using the PORT environment variable:
TerminalPORT=4000 next dev</p>
<p>Good to know: PORT cannot be set in .env as booting up the HTTP server happens before any other code is initialized.</p>
<p>Using HTTPS during development</p>
<p>For certain use cases like webhooks or authentication, you can use HTTPS to have a secure environment on localhost. Next.js can generate a self-signed certificate with next dev using the --experimental-https flag:
Terminalnext dev --experimental-https
With the generated certificate, the Next.js development server will exist at https://localhost:3000. The default port 3000 is used unless a port is specified with -p, --port, or PORT.
You can also provide a custom certificate and key with --experimental-https-key and --experimental-https-cert. Optionally, you can provide a custom CA certificate with --experimental-https-ca as well.
Terminalnext dev --experimental-https --experimental-https-key ./certificates/localhost-key.pem --experimental-https-cert ./certificates/localhost.pem
next dev --experimental-https is only intended for development and creates a locally trusted certificate with mkcert. In production, use properly issued certificates from trusted authorities.</p>
<p>Good to know: When deploying to Vercel, HTTPS is automatically configured for your Next.js application.</p>
<p>Configuring a timeout for downstream proxies</p>
<p>When deploying Next.js behind a downstream proxy (e.g. a load-balancer like AWS ELB/ALB), it's important to configure Next's underlying HTTP server with keep-alive timeouts that are larger than the downstream proxy's timeouts. Otherwise, once a keep-alive timeout is reached for a given TCP connection, Node.js will immediately terminate that connection without notifying the downstream proxy. This results in a proxy error whenever it attempts to reuse a connection that Node.js has already terminated.
To configure the timeout values for the production Next.js server, pass --keepAliveTimeout (in milliseconds) to next start, like so:
Terminalnext start --keepAliveTimeout 70000
Passing Node.js arguments</p>
<p>You can pass any node arguments to next commands. For example:
TerminalNODE_OPTIONS='--throw-deprecation' next
NODE_OPTIONS='-r esm' next
NODE_OPTIONS='--inspect' nextWas this helpful?</p>
<p>supported.Send</p>
