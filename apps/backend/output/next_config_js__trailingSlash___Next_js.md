# next.config.js: trailingSlash | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jstrailingSlashtrailingSlash
By default Next.js will redirect URLs with trailing slashes to their counterpart without a trailing slash. For example /about/ will redirect to /about. You can configure this behavior to act the opposite way, where URLs without trailing slashes are redirected to their counterparts with trailing slashes.
Open next.config.js and add the trailingSlash config:
next.config.jsmodule.exports = {
trailingSlash: true,
}
With this option set, URLs like /about will redirect to /about/.
When using trailingSlash: true, certain URLs are exceptions and will not have a trailing slash appended:</p>
<p>Static file URLs, such as files with extensions.
Any paths under .well-known/.</p>
<p>For example, the following URLs will remain unchanged: /file.txt, images/photos/picture.png, and .well-known/subfolder/config.json.
When used with output: &quot;export&quot; configuration, the /about page will output /about/index.html (instead of the default /about.html).
Version History</p>
<p>VersionChangesv9.5.0trailingSlash added.Was this helpful?</p>
<p>supported.Send</p>
