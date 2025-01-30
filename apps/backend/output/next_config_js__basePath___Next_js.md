# next.config.js: basePath | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsbasePathbasePath
To deploy a Next.js application under a sub-path of a domain you can use the basePath config option.
basePath allows you to set a path prefix for the application. For example, to use /docs instead of '' (an empty string, the default), open next.config.js and add the basePath config:
next.config.jsmodule.exports = {
basePath: '/docs',
}</p>
<p>Good to know: This value must be set at build time and cannot be changed without re-building as the value is inlined in the client-side bundles.</p>
<p>Links</p>
<p>When linking to other pages using next/link and next/router the basePath will be automatically applied.
For example, using /about will automatically become /docs/about when basePath is set to /docs.
export default function HomePage() {
return (
&lt;&gt;
&lt;Link href=&quot;/about&quot;&gt;About Page&lt;/Link&gt;
&lt;/&gt;
)
}
Output html:
&lt;a href=&quot;/docs/about&quot;&gt;About Page&lt;/a&gt;
This makes sure that you don't have to change all links in your application when changing the basePath value.
Images</p>
<p>When using the next/image component, you will need to add the basePath in front of src.</p>
<p>For example, using /docs/me.png will properly serve your image when basePath is set to /docs.
import Image from 'next/image'</p>
<p>function Home() {
return (
&lt;&gt;
&lt;h1&gt;My Homepage&lt;/h1&gt;
&lt;Image
src=&quot;/docs/me.png&quot;
alt=&quot;Picture of the author&quot;
width={500}
height={500}
/&gt;
&lt;p&gt;Welcome to my homepage!&lt;/p&gt;
&lt;/&gt;
)
}</p>
<p>export default HomeWas this helpful?</p>
<p>supported.Send</p>
