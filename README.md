git clone https://github.com/SimonViegas/nlw-07.git
0.2.6
# adicionado componente SendMessageForm

0.2.5
# web | refatorado autenticação do LoginBox para o auth.tsx

0.2.4
# web | adicionado context api

0.2.3
# web | integrando backend com a aplicação

0.2.2
# web | adicionado componente MessageList

0.2.1
# web | adicionado componente LoginBox

0.1.9
# adicionado projeto web via vite

0.18
# movido projeto para pasta server
# adicionado .env no gitignore

0.1.7
# adicionado socket
yarn add socket.io
yarn add -D @types/socket.io
# adicionado serviço retornar 3 últimas mensagens

# adicionado cors para barrar ou liberar conexões
yarn add cors
yarn add -D @types/cors

0.1.6
# adicionado model user
yarn prisma migrate dev //para converte de modo para sql
yarn add -D @prisma/client
# adicionado prima client para conectar ao banco
# adicionado verificação se usuário existe no banco
# adicionado cadastro de mensagem

0.1.5
# adicionado dependência de promisse
  yarn add axios
# adicionado dependência para criar token
  yarn add jsonwebtoken
  yarn add -D @types/jsonwebtoken
# adicionado service e controller de Autenticação no GitHub

0.1.4
# adicionado dependência para variáveis de ambiente
  # adicionado depência
  yarn add dotenv

  # configurado importação
  import "dotenv/config"; no app.ts
    
0.1.3
# configuração do prisma (para uso do SQLite | banco em memória)
  https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgres
  
  ## adicionado dependÊncia
  yarn add -D prisma
  ## efetuado configuração inicial (prisma/schema.prisma, .env)
  yarn prisma init 

# adicionado configurações de tokens do GitHub 

0.1.2
# adicionado "live server"
  ## adicionado o ts-node-dev
  yarn add -D ts-node-dev
  ## adicioado script
  "dev": "ts-node-dev src/app.ts"

# criando app.ts
  ## adicionado dependência express
  yarn add express
  yarn add -D @types/express

0.1.1
# criadi base inicial (package.json)
   yarn init -y

# configuração o typescript
  ## adicionado dependência
  yarn add -D typescript
  ## efuado configuração inicial (tsconfig.json e e algumas pastas relacionadas)
  yarn tsc --init //startar o typescript 

# adicionado recurso para evitar que auto formatação em alguns casos
 arquivo .prettierignore na raiz

# configuração inicial do package.json
  ### remover excesso de comentários
  ### desativar o Type Checking --> "strict": false,
  * alterar o Language and Environment para es2017 --> "target": "es2017",

# adicionado .gitignore