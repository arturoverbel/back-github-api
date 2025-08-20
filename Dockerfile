FROM node

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
# Expose the port the app runs on
EXPOSE 80

# Start the app
CMD ["npm", "start"]