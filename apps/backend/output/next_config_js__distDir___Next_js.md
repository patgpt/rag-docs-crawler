# next.config.js: distDir | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsdistDirdistDir
You can specify a name to use for a custom build directory to use instead of .next.
Open next.config.js and add the distDir config:
next.config.jsmodule.exports = {
distDir: 'build',
}
Now if you run next build Next.js will use build instead of the default .next folder.</p>
<p>distDir should not leave your project directory. For example, ../build is an invalid directory.
Was this helpful?</p>
<p>supported.Send</p>
