# next.config.js: cacheHandler | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jscacheHandlerCustom Next.js Cache HandlerCaching and revalidating pages (with Incremental Static Regeneration) use the same shared cache. When deploying to Vercel, the ISR cache is automatically persisted to durable storage.
When self-hosting, the ISR cache is stored to the filesystem (on disk) on your Next.js server. This works automatically when self-hosting using both the Pages and App Router.
You can configure the Next.js cache location if you want to persist cached pages and data to durable storage, or share the cache across multiple containers or instances of your Next.js application.
next.config.jsmodule.exports = {
cacheHandler: require.resolve('./cache-handler.js'),
cacheMaxMemorySize: 0, // disable default in-memory caching
}
View an example of a custom cache handler and learn more about implementation.
API Reference</p>
<p>The cache handler can implement the following methods: get, set, and revalidateTag.
get()</p>
<p>ParameterTypeDescriptionkeystringThe key to the cached value.
Returns the cached value or null if not found.
set()</p>
<p>ParameterTypeDescriptionkeystringThe key to store the data under.dataData or nullThe data to be cached.ctx{ tags: [] }The cache tags provided.
Returns Promise&lt;void&gt;.
revalidateTag()</p>
<p>ParameterTypeDescriptiontagstring or string[]The cache tags to revalidate.
Returns Promise&lt;void&gt;. Learn more about revalidating data or the revalidateTag() function.
Good to know:</p>
<p>revalidatePath is a convenience layer on top of cache tags. Calling revalidatePath will call your revalidateTag function, which you can then choose if you want to tag cache keys based on the path.</p>
<p>Version History</p>
<p>VersionChangesv14.1.0Renamed to cacheHandler and became stable.v13.4.0incrementalCacheHandlerPath support for revalidateTag.v13.4.0incrementalCacheHandlerPath support for standalone output.v12.2.0Experimental incrementalCacheHandlerPath added.Was this helpful?</p>
<p>supported.Send</p>
