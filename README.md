# Desafio API Node.js

API de cursos construída com Fastify, Drizzle ORM e PostgreSQL.

## Tecnologias

-   Node.js
-   Fastify
-   Drizzle ORM
-   PostgreSQL
-   Zod (validação)
-   Swagger (documentação)

## Como rodar

1. Instale as dependências:

    ```sh
    npm install
    ```

2. Suba o banco de dados com Docker:

    ```sh
    docker compose up -d
    ```

3. Rode as migrações:

    ```sh
    npm run db:migrate
    ```

4. Inicie o servidor:

    ```sh
    npm run dev
    ```

5. Acesse a documentação:
    - Swagger: `/docs`

## Endpoints

-   `POST /courses` — Cria um novo curso
-   `GET /courses` — Lista todos os cursos
-   `GET /courses/:id` — Busca um curso por ID

## Estrutura

-   `server.ts` — Inicialização do servidor e rotas
-   `src/routes/` — Rotas da API
-   `src/database/` — Schema e client do banco

## Banco de Dados

-   Tabela `users`: id, name, email
-   Tabela `courses`: id, title, description
