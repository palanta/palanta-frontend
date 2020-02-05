FROM debian:latest

RUN apt-get update
RUN apt install -y npm
RUN npm install -g npm@latest
RUN npm install quasar

COPY . .

RUN npm install
RUN npx quasar build

CMD npx quasar serve dist/spa -p 80
EXPOSE 80