FROM nginx:alpine
EXPOSE 80
RUN rm /etc/nginx/conf.d/*
#change next to: COPY ./default.conf /etc/nginx/conf.d/
COPY ./test.default.conf /etc/nginx/conf.d/
CMD [ "nginx", "-g", "daemon off;" ]