# Functions: useParams | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsuseParamsuseParamsuseParams is a Client Component hook that lets you read a route's dynamic params filled in by the current URL.
app/example-client-component.tsxTypeScriptJavaScriptTypeScript'use client'</p>
<p>import { useParams } from 'next/navigation'</p>
<p>export default function ExampleClientComponent() {
const params = useParams&lt;{ tag: string; item: string }&gt;()</p>
<p>// Route -&gt; /shop/[tag]/[item]
// URL -&gt; /shop/shoes/nike-air-max-97
// <code>params</code> -&gt; { tag: 'shoes', item: 'nike-air-max-97' }
console.log(params)</p>
<p>return '...'
}</p>
<p>Parameters</p>
<p>const params = useParams()
useParams does not take any parameters.
Returns</p>
<p>useParams returns an object containing the current route's filled in dynamic parameters.</p>
<p>Each property in the object is an active dynamic segment.
The properties name is the segment's name, and the properties value is what the segment is filled in with.
The properties value will either be a string or array of string's depending on the type of dynamic segment.
If the route contains no dynamic parameters, useParams returns an empty object.
If used in Pages Router, useParams will return null on the initial render and updates with properties following the rules above once the router is ready.</p>
<p>For example:
RouteURLuseParams()app/shop/page.js/shop{}app/shop/[slug]/page.js/shop/1{ slug: '1' }app/shop/[tag]/[item]/page.js/shop/1/2{ tag: '1', item: '2' }app/shop/[...slug]/page.js/shop/1/2{ slug: ['1', '2'] }
Version History</p>
<p>VersionChangesv13.3.0useParams introduced.Was this helpful?</p>
<p>supported.Send</p>
