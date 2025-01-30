# next.config.js: reactMaxHeadersLength | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsreactMaxHeadersLengthreactMaxHeadersLengthDuring static rendering, React can emit headers that can be added to the response. These can be used to improve performance by allowing the browser to preload resources like fonts, scripts, and stylesheets. The default value is 6000, but you can override this value by configuring the reactMaxHeadersLength option in next.config.js:
next.config.jsmodule.exports = {
reactMaxHeadersLength: 1000,
}</p>
<p>Good to know: This option is only available in App Router.</p>
<p>Depending on the type of proxy between the browser and the server, the headers can be truncated. For example, if you are using a reverse proxy that doesn't support long headers, you should set a lower value to ensure that the headers are not truncated.Was this helpful?</p>
<p>supported.Send</p>
