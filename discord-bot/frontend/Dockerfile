FROM nginx:alpine
COPY index.html /usr/share/nginx/html
COPY ./js /usr/share/nginx/html/js
COPY ./css /usr/share/nginx/html/css
COPY nginx.conf /etc/nginx/
EXPOSE 5500
CMD ["nginx", "-g", "daemon off;"]