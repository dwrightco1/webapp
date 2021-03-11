FROM node:10-alpine
WORKDIR /webapp
COPY . .
RUN apk add curl
RUN yarn install --production
CMD ["node", "/webapp/webapp.js"]
