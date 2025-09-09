# Stage 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy rest of the source code
COPY . .

# Build optimized production build
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy build output to nginx html dir
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
