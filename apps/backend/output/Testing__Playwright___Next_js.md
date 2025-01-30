# Testing: Playwright | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationTestingPlaywrightSetting up Playwright with Next.jsPlaywright is a testing framework that lets you automate Chromium, Firefox, and WebKit with a single API. You can use it to write End-to-End (E2E) testing. This guide will show you how to set up Playwright with Next.js and write your first tests.
Quickstart</p>
<p>The fastest way to get started is to use create-next-app with the with-playwright example. This will create a Next.js project complete with Playwright configured.
Terminalnpx create-next-app@latest --example with-playwright with-playwright-app
Manual setup</p>
<p>To install Playwright, run the following command:
Terminalnpm init playwright</p>
<h1>or</h1>
<p>yarn create playwright</p>
<h1>or</h1>
<p>pnpm create playwright
This will take you through a series of prompts to setup and configure Playwright for your project, including adding a playwright.config.ts file. Please refer to the Playwright installation guide for the step-by-step guide.
Creating your first Playwright E2E test</p>
<p>Create two new Next.js pages:
app/page.tsximport Link from 'next/link'</p>
<p>export default function Page() {
return (
&lt;div&gt;
&lt;h1&gt;Home&lt;/h1&gt;
&lt;Link href=&quot;/about&quot;&gt;About&lt;/Link&gt;
&lt;/div&gt;
)
}app/about/page.tsximport Link from 'next/link'</p>
<p>export default function Page() {
return (
&lt;div&gt;
&lt;h1&gt;About&lt;/h1&gt;
&lt;Link href=&quot;/&quot;&gt;Home&lt;/Link&gt;
&lt;/div&gt;
)
}</p>
<p>Then, add a test to verify that your navigation is working correctly:
tests/example.spec.tsimport { test, expect } from '@playwright/test'</p>
<p>test('should navigate to the about page', async ({ page }) =&gt; {
// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
await page.goto('http://localhost:3000/')
// Find an element with the text 'About' and click on it
await page.click('text=About')
// The new URL should be &quot;/about&quot; (baseURL is used there)
await expect(page).toHaveURL('http://localhost:3000/about')
// The new page should contain an h1 with &quot;About&quot;
await expect(page.locator('h1')).toContainText('About')
})</p>
<p>Good to know: You can use page.goto(&quot;/&quot;) instead of page.goto(&quot;http://localhost:3000/&quot;), if you add &quot;baseURL&quot;: &quot;http://localhost:3000&quot; to the playwright.config.ts configuration file.</p>
<p>Running your Playwright tests</p>
<p>Playwright will simulate a user navigating your application using three browsers: Chromium, Firefox and Webkit, this requires your Next.js server to be running. We recommend running your tests against your production code to more closely resemble how your application will behave.
Run npm run build and npm run start, then run npx playwright test in another terminal window to run the Playwright tests.</p>
<p>Good to know: Alternatively, you can use the webServer feature to let Playwright start the development server and wait until it's fully available.</p>
<p>Running Playwright on Continuous Integration (CI)</p>
<p>Playwright will by default run your tests in the headless mode. To install all the Playwright dependencies, run npx playwright install-deps.
You can learn more about Playwright and Continuous Integration from these resources:</p>
<p>Next.js with Playwright example
Playwright on your CI provider
Playwright Discord
Was this helpful?</p>
<p>supported.Send</p>
