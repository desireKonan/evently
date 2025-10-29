# base node image
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json  ./

COPY . .

# RUN npm ci 

RUN npm install serve -g

RUN npm ci

RUN npm run build

# RUN pwd

# FROM nginx:stable-alpine

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]