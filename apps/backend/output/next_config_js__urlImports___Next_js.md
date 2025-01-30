# next.config.js: urlImports | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsurlImportsurlImportsThis feature is currently experimental and subject to change, it's not recommended for production. Try it out and share your feedback on GitHub.
URL imports are an experimental feature that allows you to import modules directly from external servers (instead of from the local disk).</p>
<p>Warning: Only use domains that you trust to download and execute on your machine. Please exercise discretion, and caution until the feature is flagged as stable.</p>
<p>To opt-in, add the allowed URL prefixes inside next.config.js:
next.config.jsmodule.exports = {
experimental: {
urlImports: ['https://example.com/assets/', 'https://cdn.skypack.dev'],
},
}
Then, you can import modules directly from URLs:
import { a, b, c } from 'https://example.com/assets/some/module.js'
URL Imports can be used everywhere normal package imports can be used.
Security Model</p>
<p>This feature is being designed with security as the top priority. To start, we added an experimental flag forcing you to explicitly allow the domains you accept URL imports from. We're working to take this further by limiting URL imports to execute in the browser sandbox using the Edge Runtime.
Lockfile</p>
<p>When using URL imports, Next.js will create a next.lock directory containing a lockfile and fetched assets.
This directory must be committed to Git, not ignored by .gitignore.</p>
<p>When running next dev, Next.js will download and add all newly discovered URL Imports to your lockfile.
When running next build, Next.js will use only the lockfile to build the application for production.</p>
<p>Typically, no network requests are needed and any outdated lockfile will cause the build to fail.
One exception is resources that respond with Cache-Control: no-cache.
These resources will have a no-cache entry in the lockfile and will always be fetched from the network on each build.
Examples</p>
<p>Skypack</p>
<p>import confetti from 'https://cdn.skypack.dev/canvas-confetti'
import { useEffect } from 'react'</p>
<p>export default () =&gt; {
useEffect(() =&gt; {
confetti()
})
return &lt;p&gt;Hello&lt;/p&gt;
}
Static Image Imports</p>
<p>import Image from 'next/image'
import logo from 'https://example.com/assets/logo.png'</p>
<p>export default () =&gt; (
&lt;div&gt;
&lt;Image src={logo} placeholder=&quot;blur&quot; /&gt;
&lt;/div&gt;
)
URLs in CSS</p>
<p>.className {
background: url('https://example.com/assets/hero.jpg');
}
Asset Imports</p>
<p>const logo = new URL('https://example.com/assets/file.txt', import.meta.url)</p>
<p>console.log(logo.pathname)</p>
<p>// prints &quot;/_next/static/media/file.a9727b5d.txt&quot;Was this helpful?</p>
<p>supported.Send</p>
