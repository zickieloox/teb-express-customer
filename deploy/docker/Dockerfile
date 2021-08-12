FROM node:12.2.0 as builder
WORKDIR /shipping-customer
ADD ./ /shipping-customer
RUN yarn global add @vue/cli
RUN yarn install
ARG MODE
RUN yarn run build --mode ${MODE}

# Serve
FROM nginx:1.18.0-alpine
WORKDIR /usr/share/nginx
COPY --from=builder /shipping-customer/dist dist
RUN rm -rf html
RUN mv dist html
COPY --chown=root:root ./deploy/docker/nginx.conf /etc/nginx/conf.d/default.conf
