import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
  '/api/initial-sync(.*)',
  '/api/aurinko/webhook(.*)',
  '/api/stripe(.*)',
  '/privacy',
  '/terms-of-service'
])

export default clerkMiddleware((auth, req) => {
  // If the route is public, no need to protect it
  if (isPublicRoute(req)) {
    return
  }

  // For non-public routes, enforce authentication
  auth().protect()
})
