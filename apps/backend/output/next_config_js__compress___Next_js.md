# next.config.js: compress | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jscompresscompress
By default, Next.js uses gzip to compress rendered content and static files when using next start or a custom server. This is an optimization for applications that do not have compression configured. If compression is already configured in your application via a custom server, Next.js will not add compression.</p>
<p>Good to know:</p>
<p>When hosting your application on Vercel, compression uses brotli first, then gzip.
You can check if compression is enabled and which algorithm is used by looking at the Accept-Encoding (browser accepted options) and Content-Encoding (currently used) headers in the response.</p>
<p>Disabling compression</p>
<p>To disable compression, set the compress config option to false:
next.config.jsmodule.exports = {
compress: false,
}
We do not recommend disabling compression unless you have compression configured on your server, as compression reduces bandwidth usage and improves the performance of your application.
Changing the compression algorithm</p>
<p>To change your compression algorithm, you will need to configure your custom server and set the compress option to false in your next.config.js file.
For example, you're using nginx and want to switch to brotli, set the compress option to false to allow nginx to handle compression.</p>
<p>Good to know:</p>
<p>For Next.js applications on Vercel, compression is handled by the Vercel's Edge Network and not Next.js. See the Vercel documentation for more information.</p>
<p>Was this helpful?</p>
<p>supported.Send</p>
