# Getting Started: Project Structure | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6App RouterGetting StartedProject StructureProject structure and organizationThis page provides an overview of the folder and file conventions in Next.js, as well as tips for organizing your project.
Folder and file conventions</p>
<p>Top-level folders</p>
<p>Top-level folders are used to organize your application's code and static assets.</p>
<p>appApp RouterpagesPages RouterpublicStatic assets to be servedsrcOptional application source folder
Top-level files</p>
<p>Top-level files are used to configure your application, manage dependencies, run middleware, integrate monitoring tools, and define environment variables.
Next.jsnext.config.jsConfiguration file for Next.jspackage.jsonProject dependencies and scriptsinstrumentation.tsOpenTelemetry and Instrumentation filemiddleware.tsNext.js request middleware.envEnvironment variables.env.localLocal environment variables.env.productionProduction environment variables.env.developmentDevelopment environment variables.eslintrc.jsonConfiguration file for ESLint.gitignoreGit files and folders to ignorenext-env.d.tsTypeScript declaration file for Next.jstsconfig.jsonConfiguration file for TypeScriptjsconfig.jsonConfiguration file for JavaScript
Routing Files</p>
<p>layout.js .jsx .tsxLayoutpage.js .jsx .tsxPageloading.js .jsx .tsxLoading UInot-found.js .jsx .tsxNot found UIerror.js .jsx .tsxError UIglobal-error.js .jsx .tsxGlobal error UIroute.js .tsAPI endpointtemplate.js .jsx .tsxRe-rendered layoutdefault.js .jsx .tsxParallel route fallback pageNested routes</p>
<p>folderRoute segmentfolder/folderNested route segmentDynamic routes</p>
<p>[folder]Dynamic route segment[...folder]Catch-all route segment[[...folder]]Optional catch-all route segmentRoute Groups and private folders</p>
<p>(folder)Group routes without affecting routing_folderOpt folder and all child segments out of routingParallel and Intercepted Routes</p>
<p>@folderNamed slot(.)folderIntercept same level(..)folderIntercept one level above(..)(..)folderIntercept two levels above(...)folderIntercept from rootMetadata file conventions</p>
<p>App icons</p>
<p>favicon.icoFavicon fileicon.ico .jpg .jpeg .png .svgApp Icon fileicon.js .ts .tsxGenerated App Iconapple-icon.jpg .jpeg, .pngApple App Icon fileapple-icon.js .ts .tsxGenerated Apple App IconOpen Graph and Twitter images</p>
<p>opengraph-image.jpg .jpeg .png .gifOpen Graph image fileopengraph-image.js .ts .tsxGenerated Open Graph imagetwitter-image.jpg .jpeg .png .gifTwitter image filetwitter-image.js .ts .tsxGenerated Twitter imageSEO</p>
<p>sitemap.xmlSitemap filesitemap.js .tsGenerated Sitemaprobots.txtRobots filerobots.js .tsGenerated Robots file</p>
<p>Component hierarchy</p>
<p>The React components defined in special files of a route segment are rendered in a specific hierarchy:
layout.js
template.js
error.js (React error boundary)
loading.js (React suspense boundary)
not-found.js (React error boundary)
page.js or nested layout.js
In a nested route, the components of a segment will be nested inside the components of its parent segment.Organizing your project</p>
<p>Apart from folder and file conventions, Next.js is unopinionated about how you organize and colocate your project files. But it does provide several features to help you organize your project.Colocation</p>
<p>In the app directory, nested folders define route structure. Each folder represents a route segment that is mapped to a corresponding segment in a URL path.However, even though route structure is defined through folders, a route is not publicly accessible until a page.js or route.js file is added to a route segment.And, even when a route is made publicly accessible, only the content returned by page.js or route.js is sent to the client.This means that project files can be safely colocated inside route segments in the app directory without accidentally being routable.
Good to know:</p>
<p>While you can colocate your project files in app you don't have to. If you prefer, you can keep them outside the app directory.</p>
<p>Private folders</p>
<p>Private folders can be created by prefixing a folder with an underscore: _folderNameThis indicates the folder is a private implementation detail and should not be considered by the routing system, thereby opting the folder and all its subfolders out of routing.Since files in the app directory can be safely colocated by default, private folders are not required for colocation. However, they can be useful for:
Separating UI logic from routing logic.
Consistently organizing internal files across a project and the Next.js ecosystem.
Sorting and grouping files in code editors.
Avoiding potential naming conflicts with future Next.js file conventions.</p>
<p>Good to know:</p>
<p>While not a framework convention, you might also consider marking files outside private folders as &quot;private&quot; using the same underscore pattern.
You can create URL segments that start with an underscore by prefixing the folder name with %5F (the URL-encoded form of an underscore): %5FfolderName.
If you don't use private folders, it would be helpful to know Next.js special file conventions to prevent unexpected naming conflicts.</p>
<p>Route groups</p>
<p>Route groups can be created by wrapping a folder in parenthesis: (folderName)This indicates the folder is for organizational purposes and should not be included in the route's URL path.Route groups are useful for:
Organizing routes into groups e.g. by site section, intent, or team.
Enabling nested layouts in the same route segment level:</p>
<p>Creating multiple nested layouts in the same segment, including multiple root layouts
Adding a layout to a subset of routes in a common segment</p>
<p>src directory</p>
<p>Next.js supports storing application code (including app) inside an optional src directory. This separates application code from project configuration files which mostly live in the root of a project.Common strategies</p>
<p>The following section lists a very high-level overview of common strategies. The simplest takeaway is to choose a strategy that works for you and your team and be consistent across the project.
Good to know: In our examples below, we're using components and lib folders as generalized placeholders, their naming has no special framework significance and your projects might use other folders like ui, utils, hooks, styles, etc.
Store project files outside of app</p>
<p>This strategy stores all application code in shared folders in the root of your project and keeps the app directory purely for routing purposes.Store project files in top-level folders inside of app</p>
<p>This strategy stores all application code in shared folders in the root of the app directory.Split project files by feature or route</p>
<p>This strategy stores globally shared application code in the root app directory and splits more specific application code into the route segments that use them.Was this helpful?</p>
<p>supported.Send</p>
