# next.config.js: inlineCss | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsinlineCssinlineCssThis feature is currently experimental and subject to change, it's not recommended for production. Try it out and share your feedback on GitHub.Usage</p>
<p>Experimental support for inlining CSS in the &lt;head&gt;. When this flag is enabled, all places where we normally generate a &lt;link&gt; tag will instead have a generated &lt;style&gt; tag.
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
inlineCss: true,
},
}</p>
<p>export default nextConfig</p>
<p>Trade-Offs</p>
<p>When to Use Inline CSS</p>
<p>Inlining CSS can be beneficial in several scenarios:</p>
<p>First-Time Visitors: Since CSS files are render-blocking resources, inlining eliminates the initial download delay that first-time visitors experience, improving page load performance.</p>
<p>Performance Metrics: By removing the additional network requests for CSS files, inlining can significantly improve key metrics like First Contentful Paint (FCP) and Largest Contentful Paint (LCP).</p>
<p>Slow Connections: For users on slower networks where each request adds considerable latency, inlining CSS can provide a noticeable performance boost by reducing network roundtrips.</p>
<p>Atomic CSS Bundles (e.g., Tailwind): With utility-first frameworks like Tailwind CSS, the size of the styles required for a page is often O(1) relative to the complexity of the design. This makes inlining a compelling choice because the entire set of styles for the current page is lightweight and doesn’t grow with the page size. Inlining Tailwind styles ensures minimal payload and eliminates the need for additional network requests, which can further enhance performance.</p>
<p>When Not to Use Inline CSS</p>
<p>While inlining CSS offers significant benefits for performance, there are scenarios where it may not be the best choice:</p>
<p>Large CSS Bundles: If your CSS bundle is too large, inlining it may significantly increase the size of the HTML, resulting in slower Time to First Byte (TTFB) and potentially worse performance for users with slow connections.</p>
<p>Dynamic or Page-Specific CSS: For applications with highly dynamic styles or pages that use different sets of CSS, inlining may lead to redundancy and bloat, as the full CSS for all pages may need to be inlined repeatedly.</p>
<p>Browser Caching: In cases where visitors frequently return to your site, external CSS files allow browsers to cache styles efficiently, reducing data transfer for subsequent visits. Inlining CSS eliminates this benefit.</p>
<p>Evaluate these trade-offs carefully, and consider combining inlining with other strategies, such as critical CSS extraction or a hybrid approach, for the best results tailored to your site's needs.</p>
<p>Good to know:
This feature is currently experimental and has some known limitations:</p>
<p>CSS inlining is applied globally and cannot be configured on a per-page basis
Styles are duplicated during initial page load - once within &lt;style&gt; tags for SSR and once in the RSC payload
When navigating to statically rendered pages, styles will use &lt;link&gt; tags instead of inline CSS to avoid duplication
This feature is not available in development mode and only works in production builds</p>
<p>Was this helpful?</p>
<p>supported.Send</p>
