FROM node:21.7.1-alpine
WORKDIR /app
RUN npm i --global pm2
COPY . .
RUN npm i --production && npm run build
EXPOSE 3000
CMD [ "pm2-runtime", "npm", "--", "start" ]