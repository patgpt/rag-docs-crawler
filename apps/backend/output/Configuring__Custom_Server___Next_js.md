# Configuring: Custom Server | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationConfiguringCustom ServerCustom Server
Next.js includes its own server with next start by default. If you have an existing backend, you can still use it with Next.js (this is not a custom server). A custom Next.js server allows you to programmatically start a server for custom patterns. The majority of the time, you will not need this approach. However, it's available if you need to eject.</p>
<p>Good to know:</p>
<p>Before deciding to use a custom server, keep in mind that it should only be used when the integrated router of Next.js can't meet your app requirements. A custom server will remove important performance optimizations, like Automatic Static Optimization.
A custom server cannot be deployed on Vercel.
When using standalone output mode, it does not trace custom server files. This mode outputs a separate minimal server.js file, instead. These cannot be used together.</p>
<p>Take a look at the following example of a custom server:
server.tsTypeScriptJavaScriptTypeScriptimport { createServer } from 'http'
import { parse } from 'url'
import next from 'next'</p>
<p>const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()</p>
<p>app.prepare().then(() =&gt; {
createServer((req, res) =&gt; {
const parsedUrl = parse(req.url!, true)
handle(req, res, parsedUrl)
}).listen(port)</p>
<p>console.log(
<code>&gt; Server listening at http://localhost:${port} as ${       dev ? 'development' : process.env.NODE_ENV     }</code>
)
})</p>
<p>server.js does not run through the Next.js Compiler or bundling process. Make sure the syntax and source code this file requires are compatible with the current Node.js version you are using. View an example.</p>
<p>To run the custom server, you'll need to update the scripts in package.json like so:
package.json{
&quot;scripts&quot;: {
&quot;dev&quot;: &quot;node server.js&quot;,
&quot;build&quot;: &quot;next build&quot;,
&quot;start&quot;: &quot;NODE_ENV=production node server.js&quot;
}
}
Alternatively, you can set up nodemon (example). The custom server uses the following import to connect the server with the Next.js application:
import next from 'next'</p>
<p>const app = next({})
The above next import is a function that receives an object with the following options:
OptionTypeDescriptionconfObjectThe same object you would use in next.config.js. Defaults to {}devBoolean(Optional) Whether or not to launch Next.js in dev mode. Defaults to falsedirString(Optional) Location of the Next.js project. Defaults to '.'quietBoolean(Optional) Hide error messages containing server information. Defaults to falsehostnameString(Optional) The hostname the server is running behindportNumber(Optional) The port the server is running behindhttpServernode:http#Server(Optional) The HTTP Server that Next.js is running behindturboBoolean(Optional) Enable Turbopack
The returned app can then be used to let Next.js handle requests as required.
Was this helpful?</p>
<p>supported.Send</p>
