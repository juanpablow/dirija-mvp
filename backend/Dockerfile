FROM node:20-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o schema do Prisma primeiro
COPY prisma ./prisma

# Gerar o Prisma Client
RUN npx prisma generate

# Copiar o resto dos arquivos
COPY . .

# Build do TypeScript
RUN npm run build

EXPOSE 4000

# Usar o comando start que executa o código compilado
CMD ["npm", "run", "start"]
