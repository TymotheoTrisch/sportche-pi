

# Título do Trabalho de Conclusão de Curso

## Descrição

Este projeto é um Trabalho de Conclusão de Curso (TCC) que visa desenvolver um sistema web para [finalidade específica do sistema]. O sistema foi construído utilizando Node.js, Express para o backend, e MySQL como banco de dados relacional. O objetivo principal deste projeto é [inserir objetivo principal], proporcionando [detalhes dos benefícios ou funcionalidades do sistema].

## Funcionalidades

- [Funcionalidade 1]: Descrição da funcionalidade 1.
- [Funcionalidade 2]: Descrição da funcionalidade 2.
- [Funcionalidade 3]: Descrição da funcionalidade 3.
- [Funcionalidade 4]: Descrição da funcionalidade 4.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento para executar código JavaScript no lado do servidor.
- **Express**: Framework web para Node.js que facilita o desenvolvimento de APIs.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados do sistema.
- **HTML/CSS/JavaScript**: Tecnologias front-end para construção da interface do usuário.
- **[Outras tecnologias]**: Caso outras tecnologias tenham sido utilizadas.

## Requisitos do Sistema

- Node.js (versão X.X.X ou superior)
- MySQL (versão X.X.X ou superior)
- [Outros requisitos, como bibliotecas específicas, etc.]

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
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

    - Crie um banco de dados no MySQL.
    - Execute o script SQL em `db/schema.sql` para criar as tabelas necessárias.
    - Atualize o arquivo de configuração em `config/database.js` com as credenciais do banco de dados.

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
├── db/
│   ├── schema.sql
├── public/
│   ├── css/
│   ├── js/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── views/
├── config/
│   ├── database.js
├── .gitignore
├── package.json
├── README.md
```

- **db/**: Contém o script SQL para criação do banco de dados.
- **public/**: Arquivos públicos, como CSS, JavaScript e imagens.
- **src/**: Contém o código-fonte do projeto.
  - **controllers/**: Lógica de controle.
  - **models/**: Definição dos modelos de dados.
  - **routes/**: Definição das rotas da aplicação.
  - **views/**: Arquivos de template para as páginas do sistema.
- **config/**: Arquivos de configuração.
- **README.md**: Arquivo de documentação do projeto.

## Contribuição

Este projeto foi desenvolvido como parte do Trabalho de Conclusão de Curso e, portanto, contribuições externas não são esperadas. No entanto, sugestões e feedback são sempre bem-vindos. Para maiores informações, entre em contato com o autor.

## Licença

[Especificar a licença, se houver. Exemplo: Este projeto está licenciado sob a Licença MIT.]

## Autor

[Seu Nome]  
[Email]  
[Instituição de Ensino]  

---














# SPORTCHE

1. **Escrita do Resumo**
    - **Estrutura:** Utilizar a estrutura a seguir para escrever o resumo do projeto:
        1. **Introdução:** Apresentar o problema ou tema escolhido.
        2. **Objetivo Geral:** Descrever o objetivo principal do site ou aplicativo.
        3. **Funcionalidades:** Listar as funcionalidades principais.
        4. **Tecnologias:** Descrever as tecnologias escolhidas (linguagens, frameworks, banco de dados).
        5. **Modelagem do Banco de Dados:** Resumir a estrutura básica das tabelas do banco de dados.
        6. **Plano de Ação:** Descrever brevemente as etapas principais do projeto e o cronograma básico.
        7. **Conclusão:** Finalizar com a importância do projeto e as expectativas do grupo.

### Resumo
Nosso sistema será um aplicativo/site que o foco é aproximar e incentivar pessoas a praticar o esporte. Em si o aplicativo vai conter participação de grupos de determinados esportes, onde os usuários poderão dar check-in em jogos, procurar serviços de esporte e uma rede social exclusiva para pessoas que praticam e amam o esporte. 

## Introdução

O SporTchê é um aplicativo de esportes no formato de rede social envolvendo todos os tipos de esportes, onde o usuário pode postar seus treinos, entrar em grupos esportivos, descobrir  espaços esportivos entre outros e até mesmo dar check-in em jogos que necessitam de pessoa para completar o time. 

## Objetivo

Em um mundo onde a tecnologia está cada vez mais levando as pessoas ao sedentarismo, o objetivo do aplicativo Sportchê é trazer de uma forma acessível os esportes para perto de você.

No aplicativo o usuário poderá achar companheiros para formarem times, procurar por locais de serviços como campos de futebol, quadras de basket, campos de areia, entre outros. 

Dentro do app também terá uma aba de notícias sobre o esporte favorito do usuário, e também contará com uma rede social apenas para posts relacionados ao esporte.

O aplicativo oferecerá um serviço para locais como escolinhas de futebol, eventos (torneios, peneiras), divulgarem os seus serviços e planos de assinatura, ou apenas anunciar eventos importantes.


## Funcionalidades do APP:

1. Feed
    - Curtir o post.
    - Comentar o post.
    - Compartilhar o post.
2. Encontrar centro de treinamentos
    - Tais como: Academias, Ginásios, Quadras e etc.
3. Aba noticias
    - Noticias sobre o mundo esportivo de acordo com o gosto do usuario.
4. Cadastro e Log-in de usuários
    - Requer senha e email.
5. Check-in
    - Um usuário cria uma sala, indicando lugar, hora, numero de membros e esporte.
    - Você pode entrar nessa sala para poder jogar com este pessoal.

## Tecnologias
O Sportchê tem como missão alcançar o máximo de pessoas, para isso decidimos criar um aplicativo mobile e também criar um site web, os dois aplicativos contendo as mesmas funcionalidades mas em ambientes diferentes.

Tecnologias:

Mobile
- Javascript
- React Native

Web
- TypeScript || JavaScript
- Algular || NextJs || ReactJs
- HTML
- tailwind CSS || Bootstrap

### Banco de dados:

Usaremos o banco de dados web firestore do firebase, que servirá tanto para o aplicativo mobile tanto para web.

Diagrama simples das possíveis coleções no firebase
![Diagrama](https://github.com/TymotheoTrisch/sportche-projeto-itegrador/blob/main/Diagrama.png)

> Para as integrações de notícias ainda estamos discutindo sobre o assunto.

# Plano de Ação
1. Escolher quais tecnologias iremos utilizar de fato no nosso projeto.
2. Estudar e compreender sobre as tecnologias escolhidas.
3. Aprender como implementa-las e como usa-las em conjuntos.
4. Dividir as tarefas entre o grupo.
5. Desenvolver o projeto.
6. Documentar o projeto.
7. Apresentar pra a banca.

# Design
Rascunho do design do nosso projeto no figma:
[Link Figma](https://www.figma.com/design/YAOnHQFfVGWExzsqqdSoeZ/Sportch%C3%AA?node-id=0-1&t=PLs5l83oen4JsBRv-0)

Link da apresentação no canva:
[Link Canva](https://www.canva.com/design/DAFr6UbItuY/DZlp9iGsWgeSDz5nlvug9g/view?utm_content=DAFr6UbItuY&utm_campaign=designshare&utm_medium=link&utm_source=editor)
