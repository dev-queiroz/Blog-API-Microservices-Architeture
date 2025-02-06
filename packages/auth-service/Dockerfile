# Use a imagem Node.js versão 16-alpine (leve e rápida)
FROM node:16-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia todo o código-fonte para dentro do container
COPY . .

# Compila o código TypeScript (o script "build" deve estar configurado no package.json)
RUN npm run build

# Exponha a porta definida pela variável de ambiente (o valor será definido no docker-compose)
EXPOSE ${PORT}

# Comando para iniciar a aplicação (executa o código compilado na pasta dist)
CMD ["node", "dist/index.js"]
