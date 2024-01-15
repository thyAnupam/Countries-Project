# Use an official Node runtime as a parent image
FROM node:18 AS builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the Angular app for production
RUN ng build --prod

# Use a smaller image for serving the Angular app
FROM nginx:alpine

# Copy the Angular app build from the builder stage
COPY --from=builder /app/dist/currency-search-app/ /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# CMD to run NGINX
CMD ["nginx", "-g", "daemon off;"]
