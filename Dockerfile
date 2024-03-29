FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY --chown=node:node . .
RUN npm install
RUN node db.js
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

EXPOSE 3000


CMD [ "npm", "start"]