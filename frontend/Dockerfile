FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

# API_URL must be available at build time for Nuxt runtimeConfig
ARG API_URL=http://backend:8000
ARG NUXT_PUBLIC_API_URL=http://localhost:8000/api/v1
ENV API_URL=${API_URL}
ENV NUXT_PUBLIC_API_URL=${NUXT_PUBLIC_API_URL}

RUN npm run build

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
