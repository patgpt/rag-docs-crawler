# Configuring: Progressive Web Applications (PWA) | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationConfiguringProgressive Web Applications (PWA)Progressive Web Applications (PWA)Progressive Web Applications (PWAs) offer the reach and accessibility of web applications combined with the features and user experience of native mobile apps. With Next.js, you can create PWAs that provide a seamless, app-like experience across all platforms without the need for multiple codebases or app store approvals.
PWAs allow you to:</p>
<p>Deploy updates instantly without waiting for app store approval
Create cross-platform applications with a single codebase
Provide native-like features such as home screen installation and push notifications</p>
<p>Creating a PWA with Next.js</p>
<ol>
<li>Creating the Web App Manifest</li>
</ol>
<p>Next.js provides built-in support for creating a web app manifest using the App Router. You can create either a static or dynamic manifest file:
For example, create a app/manifest.ts or app/manifest.json file:
app/manifest.tsTypeScriptJavaScriptTypeScriptimport type { MetadataRoute } from 'next'</p>
<p>export default function manifest(): MetadataRoute.Manifest {
return {
name: 'Next.js PWA',
short_name: 'NextPWA',
description: 'A Progressive Web App built with Next.js',
start_url: '/',
display: 'standalone',
background_color: '#ffffff',
theme_color: '#000000',
icons: [
{
src: '/icon-192x192.png',
sizes: '192x192',
type: 'image/png',
},
{
src: '/icon-512x512.png',
sizes: '512x512',
type: 'image/png',
},
],
}
}</p>
<p>This file should contain information about the name, icons, and how it should be displayed as an icon on the user's device. This will allow users to install your PWA on their home screen, providing a native app-like experience.
You can use tools like favicon generators to create the different icon sets and place the generated files in your public/ folder.
2. Implementing Web Push Notifications</p>
<p>Web Push Notifications are supported with all modern browsers, including:</p>
<p>iOS 16.4+ for applications installed to the home screen
Safari 16 for macOS 13 or later
Chromium based browsers
Firefox</p>
<p>This makes PWAs a viable alternative to native apps. Notably, you can trigger install prompts without needing offline support.
Web Push Notifications allow you to re-engage users even when they're not actively using your app. Here's how to implement them in a Next.js application:
First, let's create the main page component in app/page.tsx. We'll break it down into smaller parts for better understanding. First, we’ll add some of the imports and utilities we’ll need. It’s okay that the referenced Server Actions do not yet exist:
'use client'</p>
<p>import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from './actions'</p>
<p>function urlBase64ToUint8Array(base64String: string) {
const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')</p>
<p>const rawData = window.atob(base64)
const outputArray = new Uint8Array(rawData.length)</p>
<p>for (let i = 0; i &lt; rawData.length; ++i) {
outputArray[i] = rawData.charCodeAt(i)
}
return outputArray
}</p>
<p>Let’s now add a component to manage subscribing, unsubscribing, and sending push notifications.
function PushNotificationManager() {
const [isSupported, setIsSupported] = useState(false)
const [subscription, setSubscription] = useState&lt;PushSubscription | null&gt;(
null
)
const [message, setMessage] = useState('')</p>
<p>useEffect(() =&gt; {
if ('serviceWorker' in navigator &amp;&amp; 'PushManager' in window) {
setIsSupported(true)
registerServiceWorker()
}
}, [])</p>
<p>async function registerServiceWorker() {
const registration = await navigator.serviceWorker.register('/sw.js', {
scope: '/',
updateViaCache: 'none',
})
const sub = await registration.pushManager.getSubscription()
setSubscription(sub)
}</p>
<p>async function subscribeToPush() {
const registration = await navigator.serviceWorker.ready
const sub = await registration.pushManager.subscribe({
userVisibleOnly: true,
applicationServerKey: urlBase64ToUint8Array(
process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
),
})
setSubscription(sub)
const serializedSub = JSON.parse(JSON.stringify(sub))
await subscribeUser(serializedSub)
}</p>
<p>async function unsubscribeFromPush() {
await subscription?.unsubscribe()
setSubscription(null)
await unsubscribeUser()
}</p>
<p>async function sendTestNotification() {
if (subscription) {
await sendNotification(message)
setMessage('')
}
}</p>
<p>if (!isSupported) {
return &lt;p&gt;Push notifications are not supported in this browser.&lt;/p&gt;
}</p>
<p>return (
&lt;div&gt;
&lt;h3&gt;Push Notifications&lt;/h3&gt;
{subscription ? (
&lt;&gt;
&lt;p&gt;You are subscribed to push notifications.&lt;/p&gt;
&lt;button onClick={unsubscribeFromPush}&gt;Unsubscribe&lt;/button&gt;
&lt;input
type=&quot;text&quot;
placeholder=&quot;Enter notification message&quot;
value={message}
onChange={(e) =&gt; setMessage(e.target.value)}
/&gt;
&lt;button onClick={sendTestNotification}&gt;Send Test&lt;/button&gt;
&lt;/&gt;
) : (
&lt;&gt;
&lt;p&gt;You are not subscribed to push notifications.&lt;/p&gt;
&lt;button onClick={subscribeToPush}&gt;Subscribe&lt;/button&gt;
&lt;/&gt;
)}
&lt;/div&gt;
)
}</p>
<p>Finally, let’s create a component to show a message for iOS devices to instruct them to install to their home screen, and only show this if the app is not already installed.
function InstallPrompt() {
const [isIOS, setIsIOS] = useState(false)
const [isStandalone, setIsStandalone] = useState(false)</p>
<p>useEffect(() =&gt; {
setIsIOS(
/iPad|iPhone|iPod/.test(navigator.userAgent) &amp;&amp; !(window as any).MSStream
)</p>
<pre><code>setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
</code></pre>
<p>}, [])</p>
<p>if (isStandalone) {
return null // Don't show install button if already installed
}</p>
<p>return (
&lt;div&gt;
&lt;h3&gt;Install App&lt;/h3&gt;
&lt;button&gt;Add to Home Screen&lt;/button&gt;
{isIOS &amp;&amp; (
&lt;p&gt;
To install this app on your iOS device, tap the share button
&lt;span role=&quot;img&quot; aria-label=&quot;share icon&quot;&gt;
{' '}
⎋{' '}
&lt;/span&gt;
and then &quot;Add to Home Screen&quot;
&lt;span role=&quot;img&quot; aria-label=&quot;plus icon&quot;&gt;
{' '}
➕{' '}
&lt;/span&gt;.
&lt;/p&gt;
)}
&lt;/div&gt;
)
}</p>
<p>export default function Page() {
return (
&lt;div&gt;
&lt;PushNotificationManager /&gt;
&lt;InstallPrompt /&gt;
&lt;/div&gt;
)
}</p>
<p>Now, let’s create the Server Actions which this file calls.
3. Implementing Server Actions</p>
<p>Create a new file to contain your actions at app/actions.ts. This file will handle creating subscriptions, deleting subscriptions, and sending notifications.
app/actions.tsTypeScriptJavaScriptTypeScript'use server'</p>
<p>import webpush from 'web-push'</p>
<p>webpush.setVapidDetails(
'<a href="mailto:your-email@example.com">mailto:your-email@example.com</a>',
process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
process.env.VAPID_PRIVATE_KEY!
)</p>
<p>let subscription: PushSubscription | null = null</p>
<p>export async function subscribeUser(sub: PushSubscription) {
subscription = sub
// In a production environment, you would want to store the subscription in a database
// For example: await db.subscriptions.create({ data: sub })
return { success: true }
}</p>
<p>export async function unsubscribeUser() {
subscription = null
// In a production environment, you would want to remove the subscription from the database
// For example: await db.subscriptions.delete({ where: { ... } })
return { success: true }
}</p>
<p>export async function sendNotification(message: string) {
if (!subscription) {
throw new Error('No subscription available')
}</p>
<p>try {
await webpush.sendNotification(
subscription,
JSON.stringify({
title: 'Test Notification',
body: message,
icon: '/icon.png',
})
)
return { success: true }
} catch (error) {
console.error('Error sending push notification:', error)
return { success: false, error: 'Failed to send notification' }
}
}</p>
<p>Sending a notification will be handled by our service worker, created in step 5.
In a production environment, you would want to store the subscription in a database for persistence across server restarts and to manage multiple users' subscriptions.
4. Generating VAPID Keys</p>
<p>To use the Web Push API, you need to generate VAPID keys. The simplest way is to use the web-push CLI directly:
First, install web-push globally:
Terminalnpm install -g web-push
Generate the VAPID keys by running:
Terminalweb-push generate-vapid-keys
Copy the output and paste the keys into your .env file:
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here
5. Creating a Service Worker</p>
<p>Create a public/sw.js file for your service worker:
public/sw.jsself.addEventListener('push', function (event) {
if (event.data) {
const data = event.data.json()
const options = {
body: data.body,
icon: data.icon || '/icon.png',
badge: '/badge.png',
vibrate: [100, 50, 100],
data: {
dateOfArrival: Date.now(),
primaryKey: '2',
},
}
event.waitUntil(self.registration.showNotification(data.title, options))
}
})</p>
<p>self.addEventListener('notificationclick', function (event) {
console.log('Notification click received.')
event.notification.close()
event.waitUntil(clients.openWindow('<a href="https://your-website.com">https://your-website.com</a>'))
})
This service worker supports custom images and notifications. It handles incoming push events and notification clicks.</p>
<p>You can set custom icons for notifications using the icon and badge properties.
The vibrate pattern can be adjusted to create custom vibration alerts on supported devices.
Additional data can be attached to the notification using the data property.</p>
<p>Remember to test your service worker thoroughly to ensure it behaves as expected across different devices and browsers. Also, make sure to update the 'https://your-website.com' link in the notificationclick event listener to the appropriate URL for your application.
6. Adding to Home Screen</p>
<p>The InstallPrompt component defined in step 2 shows a message for iOS devices to instruct them to install to their home screen.
To ensure your application can be installed to a mobile home screen, you must have:</p>
<p>A valid web app manifest (created in step 1)
The website served over HTTPS</p>
<p>Modern browsers will automatically show an installation prompt to users when these criteria are met. You can provide a custom installation button with beforeinstallprompt, however, we do not recommend this as it is not cross browser and platform (does not work on Safari iOS).
7. Testing Locally</p>
<p>To ensure you can view notifications locally, ensure that:</p>
<p>You are running locally with HTTPS</p>
<p>Use next dev --experimental-https for testing</p>
<p>Your browser (Chrome, Safari, Firefox) has notifications enabled</p>
<p>When prompted locally, accept permissions to use notifications
Ensure notifications are not disabled globally for the entire browser
If you are still not seeing notifications, try using another browser to debug</p>
<ol start="8">
<li>Securing your application</li>
</ol>
<p>Security is a crucial aspect of any web application, especially for PWAs. Next.js allows you to configure security headers using the next.config.js file. For example:
next.config.jsmodule.exports = {
async headers() {
return [
{
source: '/(.*)',
headers: [
{
key: 'X-Content-Type-Options',
value: 'nosniff',
},
{
key: 'X-Frame-Options',
value: 'DENY',
},
{
key: 'Referrer-Policy',
value: 'strict-origin-when-cross-origin',
},
],
},
{
source: '/sw.js',
headers: [
{
key: 'Content-Type',
value: 'application/javascript; charset=utf-8',
},
{
key: 'Cache-Control',
value: 'no-cache, no-store, must-revalidate',
},
{
key: 'Content-Security-Policy',
value: &quot;default-src 'self'; script-src 'self'&quot;,
},
],
},
]
},
}
Let’s go over each of these options:</p>
<p>Global Headers (applied to all routes):</p>
<p>X-Content-Type-Options: nosniff: Prevents MIME type sniffing, reducing the risk of malicious file uploads.
X-Frame-Options: DENY: Protects against clickjacking attacks by preventing your site from being embedded in iframes.
Referrer-Policy: strict-origin-when-cross-origin: Controls how much referrer information is included with requests, balancing security and functionality.</p>
<p>Service Worker Specific Headers:</p>
<p>Content-Type: application/javascript; charset=utf-8: Ensures the service worker is interpreted correctly as JavaScript.
Cache-Control: no-cache, no-store, must-revalidate: Prevents caching of the service worker, ensuring users always get the latest version.
Content-Security-Policy: default-src 'self'; script-src 'self': Implements a strict Content Security Policy for the service worker, only allowing scripts from the same origin.</p>
<p>Learn more about defining Content Security Policies with Next.js.
Next Steps</p>
<p>Exploring PWA Capabilities: PWAs can leverage various web APIs to provide advanced functionality. Consider exploring features like background sync, periodic background sync, or the File System Access API to enhance your application. For inspiration and up-to-date information on PWA capabilities, you can refer to resources like What PWA Can Do Today.
Static Exports: If your application requires not running a server, and instead using a static export of files, you can update the Next.js configuration to enable this change. Learn more in the Next.js Static Export documentation. However, you will need to move from Server Actions to calling an external API, as well as moving your defined headers to your proxy.
Offline Support: To provide offline functionality, one option is Serwist with Next.js. You can find an example of how to integrate Serwist with Next.js in their documentation. Note: this plugin currently requires webpack configuration.
Security Considerations: Ensure that your service worker is properly secured. This includes using HTTPS, validating the source of push messages, and implementing proper error handling.
User Experience: Consider implementing progressive enhancement techniques to ensure your app works well even when certain PWA features are not supported by the user's browser.
Next Stepsmanifest.jsonAPI Reference for manifest.json file.Was this helpful?</p>
<p>supported.Send</p>
