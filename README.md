

# Sportchê

## Descrição

Este projeto é um trabalho de conclusão de curso que visa desenvolver um sistema web para aqueles que praticam esportes e precisam de uma forma para organizar as suas partidas. O sistema foi construído utilizando Node.js, Express para o backend, e MySQL como banco de dados relacional. O objetivo principal deste projeto é praticidade na hora de marcar uma partida com os seus amigos.

## Funcionalidades


1. Cadastro e Log-in de usuários
    - Requer senha e email.
2. Check-in
    - Um usuário cria uma sala, indicando lugar, hora, numero de membros e esporte.
    - Você pode entrar nessa sala para poder jogar com este pessoal.


## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento para executar código JavaScript no lado do servidor.
- **Express**: Framework web para Node.js que facilita o desenvolvimento de APIs.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados do sistema.
- **HTML/CSS/JavaScript**: Tecnologias front-end para construção da interface do usuário.
- **BCrypt**: Ferramenta para criptografar senhas, tornando-as seguras contra acessos não autorizados.
- **JWT (JSON Web Token)**: Token usado para autenticar e autorizar usuários em aplicativos, permitindo o envio seguro de informações.

## Requisitos do Sistema

- Node.js
- MySQL

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/TymotheoTrisch/sportche-pi.git)
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd seu-repositorio
    ```

3. Instale as dependências do projeto:

    ```bash
    npm install
    ```

4. Configure o banco de dados:

    - Baixe o [XAMPP](https://www.apachefriends.org/pt_br/index.html)
    - Desabilite o MySQL80 e Serviço de Publicação da World Wide Web nos serviços do Windows.
    - Dentro do XAMPP, execute o Apache e MySQL
    - Crie um banco de dados no localhost/phpmyadmin.
    - Execute o script SQL em `dist/db.sql` para criar as tabelas necessárias.
    - Atualize o arquivo de configuração em `dist/connect.js` com as credenciais do banco de dados.

5. Inicie o servidor:

    ```bash
    npm start
    ```

6. Acesse o sistema no navegador:

    ```
    http://localhost:3000
    ```

## Estrutura do Projeto

```plaintext
/
├── assets/
│   ├── img/
│   ├── css/
│   ├── js/
│   ├── telas/
├── src/
│   ├── dist/   
│   ├── scripts/
│   ├── routes/
├── .gitignore
├── package.json
├── README.md
```

- **assets/**: Arquivos públicos, como CSS, JavaScript e imagens.
- **src/**: Contém o código-fonte do projeto.
  - **dist/**: Lógica de controle.
  - **scripts/**: Contém códigos auxiliares.
  - **routes/**: Definição das rotas da aplicação.
- **README.md**: Arquivo de documentação do projeto.

## Contribuição

Este projeto foi desenvolvido como parte da matéria de Projeto Integrador e, portanto, contribuições vieram diretamente pelo corpo docente pelo qual passamos. Nossos sinceros agradecimentos aos professores: Iuri Santos, Mikaela Lazarroto, Leonardo Souza e Lucas Alves. Sugestões e feedback são sempre bem-vindos. Para maiores informações, entre em contato com os autores.


## Autores

Victor Marin, Tymotheo Trisch, Bruno Maciel e Kainna Borth 
<br>SENAC São Leopoldo 

---


