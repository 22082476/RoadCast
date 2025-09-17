FROM node:18 AS react-build

WORKDIR /road-cast-app

# Copy only package.json + package-lock.json first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Now copy the rest of the source code
COPY . .

EXPOSE 3000
