# next.config.js: onDemandEntries | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsonDemandEntriesonDemandEntries
Next.js exposes some options that give you some control over how the server will dispose or keep in memory built pages in development.
To change the defaults, open next.config.js and add the onDemandEntries config:
next.config.jsmodule.exports = {
onDemandEntries: {
// period (in ms) where the server will keep pages in the buffer
maxInactiveAge: 25 * 1000,
// number of pages that should be kept simultaneously without being disposed
pagesBufferLength: 2,
},
}Was this helpful?</p>
<p>supported.Send</p>
