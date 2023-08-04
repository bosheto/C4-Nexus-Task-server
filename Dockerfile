FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=4000
ENV DB_URL=mongodb+srv://app-user-1:5WEhBNFUw48qx5Ny@cluster0.gpayvys.mongodb.net/products
EXPOSE 4000
CMD [ "node", "src/app.js" ]
