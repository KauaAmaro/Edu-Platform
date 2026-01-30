# 🎓 Edu-Platform

Plataforma educacional moderna baseada em **microsserviços** com arquitetura escalável, segurança robusta e experiência de usuário fluida.

![Arquitetura](https://img.shields.io/badge/arquitetura-microservices-blue)
![Tecnologias](https://img.shields.io/badge/tech-Next.js%20%7C%20Node.js%20%7C%20MongoDB%20%7C%20Kong-green)

<img width="1909" height="961" alt="Image" src="https://github.com/user-attachments/assets/8f080b27-4ffd-487a-a245-97a82efd4cfa" />

<img width="1913" height="966" alt="Image" src="https://github.com/user-attachments/assets/18313e15-1cbd-4795-a370-8a79fb7eec7d" />


###  Componentes Principais

- **Kong Gateway**: API Gateway central com roteamento inteligente
- **Micro Frontends**: Experiência SPA com navegação fluida
- **Microsserviços**: Backend modular e independente

---

## Funcionalidades

###  Usuários
- Registro e autenticação segura
- Área pessoal com cursos adquiridos
- Comentários em vídeos

### Cursos
- Catálogo público de cursos disponíveis
- Sistema de vendas integrado
- Acesso controlado ao conteúdo

### Segurança
- JWT para autenticação
- Autorização baseada em permissões
- APIs protegidas por camadas

---

## Tecnologias Utilizadas

### Frontend
- **Next.js 14** 
- **React 18**
- **TypeScript**
- **Tailwind CSS**

### Backend
- **Node.js 18**
- **Express.js**
- **PostgreSQL**


### Infraestrutura
- **Docker**
- **Docker Compose**
- **Kong Gateway 3.6**

---

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js 18+ (opcional, para desenvolvimento local)

---

## ⚡ Inicialização Rápida


### 1. Suba todos os serviços
```bash
docker compose up --build
```

### 2. Acesse as aplicações

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:8000 | Plataforma principal |
| **Kong Admin** | http://localhost:8001 | Gerenciamento do gateway |
| **PostgreSQL** | postgresql://eduuser:edupass@postgres-auth:5432/auth_db | Banco de dados |

---

##  Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de novo usuário

### Catálogo
- `GET /api/catalog/courses` - Lista todos os cursos públicos

### Vendas
- `POST /api/sales/checkout` - Processa compra de curso
- `GET /api/sales/my-courses` - Lista cursos comprados pelo usuário

### Conteúdo
- `GET /api/content/videos?courseId=ID` - Lista vídeos de um curso específico

> **Nota**: As rotas de `/api/sales` e `/api/content` requerem autenticação JWT.

---

##  Estrutura de Microsserviços

### Frontend (Micro Frontends)
- **Marketing**: Página inicial e catálogo público
- **Auth**: Telas de login e cadastro
- **Dashboard**: Área do usuário com cursos comprados

### Backend (Microsserviços)
- **auth-service**: Gerenciamento de usuários e autenticação
- **catalog-service**: Catálogo público de cursos
- **sales-service**: Processamento de vendas e inscrições
- **content-service**: Entrega de conteúdo protegido

---

##  Segurança

### Camadas de Proteção
1. **Autenticação**: JWT nas rotas protegidas
2. **Autorização**: Verificação de permissões por curso
3. **Validação**: Input sanitization e validation
4. **Rate Limiting**: Proteção contra abuso (configurável no Kong)

---

##  Escalabilidade

### Horizontal
- Cada microsserviço pode ser escalado independentemente
- MongoDB replica set para alta disponibilidade
- Load balancing via Kong

### Vertical
- Adição fácil de novos microsserviços
- Novos micro frontends sem impacto no sistema existente
- Plugins do Kong para funcionalidades adicionais

---






