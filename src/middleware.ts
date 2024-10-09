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
  console.log('Middleware called for route:', req.url);
  
  if (isPublicRoute(req)) {
    console.log('Public route detected');
    return
  }

  console.log('Protected route detected, enforcing authentication');
  auth().protect()
})