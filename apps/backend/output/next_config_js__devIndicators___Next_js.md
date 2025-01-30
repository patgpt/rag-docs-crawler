# next.config.js: devIndicators | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsdevIndicatorsdevIndicators
devIndicators allows you to configure the on-screen indicators that give context about the current route you're viewing during development.Types  devIndicators: {
appIsrStatus?: boolean, // defaults to true
buildActivity?: boolean, // defaults to true
buildActivityPosition?: 'bottom-right'
| 'bottom-left'
| 'top-right'
| 'top-left', // defaults to 'bottom-right'
},appIsrStatus (Static Indicator)</p>
<p>Next.js displays a static indicator in the bottom corner of the screen that signals if a route will be prerendered at build time. This makes it easier to understand whether a route is static or dynamic, and for you to identify if a route opts out of static rendering.You can temporarily hide the indicator by clicking the close indicator which will remember your preference in localStorage for 1 hour. To permanently disable it, you can use the config option in next.config.js:next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
devIndicators: {
appIsrStatus: false,
},
}</p>
<p>export default nextConfigbuildActivity (Compilation Indicator)</p>
<p>When you edit your code, and Next.js is compiling the application, a compilation indicator appears in the bottom right corner of the page.
Good to know: This indicator is only present in development mode and will not appear when building and running the app in production mode.
In some cases this indicator can be misplaced on your page, for example, when conflicting with a chat launcher. To change its position, open next.config.js and set the buildActivityPosition in the devIndicators object to bottom-right (default), bottom-left, top-right or top-left:next.config.jsmodule.exports = {
devIndicators: {
buildActivityPosition: 'bottom-right',
},
}In some cases, this indicator might not be useful for you. To remove it, open next.config.js and disable the buildActivity config in devIndicators object:next.config.jsmodule.exports = {
devIndicators: {
buildActivity: false,
},
}Troubleshooting</p>
<p>Static route not showing the indicator</p>
<p>If you expect a route to be static and the indicator is enabled but not showing, it's likely the route has opted out of static rendering.You can confirm if a route is static or dynamic by building your application using next build --debug, and checking the output in your terminal. Static (or prerendered) routes will display a ○ symbol, whereas dynamic routes will display a ƒ symbol. For example:Build OutputRoute (app)                              Size     First Load JS
┌ ○ /_not-found                          0 B               0 kB
└ ƒ /products/[id]                       0 B               0 kB</p>
<p>○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demandThere are two reasons a route might opt out of static rendering:
The presence of Dynamic APIs which rely on runtime information.
An uncached data request, like a call to an ORM or database driver.
Check your route for any of these conditions, and if you are not able to statically render the route, then consider using loading.js or &lt;Suspense /&gt; to leverage streaming.
Was this helpful?</p>
<p>supported.Send</p>
