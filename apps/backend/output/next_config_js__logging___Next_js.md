# next.config.js: logging | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jslogginglogging
Options</p>
<p>Fetching</p>
<p>You can configure the logging level and whether the full URL is logged to the console when running Next.js in development mode.
Currently, logging only applies to data fetching using the fetch API. It does not yet apply to other logs inside of Next.js.
next.config.jsmodule.exports = {
logging: {
fetches: {
fullUrl: true,
},
},
}
Any fetch requests that are restored from the Server Components HMR cache are not logged by default. However, this can be enabled by setting logging.fetches.hmrRefreshes to true.
next.config.jsmodule.exports = {
logging: {
fetches: {
hmrRefreshes: true,
},
},
}
Incoming Requests</p>
<p>By default all the incoming requests will be logged in the console during development. You can use the incomingRequests option to decide which requests to ignore.
Since this is only logged in development, this option doesn't affect production builds.
next.config.jsmodule.exports = {
logging: {
incomingRequests: {
ignore: [/\api/v1/health/],
},
},
}
Or you can disable incoming request logging by setting incomingRequests to false.
next.config.jsmodule.exports = {
logging: {
incomingRequests: false,
},
}
Disabling Logging</p>
<p>In addition, you can disable the development logging by setting logging to false.
next.config.jsmodule.exports = {
logging: false,
}Was this helpful?</p>
<p>supported.Send</p>
