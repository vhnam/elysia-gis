# Troubleshooting

## Database Connection Issues

### Problem: Cannot connect to PostgreSQL

**Solutions:**

1. Ensure PostgreSQL is running:
   ```bash
   pg_isready
   ```

2. Check your connection string matches your `.env` configuration

3. Verify database exists:
   ```bash
   psql -U postgres -l
   ```

4. Create database if needed:
   ```bash
   createdb elysia-gis
   ```

5. Verify credentials in `.env` file

6. Check PostgreSQL is listening on the correct port:
   ```bash
   lsof -i :5432
   ```

## Email Not Sending

### Problem: Password reset emails not being sent

**Solutions:**

1. Verify SMTP credentials in `.env`
2. Check firewall/network settings for SMTP port
3. For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password
4. Check server logs for detailed error messages
5. Verify `FRONTEND_URL` is correctly set
6. Test SMTP connection manually:
   ```bash
   telnet smtp.example.com 465
   ```

## Port Already in Use

### Problem: Port 4000 is already in use

**Solutions:**

1. Change `API_PORT` in `.env` to a different port
2. Or kill the process using the port:
   ```bash
   lsof -ti:4000 | xargs kill
   ```
3. On Linux, you might need `sudo`:
   ```bash
   sudo lsof -ti:4000 | xargs kill
   ```

## Authentication Issues

### Problem: JWT token not working

**Solutions:**

1. Verify `JWT_SECRET` is set correctly
2. Check token expiration (default is 7 days)
3. Ensure token is included in Authorization header:
   ```
   Authorization: Bearer <token>
   ```
4. Check if token format is correct (should be a JWT string)

### Problem: Session cookie not being set

**Solutions:**

1. Ensure you're making requests to the same domain
2. In production, ensure HTTPS is enabled (cookies are `secure` in production)
3. Check browser console for cookie-related errors
4. Verify CORS settings allow credentials

## Migration Issues

### Problem: Migrations failing

**Solutions:**

1. Check database connection
2. Verify you have the correct permissions
3. Review migration files in `drizzle/` directory
4. Try resetting the database (⚠️ **WARNING**: This deletes all data):
   ```bash
   pnpm db:reset
   ```

## Build Issues

### Problem: Build fails

**Solutions:**

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules bun.lock
   pnpm install
   ```

2. Check Bun version (requires Bun v1.0+):
   ```bash
   bun --version
   ```

3. Verify TypeScript configuration in `tsconfig.json`

## Still Having Issues?

1. Check the server logs for detailed error messages
2. Review the [Development Guide](./development.md)
3. Check [Environment Variables](./environment-variables.md) are set correctly
4. Review the [Architecture Patterns](./development.md#architecture-patterns) section

