FROM oven/bun:latest

WORKDIR /elysia-api

COPY package.json bun.lockb* ./
RUN bun install

# copy source
COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]
