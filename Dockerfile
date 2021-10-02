FROM node:16.6.0-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
RUN npm i
EXPOSE 5000
CMD [ "node", "app.js" ]