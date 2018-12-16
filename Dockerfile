FROM node

WORKDIR /j3rnbot

COPY . /j3rnbot

RUN npm install

CMD ["./j3rnbot.sh"]
