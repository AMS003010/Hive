FROM node:16 AS build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

RUN npm install

# Copy the rest of the files, including server.js
COPY . .

# Run the build script
RUN npm run build

FROM node:16-alpine AS final

WORKDIR /usr/src/app

# Copy node_modules and the dist directory
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]
