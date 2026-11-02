# Top Movies

Página estática que apresenta uma lista de filmes, ordenada por ano crescente e, em caso de empate, por nota do IMDb decrescente.

## Executar

O projeto é totalmente estático e não usa servidor, backend, banco de dados ou dependências JavaScript.

Abra o arquivo `index.html` diretamente para testar localmente ou publique o conteúdo na raiz do repositório pelo GitHub Pages.

## GitHub Pages

1. No GitHub, abra **Settings > Pages**.
2. Em **Build and deployment**, escolha **GitHub Actions** como origem.
3. Faça push da branch padrão.
4. O workflow `.github/workflows/deploy-pages.yml` publica automaticamente os arquivos estáticos.

## Atualizar

Edite o array `movies` em `movies.js`. Para pedir uma atualização completa, use o prompt em `PROMPT-ATUALIZAR-LISTA.md`.