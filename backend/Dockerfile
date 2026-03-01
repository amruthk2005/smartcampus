# use an official Node runtime as a parent image
FROM node:18-alpine

# set working directory inside container
WORKDIR /app

# copy package files and install dependencies first to leverage layer caching
COPY package.json package-lock.json* ./
RUN npm install --production

# copy the rest of the source code
COPY . .

# expose the port the app runs on
EXPOSE 5000

# default command to start the server
CMD ["npm", "start"]