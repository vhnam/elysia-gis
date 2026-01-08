FROM oven/bun:latest

WORKDIR /src

COPY package.json bun.lockb* ./
RUN bun install

# copy source
COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]
