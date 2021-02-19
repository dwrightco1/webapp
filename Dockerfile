FROM node:10-alpine
WORKDIR /webapp
ENV PORT 80
ENV DATABASE_USER root
ENV DATABASE_PW webapppw
ENV DATABASE_NAME webapp
COPY . .
RUN yarn install --production
CMD ["node", "/webapp/webapp.js"]
