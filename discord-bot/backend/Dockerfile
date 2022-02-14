FROM node:alpine
WORKDIR /dsbackend
COPY . .

RUN npm install
RUN npm run build

ENV PORT=3000
ENV SELENIUM_ADDRESS=http://dsbotselenium:8080
ENV NWV_ADDRESS=http://dsbotfrontend:5500

EXPOSE 3000
CMD [ "node", "dist/src/App.js" ]