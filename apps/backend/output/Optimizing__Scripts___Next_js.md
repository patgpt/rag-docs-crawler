# Optimizing: Scripts | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationOptimizingScriptsScript Optimization
Layout Scripts</p>
<p>To load a third-party script for multiple routes, import next/script and include the script directly in your layout component:app/dashboard/layout.tsxTypeScriptJavaScriptTypeScriptimport Script from 'next/script'</p>
<p>export default function DashboardLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;&gt;
&lt;section&gt;{children}&lt;/section&gt;
&lt;Script src=&quot;https://example.com/script.js&quot; /&gt;
&lt;/&gt;
)
}The third-party script is fetched when the folder route (e.g. dashboard/page.js) or any nested route (e.g. dashboard/settings/page.js) is accessed by the user. Next.js will ensure the script will only load once, even if a user navigates between multiple routes in the same layout.
Application Scripts</p>
<p>To load a third-party script for all routes, import next/script and include the script directly in your root layout:app/layout.tsxTypeScriptJavaScriptTypeScriptimport Script from 'next/script'</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;Script src=&quot;https://example.com/script.js&quot; /&gt;
&lt;/html&gt;
)
}</p>
<p>This script will load and execute when any route in your application is accessed. Next.js will ensure the script will only load once, even if a user navigates between multiple pages.</p>
<p>Recommendation: We recommend only including third-party scripts in specific pages or layouts in order to minimize any unnecessary impact to performance.</p>
<p>Strategy</p>
<p>Although the default behavior of next/script allows you to load third-party scripts in any page or layout, you can fine-tune its loading behavior by using the strategy property:</p>
<p>beforeInteractive: Load the script before any Next.js code and before any page hydration occurs.
afterInteractive: (default) Load the script early but after some hydration on the page occurs.
lazyOnload: Load the script later during browser idle time.
worker: (experimental) Load the script in a web worker.</p>
<p>Refer to the next/script API reference documentation to learn more about each strategy and their use cases.
Offloading Scripts To A Web Worker (experimental)</p>
<p>Warning: The worker strategy is not yet stable and does not yet work with the App Router. Use with caution.</p>
<p>Scripts that use the worker strategy are offloaded and executed in a web worker with Partytown. This can improve the performance of your site by dedicating the main thread to the rest of your application code.
This strategy is still experimental and can only be used if the nextScriptWorkers flag is enabled in next.config.js:
next.config.jsmodule.exports = {
experimental: {
nextScriptWorkers: true,
},
}
Then, run next (normally npm run dev or yarn dev) and Next.js will guide you through the installation of the required packages to finish the setup:
Terminalnpm run dev
You'll see instructions like these: Please install Partytown by running npm install @builder.io/partytown
Once setup is complete, defining strategy=&quot;worker&quot; will automatically instantiate Partytown in your application and offload the script to a web worker.
pages/home.tsxTypeScriptJavaScriptTypeScriptimport Script from 'next/script'</p>
<p>export default function Home() {
return (
&lt;&gt;
&lt;Script src=&quot;https://example.com/script.js&quot; strategy=&quot;worker&quot; /&gt;
&lt;/&gt;
)
}</p>
<p>There are a number of trade-offs that need to be considered when loading a third-party script in a web worker. Please see Partytown's tradeoffs documentation for more information.</p>
<p>Inline Scripts</p>
<p>Inline scripts, or scripts not loaded from an external file, are also supported by the Script component. They can be written by placing the JavaScript within curly braces:
&lt;Script id=&quot;show-banner&quot;&gt;
{<code>document.getElementById('banner').classList.remove('hidden')</code>}
&lt;/Script&gt;
Or by using the dangerouslySetInnerHTML property:
&lt;Script
id=&quot;show-banner&quot;
dangerouslySetInnerHTML={{
__html: <code>document.getElementById('banner').classList.remove('hidden')</code>,
}}
/&gt;</p>
<p>Warning: An id property must be assigned for inline scripts in order for Next.js to track and optimize the script.</p>
<p>Executing Additional Code</p>
<p>Event handlers can be used with the Script component to execute additional code after a certain event occurs:</p>
<p>onLoad: Execute code after the script has finished loading.
onReady: Execute code after the script has finished loading and every time the component is mounted.
onError: Execute code if the script fails to load.</p>
<p>These handlers will only work when next/script is imported and used inside of a Client Component where &quot;use client&quot; is defined as the first line of code:app/page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import Script from 'next/script'</p>
<p>export default function Page() {
return (
&lt;&gt;
&lt;Script
src=&quot;https://example.com/script.js&quot;
onLoad={() =&gt; {
console.log('Script has loaded')
}}
/&gt;
&lt;/&gt;
)
}Refer to the next/script API reference to learn more about each event handler and view examples.</p>
<p>Additional Attributes</p>
<p>There are many DOM attributes that can be assigned to a &lt;script&gt; element that are not used by the Script component, like nonce or custom data attributes. Including any additional attributes will automatically forward it to the final, optimized &lt;script&gt; element that is included in the HTML.
app/page.tsxTypeScriptJavaScriptTypeScriptimport Script from 'next/script'</p>
<p>export default function Page() {
return (
&lt;&gt;
&lt;Script
src=&quot;https://example.com/script.js&quot;
id=&quot;example-script&quot;
nonce=&quot;XUENAJFW&quot;
data-test=&quot;script&quot;
/&gt;
&lt;/&gt;
)
}
API ReferenceLearn more about the next/script API.ScriptOptimize third-party scripts in your Next.js application using the built-in <code>next/script</code> Component.Was this helpful?</p>
<p>supported.Send</p>
