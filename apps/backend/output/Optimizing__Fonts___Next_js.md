# Optimizing: Fonts | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationOptimizingFontsFont Optimization
next/font will automatically optimize your fonts (including custom fonts) and remove external network requests for improved privacy and performance.</p>
<p>🎥 Watch: Learn more about using next/font → YouTube (6 minutes).</p>
<p>next/font includes built-in automatic self-hosting for any font file. This means you can optimally load web fonts with zero layout shift, thanks to the underlying CSS size-adjust property used.
This new font system also allows you to conveniently use all Google Fonts with performance and privacy in mind. CSS and font files are downloaded at build time and self-hosted with the rest of your static assets. No requests are sent to Google by the browser.
Google Fonts</p>
<p>Automatically self-host any Google Font. Fonts are included in the deployment and served from the same domain as your deployment. No requests are sent to Google by the browser.
Get started by importing the font you would like to use from next/font/google as a function. We recommend using variable fonts for the best performance and flexibility.
app/layout.tsxTypeScriptJavaScriptTypeScriptimport { Inter } from 'next/font/google'</p>
<p>// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
subsets: ['latin'],
display: 'swap',
})</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot; className={inter.className}&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}If you can't use a variable font, you will need to specify a weight:app/layout.tsxTypeScriptJavaScriptTypeScriptimport { Roboto } from 'next/font/google'</p>
<p>const roboto = Roboto({
weight: '400',
subsets: ['latin'],
display: 'swap',
})</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot; className={roboto.className}&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>You can specify multiple weights and/or styles by using an array:
app/layout.jsconst roboto = Roboto({
weight: ['400', '700'],
style: ['normal', 'italic'],
subsets: ['latin'],
display: 'swap',
})</p>
<p>Good to know: Use an underscore (_) for font names with multiple words. E.g. Roboto Mono should be imported as Roboto_Mono.</p>
<p>Specifying a subset</p>
<p>Google Fonts are automatically subset. This reduces the size of the font file and improves performance. You'll need to define which of these subsets you want to preload. Failing to specify any subsets while preload is true will result in a warning.
This can be done by adding it to the function call:
app/layout.tsxTypeScriptJavaScriptTypeScriptconst inter = Inter({ subsets: ['latin'] })</p>
<p>View the Font API Reference for more information.
Using Multiple Fonts</p>
<p>You can import and use multiple fonts in your application. There are two approaches you can take.
The first approach is to create a utility function that exports a font, imports it, and applies its className where needed. This ensures the font is preloaded only when it's rendered:
app/fonts.tsTypeScriptJavaScriptTypeScriptimport { Inter, Roboto_Mono } from 'next/font/google'</p>
<p>export const inter = Inter({
subsets: ['latin'],
display: 'swap',
})</p>
<p>export const roboto_mono = Roboto_Mono({
subsets: ['latin'],
display: 'swap',
})</p>
<p>app/layout.tsxTypeScriptJavaScriptTypeScriptimport { inter } from './fonts'</p>
<p>export default function Layout({ children }: { children: React.ReactNode }) {
return (
&lt;html lang=&quot;en&quot; className={inter.className}&gt;
&lt;body&gt;
&lt;div&gt;{children}&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}app/page.tsxTypeScriptJavaScriptTypeScriptimport { roboto_mono } from './fonts'</p>
<p>export default function Page() {
return (
&lt;&gt;
&lt;h1 className={roboto_mono.className}&gt;My page&lt;/h1&gt;
&lt;/&gt;
)
}
In the example above, Inter will be applied globally, and Roboto Mono can be imported and applied as needed.
Alternatively, you can create a CSS variable and use it with your preferred CSS solution:
app/layout.tsxTypeScriptJavaScriptTypeScriptimport { Inter, Roboto_Mono } from 'next/font/google'
import styles from './global.css'</p>
<p>const inter = Inter({
subsets: ['latin'],
variable: '--font-inter',
display: 'swap',
})</p>
<p>const roboto_mono = Roboto_Mono({
subsets: ['latin'],
variable: '--font-roboto-mono',
display: 'swap',
})</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot; className={<code>${inter.variable} ${roboto_mono.variable}</code>}&gt;
&lt;body&gt;
&lt;h1&gt;My App&lt;/h1&gt;
&lt;div&gt;{children}&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
)
}
app/global.csshtml {
font-family: var(--font-inter);
}</p>
<p>h1 {
font-family: var(--font-roboto-mono);
}
In the example above, Inter will be applied globally, and any &lt;h1&gt; tags will be styled with Roboto Mono.</p>
<p>Recommendation: Use multiple fonts conservatively since each new font is an additional resource the client has to download.</p>
<p>Local Fonts</p>
<p>Import next/font/local and specify the src of your local font file. We recommend using variable fonts for the best performance and flexibility.
app/layout.tsxTypeScriptJavaScriptTypeScriptimport localFont from 'next/font/local'</p>
<p>// Font files can be colocated inside of <code>app</code>
const myFont = localFont({
src: './my-font.woff2',
display: 'swap',
})</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot; className={myFont.className}&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>If you want to use multiple files for a single font family, src can be an array:
const roboto = localFont({
src: [
{
path: './Roboto-Regular.woff2',
weight: '400',
style: 'normal',
},
{
path: './Roboto-Italic.woff2',
weight: '400',
style: 'italic',
},
{
path: './Roboto-Bold.woff2',
weight: '700',
style: 'normal',
},
{
path: './Roboto-BoldItalic.woff2',
weight: '700',
style: 'italic',
},
],
})
View the Font API Reference for more information.
With Tailwind CSS</p>
<p>next/font can be used with Tailwind CSS through a CSS variable.
In the example below, we use the font Inter from next/font/google (you can use any font from Google or Local Fonts). Load your font with the variable option to define your CSS variable name and assign it to inter. Then, use inter.variable to add the CSS variable to your HTML document.
app/layout.tsxTypeScriptJavaScriptTypeScriptimport { Inter, Roboto_Mono } from 'next/font/google'</p>
<p>const inter = Inter({
subsets: ['latin'],
display: 'swap',
variable: '--font-inter',
})</p>
<p>const roboto_mono = Roboto_Mono({
subsets: ['latin'],
display: 'swap',
variable: '--font-roboto-mono',
})</p>
<p>export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
&lt;html lang=&quot;en&quot; className={<code>${inter.variable} ${roboto_mono.variable}</code>}&gt;
&lt;body&gt;{children}&lt;/body&gt;
&lt;/html&gt;
)
}</p>
<p>Finally, add the CSS variable to your Tailwind CSS config:
tailwind.config.js/** @type {import('tailwindcss').Config} <em>/
module.exports = {
content: [
'./pages/**/</em>.{js,ts,jsx,tsx}',
'./components/<strong>/*.{js,ts,jsx,tsx}',
'./app/</strong>/*.{js,ts,jsx,tsx}',
],
theme: {
extend: {
fontFamily: {
sans: ['var(--font-inter)'],
mono: ['var(--font-roboto-mono)'],
},
},
},
plugins: [],
}
You can now use the font-sans and font-mono utility classes to apply the font to your elements.
Preloading</p>
<p>When a font function is called on a page of your site, it is not globally available and preloaded on all routes. Rather, the font is only preloaded on the related routes based on the type of file where it is used:
If it's a unique page, it is preloaded on the unique route for that page.
If it's a layout, it is preloaded on all the routes wrapped by the layout.
If it's the root layout, it is preloaded on all routes.</p>
<p>Reusing fonts</p>
<p>Every time you call the localFont or Google font function, that font is hosted as one instance in your application. Therefore, if you load the same font function in multiple files, multiple instances of the same font are hosted. In this situation, it is recommended to do the following:</p>
<p>Call the font loader function in one shared file
Export it as a constant
Import the constant in each file where you would like to use this font
API ReferenceLearn more about the next/font API.FontOptimizing loading web fonts with the built-in <code>next/font</code> loaders.Was this helpful?</p>
<p>supported.Send</p>
