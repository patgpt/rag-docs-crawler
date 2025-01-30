# Functions: useReportWebVitals | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsuseReportWebVitalsuseReportWebVitals
The useReportWebVitals hook allows you to report Core Web Vitals, and can be used in combination with your analytics service.</p>
<p>app/_components/web-vitals.js'use client'</p>
<p>import { useReportWebVitals } from 'next/web-vitals'</p>
<p>export function WebVitals() {
useReportWebVitals((metric) =&gt; {
console.log(metric)
})</p>
<p>return null
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
Since the useReportWebVitals hook requires the &quot;use client&quot; directive, the most performant approach is to create a separate component that the root layout imports. This confines the client boundary exclusively to the WebVitals component.</p>
<p>useReportWebVitals</p>
<p>The metric object passed as the hook's argument consists of a number of properties:</p>
<p>id: Unique identifier for the metric in the context of the current page load
name: The name of the performance metric. Possible values include names of Web Vitals metrics (TTFB, FCP, LCP, FID, CLS) specific to a web application.
delta: The difference between the current value and the previous value of the metric. The value is typically in milliseconds and represents the change in the metric's value over time.
entries: An array of Performance Entries associated with the metric. These entries provide detailed information about the performance events related to the metric.
navigationType: Indicates the type of navigation that triggered the metric collection. Possible values include &quot;navigate&quot;, &quot;reload&quot;, &quot;back_forward&quot;, and &quot;prerender&quot;.
rating: A qualitative rating of the metric value, providing an assessment of the performance. Possible values are &quot;good&quot;, &quot;needs-improvement&quot;, and &quot;poor&quot;. The rating is typically determined by comparing the metric value against predefined thresholds that indicate acceptable or suboptimal performance.
value: The actual value or duration of the performance entry, typically in milliseconds. The value provides a quantitative measure of the performance aspect being tracked by the metric. The source of the value depends on the specific metric being measured and can come from various Performance APIs.</p>
<p>Web Vitals</p>
<p>Web Vitals are a set of useful metrics that aim to capture the user
experience of a web page. The following web vitals are all included:</p>
<p>Time to First Byte (TTFB)
First Contentful Paint (FCP)
Largest Contentful Paint (LCP)
First Input Delay (FID)
Cumulative Layout Shift (CLS)
Interaction to Next Paint (INP)</p>
<p>You can handle all the results of these metrics using the name property.</p>
<p>app/components/web-vitals.tsxTypeScriptJavaScriptTypeScript'use client'</p>
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
<p>Usage on Vercel</p>
<p>Vercel Speed Insights does not useReportWebVitals, but @vercel/speed-insights package instead.
useReportWebVitals hook is useful in local development, or if you're using a different service for collecting Web Vitals.
Sending results to external systems</p>
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
<p>useReportWebVitals(metric =&gt; {
// Use <code>window.gtag</code> if you initialized Google Analytics as this example:
// https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
window.gtag('event', metric.name, {
value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value), // values must be integers
event_label: metric.id, // id unique to current page load
non_interaction: true, // avoids affecting bounce rate.
});
}
Read more about sending results to Google Analytics.
Was this helpful?</p>
<p>supported.Send</p>
