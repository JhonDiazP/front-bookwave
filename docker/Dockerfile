# Base image
FROM node:18.19.0

# Set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Add .bin to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --force

# Install Angular CLI version 15
RUN npm install -g @angular/cli@17.3.10

# Add app files
COPY . /usr/src/app

# Expose application port
#EXPOSE 4200

# Start the app
CMD ng serve --host 0.0.0.0
