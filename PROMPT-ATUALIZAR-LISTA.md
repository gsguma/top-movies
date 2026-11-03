# Prompt para atualizar a lista de filmes

Use este prompt sempre que quiser atualizar o site.

> Atualize o arquivo `movies.js` deste projeto com base na minha watchlist pública do IMDb:
>
> https://www.imdb.com/pt/user/p.h4s3eq5kbbegjjzreimvc53mki/watchlist
>
> 1. Preserve exatamente os títulos, anos, notas IMDb e IDs dos filmes presentes na lista.
> 2. Adicione para cada título: pôster, gêneros, sinopse, elenco principal, link do IMDb, trailer oficial ou mais relevante do YouTube e plataformas de streaming disponíveis no Brasil.
> 3. Prefira trailers com áudio em português ou legendados em português.
> 4. Inclua o link direto para o filme em cada plataforma sempre que houver uma URL direta. Caso não exista URL direta conhecida, remova apenas aquela plataforma e informe que ela não pode ser verificada.
> 5. Não invente metadados nem disponibilidade. Cite valores “Não informado” quando não conseguir confirmar uma plataforma.
> 6. Use a estrutura de objetos já existente em `movies.js`.
> 7. Ordene os filmes por ano crescente e, dentro do mesmo ano, por nota IMDb decrescente.
> 8. Atualize a data "Última atualização" exibida no HTML para o dia atual, mantendo o formato `DD/MM/YYYY`.
> 9. Confira se todas as imagens e links são HTTPS, se não há títulos duplicados e se os dados são válidos.
> 10. Execute um servidor local e valide visualmente os cartões, filtros, responsividade, links e ordenação.
> 11. Não remova a documentação nem outros comportamentos da interface.
>
> Ao terminar, faça um resumo curto dos títulos adicionados, atualizados, removidos e dos campos que não puderam ser confirmados.
