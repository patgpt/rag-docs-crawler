# Functions: NextRequest | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsNextRequestNextRequest
NextRequest extends the Web Request API with additional convenience methods.
cookies</p>
<p>Read or mutate the Set-Cookie header of the request.
set(name, value)</p>
<p>Given a name, set a cookie with the given value on the request.
// Given incoming request /home
// Set a cookie to hide the banner
// request will have a <code>Set-Cookie:show-banner=false;path=/home</code> header
request.cookies.set('show-banner', 'false')
get(name)</p>
<p>Given a cookie name, return the value of the cookie. If the cookie is not found, undefined is returned. If multiple cookies are found, the first one is returned.
// Given incoming request /home
// { name: 'show-banner', value: 'false', Path: '/home' }
request.cookies.get('show-banner')
getAll()</p>
<p>Given a cookie name, return the values of the cookie. If no name is given, return all cookies on the request.
// Given incoming request /home
// [
//   { name: 'experiments', value: 'new-pricing-page', Path: '/home' },
//   { name: 'experiments', value: 'winter-launch', Path: '/home' },
// ]
request.cookies.getAll('experiments')
// Alternatively, get all cookies for the request
request.cookies.getAll()
delete(name)</p>
<p>Given a cookie name, delete the cookie from the request.
// Returns true for deleted, false is nothing is deleted
request.cookies.delete('experiments')
has(name)</p>
<p>Given a cookie name, return true if the cookie exists on the request.
// Returns true if cookie exists, false if it does not
request.cookies.has('experiments')
clear()</p>
<p>Remove the Set-Cookie header from the request.
request.cookies.clear()
nextUrl</p>
<p>Extends the native URL API with additional convenience methods, including Next.js specific properties.
// Given a request to /home, pathname is /home
request.nextUrl.pathname
// Given a request to /home?name=lee, searchParams is { 'name': 'lee' }
request.nextUrl.searchParams
The following options are available:</p>
<p>PropertyTypeDescriptionbasePathstringThe base path of the URL.buildIdstring | undefinedThe build identifier of the Next.js application. Can be customized.pathnamestringThe pathname of the URL.searchParamsObjectThe search parameters of the URL.
Note: The internationalization properties from the Pages Router are not available for usage in the App Router. Learn more about internationalization with the App Router.</p>
<p>Version History</p>
<p>VersionChangesv15.0.0ip and geo removed.Was this helpful?</p>
<p>supported.Send</p>
