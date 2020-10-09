FROM node:latest
WORKDIR /app
COPY . .
RUN yarn
RUN yarn dev