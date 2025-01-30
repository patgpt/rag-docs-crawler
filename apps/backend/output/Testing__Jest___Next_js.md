# Testing: Jest | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationTestingJestSetting up Jest with Next.js
Jest and React Testing Library are frequently used together for Unit Testing and Snapshot Testing. This guide will show you how to set up Jest with Next.js and write your first tests.</p>
<p>Good to know: Since async Server Components are new to the React ecosystem, Jest currently does not support them. While you can still run unit tests for synchronous Server and Client Components, we recommend using an E2E tests for async components.</p>
<p>Quickstart</p>
<p>You can use create-next-app with the Next.js with-jest example to quickly get started:
Terminalnpx create-next-app@latest --example with-jest with-jest-app
Manual setup</p>
<p>Since the release of Next.js 12, Next.js now has built-in configuration for Jest.
To set up Jest, install jest and the following packages as dev dependencies:
Terminalnpm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node</p>
<h1>or</h1>
<p>yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node</p>
<h1>or</h1>
<p>pnpm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node
Generate a basic Jest configuration file by running the following command:
Terminalnpm init jest@latest</p>
<h1>or</h1>
<p>yarn create jest@latest</p>
<h1>or</h1>
<p>pnpm create jest@latest
This will take you through a series of prompts to setup Jest for your project, including automatically creating a jest.config.ts|js file.
Update your config file to use next/jest. This transformer has all the necessary configuration options for Jest to work with Next.js:
jest.config.tsTypeScriptJavaScriptTypeScriptimport type { Config } from 'jest'
import nextJest from 'next/jest.js'</p>
<p>const createJestConfig = nextJest({
// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
dir: './',
})</p>
<p>// Add any custom config to be passed to Jest
const config: Config = {
coverageProvider: 'v8',
testEnvironment: 'jsdom',
// Add more setup options before each test is run
// setupFilesAfterEnv: ['&lt;rootDir&gt;/jest.setup.ts'],
}</p>
<p>// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)</p>
<p>Under the hood, next/jest is automatically configuring Jest for you, including:</p>
<p>Setting up transform using the Next.js Compiler.
Auto mocking stylesheets (.css, .module.css, and their scss variants), image imports and next/font.
Loading .env (and all variants) into process.env.
Ignoring node_modules from test resolving and transforms.
Ignoring .next from test resolving.
Loading next.config.js for flags that enable SWC transforms.</p>
<p>Good to know: To test environment variables directly, load them manually in a separate setup script or in your jest.config.ts file. For more information, please see Test Environment Variables.</p>
<p>Optional: Handling Absolute Imports and Module Path Aliases</p>
<p>If your project is using Module Path Aliases, you will need to configure Jest to resolve the imports by matching the paths option in the jsconfig.json file with the moduleNameMapper option in the jest.config.js file. For example:
tsconfig.json or jsconfig.json{
&quot;compilerOptions&quot;: {
&quot;module&quot;: &quot;esnext&quot;,
&quot;moduleResolution&quot;: &quot;bundler&quot;,
&quot;baseUrl&quot;: &quot;./&quot;,
&quot;paths&quot;: {
&quot;@/components/<em>&quot;: [&quot;components/</em>&quot;]
}
}
}
jest.config.jsmoduleNameMapper: {
// ...
'^@/components/(.*)$': '&lt;rootDir&gt;/components/$1',
}
Optional: Extend Jest with custom matchers</p>
<p>@testing-library/jest-dom includes a set of convenient custom matchers such as .toBeInTheDocument() making it easier to write tests. You can import the custom matchers for every test by adding the following option to the Jest configuration file:
jest.config.tsTypeScriptJavaScriptTypeScriptsetupFilesAfterEnv: ['&lt;rootDir&gt;/jest.setup.ts']</p>
<p>Then, inside jest.setup, add the following import:
jest.setup.tsTypeScriptJavaScriptTypeScriptimport '@testing-library/jest-dom'</p>
<p>Good to know: extend-expect was removed in v6.0, so if you are using @testing-library/jest-dom before version 6, you will need to import @testing-library/jest-dom/extend-expect instead.</p>
<p>If you need to add more setup options before each test, you can add them to the jest.setup file above.
Add a test script to package.json</p>
<p>Finally, add a Jest test script to your package.json file:
package.json{
&quot;scripts&quot;: {
&quot;dev&quot;: &quot;next dev&quot;,
&quot;build&quot;: &quot;next build&quot;,
&quot;start&quot;: &quot;next start&quot;,
&quot;test&quot;: &quot;jest&quot;,
&quot;test:watch&quot;: &quot;jest --watch&quot;
}
}
jest --watch will re-run tests when a file is changed. For more Jest CLI options, please refer to the Jest Docs.
Creating your first test</p>
<p>Your project is now ready to run tests. Create a folder called <strong>tests</strong> in your project's root directory.</p>
<p>For example, we can add a test to check if the &lt;Page /&gt; component successfully renders a heading:app/page.jsimport Link from 'next/link'</p>
<p>export default function Page() {
return (
&lt;div&gt;
&lt;h1&gt;Home&lt;/h1&gt;
&lt;Link href=&quot;/about&quot;&gt;About&lt;/Link&gt;
&lt;/div&gt;
)
}<strong>tests</strong>/page.test.jsximport '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'</p>
<p>describe('Page', () =&gt; {
it('renders a heading', () =&gt; {
render(&lt;Page /&gt;)</p>
<pre><code>const heading = screen.getByRole('heading', { level: 1 })

expect(heading).toBeInTheDocument()
</code></pre>
<p>})
})
Optionally, add a snapshot test to keep track of any unexpected changes in your component:</p>
<p><strong>tests</strong>/snapshot.jsimport { render } from '@testing-library/react'
import Page from '../app/page'</p>
<p>it('renders homepage unchanged', () =&gt; {
const { container } = render(&lt;Page /&gt;)
expect(container).toMatchSnapshot()
})
Running your tests</p>
<p>Then, run the following command to run your tests:
Terminalnpm run test</p>
<h1>or</h1>
<p>yarn test</p>
<h1>or</h1>
<p>pnpm test
Additional Resources</p>
<p>For further reading, you may find these resources helpful:</p>
<p>Next.js with Jest example
Jest Docs
React Testing Library Docs
Testing Playground - use good testing practices to match elements.
Was this helpful?</p>
<p>supported.Send</p>
