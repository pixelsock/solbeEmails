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
  console.log('Middleware running for path:', req.nextUrl.pathname);
  if (!isPublicRoute(req)) {
    console.log('Protecting route:', req.nextUrl.pathname);
    auth().protect();
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};