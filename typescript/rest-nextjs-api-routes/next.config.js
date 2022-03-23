module.exports = {
  // Use the CDN in production/preview and localhost for development.
  assetPrefix: process.env.NEXT_PUBLIC_VERCEL_ENV ? 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL : 'http://localhost:3000',
}