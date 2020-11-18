###Execução do Projeto####

- Utilize o yarn no terminal para baixar as dependencias do projeto.
- Inicie o projeto com: yarn start
- Inicie a fake api para carregar os dados: yarn run-server

Observações:
- Ao acessar a rota de inicialização, irá sempre carregar o cliente com id = 1;
- Para acessar outro cliente é necessario digitar na rota /:id. Ex: http://localhost:3000/1
- O arquivo da fake api é o server.json localizado na raiz do projeto.

Informações do projeto:
- Foi utilzado o TypeScript na criação do projeto, pois o mesmo facilita muito o entendimento das implementações com suas tipagens.
- Foi utlizado plugins como ESlint, prettier e EditorConfig para manter padronizações e organização no projeto.

Biblioteca e Frameworks:
- Styled components: Utilizado para melhor organização do codigo de estilização.
- Fake api: json-server
- Graficos: react-google-charts
- Mapa: react-leaflet
- Requisições: Axios


