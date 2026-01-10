# Troubleshooting

## Development Server Issues

### Port Already in Use

**Problem:** Port 3000 is already in use

**Solutions:**

1. Change the port in `vite.config.ts`:
   ```typescript
   server: {
     port: 3001,
   }
   ```

2. Or kill the process using the port:
   ```bash
   lsof -ti:3000 | xargs kill
   ```

### Hot Reload Not Working

**Solutions:**

1. Restart the development server
2. Clear browser cache
3. Check for syntax errors in the console
4. Ensure file watchers are working (check system limits)

## Build Issues

### Build Fails

**Solutions:**

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

2. Check for TypeScript errors:
   ```bash
   pnpm build
   ```

3. Verify Node.js version (requires 18+)

4. Check for missing dependencies

### Build Output Issues

**Solutions:**

1. Verify `dist/` directory is created
2. Check for build errors in console
3. Ensure all imports are correct
4. Verify environment variables are set correctly

## API Connection Issues

### CORS Errors

**Problem:** Requests to API are blocked by CORS

**Solutions:**

1. Ensure API server has CORS configured to allow your frontend origin
2. Check API server is running
3. Verify API URL is correct in `src/utils/api.ts`
4. For development, ensure both servers are running

### API Not Responding

**Solutions:**

1. Verify API server is running on the expected port
2. Check API URL configuration in `src/utils/api.ts`
3. Test API endpoint directly (e.g., with curl or Postman)
4. Check browser network tab for request details
5. Verify API server logs for errors

## Routing Issues

### Route Not Found

**Solutions:**

1. Ensure route file exists in `src/routes/`
2. Check route file exports `Route` correctly
3. Verify route path matches file structure
4. Restart dev server after adding new routes

### Route Tree Not Generated

**Solutions:**

1. Routes are auto-generated during dev/build
2. If issues persist, check `src/routeTree.gen.ts` exists
3. Verify TanStack Router plugin is configured in `vite.config.ts`

## Authentication Issues

### Login Not Working

**Solutions:**

1. Verify API endpoint is correct
2. Check API server is running
3. Verify credentials are correct
4. Check browser console for errors
5. Verify CORS is configured on API
6. Check network tab for request/response details

### Session Not Persisting

**Solutions:**

1. Verify cookies are enabled in browser
2. Check API sets session cookie correctly
3. Ensure API and frontend are on same domain (or CORS allows credentials)
4. Check browser console for cookie-related errors

## Styling Issues

### Tailwind Styles Not Applied

**Solutions:**

1. Ensure `src/styles.css` is imported in root
2. Verify Tailwind plugin is configured in `vite.config.ts`
3. Check class names are correct
4. Restart dev server after Tailwind config changes

### shadcn/ui Components Not Styling

**Solutions:**

1. Verify `components.json` is configured correctly
2. Check component imports are correct
3. Ensure CSS variables are defined in `src/styles.css`
4. Verify component structure matches shadcn/ui documentation

## TypeScript Errors

### Type Errors

**Solutions:**

1. Run TypeScript compiler:
   ```bash
   pnpm tsc --noEmit
   ```

2. Check `tsconfig.json` configuration
3. Verify all types are imported correctly
4. Check for missing type definitions

## Still Having Issues?

1. Check browser console for errors
2. Check terminal/console for build errors
3. Review [Getting Started](./getting-started.md) guide
4. Verify all dependencies are installed correctly
5. Check that Node.js version is compatible (18+)

