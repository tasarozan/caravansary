FROM node:alpine

WORKDIR /app

ADD src ./src

ADD package.json package-lock.json ./

RUN npm install

ADD public ./public
ADD .browserslistrc .prettierrc .eslintrc.js babel.config.js vue.config.js ./

CMD [ "npm", "run", "serve" ]
