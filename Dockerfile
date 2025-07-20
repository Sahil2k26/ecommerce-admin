FROM node:22-alpine AS base

# Set working directory
WORKDIR /src

COPY prisma ./prisma
COPY package.json package-lock.json ./
RUN npm install

# Copy all files first
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]
