# Testing: Cypress | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationTestingCypressSetting up Cypress with Next.jsCypress is a test runner used for End-to-End (E2E) and Component Testing. This page will show you how to set up Cypress with Next.js and write your first tests.</p>
<p>Warning:</p>
<p>Cypress versions below 13.6.3 do not support TypeScript version 5 with moduleResolution:&quot;bundler&quot;. However, this issue has been resolved in Cypress version 13.6.3 and later. cypress v13.6.3</p>
<p>Quickstart</p>
<p>You can use create-next-app with the with-cypress example to quickly get started.Terminalnpx create-next-app@latest --example with-cypress with-cypress-app
Manual setup</p>
<p>To manually set up Cypress, install cypress as a dev dependency:
Terminalnpm install -D cypress</p>
<h1>or</h1>
<p>yarn add -D cypress</p>
<h1>or</h1>
<p>pnpm install -D cypress
Add the Cypress open command to the package.json scripts field:
package.json{
&quot;scripts&quot;: {
&quot;dev&quot;: &quot;next dev&quot;,
&quot;build&quot;: &quot;next build&quot;,
&quot;start&quot;: &quot;next start&quot;,
&quot;lint&quot;: &quot;next lint&quot;,
&quot;cypress:open&quot;: &quot;cypress open&quot;
}
}
Run Cypress for the first time to open the Cypress testing suite:
Terminalnpm run cypress:open
You can choose to configure E2E Testing and/or Component Testing. Selecting any of these options will automatically create a cypress.config.js file and a cypress folder in your project.
Creating your first Cypress E2E test</p>
<p>Ensure your cypress.config file has the following configuration:
cypress.config.tsTypeScriptJavaScriptTypeScriptimport { defineConfig } from 'cypress'</p>
<p>export default defineConfig({
e2e: {
setupNodeEvents(on, config) {},
},
})</p>
<p>Then, create two new Next.js files:
app/page.jsimport Link from 'next/link'</p>
<p>export default function Page() {
return (
&lt;div&gt;
&lt;h1&gt;Home&lt;/h1&gt;
&lt;Link href=&quot;/about&quot;&gt;About&lt;/Link&gt;
&lt;/div&gt;
)
}app/about/page.jsimport Link from 'next/link'</p>
<p>export default function Page() {
return (
&lt;div&gt;
&lt;h1&gt;About&lt;/h1&gt;
&lt;Link href=&quot;/&quot;&gt;Home&lt;/Link&gt;
&lt;/div&gt;
)
}</p>
<p>Add a test to check your navigation is working correctly:
cypress/e2e/app.cy.jsdescribe('Navigation', () =&gt; {
it('should navigate to the about page', () =&gt; {
// Start from the index page
cy.visit('http://localhost:3000/')</p>
<pre><code>// Find a link with an href attribute containing &quot;about&quot; and click it
cy.get('a[href*=&quot;about&quot;]').click()

// The new url should include &quot;/about&quot;
cy.url().should('include', '/about')

// The new page should contain an h1 with &quot;About&quot;
cy.get('h1').contains('About')
</code></pre>
<p>})
})
Running E2E Tests</p>
<p>Cypress will simulate a user navigating your application, this requires your Next.js server to be running. We recommend running your tests against your production code to more closely resemble how your application will behave.
Run npm run build &amp;&amp; npm run start to build your Next.js application, then run npm run cypress:open in another terminal window to start Cypress and run your E2E Testing suite.</p>
<p>Good to know:</p>
<p>You can use cy.visit(&quot;/&quot;) instead of cy.visit(&quot;http://localhost:3000/&quot;) by adding baseUrl: 'http://localhost:3000' to the cypress.config.js configuration file.
Alternatively, you can install the start-server-and-test package to run the Next.js production server in conjunction with Cypress. After installation, add &quot;test&quot;: &quot;start-server-and-test start http://localhost:3000 cypress&quot; to your package.json scripts field. Remember to rebuild your application after new changes.</p>
<p>Creating your first Cypress component test</p>
<p>Component tests build and mount a specific component without having to bundle your whole application or start a server.
Select Component Testing in the Cypress app, then select Next.js as your front-end framework. A cypress/component folder will be created in your project, and a cypress.config.js file will be updated to enable Component Testing.
Ensure your cypress.config file has the following configuration:
cypress.config.tsTypeScriptJavaScriptTypeScriptimport { defineConfig } from 'cypress'</p>
<p>export default defineConfig({
component: {
devServer: {
framework: 'next',
bundler: 'webpack',
},
},
})</p>
<p>Assuming the same components from the previous section, add a test to validate a component is rendering the expected output:
cypress/component/about.cy.tsximport Page from '../../app/page'</p>
<p>describe('&lt;Page /&gt;', () =&gt; {
it('should render and display expected content', () =&gt; {
// Mount the React component for the Home page
cy.mount(&lt;Page /&gt;)</p>
<pre><code>// The new page should contain an h1 with &quot;Home&quot;
cy.get('h1').contains('Home')

// Validate that a link with the expected URL is present
// Following the link is better suited to an E2E test
cy.get('a[href=&quot;/about&quot;]').should('be.visible')
</code></pre>
<p>})
})</p>
<p>Good to know:</p>
<p>Cypress currently doesn't support Component Testing for async Server Components. We recommend using E2E testing.
Since component tests do not require a Next.js server, features like &lt;Image /&gt; that rely on a server being available may not function out-of-the-box.</p>
<p>Running Component Tests</p>
<p>Run npm run cypress:open in your terminal to start Cypress and run your Component Testing suite.
Continuous Integration (CI)</p>
<p>In addition to interactive testing, you can also run Cypress headlessly using the cypress run command, which is better suited for CI environments:
package.json{
&quot;scripts&quot;: {
//...
&quot;e2e&quot;: &quot;start-server-and-test dev http://localhost:3000 &quot;cypress open --e2e&quot;&quot;,
&quot;e2e:headless&quot;: &quot;start-server-and-test dev http://localhost:3000 &quot;cypress run --e2e&quot;&quot;,
&quot;component&quot;: &quot;cypress open --component&quot;,
&quot;component:headless&quot;: &quot;cypress run --component&quot;
}
}
You can learn more about Cypress and Continuous Integration from these resources:</p>
<p>Next.js with Cypress example
Cypress Continuous Integration Docs
Cypress GitHub Actions Guide
Official Cypress GitHub Action
Cypress Discord
Was this helpful?</p>
<p>supported.Send</p>
