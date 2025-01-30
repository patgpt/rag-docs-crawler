# Functions: unstable_noStore | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsunstable_noStoreunstable_noStoreThis is a legacy API and no longer recommended. It's still supported for backward compatibility.In version 15, we recommend using connection instead of unstable_noStore.
unstable_noStore can be used to declaratively opt out of static rendering and indicate a particular component should not be cached.
import { unstable_noStore as noStore } from 'next/cache';</p>
<p>export default async function ServerComponent() {
noStore();
const result = await db.query(...);
...
}</p>
<p>Good to know:</p>
<p>unstable_noStore is equivalent to cache: 'no-store' on a fetch
unstable_noStore is preferred over export const dynamic = 'force-dynamic' as it is more granular and can be used on a per-component basis</p>
<p>Using unstable_noStore inside unstable_cache will not opt out of static generation. Instead, it will defer to the cache configuration to determine whether to cache the result or not.</p>
<p>Usage</p>
<p>If you prefer not to pass additional options to fetch, like cache: 'no-store', next: { revalidate: 0 } or in cases where fetch is not available, you can use noStore() as a replacement for all of these use cases.
import { unstable_noStore as noStore } from 'next/cache';</p>
<p>export default async function ServerComponent() {
noStore();
const result = await db.query(...);
...
}
Version History</p>
<p>VersionChangesv15.0.0unstable_noStore deprecated for connection.v14.0.0unstable_noStore introduced.Was this helpful?</p>
<p>supported.Send</p>
