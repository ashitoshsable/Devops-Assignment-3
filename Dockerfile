FROM node:20

COPY . /app

WORKDIR /app

RUN npm install
RUN npm run build
RUN npm i -g serve
RUN cd dist

EXPOSE 3000

WORKDIR /app/dist

CMD ["serve"]