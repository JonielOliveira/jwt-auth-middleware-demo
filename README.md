<h1 align="center">JWT Authentication Middleware Demo</h1>

## :bookmark_tabs: Índice
- [:scroll: Descrição](#scroll-descrição)
- [:heavy_plus_sign: Pré-requisitos](#heavy_plus_sign-pré-requisitos)
- [:rocket: Execução do projeto](#rocket-execução-do-projeto)
  - [1. Clone o repositório](#1-clone-o-repositório)
  - [2. Instalar dependências](#2-instalar-dependências)
  - [3. Configurar variáveis de ambiente](#3-configurar-variáveis-de-ambiente)
  - [4. Rodar o projeto](#4-rodar-o-projeto)
- [:test_tube: Testando funcionalidades](#test_tube-testando-funcionalidades)
  - [1. Gere um token](#1-gere-um-token-rota-login)
  - [2. Teste a rota de autorização por userId](#2-teste-a-rota-de-autorização-por-userid-rota-useruserid)
  - [3. Teste a rota de autorização por role](#3-teste-a-rota-de-autorização-por-role-rota-admin)
  - [4. Teste a rota combinada de userId e role](#4-teste-a-rota-combinada-de-userid-e-role-rota-userroleuserid)
- [:building_construction: Estrutura do projeto](#building_construction-estrutura-do-projeto)


## :scroll: Descrição
Este repositório contém um exemplo simples de autenticação e autorização com **JWT (JSON Web Token)**, utilizando **Express.js**. O projeto demonstra como criar middlewares para validar o token de um usuário com base no `userId` e `role`.

:link: [(Voltar ao topo)](#bookmark_tabs-índice)

---

## :heavy_plus_sign: Pré-requisitos
Antes de rodar o projeto, você precisará ter o **Node.js** e o **npm** instalados na sua máquina. Caso não tenha, você pode baixar o [Node.js](https://nodejs.org/).


### :package: Instalando o Node.js
1. Acesse o site oficial do [Node.js](https://nodejs.org/).
2. Baixe a versão recomendada para a maioria dos usuários (LTS).
3. Siga o processo de instalação no seu sistema operacional.

:link: [(Voltar ao topo)](#bookmark_tabs-índice)

---

## :rocket: Execução do projeto
#### [1] Clone o repositório
Clone o repositório para o seu computador:
```
git clone https://github.com/JonielOliveira/jwt-auth-middleware-demo.git
cd jwt-auth-middleware-demo/backend
```

#### [2] Instalar dependências
Instale as dependências do projeto utilizando o `npm`:
```
npm install
```

#### [3] Criando a chave secreta JWT
A chave secreta é um valor **aleatório e seguro**, usado para **assinar** e **validar** os tokens **JWT**.

Você pode gerar uma chave secreta de forma segura usando o terminal com `OpenSSL`:
```
openssl rand -base64 32
```
Isso gera um valor como (exemplo):
```
c3VwZXJzZWNyZXRrZXluZWVkZWQxMjM=
```
Agora, você define essa chave no arquivo `.env` no backend:
```
JWT_SECRET=c3VwZXJzZWNyZXRrZXluZWVkZWQxMjM=
```

#### [4] Configurar variáveis de ambiente
Crie uma cópia do arquivo `.env.example` e renomeie para `.env`:
```
cp .env.example .env
```
Altere as variáveis de ambiente (exemplo):
```
PORT=3050
JWT_SECRET=sua-chave-secreta-aqui
```

#### [5] Rodar o projeto
Com as dependências instaladas e o arquivo `.env` configurado, você pode rodar o servidor com o seguinte comando:
```
npm start
```
Isso iniciará o servidor na porta especificada no `.env` (por padrão, será a porta 3000). O servidor irá escutar requisições na URL (http://localhost:3000).

:link: [(Voltar ao topo)](#bookmark_tabs-índice)

---

## :test_tube: Testando funcionalidades

#### [1] Gere um token (rota `/login`)
Use uma ferramenta como **Thunder Client**, **Postman** ou **Insomnia** para testar. Faça um **`POST`** na rota `/login`:

- **URL**: http://localhost:3000/login
- **Body (JSON)**:
```
{
  "userId": 123,
  "role": "admin"
}
```
A resposta será algo assim:
```
{
  "token": "seu_token_aqui"
}
```

#### [2] Teste a rota de autorização por `userId` (rota `/user/:userId`)
Agora que você tem o token, faça uma **`GET`** na rota `/user/123` com o cabeçalho de **Authorization**:

- **URL**: http://localhost:3000/user/123
- **Cabeçalhos**:
    - **Authorization**: `Bearer seu_token_aqui`

Se o `userId` no token for igual ao `:userId` da rota, você verá:
```
{
  "message": "Acesso autorizado, usuário 123"
}
```

#### [3] Teste a rota de autorização por `role` (rota `/admin`)
Faça uma **`GET`** na rota `/admin`, passando o token no cabeçalho **Authorization**:

- **URL**: http://localhost:3000/admin
- **Cabeçalhos**:
    - **Authorization**: `Bearer seu_token_aqui`

Se o `role` no token for `admin` ou `superadmin`, você verá:
```
{
  "message": "Acesso autorizado: Role correta"
}
```

#### [4] Teste a rota combinada de `userId` e `role` (rota `/userRole/:userId`)
Faça uma **`GET`** na rota `/userRole/123`, passando o token no cabeçalho **Authorization**:

- **URL**: http://localhost:3000/userRole/123
- **Cabeçalhos**:
    - **Authorization**: `Bearer seu_token_aqui`


Se o `role` for `admin` e o `userId` na rota corresponder ao `userId` do token, você verá:
```
{
  "message": "Acesso autorizado para admin do usuário 123"
}
```

:link: [(Voltar ao topo)](#bookmark_tabs-índice)

---

## :building_construction: Estrutura do projeto
- `middlewares/`: Contém os middlewares `authorizeUserId` e `authorizeRole`.
    - `authorizeUserId.js`: Middleware que verifica se o `userId` no token **JWT** corresponde ao `userId` passado na rota.
    - `authorizeRole.js`: Middleware que verifica se o `role` do usuário no token **JWT** corresponde a um dos papéis permitidos para acessar a rota.
- `.env`: Arquivo de variáveis de ambiente para configuração do servidor e chave secreta.
- `.env.example`: Modelo de arquivo de variáveis de ambiente, usado como referência para configurar o `.env` com as credenciais e configurações necessárias.
- `app.js`: Arquivo principal que configura o servidor **Express**.
- `package-lock.json`: Arquivo gerado automaticamente pelo **npm** para travar as versões das dependências.
- `package.json`: Arquivo que gerencia as dependências do projeto e os scripts do **npm**.
- `.gitignore`: Arquivo que define quais arquivos ou pastas devem ser ignorados pelo **Git**.
- `LICENSE`: Arquivo de licença do projeto.
- `README.md`: Documento com instruções sobre instalação, configuração e uso do projeto.

:link: [(Voltar ao topo)](#bookmark_tabs-índice)
