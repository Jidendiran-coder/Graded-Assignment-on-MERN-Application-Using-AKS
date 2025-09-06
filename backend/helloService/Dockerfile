# Use Node.js LTS version as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["node", "index.js"]
