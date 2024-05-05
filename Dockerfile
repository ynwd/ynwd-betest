# Use a lightweight base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy remaining app files
COPY . .

# Create a minimal image for the final stage
FROM node:18-alpine AS runner

# Copy application files from the builder stage
COPY --from=builder /app /app

# Set the working directory
WORKDIR /app

# Expose the application port
EXPOSE 3000

# Define the command to start the application
CMD ["node", "main.js"]