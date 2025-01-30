# Components: Font | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceComponentsFontFont Module
This API reference will help you understand how to use next/font/google and next/font/local. For features and usage, please see the Optimizing Fonts page.
Font Function Arguments</p>
<p>For usage, review Google Fonts and Local Fonts.
Keyfont/googlefont/localTypeRequiredsrcString or Array of ObjectsYesweightString or ArrayRequired/OptionalstyleString or Array-subsetsArray of Strings-axesArray of Strings-displayString-preloadBoolean-fallbackArray of Strings-adjustFontFallbackBoolean or String-variableString-declarationsArray of Objects-
src</p>
<p>The path of the font file as a string or an array of objects (with type Array&lt;{path: string, weight?: string, style?: string}&gt;) relative to the directory where the font loader function is called.
Used in next/font/local</p>
<p>Required</p>
<p>Examples:</p>
<p>src:'./fonts/my-font.woff2' where my-font.woff2 is placed in a directory named fonts inside the app directory
src:[{path: './inter/Inter-Thin.ttf', weight: '100',},{path: './inter/Inter-Regular.ttf',weight: '400',},{path: './inter/Inter-Bold-Italic.ttf', weight: '700',style: 'italic',},]
if the font loader function is called in app/page.tsx using src:'../styles/fonts/my-font.ttf', then my-font.ttf is placed in styles/fonts at the root of the project</p>
<p>weight</p>
<p>The font weight with the following possibilities:</p>
<p>A string with possible values of the weights available for the specific font or a range of values if it's a variable font
An array of weight values if the font is not a variable google font. It applies to next/font/google only.</p>
<p>Used in next/font/google and next/font/local</p>
<p>Required if the font being used is not variable</p>
<p>Examples:</p>
<p>weight: '400': A string for a single weight value - for the font Inter, the possible values are '100', '200', '300', '400', '500', '600', '700', '800', '900' or 'variable' where 'variable' is the default)
weight: '100 900': A string for the range between 100 and 900 for a variable font
weight: ['100','400','900']: An array of 3 possible values for a non variable font</p>
<p>style</p>
<p>The font style with the following possibilities:</p>
<p>A string value with default value of 'normal'
An array of style values if the font is not a variable google font. It applies to next/font/google only.</p>
<p>Used in next/font/google and next/font/local</p>
<p>Optional</p>
<p>Examples:</p>
<p>style: 'italic': A string - it can be normal or italic for next/font/google
style: 'oblique': A string - it can take any value for next/font/local but is expected to come from standard font styles
style: ['italic','normal']: An array of 2 values for next/font/google - the values are from normal and italic</p>
<p>subsets</p>
<p>The font subsets defined by an array of string values with the names of each subset you would like to be preloaded. Fonts specified via subsets will have a link preload tag injected into the head when the preload option is true, which is the default.
Used in next/font/google</p>
<p>Optional</p>
<p>Examples:</p>
<p>subsets: ['latin']: An array with the subset latin</p>
<p>You can find a list of all subsets on the Google Fonts page for your font.
axes</p>
<p>Some variable fonts have extra axes that can be included. By default, only the font weight is included to keep the file size down. The possible values of axes depend on the specific font.
Used in next/font/google</p>
<p>Optional</p>
<p>Examples:</p>
<p>axes: ['slnt']: An array with value slnt for the Inter variable font which has slnt as additional axes as shown here. You can find the possible axes values for your font by using the filter on the Google variable fonts page and looking for axes other than wght</p>
<p>display</p>
<p>The font display with possible string values of 'auto', 'block', 'swap', 'fallback' or 'optional' with default value of 'swap'.
Used in next/font/google and next/font/local</p>
<p>Optional</p>
<p>Examples:</p>
<p>display: 'optional': A string assigned to the optional value</p>
<p>preload</p>
<p>A boolean value that specifies whether the font should be preloaded or not. The default is true.
Used in next/font/google and next/font/local</p>
<p>Optional</p>
<p>Examples:</p>
<p>preload: false</p>
<p>fallback</p>
<p>The fallback font to use if the font cannot be loaded. An array of strings of fallback fonts with no default.</p>
<p>Optional</p>
<p>Used in next/font/google and next/font/local
Examples:</p>
<p>fallback: ['system-ui', 'arial']: An array setting the fallback fonts to system-ui or arial</p>
<p>adjustFontFallback</p>
<p>For next/font/google: A boolean value that sets whether an automatic fallback font should be used to reduce Cumulative Layout Shift. The default is true.
For next/font/local: A string or boolean false value that sets whether an automatic fallback font should be used to reduce Cumulative Layout Shift. The possible values are 'Arial', 'Times New Roman' or false. The default is 'Arial'.</p>
<p>Used in next/font/google and next/font/local</p>
<p>Optional</p>
<p>Examples:</p>
<p>adjustFontFallback: false: for next/font/google
adjustFontFallback: 'Times New Roman': for next/font/local</p>
<p>variable</p>
<p>A string value to define the CSS variable name to be used if the style is applied with the CSS variable method.
Used in next/font/google and next/font/local</p>
<p>Optional</p>
<p>Examples:</p>
<p>variable: '--my-font': The CSS variable --my-font is declared</p>
<p>declarations</p>
<p>An array of font face descriptor key-value pairs that define the generated @font-face further.
Used in next/font/local</p>
<p>Optional</p>
<p>Examples:</p>
<p>declarations: [{ prop: 'ascent-override', value: '90%' }]</p>
<p>Applying Styles</p>
<p>You can apply the font styles in three ways:</p>
<p>className
style
CSS Variables</p>
<p>className</p>
<p>Returns a read-only CSS className for the loaded font to be passed to an HTML element.
&lt;p className={inter.className}&gt;Hello, Next.js!&lt;/p&gt;
style</p>
<p>Returns a read-only CSS style object for the loaded font to be passed to an HTML element, including style.fontFamily to access the font family name and fallback fonts.
&lt;p style={inter.style}&gt;Hello World&lt;/p&gt;
CSS Variables</p>
<p>If you would like to set your styles in an external style sheet and specify additional options there, use the CSS variable method.
In addition to importing the font, also import the CSS file where the CSS variable is defined and set the variable option of the font loader object as follows:
app/page.tsxTypeScriptJavaScriptTypeScriptimport { Inter } from 'next/font/google'
import styles from '../styles/component.module.css'</p>
<p>const inter = Inter({
variable: '--font-inter',
})</p>
<p>To use the font, set the className of the parent container of the text you would like to style to the font loader's variable value and the className of the text to the styles property from the external CSS file.
app/page.tsxTypeScriptJavaScriptTypeScript&lt;main className={inter.variable}&gt;
&lt;p className={styles.text}&gt;Hello World&lt;/p&gt;
&lt;/main&gt;</p>
<p>Define the text selector class in the component.module.css CSS file as follows:
styles/component.module.css.text {
font-family: var(--font-inter);
font-weight: 200;
font-style: italic;
}
In the example above, the text Hello World is styled using the Inter font and the generated font fallback with font-weight: 200 and font-style: italic.
Using a font definitions file</p>
<p>Every time you call the localFont or Google font function, that font will be hosted as one instance in your application. Therefore, if you need to use the same font in multiple places, you should load it in one place and import the related font object where you need it. This is done using a font definitions file.
For example, create a fonts.ts file in a styles folder at the root of your app directory.
Then, specify your font definitions as follows:
styles/fonts.tsTypeScriptJavaScriptTypeScriptimport { Inter, Lora, Source_Sans_3 } from 'next/font/google'
import localFont from 'next/font/local'</p>
<p>// define your variable fonts
const inter = Inter()
const lora = Lora()
// define 2 weights of a non-variable font
const sourceCodePro400 = Source_Sans_3({ weight: '400' })
const sourceCodePro700 = Source_Sans_3({ weight: '700' })
// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })</p>
<p>export { inter, lora, sourceCodePro400, sourceCodePro700, greatVibes }</p>
<p>You can now use these definitions in your code as follows:
app/page.tsxTypeScriptJavaScriptTypeScriptimport { inter, lora, sourceCodePro700, greatVibes } from '../styles/fonts'</p>
<p>export default function Page() {
return (
&lt;div&gt;
&lt;p className={inter.className}&gt;Hello world using Inter font&lt;/p&gt;
&lt;p style={lora.style}&gt;Hello world using Lora font&lt;/p&gt;
&lt;p className={sourceCodePro700.className}&gt;
Hello world using Source_Sans_3 font with weight 700
&lt;/p&gt;
&lt;p className={greatVibes.className}&gt;My title in Great Vibes font&lt;/p&gt;
&lt;/div&gt;
)
}</p>
<p>To make it easier to access the font definitions in your code, you can define a path alias in your tsconfig.json or jsconfig.json files as follows:
tsconfig.json{
&quot;compilerOptions&quot;: {
&quot;paths&quot;: {
&quot;@/fonts&quot;: [&quot;./styles/fonts&quot;]
}
}
}
You can now import any font definition as follows:
app/about/page.tsxTypeScriptJavaScriptTypeScriptimport { greatVibes, sourceCodePro400 } from '@/fonts'</p>
<p>Version Changes</p>
<p>VersionChangesv13.2.0@next/font renamed to next/font. Installation no longer required.v13.0.0@next/font was added.Was this helpful?</p>
<p>supported.Send</p>
