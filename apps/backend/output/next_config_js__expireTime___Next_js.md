# next.config.js: expireTime | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsexpireTimeexpireTime
You can specify a custom stale-while-revalidate expire time for CDNs to consume in the Cache-Control header for ISR enabled pages.
Open next.config.js and add the expireTime config:
next.config.jsmodule.exports = {
// one hour in seconds
expireTime: 3600,
}
Now when sending the Cache-Control header the expire time will be calculated depending on the specific revalidate period.
For example, if you have a revalidate of 15 minutes on a path and the expire time is one hour the generated Cache-Control header will be s-maxage=900, stale-while-revalidate=2700 so that it can stay stale for 15 minutes less than the configured expire time.Was this helpful?</p>
<p>supported.Send</p>
