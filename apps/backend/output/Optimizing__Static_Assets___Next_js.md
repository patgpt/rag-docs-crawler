# Optimizing: Static Assets | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationOptimizingStatic AssetsStatic Assets in <code>public</code>
Next.js can serve static files, like images, under a folder called public in the root directory. Files inside public can then be referenced by your code starting from the base URL (/).
For example, the file public/avatars/me.png can be viewed by visiting the /avatars/me.png path. The code to display that image might look like:
avatar.jsimport Image from 'next/image'</p>
<p>export function Avatar({ id, alt }) {
return &lt;Image src={<code>/avatars/${id}.png</code>} alt={alt} width=&quot;64&quot; height=&quot;64&quot; /&gt;
}</p>
<p>export function AvatarOfMe() {
return &lt;Avatar id=&quot;me&quot; alt=&quot;A portrait of me&quot; /&gt;
}
Caching</p>
<p>Next.js cannot safely cache assets in the public folder because they may change. The default caching headers applied are:
Cache-Control: public, max-age=0
Robots, Favicons, and others</p>
<p>For static metadata files, such as robots.txt, favicon.ico, etc, you should use special metadata files inside the app folder.</p>
<p>Good to know:</p>
<p>The directory must be named public. The name cannot be changed and it's the only directory used to serve static assets.
Only assets that are in the public directory at build time will be served by Next.js. Files added at request time won't be available. We recommend using a third-party service like Vercel Blob for persistent file storage.</p>
<p>Was this helpful?</p>
<p>supported.Send</p>
