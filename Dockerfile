FROM node:10-alpine as builder

WORKDIR /src/jimmy
COPY server/server.js server/package.json server/npm-shrinkwrap.json /src/jimmy/
RUN npm ci --production

FROM node:10-alpine

RUN adduser -h /srv/jimmy -D jimmy jimmy

WORKDIR /srv/jimmy
USER jimmy

ARG PORT=4000
ENV PORT ${PORT}
EXPOSE ${PORT}

COPY --from=builder --chown=jimmy:jimmy /src/jimmy/node_modules /srv/jimmy/node_modules
COPY --from=builder --chown=jimmy:jimmy /src/jimmy/package.json /src/jimmy/server.js /srv/jimmy/

CMD npm start

COPY --chown=jimmy:jimmy dist /srv/jimmy/dist
