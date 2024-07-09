# # Usa un'immagine di base con Node.js
# FROM node:14-slim

# # Imposta la directory di lavoro all'interno del container
# WORKDIR /app

# # Copia il file package.json e package-lock.json
# COPY package.json package-lock.json ./

# # Installa le dipendenze del progetto
# RUN npm install

# # Copia il resto del codice del progetto
# COPY . .

# # Comando predefinito per mantenere il container attivo senza fare nulla
# CMD ["sh", "-c", "while :; do sleep 10; done"]

FROM node:14-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]