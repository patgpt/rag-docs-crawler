# next.config.js: reactStrictMode | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsreactStrictModereactStrictMode</p>
<p>Good to know: Since Next.js 13.5.1, Strict Mode is true by default with app router, so the above configuration is only necessary for pages. You can still disable Strict Mode by setting reactStrictMode: false.</p>
<p>Suggested: We strongly suggest you enable Strict Mode in your Next.js application to better prepare your application for the future of React.</p>
<p>React's Strict Mode is a development mode only feature for highlighting potential problems in an application. It helps to identify unsafe lifecycles, legacy API usage, and a number of other features.
The Next.js runtime is Strict Mode-compliant. To opt-in to Strict Mode, configure the following option in your next.config.js:
next.config.jsmodule.exports = {
reactStrictMode: true,
}
If you or your team are not ready to use Strict Mode in your entire application, that's OK! You can incrementally migrate on a page-by-page basis using &lt;React.StrictMode&gt;.Was this helpful?</p>
<p>supported.Send</p>
