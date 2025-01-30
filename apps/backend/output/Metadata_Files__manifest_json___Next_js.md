# Metadata Files: manifest.json | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6File ConventionsMetadata Filesmanifest.jsonmanifest.jsonAdd or generate a manifest.(json|webmanifest) file that matches the Web Manifest Specification in the root of app directory to provide information about your web application for the browser.
Static Manifest file</p>
<p>app/manifest.json | app/manifest.webmanifest{
&quot;name&quot;: &quot;My Next.js Application&quot;,
&quot;short_name&quot;: &quot;Next.js App&quot;,
&quot;description&quot;: &quot;An application built with Next.js&quot;,
&quot;start_url&quot;: &quot;/&quot;
// ...
}
Generate a Manifest file</p>
<p>Add a manifest.js or manifest.ts file that returns a Manifest object.</p>
<p>Good to know: manifest.js is special Route Handlers that is cached by default unless it uses a Dynamic API or dynamic config option.</p>
<p>app/manifest.tsTypeScriptJavaScriptTypeScriptimport type { MetadataRoute } from 'next'</p>
<p>export default function manifest(): MetadataRoute.Manifest {
return {
name: 'Next.js App',
short_name: 'Next.js App',
description: 'Next.js App',
start_url: '/',
display: 'standalone',
background_color: '#fff',
theme_color: '#fff',
icons: [
{
src: '/favicon.ico',
sizes: 'any',
type: 'image/x-icon',
},
],
}
}</p>
<p>Manifest Object</p>
<p>The manifest object contains an extensive list of options that may be updated due to new web standards. For information on all the current options, refer to the MetadataRoute.Manifest type in your code editor if using TypeScript or see the MDN docs.Was this helpful?</p>
<p>supported.Send</p>
