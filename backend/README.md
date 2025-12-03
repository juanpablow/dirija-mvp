# Backend DiriJá - TypeScript API

Backend API para a plataforma DiriJá, desenvolvido com TypeScript, Express, Prisma e PostgreSQL.

## 🚀 Tecnologias

- **TypeScript 5.3** - Linguagem principal
- **Node.js 20** - Runtime
- **Express 4** - Framework web
- **Prisma ORM 5.22** - ORM para PostgreSQL
- **PostgreSQL 16** - Banco de dados
- **JWT** - Autenticação
- **Express Validator** - Validação de dados

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts         # Configuração do Prisma Client
│   ├── controllers/
│   │   └── instructor.controller.ts  # Controlador de instrutores
│   ├── services/
│   │   └── instructor.service.ts     # Lógica de negócio
│   ├── routes/
│   │   └── instructor.routes.ts      # Rotas da API
│   ├── validators/
│   │   └── instructor.validator.ts   # Validação de dados
│   ├── types/
│   │   └── index.ts            # Tipos e interfaces TypeScript
│   └── server.ts               # Arquivo principal
├── prisma/
│   └── schema.prisma           # Schema do banco de dados
├── dist/                       # Código compilado (gerado)
├── tsconfig.json              # Configuração TypeScript
├── package.json
└── Dockerfile

```

## 🔧 Configuração Local

### 1. Instalar Dependências

```bash
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL=postgresql://dirija:dirija123@localhost:5432/dirija_db
JWT_SECRET=dirija-super-secret-jwt-key-change-in-production
PORT=4000
NODE_ENV=development
```

### 3. Gerar Prisma Client

```bash
npm run prisma:generate
```

### 4. Executar Migrações

```bash
npm run prisma:migrate
```

### 5. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:4000`

## 📡 API Endpoints

### Health Check

```http
GET /health
```

**Resposta:**
```json
{
  "status": "ok",
  "message": "DiriJá API is running",
  "timestamp": "2025-12-02T00:00:00.000Z"
}
```

### Criar Lead de Instrutor

Cria um cadastro inicial de instrutor para captura de leads.

```http
POST /api/instructors
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 98765-4321"
}
```

**Validações:**
- `name`: 3-100 caracteres, obrigatório
- `email`: formato de email válido, obrigatório, único
- `phone`: formato brasileiro válido, obrigatório

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "message": "Cadastro recebido com sucesso! Entraremos em contato em breve.",
  "data": {
    "id": "uuid-aqui",
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 98765-4321",
    "createdAt": "2025-12-02T00:00:00.000Z"
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "error": "Este email já está cadastrado"
}
```

### Listar Leads de Instrutores

```http
GET /api/instructors
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "João Silva",
      "email": "joao@example.com",
      "phone": "(11) 98765-4321",
      "createdAt": "2025-12-02T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

### Buscar Lead por ID

```http
GET /api/instructors/:id
```

**Resposta (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 98765-4321",
    "createdAt": "2025-12-02T00:00:00.000Z"
  }
}
```

**Resposta (404):**
```json
{
  "success": false,
  "error": "Instrutor não encontrado"
}
```

## 🏗️ Arquitetura

### Clean Architecture

O projeto segue princípios de Clean Architecture:

1. **Routes**: Define as rotas HTTP e aplica middlewares de validação
2. **Controllers**: Recebe requisições, valida entrada, chama services
3. **Services**: Contém a lógica de negócio
4. **Config**: Configurações (banco de dados, etc)
5. **Types**: Definições de tipos TypeScript e DTOs

### Fluxo de Dados

```
Request → Routes → Validator → Controller → Service → Database
                                                    ↓
Response ← Controller ← Service ← Prisma Client ← Database
```

### DTOs (Data Transfer Objects)

```typescript
// Entrada
interface CreateInstructorDTO {
  name: string;
  email: string;
  phone: string;
}

// Saída
interface InstructorResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

// Padrão de resposta
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## 🐳 Docker

### Build da Imagem

```bash
docker build -t dirija-backend .
```

### Executar Container

```bash
docker run -p 4000:4000 --env-file .env dirija-backend
```

### Docker Compose

O projeto inclui configuração completa no `docker-compose.yml` na raiz do projeto:

```bash
# Na raiz do projeto
docker-compose up -d
```

## 📝 Scripts Disponíveis

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:studio": "prisma studio"
}
```

- **dev**: Desenvolvimento com hot reload
- **build**: Compila TypeScript para JavaScript
- **start**: Executa código compilado (produção)
- **prisma:generate**: Gera Prisma Client
- **prisma:migrate**: Executa migrações do banco
- **prisma:studio**: Interface visual para o banco

## 🔒 Segurança

- Validação de entrada com `express-validator`
- Sanitização de emails
- Tratamento de erros sem expor detalhes internos
- Unique constraints no banco de dados
- TypeScript para type safety

## 📊 Banco de Dados

### Schema Prisma

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  phone     String
  role      UserRole
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  driver  Driver?
  student Student?

  @@map("users")
}

enum UserRole {
  DRIVER
  STUDENT
  ADMIN
}
```

## 🚀 Deploy

### Produção

1. Build do TypeScript:
```bash
npm run build
```

2. Executar migrações:
```bash
npx prisma migrate deploy
```

3. Iniciar servidor:
```bash
npm run start
```

### Variáveis de Ambiente de Produção

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=seu-secret-super-seguro-aqui
PORT=4000
NODE_ENV=production
```

## 🧪 Testando a API

### Com cURL

```bash
# Health check
curl http://localhost:4000/health

# Criar instrutor
curl -X POST http://localhost:4000/api/instructors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 98765-4321"
  }'

# Listar instrutores
curl http://localhost:4000/api/instructors
```

### Com HTTPie

```bash
# Criar instrutor
http POST localhost:4000/api/instructors \
  name="João Silva" \
  email="joao@example.com" \
  phone="(11) 98765-4321"
```

## 📈 Próximos Passos

- [ ] Autenticação JWT completa
- [ ] Middleware de autenticação
- [ ] Testes unitários e de integração
- [ ] Documentação OpenAPI/Swagger
- [ ] Rate limiting
- [ ] Logs estruturados
- [ ] Monitoramento e métricas

## 🤝 Contribuindo

1. Sempre use TypeScript
2. Siga o padrão de arquitetura existente
3. Valide todas as entradas
4. Adicione tratamento de erros apropriado
5. Mantenha a documentação atualizada

## 📄 Licença

ISC
