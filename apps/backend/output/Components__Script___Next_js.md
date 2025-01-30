# Components: Script | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceComponentsScriptScript
This API reference will help you understand how to use props available for the Script Component. For features and usage, please see the Optimizing Scripts page.
app/dashboard/page.tsxTypeScriptJavaScriptTypeScriptimport Script from 'next/script'</p>
<p>export default function Dashboard() {
return (
&lt;&gt;
&lt;Script src=&quot;https://example.com/script.js&quot; /&gt;
&lt;/&gt;
)
}</p>
<p>Props</p>
<p>Here's a summary of the props available for the Script Component:
PropExampleTypeRequiredsrcsrc=&quot;http://example.com/script&quot;StringRequired unless inline script is usedstrategystrategy=&quot;lazyOnload&quot;String-onLoadonLoad={onLoadFunc}Function-onReadyonReady={onReadyFunc}Function-onErroronError={onErrorFunc}Function-
Required Props</p>
<p>The &lt;Script /&gt; component requires the following properties.
src</p>
<p>A path string specifying the URL of an external script. This can be either an absolute external URL or an internal path. The src property is required unless an inline script is used.
Optional Props</p>
<p>The &lt;Script /&gt; component accepts a number of additional properties beyond those which are required.
strategy</p>
<p>The loading strategy of the script. There are four different strategies that can be used:</p>
<p>beforeInteractive: Load before any Next.js code and before any page hydration occurs.
afterInteractive: (default) Load early but after some hydration on the page occurs.
lazyOnload: Load during browser idle time.
worker: (experimental) Load in a web worker.</p>
<p>beforeInteractive</p>
<p>Scripts that load with the beforeInteractive strategy are injected into the initial HTML from the server, downloaded before any Next.js module, and executed in the order they are placed before any hydration occurs on the page.
Scripts denoted with this strategy are preloaded and fetched before any first-party code, but their execution does not block page hydration from occurring.
beforeInteractive scripts must be placed inside the root layout (app/layout.tsx) and are designed to load scripts that are needed by the entire site (i.e. the script will load when any page in the application has been loaded server-side).</p>
<p>This strategy should only be used for critical scripts that need to be fetched before any part of the page becomes interactive.
app/layout.tsxTypeScriptJavaScriptTypeScriptimport Script from 'next/script'</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;body&gt;
{children}
&lt;Script
src=&quot;https://example.com/script.js&quot;
strategy=&quot;beforeInteractive&quot;
/&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>Good to know: Scripts with beforeInteractive will always be injected inside the head of the HTML document regardless of where it's placed in the component.</p>
<p>Some examples of scripts that should be loaded as soon as possible with beforeInteractive include:</p>
<p>Bot detectors
Cookie consent managers</p>
<p>afterInteractive</p>
<p>Scripts that use the afterInteractive strategy are injected into the HTML client-side and will load after some (or all) hydration occurs on the page. This is the default strategy of the Script component and should be used for any script that needs to load as soon as possible but not before any first-party Next.js code.
afterInteractive scripts can be placed inside of any page or layout and will only load and execute when that page (or group of pages) is opened in the browser.
app/page.jsimport Script from 'next/script'</p>
<p>export default function Page() {
return (
&lt;&gt;
&lt;Script src=&quot;https://example.com/script.js&quot; strategy=&quot;afterInteractive&quot; /&gt;
&lt;/&gt;
)
}
Some examples of scripts that are good candidates for afterInteractive include:</p>
<p>Tag managers
Analytics</p>
<p>lazyOnload</p>
<p>Scripts that use the lazyOnload strategy are injected into the HTML client-side during browser idle time and will load after all resources on the page have been fetched. This strategy should be used for any background or low priority scripts that do not need to load early.
lazyOnload scripts can be placed inside of any page or layout and will only load and execute when that page (or group of pages) is opened in the browser.
app/page.jsimport Script from 'next/script'</p>
<p>export default function Page() {
return (
&lt;&gt;
&lt;Script src=&quot;https://example.com/script.js&quot; strategy=&quot;lazyOnload&quot; /&gt;
&lt;/&gt;
)
}
Examples of scripts that do not need to load immediately and can be fetched with lazyOnload include:</p>
<p>Chat support plugins
Social media widgets</p>
<p>worker</p>
<p>Warning: The worker strategy is not yet stable and does not yet work with the App Router. Use with caution.</p>
<p>Scripts that use the worker strategy are off-loaded to a web worker in order to free up the main thread and ensure that only critical, first-party resources are processed on it. While this strategy can be used for any script, it is an advanced use case that is not guaranteed to support all third-party scripts.
To use worker as a strategy, the nextScriptWorkers flag must be enabled in next.config.js:
next.config.jsmodule.exports = {
experimental: {
nextScriptWorkers: true,
},
}
worker scripts can only currently be used in the pages/ directory:
pages/home.tsxTypeScriptJavaScriptTypeScriptimport Script from 'next/script'</p>
<p>export default function Home() {
return (
&lt;&gt;
&lt;Script src=&quot;https://example.com/script.js&quot; strategy=&quot;worker&quot; /&gt;
&lt;/&gt;
)
}</p>
<p>onLoad</p>
<p>Warning: onLoad does not yet work with Server Components and can only be used in Client Components. Further, onLoad can't be used with beforeInteractive – consider using onReady instead.</p>
<p>Some third-party scripts require users to run JavaScript code once after the script has finished loading in order to instantiate content or call a function. If you are loading a script with either afterInteractive or lazyOnload as a loading strategy, you can execute code after it has loaded using the onLoad property.
Here's an example of executing a lodash method only after the library has been loaded.
app/page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import Script from 'next/script'</p>
<p>export default function Page() {
return (
&lt;&gt;
&lt;Script
src=&quot;https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js&quot;
onLoad={() =&gt; {
console.log(_.sample([1, 2, 3, 4]))
}}
/&gt;
&lt;/&gt;
)
}</p>
<p>onReady</p>
<p>Warning: onReady does not yet work with Server Components and can only be used in Client Components.</p>
<p>Some third-party scripts require users to run JavaScript code after the script has finished loading and every time the component is mounted (after a route navigation for example). You can execute code after the script's load event when it first loads and then after every subsequent component re-mount using the onReady property.
Here's an example of how to re-instantiate a Google Maps JS embed every time the component is mounted:
app/page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useRef } from 'react'
import Script from 'next/script'</p>
<p>export default function Page() {
const mapRef = useRef()</p>
<p>return (
&lt;&gt;
&lt;div ref={mapRef}&gt;&lt;/div&gt;
&lt;Script
id=&quot;google-maps&quot;
src=&quot;https://maps.googleapis.com/maps/api/js&quot;
onReady={() =&gt; {
new google.maps.Map(mapRef.current, {
center: { lat: -34.397, lng: 150.644 },
zoom: 8,
})
}}
/&gt;
&lt;/&gt;
)
}</p>
<p>onError</p>
<p>Warning: onError does not yet work with Server Components and can only be used in Client Components. onError cannot be used with the beforeInteractive loading strategy.</p>
<p>Sometimes it is helpful to catch when a script fails to load. These errors can be handled with the onError property:
app/page.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import Script from 'next/script'</p>
<p>export default function Page() {
return (
&lt;&gt;
&lt;Script
src=&quot;https://example.com/script.js&quot;
onError={(e: Error) =&gt; {
console.error('Script failed to load', e)
}}
/&gt;
&lt;/&gt;
)
}</p>
<p>Version History</p>
<p>VersionChangesv13.0.0beforeInteractive and afterInteractive is modified to support app.v12.2.4onReady prop added.v12.2.2Allow next/script with beforeInteractive to be placed in _document.v11.0.0next/script introduced.Was this helpful?</p>
<p>supported.Send</p>
