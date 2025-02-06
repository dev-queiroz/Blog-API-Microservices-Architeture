# Use a imagem oficial do Node.js como base
FROM node:18-slim

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN npm install --production

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta que o aplicativo irá rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["node", "index.js"]
