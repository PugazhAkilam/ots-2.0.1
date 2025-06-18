# Step 1: Build the React app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the React app using Nginx
FROM nginx:stable-alpine

# Copy built files to Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d

# Expose port 80
EXPOSE 8098

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
