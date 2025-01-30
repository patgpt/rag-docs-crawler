# Rendering: Runtimes | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationRenderingRuntimesRuntimes
Next.js has two server runtimes you can use in your application:</p>
<p>The Node.js Runtime (default), which has access to all Node.js APIs and compatible packages from the ecosystem.
The Edge Runtime which contains a more limited set of APIs.</p>
<p>Use Cases</p>
<p>The Node.js Runtime is used for rendering your application.
The Edge Runtime is used for Middleware (routing rules like redirects, rewrites, and setting headers).</p>
<p>Caveats</p>
<p>The Edge Runtime does not support all Node.js APIs. Some packages may not work as expected. Learn more about the unsupported APIs in the Edge Runtime.
The Edge Runtime does not support Incremental Static Regeneration (ISR).
Both runtimes can support streaming depending on your deployment infrastructure.
Next StepsView the Edge Runtime API reference.Edge RuntimeAPI Reference for the Edge Runtime.Was this helpful?</p>
<p>supported.Send</p>
