# Configuration: ESLint | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceConfigurationESLintESLint Plugin
Next.js provides an ESLint plugin, eslint-plugin-next, already bundled within the base configuration that makes it possible to catch common issues and problems in a Next.js application.
Reference</p>
<p>Recommended rule-sets from the following ESLint plugins are all used within eslint-config-next:</p>
<p>eslint-plugin-react
eslint-plugin-react-hooks
eslint-plugin-next</p>
<p>This will take precedence over the configuration from next.config.js.
Rules</p>
<p>The full set of rules is as follows:
Enabled in recommended configRuleDescription@next/next/google-font-displayEnforce font-display behavior with Google Fonts.@next/next/google-font-preconnectEnsure preconnect is used with Google Fonts.@next/next/inline-script-idEnforce id attribute on next/script components with inline content.@next/next/next-script-for-gaPrefer next/script component when using the inline script for Google Analytics.@next/next/no-assign-module-variablePrevent assignment to the module variable.@next/next/no-async-client-componentPrevent client components from being async functions.@next/next/no-before-interactive-script-outside-documentPrevent usage of next/script's beforeInteractive strategy outside of pages/_document.js.@next/next/no-css-tagsPrevent manual stylesheet tags.@next/next/no-document-import-in-pagePrevent importing next/document outside of pages/_document.js.@next/next/no-duplicate-headPrevent duplicate usage of &lt;Head&gt; in pages/_document.js.@next/next/no-head-elementPrevent usage of &lt;head&gt; element.@next/next/no-head-import-in-documentPrevent usage of next/head in pages/_document.js.@next/next/no-html-link-for-pagesPrevent usage of &lt;a&gt; elements to navigate to internal Next.js pages.@next/next/no-img-elementPrevent usage of &lt;img&gt; element due to slower LCP and higher bandwidth.@next/next/no-page-custom-fontPrevent page-only custom fonts.@next/next/no-script-component-in-headPrevent usage of next/script in next/head component.@next/next/no-styled-jsx-in-documentPrevent usage of styled-jsx in pages/_document.js.@next/next/no-sync-scriptsPrevent synchronous scripts.@next/next/no-title-in-document-headPrevent usage of &lt;title&gt; with Head component from next/document.@next/next/no-typosPrevent common typos in Next.js's data fetching functions@next/next/no-unwanted-polyfillioPrevent duplicate polyfills from Polyfill.io.
We recommend using an appropriate integration to view warnings and errors directly in your code editor during development.
Examples</p>
<p>Linting custom directories and files</p>
<p>By default, Next.js will run ESLint for all files in the pages/, app/, components/, lib/, and src/ directories. However, you can specify which directories using the dirs option in the eslint config in next.config.js for production builds:
next.config.jsmodule.exports = {
eslint: {
dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
},
}
Similarly, the --dir and --file flags can be used for next lint to lint specific directories and files:
Terminalnext lint --dir pages --dir utils --file bar.js
Specifying a root directory within a monorepo</p>
<p>If you're using eslint-plugin-next in a project where Next.js isn't installed in your root directory (such as a monorepo), you can tell eslint-plugin-next where to find your Next.js application using the settings property in your .eslintrc:
eslint.config.mjsimport { FlatCompat } from '@eslint/eslintrc'</p>
<p>const compat = new FlatCompat({
// import.meta.dirname is available after Node.js v20.11.0
baseDirectory: import.meta.dirname,
})</p>
<p>const eslintConfig = [
...compat.config({
extends: ['next'],
settings: {
next: {
rootDir: 'packages/my-app/',
},
},
}),
]</p>
<p>export default eslintConfig
rootDir can be a path (relative or absolute), a glob (i.e. &quot;packages/*/&quot;), or an array of paths and/or globs.
Disabling the cache</p>
<p>To improve performance, information of files processed by ESLint are cached by default. This is stored in .next/cache or in your defined build directory. If you include any ESLint rules that depend on more than the contents of a single source file and need to disable the cache, use the --no-cache flag with next lint.
Terminalnext lint --no-cache
Disabling rules</p>
<p>If you would like to modify or disable any rules provided by the supported plugins (react, react-hooks, next), you can directly change them using the rules property in your .eslintrc:
eslint.config.mjsimport { FlatCompat } from '@eslint/eslintrc'</p>
<p>const compat = new FlatCompat({
// import.meta.dirname is available after Node.js v20.11.0
baseDirectory: import.meta.dirname,
})</p>
<p>const eslintConfig = [
...compat.config({
extends: ['next'],
rules: {
'react/no-unescaped-entities': 'off',
'@next/next/no-page-custom-font': 'off',
},
}),
]</p>
<p>export default eslintConfig
With Core Web Vitals</p>
<p>The next/core-web-vitals rule set is enabled when next lint is run for the first time and the strict option is selected.
eslint.config.mjsimport { FlatCompat } from '@eslint/eslintrc'</p>
<p>const compat = new FlatCompat({
// import.meta.dirname is available after Node.js v20.11.0
baseDirectory: import.meta.dirname,
})</p>
<p>const eslintConfig = [
...compat.config({
extends: ['next/core-web-vitals'],
}),
]</p>
<p>export default eslintConfig
next/core-web-vitals updates eslint-plugin-next to error on a number of rules that are warnings by default if they affect Core Web Vitals.</p>
<p>The next/core-web-vitals entry point is automatically included for new applications built with Create Next App.</p>
<p>With TypeScript</p>
<p>In addition to the Next.js ESLint rules, create-next-app --typescript will also add TypeScript-specific lint rules with next/typescript to your config:
eslint.config.mjsimport { FlatCompat } from '@eslint/eslintrc'</p>
<p>const compat = new FlatCompat({
// import.meta.dirname is available after Node.js v20.11.0
baseDirectory: import.meta.dirname,
})</p>
<p>const eslintConfig = [
...compat.config({
extends: ['next/core-web-vitals', 'next/typescript'],
}),
]</p>
<p>export default eslintConfig
Those rules are based on plugin:@typescript-eslint/recommended.
See typescript-eslint &gt; Configs for more details.
With Prettier</p>
<p>ESLint also contains code formatting rules, which can conflict with your existing Prettier setup. We recommend including eslint-config-prettier in your ESLint config to make ESLint and Prettier work together.
First, install the dependency:
Terminalnpm install --save-dev eslint-config-prettier</p>
<p>yarn add --dev eslint-config-prettier</p>
<p>pnpm add --save-dev eslint-config-prettier</p>
<p>bun add --dev eslint-config-prettier
Then, add prettier to your existing ESLint config:
eslint.config.mjsimport { FlatCompat } from '@eslint/eslintrc'</p>
<p>const compat = new FlatCompat({
// import.meta.dirname is available after Node.js v20.11.0
baseDirectory: import.meta.dirname,
})</p>
<p>const eslintConfig = [
...compat.config({
extends: ['next', 'prettier'],
}),
]</p>
<p>export default eslintConfig
Running lint on staged files</p>
<p>If you would like to use next lint with lint-staged to run the linter on staged git files, you'll have to add the following to the .lintstagedrc.js file in the root of your project in order to specify usage of the --file flag.
.lintstagedrc.jsconst path = require('path')</p>
<p>const buildEslintCommand = (filenames) =&gt;
<code>next lint --fix --file ${filenames     .map((f) =&gt; path.relative(process.cwd(), f))     .join(' --file ')}</code></p>
<p>module.exports = {
'*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
Disabling linting during production builds</p>
<p>If you do not want ESLint to run during next build, you can set the eslint.ignoreDuringBuilds option in next.config.js to true:
next.config.tsTypeScriptJavaScriptTypeScriptimport type { NextConfig } from 'next'</p>
<p>const nextConfig: NextConfig = {
eslint: {
// Warning: This allows production builds to successfully complete even if
// your project has ESLint errors.
ignoreDuringBuilds: true,
},
}</p>
<p>export default nextConfig</p>
<p>Migrating existing config</p>
<p>If you already have ESLint configured in your application, we recommend extending from this plugin directly instead of including eslint-config-next unless a few conditions are met.
Recommended plugin ruleset</p>
<p>If the following conditions are true:</p>
<p>You have one or more of the following plugins already installed (either separately or through a different config such as airbnb or react-app):</p>
<p>react
react-hooks
jsx-a11y
import</p>
<p>You've defined specific parserOptions that are different from how Babel is configured within Next.js (this is not recommended unless you have customized your Babel configuration)
You have eslint-plugin-import installed with Node.js and/or TypeScript resolvers defined to handle imports</p>
<p>Then we recommend either removing these settings if you prefer how these properties have been configured within eslint-config-next or extending directly from the Next.js ESLint plugin instead:
module.exports = {
extends: [
//...
'plugin:@next/next/recommended',
],
}
The plugin can be installed normally in your project without needing to run next lint:
Terminalnpm install --save-dev @next/eslint-plugin-next</p>
<p>yarn add --dev @next/eslint-plugin-next</p>
<p>pnpm add --save-dev @next/eslint-plugin-next</p>
<p>bun add --dev @next/eslint-plugin-next
This eliminates the risk of collisions or errors that can occur due to importing the same plugin or parser across multiple configurations.
Additional configurations</p>
<p>If you already use a separate ESLint configuration and want to include eslint-config-next, ensure that it is extended last after other configurations. For example:
eslint.config.mjsimport js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'</p>
<p>const compat = new FlatCompat({
// import.meta.dirname is available after Node.js v20.11.0
baseDirectory: import.meta.dirname,
recommendedConfig: js.configs.recommended,
})</p>
<p>const eslintConfig = [
...compat.config({
extends: ['eslint:recommended', 'next'],
}),
]</p>
<p>export default eslintConfig
The next configuration already handles setting default values for the parser, plugins and settings properties. There is no need to manually re-declare any of these properties unless you need a different configuration for your use case.
If you include any other shareable configurations, you will need to make sure that these properties are not overwritten or modified. Otherwise, we recommend removing any configurations that share behavior with the next configuration or extending directly from the Next.js ESLint plugin as mentioned above.Was this helpful?</p>
<p>supported.Send</p>
