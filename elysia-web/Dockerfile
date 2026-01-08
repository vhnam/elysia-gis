FROM node:22.21.1-alpine3.23

WORKDIR /elysia-web

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# copy source
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
