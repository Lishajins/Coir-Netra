FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

# Generate Prisma Client if prisma is used
RUN npx prisma generate || true

EXPOSE 3000
CMD ["pnpm", "run", "dev"]
