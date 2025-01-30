# Styling: CSS-in-JS | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationStylingCSS-in-JSCSS-in-JS</p>
<p>Warning: CSS-in-JS libraries which require runtime JavaScript are not currently supported in Server Components. Using CSS-in-JS with newer React features like Server Components and Streaming requires library authors to support the latest version of React, including concurrent rendering.
We're working with the React team on upstream APIs to handle CSS and JavaScript assets with support for React Server Components and streaming architecture.
The following libraries are supported in Client Components in the app directory (alphabetical):
ant-design
chakra-ui
@fluentui/react-components
kuma-ui
@mui/material
@mui/joy
pandacss
styled-jsx
styled-components
stylex
tamagui
tss-react
vanilla-extract
The following are currently working on support:
emotion</p>
<p>Good to know: We're testing out different CSS-in-JS libraries and we'll be adding more examples for libraries that support React 18 features and/or the app directory.
If you want to style Server Components, we recommend using CSS Modules or other solutions that output CSS files, like PostCSS or Tailwind CSS.Configuring CSS-in-JS in app</p>
<p>Configuring CSS-in-JS is a three-step opt-in process that involves:
A style registry to collect all CSS rules in a render.
The new useServerInsertedHTML hook to inject rules before any content that might use them.
A Client Component that wraps your app with the style registry during initial server-side rendering.
styled-jsx</p>
<p>Using styled-jsx in Client Components requires using v5.1.0. First, create a new registry:app/registry.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleRegistry, createStyleRegistry } from 'styled-jsx'</p>
<p>export default function StyledJsxRegistry({
children,
}: {
children: React.ReactNode
}) {
// Only create stylesheet once with lazy initial state
// x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
const [jsxStyleRegistry] = useState(() =&gt; createStyleRegistry())</p>
<p>useServerInsertedHTML(() =&gt; {
const styles = jsxStyleRegistry.styles()
jsxStyleRegistry.flush()
return &lt;&gt;{styles}&lt;/&gt;
})</p>
<p>return &lt;StyleRegistry registry={jsxStyleRegistry}&gt;{children}&lt;/StyleRegistry&gt;
}Then, wrap your root layout with the registry:app/layout.tsxTypeScriptJavaScriptTypeScriptimport StyledJsxRegistry from './registry'</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html&gt;
&lt;body&gt;
&lt;StyledJsxRegistry&gt;{children}&lt;/StyledJsxRegistry&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}View an example here.Styled Components</p>
<p>Below is an example of how to configure styled-components@6 or newer:First, enable styled-components in next.config.js.next.config.jsmodule.exports = {
compiler: {
styledComponents: true,
},
}Then, use the styled-components API to create a global registry component to collect all CSS style rules generated during a render, and a function to return those rules. Then use the useServerInsertedHTML hook to inject the styles collected in the registry into the &lt;head&gt; HTML tag in the root layout.lib/registry.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'</p>
<p>export default function StyledComponentsRegistry({
children,
}: {
children: React.ReactNode
}) {
// Only create stylesheet once with lazy initial state
// x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
const [styledComponentsStyleSheet] = useState(() =&gt; new ServerStyleSheet())</p>
<p>useServerInsertedHTML(() =&gt; {
const styles = styledComponentsStyleSheet.getStyleElement()
styledComponentsStyleSheet.instance.clearTag()
return &lt;&gt;{styles}&lt;/&gt;
})</p>
<p>if (typeof window !== 'undefined') return &lt;&gt;{children}&lt;/&gt;</p>
<p>return (
&lt;StyleSheetManager sheet={styledComponentsStyleSheet.instance}&gt;
{children}
&lt;/StyleSheetManager&gt;
)
}Wrap the children of the root layout with the style registry component:app/layout.tsxTypeScriptJavaScriptTypeScriptimport StyledComponentsRegistry from './lib/registry'</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html&gt;
&lt;body&gt;
&lt;StyledComponentsRegistry&gt;{children}&lt;/StyledComponentsRegistry&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}View an example here.
Good to know:</p>
<p>During server rendering, styles will be extracted to a global registry and flushed to the &lt;head&gt; of your HTML. This ensures the style rules are placed before any content that might use them. In the future, we may use an upcoming React feature to determine where to inject the styles.
During streaming, styles from each chunk will be collected and appended to existing styles. After client-side hydration is complete, styled-components will take over as usual and inject any further dynamic styles.
We specifically use a Client Component at the top level of the tree for the style registry because it's more efficient to extract CSS rules this way. It avoids re-generating styles on subsequent server renders, and prevents them from being sent in the Server Component payload.
For advanced use cases where you need to configure individual properties of styled-components compilation, you can read our Next.js styled-components API reference to learn more.</p>
<p>Was this helpful?</p>
<p>supported.Send</p>
