# Upgrading: Version 14 | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationUpgradingVersion 14Version 14
Upgrading from 13 to 14</p>
<p>To update to Next.js version 14, run the following command using your preferred package manager:
Terminalnpm i next@next-14 react@18 react-dom@18 &amp;&amp; npm i eslint-config-next@next-14 -D
Terminalyarn add next@next-14 react@18 react-dom@18 &amp;&amp; yarn add eslint-config-next@next-14 -D
Terminalpnpm i next@next-14 react@18 react-dom@18 &amp;&amp; pnpm i eslint-config-next@next-14 -D
Terminalbun add next@next-14 react@18 react-dom@18 &amp;&amp; bun add eslint-config-next@next-14 -D</p>
<p>Good to know: If you are using TypeScript, ensure you also upgrade @types/react and @types/react-dom to their latest versions.</p>
<p>v14 Summary</p>
<p>The minimum Node.js version has been bumped from 16.14 to 18.17, since 16.x has reached end-of-life.
The next export command has been removed in favor of output: 'export' config. Please see the docs for more information.
The next/server import for ImageResponse was renamed to next/og. A codemod is available to safely and automatically rename your imports.
The @next/font package has been fully removed in favor of the built-in next/font. A codemod is available to safely and automatically rename your imports.
The WASM target for next-swc has been removed.
Was this helpful?</p>
<p>supported.Send</p>
