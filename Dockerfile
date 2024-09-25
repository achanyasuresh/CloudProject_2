FROM node:alpine3.19
WORKDIR /backend
COPY . .
RUN npm install
EXPOSE 8080
RUN ls
CMD [ "node", "app.js"]