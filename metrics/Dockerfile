# Use the official Node.js 18.x image
FROM node:18

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Command to run the metrics service
CMD ["ts-node", "metrics.ts"]