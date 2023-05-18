# Use the official Node.js image with the corresponding version
FROM node:16.13.2-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Build the Expo project
RUN npx expo export:web

# Expose the port used by your Expo application (e.g., 19006 for Metro Bundler)
EXPOSE 19006

# Set the command to start your Expo application
CMD ["npm", "start"]
