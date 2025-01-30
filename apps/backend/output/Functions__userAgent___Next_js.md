# Functions: userAgent | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsuserAgentuserAgent
The userAgent helper extends the Web Request API with additional properties and methods to interact with the user agent object from the request.
middleware.tsTypeScriptJavaScriptTypeScriptimport { NextRequest, NextResponse, userAgent } from 'next/server'</p>
<p>export function middleware(request: NextRequest) {
const url = request.nextUrl
const { device } = userAgent(request)
const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
url.searchParams.set('viewport', viewport)
return NextResponse.rewrite(url)
}</p>
<p>isBot</p>
<p>A boolean indicating whether the request comes from a known bot.
browser</p>
<p>An object containing information about the browser used in the request.</p>
<p>name: A string representing the browser's name, or undefined if not identifiable.
version: A string representing the browser's version, or undefined.</p>
<p>device</p>
<p>An object containing information about the device used in the request.</p>
<p>model: A string representing the model of the device, or undefined.
type: A string representing the type of the device, such as console, mobile, tablet, smarttv, wearable, embedded, or undefined.
vendor: A string representing the vendor of the device, or undefined.</p>
<p>engine</p>
<p>An object containing information about the browser's engine.</p>
<p>name: A string representing the engine's name. Possible values include: Amaya, Blink, EdgeHTML, Flow, Gecko, Goanna, iCab, KHTML, Links, Lynx, NetFront, NetSurf, Presto, Tasman, Trident, w3m, WebKit or undefined.
version: A string representing the engine's version, or undefined.</p>
<p>os</p>
<p>An object containing information about the operating system.</p>
<p>name: A string representing the name of the OS, or undefined.
version: A string representing the version of the OS, or undefined.</p>
<p>cpu</p>
<p>An object containing information about the CPU architecture.</p>
<p>architecture: A string representing the architecture of the CPU. Possible values include: 68k, amd64, arm, arm64, armhf, avr, ia32, ia64, irix, irix64, mips, mips64, pa-risc, ppc, sparc, sparc64 or undefined
Was this helpful?</p>
<p>supported.Send</p>
