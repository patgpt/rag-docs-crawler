# Optimizing: Analytics | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationOptimizingAnalyticsAnalytics
Next.js has built-in support for measuring and reporting performance metrics. You can either use the useReportWebVitals hook to manage reporting yourself, or alternatively, Vercel provides a managed service to automatically collect and visualize metrics for you.
Build Your Own</p>
<p>app/_components/web-vitals.js'use client'</p>
<p>import { useReportWebVitals } from 'next/web-vitals'</p>
<p>export function WebVitals() {
useReportWebVitals((metric) =&gt; {
console.log(metric)
})
}app/layout.jsimport { WebVitals } from './_components/web-vitals'</p>
<p>export default function Layout({ children }) {
return (
&lt;html&gt;
&lt;body&gt;
&lt;WebVitals /&gt;
{children}
&lt;/body&gt;
&lt;/html&gt;
)
}
Since the useReportWebVitals hook requires the &quot;use client&quot; directive, the most performant approach is to create a separate component that the root layout imports. This confines the client boundary exclusively to the WebVitals component.
View the API Reference for more information.
Web Vitals</p>
<p>Web Vitals are a set of useful metrics that aim to capture the user
experience of a web page. The following web vitals are all included:</p>
<p>Time to First Byte (TTFB)
First Contentful Paint (FCP)
Largest Contentful Paint (LCP)
First Input Delay (FID)
Cumulative Layout Shift (CLS)
Interaction to Next Paint (INP)</p>
<p>You can handle all the results of these metrics using the name property.</p>
<p>app/_components/web-vitals.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useReportWebVitals } from 'next/web-vitals'</p>
<p>export function WebVitals() {
useReportWebVitals((metric) =&gt; {
switch (metric.name) {
case 'FCP': {
// handle FCP results
}
case 'LCP': {
// handle LCP results
}
// ...
}
})
}</p>
<p>Sending results to external systems</p>
<p>You can send results to any endpoint to measure and track
real user performance on your site. For example:
useReportWebVitals((metric) =&gt; {
const body = JSON.stringify(metric)
const url = 'https://example.com/analytics'</p>
<p>// Use <code>navigator.sendBeacon()</code> if available, falling back to <code>fetch()</code>.
if (navigator.sendBeacon) {
navigator.sendBeacon(url, body)
} else {
fetch(url, { body, method: 'POST', keepalive: true })
}
})</p>
<p>Good to know: If you use Google Analytics, using the
id value can allow you to construct metric distributions manually (to calculate percentiles,
etc.)</p>
<p>useReportWebVitals((metric) =&gt; {
// Use <code>window.gtag</code> if you initialized Google Analytics as this example:
// https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
window.gtag('event', metric.name, {
value: Math.round(
metric.name === 'CLS' ? metric.value * 1000 : metric.value
), // values must be integers
event_label: metric.id, // id unique to current page load
non_interaction: true, // avoids affecting bounce rate.
})
})
Read more about sending results to Google Analytics.
Was this helpful?</p>
<p>supported.Send</p>
