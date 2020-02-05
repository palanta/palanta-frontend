FROM debian:latest

RUN apt-get update
RUN apt install -y npm
RUN npm install -g npm@latest
RUN npm install -g @quasar/cli

RUN mkdir /palanta-frontend
WORKDIR /palanta-frontend

COPY babel.config.js .
COPY .editorconfig .
COPY .eslintrc.js .
COPY .eslintignore .
COPY .stylintrc .
COPY .postcssrc.js .

COPY package.json .
COPY yarn.lock .
COPY package-lock.json .

COPY quasar.conf.js .
COPY src/ src/

RUN npm install
RUN quasar build

CMD quasar serve dist/spa -p 80
EXPOSE 80