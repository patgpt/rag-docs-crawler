# CLI: create-next-app | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceCLIcreate-next-appcreate-next-app
The create-next-app CLI allow you to create a new Next.js application using the default template or an example from a public GitHub repository. It is the easiest way to get started with Next.js.
Basic usage:
Terminalnpx create-next-app@latest [project-name] [options]
Reference</p>
<p>The following options are available:
OptionsDescription-h or --helpShow all available options-v or --versionOutput the version number--no-<em>Negate default options. E.g. --no-eslint--ts or --typescriptInitialize as a TypeScript project (default)--js or --javascriptInitialize as a JavaScript project--tailwindInitialize with Tailwind CSS config (default)--eslintInitialize with ESLint config--appInitialize as an App Router project--src-dirInitialize inside a src/ directory--turbopackEnable Turbopack by default for development--import-alias &lt;alias-to-configure&gt;Specify import alias to use (default &quot;@/</em>&quot;)--emptyInitialize an empty project--use-npmExplicitly tell the CLI to bootstrap the application using npm--use-pnpmExplicitly tell the CLI to bootstrap the application using pnpm--use-yarnExplicitly tell the CLI to bootstrap the application using Yarn--use-bunExplicitly tell the CLI to bootstrap the application using Bun-e or --example [name] [github-url]An example to bootstrap the app with--example-path &lt;path-to-example&gt;Specify the path to the example separately--reset-preferencesExplicitly tell the CLI to reset any stored preferences--skip-installExplicitly tell the CLI to skip installing packages--yesUse previous preferences or defaults for all options
Examples</p>
<p>With the default template</p>
<p>To create a new app using the default template, run the following command in your terminal:
Terminalnpx create-next-app@latest
You will then be asked the following prompts:
TerminalWhat is your project named?  my-app
Would you like to use TypeScript?  No / Yes
Would you like to use ESLint?  No / Yes
Would you like to use Tailwind CSS?  No / Yes
Would you like your code inside a <code>src/</code> directory?  No / Yes
Would you like to use App Router? (recommended)  No / Yes
Would you like to use Turbopack for <code>next dev</code>?  No / Yes
Would you like to customize the import alias (<code>@/*</code> by default)?  No / Yes
Once you've answered the prompts, a new project will be created with your chosen configuration.
With an official Next.js example</p>
<p>To create a new app using an official Next.js example, use the --example flag. For example:
Terminalnpx create-next-app@latest --example [example-name] [your-project-name]
You can view a list of all available examples along with setup instructions in the Next.js repository.
With any public GitHub example</p>
<p>To create a new app using any public GitHub example, use the --example option with the GitHub repo's URL. For example:
Terminalnpx create-next-app@latest --example &quot;https://github.com/.../&quot; [your-project-name]Was this helpful?</p>
<p>supported.Send</p>
