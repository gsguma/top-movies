# Top Movies

Página estática que apresenta uma lista de filmes, ordenada por ano crescente e, em caso de empate, por nota do IMDb decrescente.

## Executar

O projeto é totalmente estático e não usa servidor, backend, banco de dados ou dependências JavaScript.

Abra o arquivo `index.html` diretamente para testar localmente ou publique o conteúdo na raiz do repositório pelo GitHub Pages.

## GitHub Pages

1. No GitHub, abra **Settings > Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch `main` e a pasta `/ (root)`.
4. Salve.

O GitHub executará automaticamente o workflow `pages-build-deployment`. Não é necessário adicionar outro workflow de publicação.

## Atualizar

Edite o array `movies` em `movies.js`. Para pedir uma atualização completa, use o prompt em `PROMPT-ATUALIZAR-LISTA.md`.