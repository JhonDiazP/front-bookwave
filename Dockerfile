# base image
FROM node:18.19.0 as build-tech

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add .bin to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install package.json (o sea las dependencies)
COPY package.json /usr/src/app/package.json
RUN npm install --force
# RUN npm install -g npm@10.8.2
RUN npm install -g @angular/cli@17.3.10 

# add app
COPY . /usr/src/app

# start app
RUN ng build --output-path=./deploy

CMD ["nginx", "-g", "daemon off;"]
