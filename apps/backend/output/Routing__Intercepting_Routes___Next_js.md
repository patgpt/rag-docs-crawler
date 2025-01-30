# Routing: Intercepting Routes | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRoutingIntercepting RoutesIntercepting RoutesIntercepting routes allows you to load a route from another part of your application within the current layout. This routing paradigm can be useful when you want to display the content of a route without the user switching to a different context.
For example, when clicking on a photo in a feed, you can display the photo in a modal, overlaying the feed. In this case, Next.js intercepts the /photo/123 route, masks the URL, and overlays it over /feed.</p>
<p>However, when navigating to the photo by clicking a shareable URL or by refreshing the page, the entire photo page should render instead of the modal. No route interception should occur.</p>
<p>Convention</p>
<p>Intercepting routes can be defined with the (..) convention, which is similar to relative path convention ../ but for segments.
You can use:</p>
<p>(.) to match segments on the same level
(..) to match segments one level above
(..)(..) to match segments two levels above
(...) to match segments from the root app directory</p>
<p>For example, you can intercept the photo segment from within the feed segment by creating a (..)photo directory.</p>
<p>Note that the (..) convention is based on route segments, not the file-system.</p>
<p>Examples</p>
<p>Modals</p>
<p>Intercepting Routes can be used together with Parallel Routes to create modals. This allows you to solve common challenges when building modals, such as:</p>
<p>Making the modal content shareable through a URL.
Preserving context when the page is refreshed, instead of closing the modal.
Closing the modal on backwards navigation rather than going to the previous route.
Reopening the modal on forwards navigation.</p>
<p>Consider the following UI pattern, where a user can open a photo modal from a gallery using client-side navigation, or navigate to the photo page directly from a shareable URL:</p>
<p>In the above example, the path to the photo segment can use the (..) matcher since @modal is a slot and not a segment. This means that the photo route is only one segment level higher, despite being two file-system levels higher.
See the Parallel Routes documentation for a step-by-step example, or see our image gallery example.</p>
<p>Good to know:</p>
<p>Other examples could include opening a login modal in a top navbar while also having a dedicated /login page, or opening a shopping cart in a side modal.</p>
<p>Next StepsLearn how to use modals with Intercepted and Parallel Routes.Parallel RoutesSimultaneously render one or more pages in the same view that can be navigated independently. A pattern for highly dynamic applications.Was this helpful?</p>
<p>supported.Send</p>
