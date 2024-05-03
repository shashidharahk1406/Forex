# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source
COPY . .

# Build the Angular application
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Serve the application
CMD ["serve", "-s", "dist/firstClassMentor", "-l", "4200"]

