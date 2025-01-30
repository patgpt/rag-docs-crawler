# Testing: Vitest | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationTestingVitestSetting up Vitest with Next.jsVite and React Testing Library are frequently used together for Unit Testing. This guide will show you how to setup Vitest with Next.js and write your first tests.</p>
<p>Good to know: Since async Server Components are new to the React ecosystem, Vitest currently does not support them. While you can still run unit tests for synchronous Server and Client Components, we recommend using an E2E tests for async components.</p>
<p>Quickstart</p>
<p>You can use create-next-app with the Next.js with-vitest example to quickly get started:
Terminalnpx create-next-app@latest --example with-vitest with-vitest-app
Manual Setup</p>
<p>To manually set up Vitest, install vitest and the following packages as dev dependencies:
Terminal# Using TypeScript
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths</p>
<h1>Using JavaScript</h1>
<p>npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom
Create a vitest.config.mts|js file in the root of your project, and add the following options:
vitest.config.mtsTypeScriptJavaScriptTypeScriptimport { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'</p>
<p>export default defineConfig({
plugins: [tsconfigPaths(), react()],
test: {
environment: 'jsdom',
},
})</p>
<p>For more information on configuring Vitest, please refer to the Vitest Configuration docs.
Then, add a test script to your package.json:
package.json{
&quot;scripts&quot;: {
&quot;dev&quot;: &quot;next dev&quot;,
&quot;build&quot;: &quot;next build&quot;,
&quot;start&quot;: &quot;next start&quot;,
&quot;test&quot;: &quot;vitest&quot;
}
}
When you run npm run test, Vitest will watch for changes in your project by default.
Creating your first Vitest Unit Test</p>
<p>Check that everything is working by creating a test to check if the &lt;Page /&gt; component successfully renders a heading:
app/page.tsxTypeScriptJavaScriptTypeScriptimport Link from 'next/link'</p>
<p>export default function Page() {
return (
&lt;div&gt;
&lt;h1&gt;Home&lt;/h1&gt;
&lt;Link href=&quot;/about&quot;&gt;About&lt;/Link&gt;
&lt;/div&gt;
)
}<strong>tests</strong>/page.test.tsxTypeScriptJavaScriptTypeScriptimport { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'</p>
<p>test('Page', () =&gt; {
render(&lt;Page /&gt;)
expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})
Good to know: The example above uses the common <strong>tests</strong> convention, but test files can also be colocated inside the app router.</p>
<p>Running your tests</p>
<p>Then, run the following command to run your tests:
Terminalnpm run test</p>
<h1>or</h1>
<p>yarn test</p>
<h1>or</h1>
<p>pnpm test</p>
<h1>or</h1>
<p>bun test
Additional Resources</p>
<p>You may find these resources helpful:</p>
<p>Next.js with Vitest example
Vitest Docs
React Testing Library Docs
Was this helpful?</p>
<p>supported.Send</p>
