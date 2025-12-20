### Sistema de Relatórios com InversifyJS

### O que é o sistema?
É um serviço de backend que gera relatórios de dados fictícios e os envia por e-mail. Ele demonstra como construir um software profissional onde a lógica principal (gerar dados) é totalmente separada das ferramentas externas (como enviar e-mail ou logar informações), permitindo trocar essas ferramentas sem esforço.

### Pacotes e Instalação

Para que o projeto funcione, utilizamos as seguintes bibliotecas:

- **Fundamentais:**
- 
       - `inversify` & `reflect-metadata`: Permitem a Injeção de Dependência (entregar as ferramentas para as classes).
  
       - `express`: Cria o servidor web e as rotas.
  
       - `dotenv`: Lê o arquivo `.env` com as configurações do sistema.
  
- **Utilidades:**
       - `winston`: Sistema de logs profissional.
  
       - `nodemailer`: Envia os e-mails.
  
       - `@faker-js/faker`: Gera nomes e cidades aleatórias de forma automática.
  
- **Desenvolvimento:**
- 
       - `typescript`, `ts-node` e `@types/*`: Ferramentas para programar com TypeScript e rodar o código sem precisar compilar manualmente o tempo todo.

#### **Passo a Passo para Instalar:**
1.  Abra o terminal na pasta do projeto.
2.  Execute o comando para instalar as bibliotecas principais:
    ```bash
    npm install inversify reflect-metadata express winston nodemailer @faker-js/faker dotenv
    ```
3.  Execute o comando para as ferramentas de desenvolvimento:
    ```bash
    npm install --save-dev typescript ts-node @types/node @types/express @types/nodemailer
    ```

### Como Rodar e Usar o Programa

#### **Configuração (O arquivo `.env`)**
Antes de rodar, garanta que existe um arquivo chamado `.env` na raiz do projeto com este conteúdo:
```env
APP_ENV=dev
APP_PORT=3000
```

#### **Executando:**
*   **Modo Desenvolvimento (Recomendado para a apresentação):**
    ```bash
    npm run start:dev
    ```
    *Nesse modo, os logs aparecem coloridos no terminal e o e-mail não é enviado de verdade, ele gera um link seguro para você visualizar o conteúdo.*

*   **Modo Produção:**
    ```bash
    npm run start:prod
    ```

#### **Como Testar:**
Abra o navegador ou use o `curl` no terminal e acesse:
`http://localhost:3000/relatorio/5?email=seu-email@teste.com`

*Onde `5` é a quantidade de registros e `email` é o destino.*

### Arquitetura e Funcionamento (Explicando os Arquivos)

O projeto é dividido em **Camadas**. Imagine uma cebola: o núcleo é a regra de negócio e as camadas externas são as ferramentas.

#### **A) Camada de Domínio (`src/domain`)**
É onde as decisões são tomadas.
*   **Interfaces (`interfaces/index.ts`):** São os "Contratos". Elas definem **o que** o sistema deve fazer (ex: `ILogger` diz que é preciso saber logar uma mensagem de `info`).
*   **ReportService (`services/ReportService.ts`):** É o cérebro. Ele gera os dados fictícios e coordena o envio. **Destaque:** Ele não sabe *como* o e-mail é enviado, ele apenas pede para quem sabe (`IMailer`).

#### **B) Camada de Infraestrutura (`src/infra`)**
É onde o trabalho pesado acontece.
*   **WinstonLogger:** Implementa o log. No ambiente `dev`, ele usa o console. No `prod`, escreve no arquivo `app.log`.
*   **NodemailerMailer:** Implementa o e-mail. No `dev`, ele usa o serviço **Ethereal** (gera o link de visualização). No `prod`, usaria um e-mail real.

#### **C) O Coração da Injeção (`src/config`)**
*   **container.ts:** É aqui que a "mágica" acontece. Nós dizemos ao Inversify: *"Quando o ReportService pedir um Logger, entregue o WinstonLogger"*. Isso é a **Inversão de Controle (IoC)**.

#### **D) A Porta de Entrada (`src/main.ts` e `src/http`)**
*   **main.ts:** Liga o servidor Express.
*   **ReportController:** Recebe o clique do usuário na URL, pede ao Container o serviço de relatório e entrega a resposta final.

### Princípios Aplicados

1.  **DIP (Inversão de Dependência):** Nossas classes de alto nível (negócio) não dependem de classes de baixo nível (ferramentas), ambas dependem de **Interfaces**.
2.  **IoC (Inversão de Controle):** O programador não dá `new Classe()`. O **Container** (Inversify) gerencia e entrega os objetos prontos para uso.
3.  **Single Responsibility (S.O.L.I.D):** Cada arquivo tem apenas uma função. O Mailer só envia e-mail, o Logger só registra logs, e o Service só cuida do relatório.

