FROM node:latest

WORKDIR /src

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# copy source
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]

