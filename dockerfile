# Stage 1: Build the application
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the app with a static server
FROM node:20-alpine AS runner

WORKDIR /app

# Install a simple static file server
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=builder /app/dist ./dist

EXPOSE 8080

# Serve the app
CMD ["serve", "-s", "dist", "-l", "8080"]