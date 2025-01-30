# Optimizing: Third Party Libraries | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationOptimizingThird Party LibrariesThird Party Libraries
@next/third-parties is a library that provides a collection of components and utilities that improve the performance and developer experience of loading popular third-party libraries in your Next.js application.
All third-party integrations provided by @next/third-parties have been optimized for performance and ease of use.
Getting Started</p>
<p>To get started, install the @next/third-parties library:
Terminalnpm install @next/third-parties@latest next@latest</p>
<p>@next/third-parties is currently an experimental library under active development. We recommend installing it with the latest or canary flags while we work on adding more third-party integrations.
Google Third-Parties</p>
<p>All supported third-party libraries from Google can be imported from @next/third-parties/google.
Google Tag Manager</p>
<p>The GoogleTagManager component can be used to instantiate a Google Tag Manager container to your page. By default, it fetches the original inline script after hydration occurs on the page.
To load Google Tag Manager for all routes, include the component directly in your root layout and pass in your GTM container ID:app/layout.tsxTypeScriptJavaScriptTypeScriptimport { GoogleTagManager } from '@next/third-parties/google'</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;GoogleTagManager gtmId=&quot;GTM-XYZ&quot; /&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>To load Google Tag Manager for a single route, include the component in your page file:
app/page.jsimport { GoogleTagManager } from '@next/third-parties/google'</p>
<p>export default function Page() {
return &lt;GoogleTagManager gtmId=&quot;GTM-XYZ&quot; /&gt;
}</p>
<p>Sending Events</p>
<p>The sendGTMEvent function can be used to track user interactions on your page by sending events
using the dataLayer object. For this function to work, the &lt;GoogleTagManager /&gt; component must be
included in either a parent layout, page, or component, or directly in the same file.
app/page.js'use client'</p>
<p>import { sendGTMEvent } from '@next/third-parties/google'</p>
<p>export function EventButton() {
return (
&lt;div&gt;
&lt;button
onClick={() =&gt; sendGTMEvent({ event: 'buttonClicked', value: 'xyz' })}
&gt;
Send Event
&lt;/button&gt;
&lt;/div&gt;
)
}</p>
<p>Refer to the Tag Manager developer
documentation to learn about the
different variables and events that can be passed into the function.
Server-side Tagging</p>
<p>If you're using a server-side tag manager and serving gtm.js scripts from your tagging server you can
use gtmScriptUrl option to specify the URL of the script.
Options</p>
<p>Options to pass to the Google Tag Manager. For a full list of options, read the Google Tag Manager
docs.
NameTypeDescriptiongtmIdRequiredYour GTM container ID. Usually starts with GTM-.gtmScriptUrlOptionalGTM script URL. Defaults to https://www.googletagmanager.com/gtm.js.dataLayerOptionalData layer object to instantiate the container with.dataLayerNameOptionalName of the data layer. Defaults to dataLayer.authOptionalValue of authentication parameter (gtm_auth) for environment snippets.previewOptionalValue of preview parameter (gtm_preview) for environment snippets.
Google Analytics</p>
<p>The GoogleAnalytics component can be used to include Google Analytics
4 to your page via the Google tag
(gtag.js). By default, it fetches the original scripts after hydration occurs on the page.</p>
<p>Recommendation: If Google Tag Manager is already included in your application, you can
configure Google Analytics directly using it, rather than including Google Analytics as a separate
component. Refer to the
documentation
to learn more about the differences between Tag Manager and gtag.js.</p>
<p>To load Google Analytics for all routes, include the component directly in your root layout and pass
in your measurement ID:app/layout.tsxTypeScriptJavaScriptTypeScriptimport { GoogleAnalytics } from '@next/third-parties/google'</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot;&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;GoogleAnalytics gaId=&quot;G-XYZ&quot; /&gt;
&lt;/html&gt;
)
}</p>
<p>To load Google Analytics for a single route, include the component in your page file:
app/page.jsimport { GoogleAnalytics } from '@next/third-parties/google'</p>
<p>export default function Page() {
return &lt;GoogleAnalytics gaId=&quot;G-XYZ&quot; /&gt;
}</p>
<p>Sending Events</p>
<p>The sendGAEvent function can be used to measure user interactions on your page by sending events
using the dataLayer object. For this function to work, the &lt;GoogleAnalytics /&gt; component must be
included in either a parent layout, page, or component, or directly in the same file.
app/page.js'use client'</p>
<p>import { sendGAEvent } from '@next/third-parties/google'</p>
<p>export function EventButton() {
return (
&lt;div&gt;
&lt;button
onClick={() =&gt; sendGAEvent('event', 'buttonClicked', { value: 'xyz' })}
&gt;
Send Event
&lt;/button&gt;
&lt;/div&gt;
)
}</p>
<p>Refer to the Google Analytics developer
documentation to learn
more about event parameters.
Tracking Pageviews</p>
<p>Google Analytics automatically tracks pageviews when the browser history state changes. This means
that client-side navigations between Next.js routes will send pageview data without any configuration.
To ensure that client-side navigations are being measured correctly, verify that the “Enhanced
Measurement” property is
enabled in your Admin panel and the “Page changes based on browser history events” checkbox is
selected.</p>
<p>Note: If you decide to manually send pageview events, make sure to disable the default
pageview measurement to avoid having duplicate data. Refer to the Google Analytics developer
documentation
to learn more.</p>
<p>Options</p>
<p>Options to pass to the &lt;GoogleAnalytics&gt; component.
NameTypeDescriptiongaIdRequiredYour measurement ID. Usually starts with G-.dataLayerNameOptionalName of the data layer. Defaults to dataLayer.nonceOptionalA nonce.
Google Maps Embed</p>
<p>The GoogleMapsEmbed component can be used to add a Google Maps
Embed to your page. By
default, it uses the loading attribute to lazy-load the embed below the fold.
app/page.jsimport { GoogleMapsEmbed } from '@next/third-parties/google'</p>
<p>export default function Page() {
return (
&lt;GoogleMapsEmbed
apiKey=&quot;XYZ&quot;
height={200}
width=&quot;100%&quot;
mode=&quot;place&quot;
q=&quot;Brooklyn+Bridge,New+York,NY&quot;
/&gt;
)
}</p>
<p>Options</p>
<p>Options to pass to the Google Maps Embed. For a full list of options, read the Google Map Embed
docs.
NameTypeDescriptionapiKeyRequiredYour api key.modeRequiredMap modeheightOptionalHeight of the embed. Defaults to auto.widthOptionalWidth of the embed. Defaults to auto.styleOptionalPass styles to the iframe.allowfullscreenOptionalProperty to allow certain map parts to go full screen.loadingOptionalDefaults to lazy. Consider changing if you know your embed will be above the fold.qOptionalDefines map marker location. This may be required depending on the map mode.centerOptionalDefines the center of the map view.zoomOptionalSets initial zoom level of the map.maptypeOptionalDefines type of map tiles to load.languageOptionalDefines the language to use for UI elements and for the display of labels on map tiles.regionOptionalDefines the appropriate borders and labels to display, based on geo-political sensitivities.
YouTube Embed</p>
<p>The YouTubeEmbed component can be used to load and display a YouTube embed. This component loads
faster by using lite-youtube-embed under the
hood.
app/page.jsimport { YouTubeEmbed } from '@next/third-parties/google'</p>
<p>export default function Page() {
return &lt;YouTubeEmbed videoid=&quot;ogfYd705cRs&quot; height={400} params=&quot;controls=0&quot; /&gt;
}</p>
<p>Options</p>
<p>NameTypeDescriptionvideoidRequiredYouTube video id.widthOptionalWidth of the video container. Defaults to autoheightOptionalHeight of the video container. Defaults to autoplaylabelOptionalA visually hidden label for the play button for accessibility.paramsOptionalThe video player params defined here.  Params are passed as a query param string.  Eg: params=&quot;controls=0&amp;start=10&amp;end=30&quot;styleOptionalUsed to apply styles to the video container.Was this helpful?</p>
<p>supported.Send</p>
