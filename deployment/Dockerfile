FROM node:14-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY --chown=node:node . .
RUN chmod -R 777 /home/node/app
RUN npm install
EXPOSE 2274
CMD ["npm", "run", "start"]
