# Building Your Application: Testing | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6App RouterBuilding Your ApplicationTestingTestingIn React and Next.js, there are a few different types of tests you can write, each with its own purpose and use cases. This page provides an overview of types and commonly used tools you can use to test your application.
Types of tests</p>
<p>Unit Testing involves testing individual units (or blocks of code) in isolation. In React, a unit can be a single function, hook, or component.</p>
<p>Component Testing is a more focused version of unit testing where the primary subject of the tests is React components. This may involve testing how components are rendered, their interaction with props, and their behavior in response to user events.
Integration Testing involves testing how multiple units work together. This can be a combination of components, hooks, and functions.</p>
<p>End-to-End (E2E) Testing involves testing user flows in an environment that simulates real user scenarios, like the browser. This means testing specific tasks (e.g. signup flow) in a production-like environment.
Snapshot Testing involves capturing the rendered output of a component and saving it to a snapshot file. When tests run, the current rendered output of the component is compared against the saved snapshot. Changes in the snapshot are used to indicate unexpected changes in behavior.</p>
<p>Async Server Components</p>
<p>Since async Server Components are new to the React ecosystem, some tools do not fully support them. In the meantime, we recommend using End-to-End Testing over Unit Testing for async components.
Guides</p>
<p>See the guides below to learn how to set up Next.js with these commonly used testing tools:VitestLearn how to set up Vitest with Next.js for Unit Testing.JestLearn how to set up Jest with Next.js for Unit Testing and Snapshot Testing.PlaywrightLearn how to set up Playwright with Next.js for End-to-End (E2E) Testing.CypressLearn how to set up Cypress with Next.js for End-to-End (E2E) and Component Testing.Was this helpful?</p>
<p>supported.Send</p>
