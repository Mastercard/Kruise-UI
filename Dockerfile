FROM node:8.16.1

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN npm install react-scripts@3.1.1 -g --silent
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent

CMD ["npm", "start"]
