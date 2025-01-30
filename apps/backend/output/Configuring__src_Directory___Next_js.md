# Configuring: src Directory | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationConfiguringsrc Directorysrc Directory
As an alternative to having the special Next.js app or pages directories in the root of your project, Next.js also supports the common pattern of placing application code under the src directory.
This separates application code from project configuration files which mostly live in the root of a project, which is preferred by some individuals and teams.
To use the src directory, move the app Router folder or pages Router folder to src/app or src/pages respectively.</p>
<p>Good to know:</p>
<p>The /public directory should remain in the root of your project.
Config files like package.json, next.config.js and tsconfig.json should remain in the root of your project.
.env.* files should remain in the root of your project.
src/app or src/pages will be ignored if app or pages are present in the root directory.
If you're using src, you'll probably also move other application folders such as /components or /lib.
If you're using Middleware, ensure it is placed inside the src directory.
If you're using Tailwind CSS, you'll need to add the /src prefix to the tailwind.config.js file in the content section.
If you are using TypeScript paths for imports such as @/*, you should update the paths object in tsconfig.json to include src/.</p>
<p>Next StepsProject StructureAn overview of the folder and file conventions in Next.js, and how to organize your project.Was this helpful?</p>
<p>supported.Send</p>
