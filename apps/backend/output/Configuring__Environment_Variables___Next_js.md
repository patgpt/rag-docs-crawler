# Configuring: Environment Variables | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationConfiguringEnvironment VariablesEnvironment Variables
Examples
Environment Variables</p>
<p>Next.js comes with built-in support for environment variables, which allows you to do the following:</p>
<p>Use .env to load environment variables
Bundle environment variables for the browser by prefixing with NEXT_PUBLIC_</p>
<p>Loading Environment Variables</p>
<p>Next.js has built-in support for loading environment variables from .env* files into process.env.
.envDB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword</p>
<p>Note: Next.js also supports multiline variables inside of your .env* files:</p>
<h1>.env</h1>
<h1>you can write with line breaks</h1>
<p>PRIVATE_KEY=&quot;-----BEGIN RSA PRIVATE KEY-----
...
Kh9NV...
...
-----END DSA PRIVATE KEY-----&quot;</p>
<h1>or with <code>\n</code> inside double quotes</h1>
<p>PRIVATE_KEY=&quot;-----BEGIN RSA PRIVATE KEY-----\nKh9NV...\n-----END DSA PRIVATE KEY-----\n&quot;</p>
<p>Note: If you are using a /src folder, please note that Next.js will load the .env files only from the parent folder and not from the /src folder.
This loads process.env.DB_HOST, process.env.DB_USER, and process.env.DB_PASS into the Node.js environment automatically allowing you to use them in Route Handlers.
For example:app/api/route.jsexport async function GET() {
const db = await myDB.connect({
host: process.env.DB_HOST,
username: process.env.DB_USER,
password: process.env.DB_PASS,
})
// ...
}
Loading Environment Variables with @next/env</p>
<p>If you need to load environment variables outside of the Next.js runtime, such as in a root config file for an ORM or test runner, you can use the @next/env package.
This package is used internally by Next.js to load environment variables from .env* files.
To use it, install the package and use the loadEnvConfig function to load the environment variables:
npm install @next/env
envConfig.tsTypeScriptJavaScriptTypeScriptimport { loadEnvConfig } from '@next/env'</p>
<p>const projectDir = process.cwd()
loadEnvConfig(projectDir)</p>
<p>Then, you can import the configuration where needed. For example:
orm.config.tsTypeScriptJavaScriptTypeScriptimport './envConfig.ts'</p>
<p>export default defineConfig({
dbCredentials: {
connectionString: process.env.DATABASE_URL!,
},
})</p>
<p>Referencing Other Variables</p>
<p>Next.js will automatically expand variables that use $ to reference other variables e.g. $VARIABLE inside of your .env* files. This allows you to reference other secrets. For example:
.envTWITTER_USER=nextjs
TWITTER_URL=https://x.com/$TWITTER_USER
In the above example, process.env.TWITTER_URL would be set to https://x.com/nextjs.</p>
<p>Good to know: If you need to use variable with a $ in the actual value, it needs to be escaped e.g. $.</p>
<p>Bundling Environment Variables for the Browser</p>
<p>Non-NEXT_PUBLIC_ environment variables are only available in the Node.js environment, meaning they aren't accessible to the browser (the client runs in a different environment).
In order to make the value of an environment variable accessible in the browser, Next.js can &quot;inline&quot; a value, at build time, into the js bundle that is delivered to the client, replacing all references to process.env.[variable] with a hard-coded value. To tell it to do this, you just have to prefix the variable with NEXT_PUBLIC_. For example:
TerminalNEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
This will tell Next.js to replace all references to process.env.NEXT_PUBLIC_ANALYTICS_ID in the Node.js environment with the value from the environment in which you run next build, allowing you to use it anywhere in your code. It will be inlined into any JavaScript sent to the browser.</p>
<p>Note: After being built, your app will no longer respond to changes to these environment variables. For instance, if you use a Heroku pipeline to promote slugs built in one environment to another environment, or if you build and deploy a single Docker image to multiple environments, all NEXT_PUBLIC_ variables will be frozen with the value evaluated at build time, so these values need to be set appropriately when the project is built. If you need access to runtime environment values, you'll have to setup your own API to provide them to the client (either on demand or during initialization).</p>
<p>pages/index.jsimport setupAnalyticsService from '../lib/my-analytics-service'</p>
<p>// 'NEXT_PUBLIC_ANALYTICS_ID' can be used here as it's prefixed by 'NEXT_PUBLIC_'.
// It will be transformed at build time to <code>setupAnalyticsService('abcdefghijk')</code>.
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)</p>
<p>function HomePage() {
return &lt;h1&gt;Hello World&lt;/h1&gt;
}</p>
<p>export default HomePage
Note that dynamic lookups will not be inlined, such as:
// This will NOT be inlined, because it uses a variable
const varName = 'NEXT_PUBLIC_ANALYTICS_ID'
setupAnalyticsService(process.env[varName])</p>
<p>// This will NOT be inlined, because it uses a variable
const env = process.env
setupAnalyticsService(env.NEXT_PUBLIC_ANALYTICS_ID)
Runtime Environment Variables</p>
<p>Next.js can support both build time and runtime environment variables.
By default, environment variables are only available on the server. To expose an environment variable to the browser, it must be prefixed with NEXT_PUBLIC_. However, these public environment variables will be inlined into the JavaScript bundle during next build.</p>
<p>You can safely read environment variables on the server during dynamic rendering:app/page.tsTypeScriptJavaScriptTypeScriptimport { connection } from 'next/server'</p>
<p>export default async function Component() {
await connection()
// cookies, headers, and other Dynamic APIs
// will also opt into dynamic rendering, meaning
// this env variable is evaluated at runtime
const value = process.env.MY_VALUE
// ...
}
This allows you to use a singular Docker image that can be promoted through multiple environments with different values.
Good to know:</p>
<p>You can run code on server startup using the register function.
We do not recommend using the runtimeConfig option, as this does not work with the standalone output mode. Instead, we recommend incrementally adopting the App Router.</p>
<p>Default Environment Variables</p>
<p>Typically, only .env* file is needed. However, sometimes you might want to add some defaults for the development (next dev) or production (next start) environment.
Next.js allows you to set defaults in .env (all environments), .env.development (development environment), and .env.production (production environment).</p>
<p>Good to know: .env, .env.development, and .env.production files should be included in your repository as they define defaults. All .env files are excluded in .gitignore by default, allowing you to opt-into committing these values to your repository.</p>
<p>Environment Variables on Vercel</p>
<p>When deploying your Next.js application to Vercel, Environment Variables can be configured in the Project Settings.
All types of Environment Variables should be configured there. Even Environment Variables used in Development – which can be downloaded onto your local device afterwards.
If you've configured Development Environment Variables you can pull them into a .env.local for usage on your local machine using the following command:
Terminalvercel env pull</p>
<p>Good to know: When deploying your Next.js application to Vercel, your environment variables in .env* files will not be made available to Edge Runtime, unless their name are prefixed with NEXT_PUBLIC_. We strongly recommend managing your environment variables in Project Settings instead, from where all environment variables are available.</p>
<p>Test Environment Variables</p>
<p>Apart from development and production environments, there is a 3rd option available: test. In the same way you can set defaults for development or production environments, you can do the same with a .env.test file for the testing environment (though this one is not as common as the previous two). Next.js will not load environment variables from .env.development or .env.production in the testing environment.
This one is useful when running tests with tools like jest or cypress where you need to set specific environment vars only for testing purposes. Test default values will be loaded if NODE_ENV is set to test, though you usually don't need to do this manually as testing tools will address it for you.
There is a small difference between test environment, and both development and production that you need to bear in mind: .env.local won't be loaded, as you expect tests to produce the same results for everyone. This way every test execution will use the same env defaults across different executions by ignoring your .env.local (which is intended to override the default set).</p>
<p>Good to know: similar to Default Environment Variables, .env.test file should be included in your repository, but .env.test.local shouldn't, as .env*.local are intended to be ignored through .gitignore.</p>
<p>While running unit tests you can make sure to load your environment variables the same way Next.js does by leveraging the loadEnvConfig function from the @next/env package.
// The below can be used in a Jest global setup file or similar for your testing set-up
import { loadEnvConfig } from '@next/env'</p>
<p>export default async () =&gt; {
const projectDir = process.cwd()
loadEnvConfig(projectDir)
}
Environment Variable Load Order</p>
<p>Environment variables are looked up in the following places, in order, stopping once the variable is found.</p>
<p>process.env
.env.$(NODE_ENV).local
.env.local (Not checked when NODE_ENV is test.)
.env.$(NODE_ENV)
.env</p>
<p>For example, if NODE_ENV is development and you define a variable in both .env.development.local and .env, the value in .env.development.local will be used.</p>
<p>Good to know: The allowed values for NODE_ENV are production, development and test.</p>
<p>Good to know</p>
<p>If you are using a /src directory, .env.* files should remain in the root of your project.
If the environment variable NODE_ENV is unassigned, Next.js automatically assigns development when running the next dev command, or production for all other commands.</p>
<p>Version History</p>
<p>VersionChangesv9.4.0Support .env and NEXT_PUBLIC_ introduced.Was this helpful?</p>
<p>supported.Send</p>
