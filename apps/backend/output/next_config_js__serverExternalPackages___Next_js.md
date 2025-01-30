# next.config.js: serverExternalPackages | Next.js

<p>MenuUsing App RouterFeatures available in /appUsing Latest Version15.1.6Using App RouterFeatures available in /appUsing Latest Version15.1.6Configurationnext.config.jsserverExternalPackagesserverExternalPackagesDependencies used inside Server Components and Route Handlers will automatically be bundled by Next.js.
If a dependency is using Node.js specific features, you can choose to opt-out specific dependencies from the Server Components bundling and use native Node.js require.
next.config.js/** @type {import('next').NextConfig} */
const nextConfig = {
serverExternalPackages: ['@acme/ui'],
}</p>
<p>module.exports = nextConfig
Next.js includes a short list of popular packages that currently are working on compatibility and automatically opt-ed out:</p>
<p>@appsignal/nodejs
@aws-sdk/client-s3
@aws-sdk/s3-presigned-post
@blockfrost/blockfrost-js
@highlight-run/node
@jpg-store/lucid-cardano
@libsql/client
@mikro-orm/core
@mikro-orm/knex
@node-rs/argon2
@node-rs/bcrypt
@prisma/client
@react-pdf/renderer
@sentry/profiling-node
@sparticuz/chromium
@swc/core
argon2
autoprefixer
aws-crt
bcrypt
better-sqlite3
canvas
cpu-features
cypress
dd-trace
eslint
express
firebase-admin
import-in-the-middle
isolated-vm
jest
jsdom
keyv
libsql
mdx-bundler
mongodb
mongoose
newrelic
next-mdx-remote
next-seo
node-cron
node-pty
node-web-audio-api
oslo
pg
playwright
playwright-core
postcss
prettier
prisma
puppeteer-core
puppeteer
require-in-the-middle
rimraf
sharp
shiki
sqlite3
ts-node
ts-morph
typescript
vscode-oniguruma
webpack
websocket
zeromq</p>
<p>VersionChangesv15.0.0Moved from experimental to stable. Renamed from serverComponentsExternalPackages to serverExternalPackagesWas this helpful?</p>
<p>supported.Send</p>
