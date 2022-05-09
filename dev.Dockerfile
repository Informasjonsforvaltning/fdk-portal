FROM node:12.22.5 AS build
WORKDIR /app
COPY package.json package-lock.json audit-resolve.json ./
RUN npm install -g npm-audit-resolver
RUN npm set progress=false && \
  npm config set depth 0 && \
  npm ci
RUN check-audit --production --audit-level=moderate
COPY babel.config.js tsconfig.json tsconfig.test.json tsconfig.webpack.json jest.config.js .eslintignore .eslintrc.json ./
COPY webpack ./webpack
COPY test ./test
COPY src ./src
RUN npm test
ARG NAMESPACE
RUN npm run build:dev

