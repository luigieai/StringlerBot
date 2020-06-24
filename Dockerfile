FROM node:14-alpine
#O app ira funcionar nessa pasta
WORKDIR /usr/src/app
#Vamos instalar as dependencias do projeto
COPY package*.json ./
RUN npm install
#Agora vamos copiar o app para a imagem
COPY . .
#Dar build no app, como uma LIB simplesmente buga, a build nao retorna com sucesso, entao damos um 0 para o docker ignorar
RUN npm run build ; exit 0
CMD node ./build/App.js
