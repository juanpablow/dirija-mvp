# 🚗 DiriJá - Plataforma de Aulas de Direção

DiriJá é um MVP para conectar motoristas autônomos experientes a pessoas que desejam aprender a dirigir. A plataforma permite que instrutores se cadastrem, definam sua disponibilidade e recebam solicitações de aulas, enquanto alunos podem buscar instrutores, agendar aulas e avaliar suas experiências.

## 🏗️ Arquitetura do Projeto

O projeto segue boas práticas de arquitetura e está dividido em três principais componentes:

### Backend (Node.js + Express)
- **Arquitetura em camadas**: Controllers, Services, Routes
- **ORM**: Prisma para gerenciamento do banco de dados
- **Autenticação**: JWT (JSON Web Tokens)
- **Validação**: Express Validator
- **Segurança**: Bcrypt para hash de senhas

### Frontend (Next.js 14)
- **Framework**: Next.js 14 com App Router
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS (Mobile-First)
- **Gerenciamento de Estado**: Context API
- **Requisições HTTP**: Axios

### Banco de Dados
- **PostgreSQL**: Banco relacional
- **Migrations**: Gerenciadas pelo Prisma
- **Container**: Docker

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 20+ (para desenvolvimento local sem Docker)
- Git

## 🚀 Como Iniciar o Projeto

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd dirija-mvp
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Ajuste as variáveis no arquivo `.env` se necessário.

### 3. Inicie os containers com Docker Compose

```bash
docker-compose up -d
```

Este comando irá:
- Criar e iniciar o container PostgreSQL
- Criar e iniciar o container do backend na porta 4000
- Criar e iniciar o container do frontend na porta 3000

### 4. Execute as migrations do banco de dados

```bash
# Entre no container do backend
docker exec -it dirija-backend sh

# Execute as migrations
npm run prisma:migrate

# Saia do container
exit
```

### 5. Acesse a aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

## 📦 Estrutura do Projeto

```
dirija-mvp/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Schema do banco de dados
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js        # Configuração do Prisma
│   │   ├── controllers/           # Controllers da API
│   │   │   ├── auth.controller.js
│   │   │   ├── driver.controller.js
│   │   │   └── lesson.controller.js
│   │   ├── services/              # Lógica de negócio
│   │   │   ├── auth.service.js
│   │   │   ├── driver.service.js
│   │   │   └── lesson.service.js
│   │   ├── routes/                # Definição de rotas
│   │   │   ├── auth.routes.js
│   │   │   ├── driver.routes.js
│   │   │   ├── lesson.routes.js
│   │   │   └── student.routes.js
│   │   ├── middleware/            # Middlewares
│   │   │   └── auth.middleware.js
│   │   └── server.js              # Entrada da aplicação
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/                   # Pages (App Router)
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── dashboard/
│   │   ├── components/            # Componentes reutilizáveis
│   │   ├── contexts/              # Context API
│   │   │   └── AuthContext.tsx
│   │   └── lib/                   # Utilitários
│   │       └── api.ts             # Cliente API
│   ├── Dockerfile
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## 🗄️ Schema do Banco de Dados

### Principais Tabelas:

- **users**: Usuários do sistema (instrutores e alunos)
- **drivers**: Perfil de instrutores
- **students**: Perfil de alunos
- **lessons**: Aulas agendadas
- **availabilities**: Disponibilidade dos instrutores

## 🔑 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Obter perfil do usuário logado

### Instrutores
- `GET /api/drivers` - Listar instrutores (com filtros)
- `GET /api/drivers/:id` - Obter instrutor específico
- `PUT /api/drivers/:id` - Atualizar perfil do instrutor
- `POST /api/drivers/:id/availability` - Definir disponibilidade
- `GET /api/drivers/:id/stats` - Estatísticas do instrutor

### Aulas
- `POST /api/lessons` - Criar nova aula
- `GET /api/lessons/my-lessons` - Minhas aulas
- `GET /api/lessons/:id` - Obter aula específica
- `PATCH /api/lessons/:id/status` - Atualizar status da aula
- `POST /api/lessons/:id/rate` - Avaliar aula

## 🎨 Design Mobile-First

O frontend foi desenvolvido com a abordagem mobile-first utilizando Tailwind CSS:

- Breakpoints responsivos: `sm:`, `md:`, `lg:`, `xl:`
- Grid system flexível
- Componentes adaptáveis
- Navegação otimizada para mobile

## 🛠️ Scripts Úteis

### Backend

```bash
# Desenvolvimento
npm run dev

# Produção
npm start

# Prisma
npm run prisma:generate  # Gerar Prisma Client
npm run prisma:migrate   # Executar migrations
npm run prisma:studio    # Abrir Prisma Studio
```

### Frontend

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

## 🐳 Comandos Docker

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

# Rebuild
docker-compose up -d --build

# Remover volumes (limpar banco)
docker-compose down -v
```

## 🔐 Segurança

- Senhas são hasheadas com bcrypt
- Autenticação via JWT
- Validação de dados em todas as rotas
- CORS configurado
- Variáveis de ambiente para dados sensíveis

## 📱 Funcionalidades Implementadas

### Para Instrutores:
- ✅ Cadastro completo com informações da CNH e veículo
- ✅ Definição de disponibilidade semanal
- ✅ Visualização de aulas agendadas
- ✅ Confirmação/Cancelamento de aulas
- ✅ Dashboard com estatísticas

### Para Alunos:
- ✅ Cadastro simples
- ✅ Busca de instrutores por localização
- ✅ Visualização de perfis e avaliações
- ✅ Agendamento de aulas
- ✅ Avaliação de instrutores

### Sistema:
- ✅ Autenticação segura
- ✅ Sistema de avaliações
- ✅ Gestão de aulas
- ✅ API RESTful completa

## 🚧 Melhorias Futuras

- [ ] Pagamento integrado (Stripe/PagSeguro)
- [ ] Chat em tempo real
- [ ] Notificações push
- [ ] Upload de fotos de perfil
- [ ] Integração com mapas
- [ ] App mobile nativo
- [ ] Sistema de cupons/promoções
- [ ] Painel administrativo

## 📄 Licença

Este é um projeto MVP para fins educacionais.

## 👥 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

Desenvolvido com ❤️ para conectar instrutores e alunos de direção.
