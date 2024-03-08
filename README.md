# Lista Compras CRUD Backend
Atividade de backend-I [Pós graduação em desenvolvimento web - IFSP]. 

CRUD desenvolvido em Node.js.

## Visão Geral

API para realizar operações CRUD (Create, Read, Update, Delete) relacionadas a produtos, listas de compras e itens associados.

## Pré-requisitos

Para executar este projeto, você precisa ter os seguintes pré-requisitos instalados em sua máquina:

- **Node.js**: Versão 20.8.0
- **npm (Node Package Manager)**
- **MySQL**

### Instalação do Node.js e npm

Se você ainda não tem o Node.js e o npm instalados, siga as instruções no [site oficial do Node.js](https://nodejs.org/) para baixar e instalar a versão necessária.

### Instalação do MySQL

- **Windows**: Você pode baixar o MySQL Installer no [site oficial do MySQL](https://dev.mysql.com/downloads/installer/) e seguir as instruções de instalação.
- **Mac**: Use o [Homebrew](https://brew.sh/), um gerenciador de pacotes para macOS. Execute o seguinte comando no terminal:
  ```bash
  brew install mysql
  ```
- **Linux**: Utilize o gerenciador de pacotes da sua distribuição Linux. Por exemplo, no Ubuntu, você pode usar o seguinte comando:
  ```bash
  sudo apt-get install mysql-server
  ```

### Lembre-se de iniciar o serviço do MySQL após a instalação.

- **Windows**: você pode usar o seguinte comando no Prompt de Comando ou PowerShell:
    ```bash
    net start mysql
    ```
- **Mac**: Use o seguinte comando no Terminal para iniciar o MySQL:
  ```bash
  sudo brew services start mysql
  ```
- **Linux**: No Linux, o MySQL pode ser iniciado com:
  ```bash
  sudo service mysql start
  ```
  Ou
  
  ```bash
  sudo systemctl start mysql
  ```


## Instalação

1. Clone o repositório para sua máquina local.
    ```bash
    git clone https://github.com/seu-usuario/lista-3-crud-backend-i.git
    ```

2. Navegue até o diretório do projeto.
    ```bash
    cd lista-3-crud-backend-i
    ```
3. Instale as dependências.
    ```bash
    npm install
    ```
4. Inicie o servidor com `nodemon`.
    ```bash
    nodemon server.js
    ```

O servidor estará disponível em http://127.0.0.1:3000/v1.

## Configuração do Banco de Dados

Execute o script `database.sql` no seu banco de dados MySQL para criar a estrutura necessária.

## Uso

A API possui endpoints para realizar operações CRUD em produtos, listas de compras e itens associados. Utilize o [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) com a collection fornecida em `lista-compras-crud-collection.json` para testar as rotas.

## Funcionalidades

- Cadastro, visualização, edição e exclusão de produtos.
- Cadastro, visualização, edição e exclusão de listas de compras.
- Adição, visualização, edição e exclusão de itens associados a listas de compras.


## Contato

Para mais informações, entre em contato via e-mail: vinicius.gpereira03@gmail.com ou goncalves.pereira1@aluno.ifsp.edu.br