FROM node:10

COPY package.json package-lock.json ./

RUN npm i

COPY . .

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]