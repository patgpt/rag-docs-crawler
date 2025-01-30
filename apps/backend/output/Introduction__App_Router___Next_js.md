# Introduction: App Router | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6IntroductionApp RouterApp RouterThe Next.js App Router introduces a new model for building applications using React's latest features such as Server Components, Streaming with Suspense, and Server Actions.
Get started with the App Router by creating your first page.
Frequently Asked Questions</p>
<p>How can I access the request object in a layout?</p>
<p>You intentionally cannot access the raw request object. However, you can access headers and cookies through server-only functions. You can also set cookies.
Layouts do not rerender. They can be cached and reused to avoid unnecessary computation when navigating between pages. By restricting layouts from accessing the raw request, Next.js can prevent the execution of potentially slow or expensive user code within the layout, which could negatively impact performance.
This design also enforces consistent and predictable behavior for layouts across different pages, which simplifies development and debugging.
Depending on the UI pattern you're building, Parallel Routes allow you to render multiple pages in the same layout, and pages have access to the route segments as well as the URL search params.
How can I access the URL on a page?</p>
<p>By default, pages are Server Components. You can access the route segments through the params prop and the URL search params through the searchParams prop for a given page.
If you are using Client Components, you can use usePathname, useSelectedLayoutSegment, and useSelectedLayoutSegments for more complex routes.
Further, depending on the UI pattern you're building, Parallel Routes allow you to render multiple pages in the same layout, and pages have access to the route segments as well as the URL search params.
How can I redirect from a Server Component?</p>
<p>You can use redirect to redirect from a page to a relative or absolute URL. redirect is a temporary (307) redirect, while permanentRedirect is a permanent (308) redirect. When these functions are used while streaming UI, they will insert a meta tag to emit the redirect on the client side.
How can I handle authentication with the App Router?</p>
<p>Here are some common authentication solutions that support the App Router:</p>
<p>NextAuth.js
Clerk
Stack Auth
Auth0
Stytch
Kinde
WorkOS
Or manually handling sessions or JWTs</p>
<p>How can I set cookies?</p>
<p>You can set cookies in Server Actions or Route Handlers using the cookies function.
Since HTTP does not allow setting cookies after streaming starts, you cannot set cookies from a page or layout directly. You can also set cookies from Middleware.
How can I build multi-tenant apps?</p>
<p>If you are looking to build a single Next.js application that serves multiple tenants, we have built an example showing our recommended architecture.
How can I invalidate the App Router cache?</p>
<p>There are multiple layers of caching in Next.js, and thus, multiple ways to invalidate different parts of the cache. Learn more about caching.
Are there any comprehensive, open-source applications built on the App Router?</p>
<p>Yes. You can view Next.js Commerce or the Platforms Starter Kit for two larger examples of using the App Router that are open-source.
Learn More</p>
<p>Routing Fundamentals
Data Fetching and Caching
Incremental Static Regeneration
Forms and Mutations
Caching
Rendering Fundamentals
Server Components
Client Components
Getting StartedLearn how to create full-stack web applications with the Next.js App Router.ExamplesLearn how to implement common UI patterns and use cases  using Next.jsBuilding Your ApplicationLearn how to use Next.js features to build your application.API ReferenceNext.js API Reference for the App Router.Was this helpful?</p>
<p>supported.Send</p>
