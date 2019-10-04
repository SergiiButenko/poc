FROM node:8.16.1-alpine as frontend

WORKDIR /opt/app
RUN npm install http-server -g

COPY package.json yarn.lock /tmp/

RUN if [ ! diff -q yarn.lock /tmp/yarn.lock > /dev/null  2>&1 ]; then cp /tmp/yarn.lock yarn.lock; fi

RUN cd /tmp && yarn
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

COPY . /opt/app
RUN rm -rf /opt/app/dist
RUN yarn build
# CMD yarn start-prod


FROM nginx:alpine
COPY ngninx.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www/app/
COPY --from=frontend /opt/app/dist /var/www/app/static/