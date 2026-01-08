import { Elysia } from 'elysia'

new Elysia()
  .get('/', () => 'Hello from Elysia + Bun in Docker 🔥')
  .listen(4000)

console.log('Server running at http://localhost:4000')
