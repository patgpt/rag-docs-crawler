# File Conventions: Metadata Files | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6API ReferenceFile ConventionsMetadata FilesMetadata Files API ReferenceThis section of the docs covers Metadata file conventions. File-based metadata can be defined by adding special metadata files to route segments.
Each file convention can be defined using a static file (e.g. opengraph-image.jpg), or a dynamic variant that uses code to generate the file (e.g. opengraph-image.js).
Once a file is defined, Next.js will automatically serve the file (with hashes in production for caching) and update the relevant head elements with the correct metadata, such as the asset's URL, file type, and image size.</p>
<p>Good to know:</p>
<p>Special Route Handlers like sitemap.ts, opengraph-image.tsx, and icon.tsx, and other metadata files are cached by default.
If using along with middleware.ts, configure the matcher to exclude the metadata files.</p>
<p>favicon, icon, and apple-iconAPI Reference for the Favicon, Icon and Apple Icon file conventions.manifest.jsonAPI Reference for manifest.json file.opengraph-image and twitter-imageAPI Reference for the Open Graph Image and Twitter Image file conventions.robots.txtAPI Reference for robots.txt file.sitemap.xmlAPI Reference for the sitemap.xml file.Was this helpful?</p>
<p>supported.Send</p>
