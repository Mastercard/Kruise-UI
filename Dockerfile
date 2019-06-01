FROM node:8.15.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@2.1.5 -g --silent

ENV REACT_APP_DEPLOY_WIZARD_API_SERVER http://localhost:9801
CMD ["npm", "start"]
