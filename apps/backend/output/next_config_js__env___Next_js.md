# next.config.js: env | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsenvenv</p>
<p>Since the release of Next.js 9.4 we now have a more intuitive and ergonomic experience for adding environment variables. Give it a try!</p>
<p>Good to know: environment variables specified in this way will always be included in the JavaScript bundle, prefixing the environment variable name with NEXT_PUBLIC_ only has an effect when specifying them through the environment or .env files.</p>
<p>To add environment variables to the JavaScript bundle, open next.config.js and add the env config:
next.config.jsmodule.exports = {
env: {
customKey: 'my-value',
},
}
Now you can access process.env.customKey in your code. For example:
function Page() {
return &lt;h1&gt;The value of customKey is: {process.env.customKey}&lt;/h1&gt;
}</p>
<p>export default Page
Next.js will replace process.env.customKey with 'my-value' at build time. Trying to destructure process.env variables won't work due to the nature of webpack DefinePlugin.
For example, the following line:
return &lt;h1&gt;The value of customKey is: {process.env.customKey}&lt;/h1&gt;
Will end up being:
return &lt;h1&gt;The value of customKey is: {'my-value'}&lt;/h1&gt;Was this helpful?</p>
<p>supported.Send</p>
