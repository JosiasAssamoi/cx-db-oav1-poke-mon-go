FROM node:latest
WORKDIR /app
COPY . .
RUN yarn

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && yarn dev
