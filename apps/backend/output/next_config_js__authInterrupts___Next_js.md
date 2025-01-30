# next.config.js: authInterrupts | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsauthInterruptsauthInterruptsThis feature is currently available in the canary channel and subject to change. Try it out by upgrading Next.js, and share your feedback on GitHub.The authInterrupts configuration option allows you to use forbidden and unauthorized APIs in your application. While these functions are experimental, you must enable the authInterrupts option in your next.config.js file to use them:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
experimental: {
authInterrupts: true,
},
}</p>
<p>export default nextConfig
Next StepsforbiddenAPI Reference for the forbidden function.unauthorizedAPI Reference for the unauthorized function.forbidden.jsAPI reference for the forbidden.js special file.unauthorized.jsAPI reference for the unauthorized.js special file.Was this helpful?</p>
<p>supported.Send</p>
