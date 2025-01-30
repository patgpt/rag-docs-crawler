# Optimizing: Videos | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Building Your ApplicationOptimizingVideosVideo OptimizationThis page outlines how to use videos with Next.js applications, showing how to store and display video files without affecting performance.
Using &lt;video&gt; and &lt;iframe&gt;</p>
<p>Videos can be embedded on the page using the HTML &lt;video&gt; tag for direct video files and &lt;iframe&gt; for external platform-hosted videos.
&lt;video&gt;</p>
<p>The HTML &lt;video&gt; tag can embed self-hosted or directly served video content, allowing full control over the playback and appearance.
app/ui/video.jsxexport function Video() {
return (
&lt;video width=&quot;320&quot; height=&quot;240&quot; controls preload=&quot;none&quot;&gt;
&lt;source src=&quot;/path/to/video.mp4&quot; type=&quot;video/mp4&quot; /&gt;
&lt;track
src=&quot;/path/to/captions.vtt&quot;
kind=&quot;subtitles&quot;
srcLang=&quot;en&quot;
label=&quot;English&quot;
/&gt;
Your browser does not support the video tag.
&lt;/video&gt;
)
}
Common &lt;video&gt; tag attributes</p>
<p>AttributeDescriptionExample ValuesrcSpecifies the source of the video file.&lt;video src=&quot;/path/to/video.mp4&quot; /&gt;widthSets the width of the video player.&lt;video width=&quot;320&quot; /&gt;heightSets the height of the video player.&lt;video height=&quot;240&quot; /&gt;controlsIf present, it displays the default set of playback controls.&lt;video controls /&gt;autoPlayAutomatically starts playing the video when the page loads. Note: Autoplay policies vary across browsers.&lt;video autoPlay /&gt;loopLoops the video playback.&lt;video loop /&gt;mutedMutes the audio by default. Often used with autoPlay.&lt;video muted /&gt;preloadSpecifies how the video is preloaded. Values: none, metadata, auto.&lt;video preload=&quot;none&quot; /&gt;playsInlineEnables inline playback on iOS devices, often necessary for autoplay to work on iOS Safari.&lt;video playsInline /&gt;</p>
<p>Good to know: When using the autoPlay attribute, it is important to also include the muted attribute to ensure the video plays automatically in most browsers and the playsInline attribute for compatibility with iOS devices.</p>
<p>For a comprehensive list of video attributes, refer to the MDN documentation.
Video best practices</p>
<p>Fallback Content: When using the &lt;video&gt; tag, include fallback content inside the tag for browsers that do not support video playback.
Subtitles or Captions: Include subtitles or captions for users who are deaf or hard of hearing. Utilize the &lt;track&gt; tag with your &lt;video&gt; elements to specify caption file sources.
Accessible Controls: Standard HTML5 video controls are recommended for keyboard navigation and screen reader compatibility. For advanced needs, consider third-party players like react-player or video.js, which offer accessible controls and consistent browser experience.</p>
<p>&lt;iframe&gt;</p>
<p>The HTML &lt;iframe&gt; tag allows you to embed videos from external platforms like YouTube or Vimeo.
app/page.jsxexport default function Page() {
return (
&lt;iframe src=&quot;https://www.youtube.com/embed/19g66ezsKAg&quot; allowFullScreen /&gt;
)
}
Common &lt;iframe&gt; tag attributes</p>
<p>AttributeDescriptionExample ValuesrcThe URL of the page to embed.&lt;iframe src=&quot;https://example.com&quot; /&gt;widthSets the width of the iframe.&lt;iframe width=&quot;500&quot; /&gt;heightSets the height of the iframe.&lt;iframe height=&quot;300&quot; /&gt;allowFullScreenAllows the iframe content to be displayed in full-screen mode.&lt;iframe allowFullScreen /&gt;sandboxEnables an extra set of restrictions on the content within the iframe.&lt;iframe sandbox /&gt;loadingOptimize loading behavior (e.g., lazy loading).&lt;iframe loading=&quot;lazy&quot; /&gt;titleProvides a title for the iframe to support accessibility.&lt;iframe title=&quot;Description&quot; /&gt;
For a comprehensive list of iframe attributes, refer to the MDN documentation.
Choosing a video embedding method</p>
<p>There are two ways you can embed videos in your Next.js application:</p>
<p>Self-hosted or direct video files: Embed self-hosted videos using the &lt;video&gt; tag for scenarios requiring detailed control over the player's functionality and appearance. This integration method within Next.js allows for customization and control of your video content.
Using video hosting services (YouTube, Vimeo, etc.): For video hosting services like YouTube or Vimeo, you'll embed their iframe-based players using the &lt;iframe&gt; tag. While this method limits some control over the player, it offers ease of use and features provided by these platforms.</p>
<p>Choose the embedding method that aligns with your application's requirements and the user experience you aim to deliver.
Embedding externally hosted videos</p>
<p>To embed videos from external platforms, you can use Next.js to fetch the video information and React Suspense to handle the fallback state while loading.</p>
<ol>
<li>Create a Server Component for video embedding
The first step is to create a Server Component that generates the appropriate iframe for embedding the video. This component will fetch the source URL for the video and render the iframe.
app/ui/video-component.jsxexport default async function VideoComponent() {
const src = await getVideoSrc()</li>
</ol>
<p>return &lt;iframe src={src} allowFullScreen /&gt;
}
2. Stream the video component using React Suspense
After creating the Server Component to embed the video, the next step is to stream the component using React Suspense.
app/page.jsximport { Suspense } from 'react'
import VideoComponent from '../ui/VideoComponent.jsx'</p>
<p>export default function Page() {
return (
&lt;section&gt;
&lt;Suspense fallback={&lt;p&gt;Loading video...&lt;/p&gt;}&gt;
&lt;VideoComponent /&gt;
&lt;/Suspense&gt;
{/* Other content of the page */}
&lt;/section&gt;
)
}</p>
<p>Good to know: When embedding videos from external platforms, consider the following best practices:</p>
<p>Ensure the video embeds are responsive. Use CSS to make the iframe or video player adapt to different screen sizes.
Implement strategies for loading videos based on network conditions, especially for users with limited data plans.</p>
<p>This approach results in a better user experience as it prevents the page from blocking, meaning the user can interact with the page while the video component streams in.
For a more engaging and informative loading experience, consider using a loading skeleton as the fallback UI. So instead of showing a simple loading message, you can show a skeleton that resembles the video player like this:
app/page.jsximport { Suspense } from 'react'
import VideoComponent from '../ui/VideoComponent.jsx'
import VideoSkeleton from '../ui/VideoSkeleton.jsx'</p>
<p>export default function Page() {
return (
&lt;section&gt;
&lt;Suspense fallback={&lt;VideoSkeleton /&gt;}&gt;
&lt;VideoComponent /&gt;
&lt;/Suspense&gt;
{/* Other content of the page */}
&lt;/section&gt;
)
}
Self-hosted videos</p>
<p>Self-hosting videos may be preferable for several reasons:</p>
<p>Complete control and independence: Self-hosting gives you direct management over your video content, from playback to appearance, ensuring full ownership and control, free from external platform constraints.
Customization for specific needs: Ideal for unique requirements, like dynamic background videos, it allows for tailored customization to align with design and functional needs.
Performance and scalability considerations: Choose storage solutions that are both high-performing and scalable, to support increasing traffic and content size effectively.
Cost and integration: Balance the costs of storage and bandwidth with the need for easy integration into your Next.js framework and broader tech ecosystem.</p>
<p>Using Vercel Blob for video hosting</p>
<p>Vercel Blob offers an efficient way to host videos, providing a scalable cloud storage solution that works well with Next.js. Here's how you can host a video using Vercel Blob:</p>
<ol>
<li>Uploading a video to Vercel Blob
In your Vercel dashboard, navigate to the &quot;Storage&quot; tab and select your Vercel Blob store. In the Blob table's upper-right corner, find and click the &quot;Upload&quot; button. Then, choose the video file you wish to upload. After the upload completes, the video file will appear in the Blob table.
Alternatively, you can upload your video using a server action. For detailed instructions, refer to the Vercel documentation on server-side uploads. Vercel also supports client-side uploads. This method may be preferable for certain use cases.</li>
<li>Displaying the video in Next.js
Once the video is uploaded and stored, you can display it in your Next.js application. Here's an example of how to do this using the &lt;video&gt; tag and React Suspense:
app/page.jsximport { Suspense } from 'react'
import { list } from '@vercel/blob'</li>
</ol>
<p>export default function Page() {
return (
&lt;Suspense fallback={&lt;p&gt;Loading video...&lt;/p&gt;}&gt;
&lt;VideoComponent fileName=&quot;my-video.mp4&quot; /&gt;
&lt;/Suspense&gt;
)
}</p>
<p>async function VideoComponent({ fileName }) {
const { blobs } = await list({
prefix: fileName,
limit: 1,
})
const { url } = blobs[0]</p>
<p>return (
&lt;video controls preload=&quot;none&quot; aria-label=&quot;Video player&quot;&gt;
&lt;source src={url} type=&quot;video/mp4&quot; /&gt;
Your browser does not support the video tag.
&lt;/video&gt;
)
}
In this approach, the page uses the video's @vercel/blob URL to display the video using the VideoComponent. React Suspense is used to show a fallback until the video URL is fetched and the video is ready to be displayed.
Adding subtitles to your video</p>
<p>If you have subtitles for your video, you can easily add them using the &lt;track&gt; element inside your &lt;video&gt; tag. You can fetch the subtitle file from Vercel Blob in a similar way as the video file. Here's how you can update the &lt;VideoComponent&gt; to include subtitles.
app/page.jsxasync function VideoComponent({ fileName }) {
const { blobs } = await list({
prefix: fileName,
limit: 2,
})
const { url } = blobs[0]
const { url: captionsUrl } = blobs[1]</p>
<p>return (
&lt;video controls preload=&quot;none&quot; aria-label=&quot;Video player&quot;&gt;
&lt;source src={url} type=&quot;video/mp4&quot; /&gt;
&lt;track src={captionsUrl} kind=&quot;subtitles&quot; srcLang=&quot;en&quot; label=&quot;English&quot; /&gt;
Your browser does not support the video tag.
&lt;/video&gt;
)
}
By following this approach, you can effectively self-host and integrate videos into your Next.js applications.
Resources</p>
<p>To continue learning more about video optimization and best practices, please refer to the following resources:</p>
<p>Understanding video formats and codecs: Choose the right format and codec, like MP4 for compatibility or WebM for web optimization, for your video needs. For more details, see Mozilla's guide on video codecs.
Video compression: Use tools like FFmpeg to effectively compress videos, balancing quality with file size. Learn about compression techniques at FFmpeg's official website.
Resolution and bitrate adjustment: Adjust resolution and bitrate based on the viewing platform, with lower settings for mobile devices.
Content Delivery Networks (CDNs): Utilize a CDN to enhance video delivery speed and manage high traffic. When using some storage solutions, such as Vercel Blob, CDN functionality is automatically handled for you. Learn more about CDNs and their benefits.</p>
<p>Explore these video streaming platforms for integrating video into your Next.js projects:
Open source next-video component</p>
<p>Provides a &lt;Video&gt; component for Next.js, compatible with various hosting services including Vercel Blob, S3, Backblaze, and Mux.
Detailed documentation for using next-video.dev with different hosting services.</p>
<p>Cloudinary Integration</p>
<p>Official documentation and integration guide for using Cloudinary with Next.js.
Includes a &lt;CldVideoPlayer&gt; component for drop-in video support.
Find examples of integrating Cloudinary with Next.js including Adaptive Bitrate Streaming.
Other Cloudinary libraries including a Node.js SDK are also available.</p>
<p>Mux Video API</p>
<p>Mux provides a starter template for creating a video course with Mux and Next.js.
Learn about Mux's recommendations for embedding high-performance video for your Next.js application.
Explore an example project demonstrating Mux with Next.js.</p>
<p>Fastly</p>
<p>Learn more about integrating Fastly's solutions for video on demand and streaming media into Next.js.</p>
<p>ImageKit.io Integration</p>
<p>Check out the official quick start guide for integrating ImageKit with Next.js.
The integration provides an &lt;IKVideo&gt; component, offering seamless video support.
You can also explore other ImageKit libraries, such as the Node.js SDK, which is also available.
Was this helpful?</p>
<p>supported.Send</p>
