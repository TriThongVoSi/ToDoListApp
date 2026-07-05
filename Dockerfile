# Stage 1: Build the React Application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package metadata first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies (ci is used for clean, reproducible installs)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the Vite project
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine

WORKDIR /app

# Install 'serve', a static file server recommended by React/Vite communities
RUN npm install -g serve

# Copy only the built assets from the previous stage
COPY --from=builder /app/dist ./dist

# Expose the port serve runs on
EXPOSE 80

# Start the server
CMD ["serve", "-s", "dist", "-l", "80"]
