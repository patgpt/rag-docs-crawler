# Routing: Route Groups | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRoutingRoute GroupsRoute GroupsIn the app directory, nested folders are normally mapped to URL paths. However, you can mark a folder as a Route Group to prevent the folder from being included in the route's URL path.
This allows you to organize your route segments and project files into logical groups without affecting the URL path structure.
Route groups are useful for:</p>
<p>Organizing routes into groups e.g. by site section, intent, or team.
Enabling nested layouts in the same route segment level:</p>
<p>Creating multiple nested layouts in the same segment, including multiple root layouts
Adding a layout to a subset of routes in a common segment</p>
<p>Adding a loading skeleton to specific route in a common segment</p>
<p>Convention</p>
<p>A route group can be created by wrapping a folder's name in parenthesis: (folderName)
Examples</p>
<p>Organize routes without affecting the URL path</p>
<p>To organize routes without affecting the URL, create a group to keep related routes together. The folders in parenthesis will be omitted from the URL (e.g. (marketing) or (shop).</p>
<p>Even though routes inside (marketing) and (shop) share the same URL hierarchy, you can create a different layout for each group by adding a layout.js file inside their folders.</p>
<p>Opting specific segments into a layout</p>
<p>To opt specific routes into a layout, create a new route group (e.g. (shop)) and move the routes that share the same layout into the group (e.g. account and cart). The routes outside of the group will not share the layout (e.g. checkout).</p>
<p>Opting for loading skeletons on a specific route</p>
<p>To apply a loading skeleton via a loading.js file to a specific route, create a new route group (e.g., /(overview)) and then move your loading.tsx inside that route group.</p>
<p>Now, the loading.tsx file will only apply to your dashboard → overview page instead of all your dashboard pages without affecting the URL path structure.
Creating multiple root layouts</p>
<p>To create multiple root layouts, remove the top-level layout.js file, and add a layout.js file inside each route group. This is useful for partitioning an application into sections that have a completely different UI or experience. The &lt;html&gt; and &lt;body&gt; tags need to be added to each root layout.</p>
<p>In the example above, both (marketing) and (shop) have their own root layout.</p>
<p>Good to know:</p>
<p>The naming of route groups has no special significance other than for organization. They do not affect the URL path.
Routes that include a route group should not resolve to the same URL path as other routes. For example, since route groups don't affect URL structure, (marketing)/about/page.js and (shop)/about/page.js would both resolve to /about and cause an error.
If you use multiple root layouts without a top-level layout.js file, your home page.js file should be defined in one of the route groups, For example: app/(marketing)/page.js.
Navigating across multiple root layouts will cause a full page load (as opposed to a client-side navigation). For example, navigating from /cart that uses app/(shop)/layout.js to /blog that uses app/(marketing)/layout.js will cause a full page load. This only applies to multiple root layouts.</p>
<p>Was this helpful?</p>
<p>supported.Send</p>
