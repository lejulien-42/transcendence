FROM node:9.6.1

RUN mkdir -p /app
WORKDIR /app
EXPOSE 4200

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app

RUN npm install --silent
RUN npm rebuild node-sass

CMD ["npm", "run", "docker-start"]
