# Functions: unstable_cache | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsunstable_cacheunstable_cache
Note: This API will be replaced by use cache when it reaches stability.</p>
<p>unstable_cache allows you to cache the results of expensive operations, like database queries, and reuse them across multiple requests.
import { getUser } from './data';
import { unstable_cache } from 'next/cache';</p>
<p>const getCachedUser = unstable_cache(
async (id) =&gt; getUser(id),
['my-app-user']
);</p>
<p>export default async function Component({ userID }) {
const user = await getCachedUser(userID);
...
}</p>
<p>Good to know:</p>
<p>Accessing dynamic data sources such as headers or cookies inside a cache scope is not supported. If you need this data inside a cached function use headers outside of the cached function and pass the required dynamic data in as an argument.
This API uses Next.js' built-in Data Cache to persist the result across requests and deployments.</p>
<p>Warning: This API is unstable and may change in the future. We will provide migration documentation and codemods, if needed, as this API stabilizes.</p>
<p>Parameters</p>
<p>const data = unstable_cache(fetchData, keyParts, options)()</p>
<p>fetchData: This is an asynchronous function that fetches the data you want to cache. It must be a function that returns a Promise.
keyParts: This is an extra array of keys that further adds identification to the cache. By default, unstable_cache already uses the arguments and the stringified version of your function as the cache key. It is optional in most cases; the only time you need to use it is when you use external variables without passing them as parameters. However, it is important to add closures used within the function if you do not pass them as parameters.
options: This is an object that controls how the cache behaves. It can contain the following properties:</p>
<p>tags: An array of tags that can be used to control cache invalidation. Next.js will not use this to uniquely identify the function.
revalidate: The number of seconds after which the cache should be revalidated. Omit or pass false to cache indefinitely or until matching revalidateTag() or revalidatePath() methods are called.</p>
<p>Returns</p>
<p>unstable_cache returns a function that when invoked, returns a Promise that resolves to the cached data. If the data is not in the cache, the provided function will be invoked, and its result will be cached and returned.
Example</p>
<p>app/page.tsxTypeScriptJavaScriptTypeScriptimport { unstable_cache } from 'next/cache'</p>
<p>export default async function Page({
params,
}: {
params: Promise&lt;{ userId: string }&gt;
}) {
const userId = (await params).userId
const getCachedUser = unstable_cache(
async () =&gt; {
return { id: userId }
},
[userId], // add the user ID to the cache key
{
tags: ['users'],
revalidate: 60,
}
)</p>
<p>//...
}</p>
<p>Version History</p>
<p>VersionChangesv14.0.0unstable_cache introduced.Was this helpful?</p>
<p>supported.Send</p>
