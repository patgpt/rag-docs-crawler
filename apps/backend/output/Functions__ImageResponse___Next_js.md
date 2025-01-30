# Functions: ImageResponse | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFunctionsImageResponseImageResponseThe ImageResponse constructor allows you to generate dynamic images using JSX and CSS. This is useful for generating social media images such as Open Graph images, Twitter cards, and more.
The following options are available for ImageResponse:
import { ImageResponse } from 'next/og'</p>
<p>new ImageResponse(
element: ReactElement,
options: {
width?: number = 1200
height?: number = 630
emoji?: 'twemoji' | 'blobmoji' | 'noto' | 'openmoji' = 'twemoji',
fonts?: {
name: string,
data: ArrayBuffer,
weight: number,
style: 'normal' | 'italic'
}[]
debug?: boolean = false</p>
<pre><code>// Options that will be passed to the HTTP response
status?: number = 200
statusText?: string
headers?: Record&lt;string, string&gt;
</code></pre>
<p>},
)
Supported CSS Properties</p>
<p>Please refer to Satori’s documentation for a list of supported HTML and CSS features.
Version History</p>
<p>VersionChangesv14.0.0ImageResponse moved from next/server to next/ogv13.3.0ImageResponse can be imported from next/server.v13.0.0ImageResponse introduced via @vercel/og package.Was this helpful?</p>
<p>supported.Send</p>
