# Guia de Apresentação: Projeto VIARE

Este documento foi criado para ajudar na apresentação do projeto **VIARE** (Plataforma de Turismo e Hotelaria). Ele explica as decisões tomadas no desenvolvimento e como cada funcionalidade foi implementada, utilizando uma linguagem simples e acessível, ideal para quem está começando na programação ou para um público leigo.

---

## 1. Visão Geral do Projeto (O que é e como foi feito?)

O **VIARE** é um protótipo de um site de viagens e hospedagens. O caminho de desenvolvimento escolhido foi focar nas **bases da web**, ou seja, o projeto foi construído usando o trio fundamental da internet:

- **HTML:** O esqueleto do site (textos, imagens, botões).
- **CSS:** A pintura e o design (cores, fontes, espaçamentos).
- **JavaScript:** O "cérebro" e a interatividade (o que acontece quando você clica em algo).

**Por que escolhemos esse caminho?**
Muitos sites modernos usam "frameworks" (como React ou Angular) que são ferramentas complexas. Para este projeto, optamos por **Vanilla Web** (tecnologias puras, sem ferramentas extras). Isso significa que o projeto é leve, não precisa de instalação de programas ou servidores para rodar (basta abrir o arquivo `.html` no navegador) e serve como uma excelente demonstração de domínio dos fundamentos da programação web.

---

## 2. Como as Informações são Salvas? (O Banco de Dados "Falso")

Como não temos um servidor real ou um banco de dados complexo rodando por trás, utilizamos uma funcionalidade nativa dos navegadores chamada **`localStorage`** (Armazenamento Local). 

* **O que é isso?** É como uma pequena gaveta de memória que o navegador disponibiliza. 
* **Como usamos?** Quando o usuário escolhe um hotel, nós guardamos o nome e o preço do hotel nessa gaveta. Quando ele vai para a página de Pagamento, o site "abre a gaveta", pega os dados e mostra na tela. Quando a compra é finalizada, guardamos o recibo nessa mesma gaveta para mostrar na aba "Minhas Reservas".

---

## 3. Explicação das Funcionalidades por Página

Aqui está o roteiro do que acontece em cada tela, perfeito para demonstrar durante a apresentação:

### Tela de Login (`index.html`) e Registro (`registro.html`)
* **O que faz:** Simula a entrada de um usuário no sistema.
* **Como foi feito:** Usamos o JavaScript para "ouvir" quando o botão de enviar é clicado. Antes de seguir em frente, o código verifica se os campos estão vazios. Na tela de registro, ele confere se a "Senha" e "Confirmar Senha" são exatamente iguais.
* **Detalhe visual:** Se der erro, campos ficam vermelhos e um aviso (chamado de *Toast Notification*) aparece flutuando na tela.

### Tela de Hospedagens (`hospedagens.html`)
* **O que faz:** É a página principal, onde aparecem os hotéis.
* **Como foi feito:** Os hotéis não estão escritos um por um no HTML. Eles estão em uma "Lista" (Array) dentro do arquivo JavaScript. O código lê essa lista e desenha os "cards" (cartões) dos hotéis na tela automaticamente.
* **Filtros e Buscas:**
  * **Barra de Busca:** Se o usuário digitar "Gramado", o JavaScript esconde todos os hotéis que não têm "Gramado" no nome ou na localização.
  * **Filtros de Preço:** Se o usuário clicar em "Até R$ 300", o código filtra a lista para mostrar apenas hotéis que cumprem essa regra matemática (`preco <= 300`).
  * **Seletor de Hóspedes:** Há uma lógica matemática simples que impede que o número de adultos seja menor que 1 ou maior que 10, travando o botão de `+` ou `-`.

### Viagens (`viagens.html`) e Ofertas (`ofertas.html`)
* **O que faz:** Mostra pacotes completos e promoções.
* **Como foi feito:** Segue a mesma lógica da tela de hospedagens. Ao clicar no botão "Comprar" ou "Aproveitar Oferta", o JavaScript pega as informações daquele pacote específico, salva na "gaveta" (`localStorage`) e redireciona o usuário para a tela de pagamento.

### Tela de Pagamento (`pagamento.html`)
* **O que faz:** É o "carrinho de compras" e checkout final.
* **Como foi feito:** 
  1. O código abre o `localStorage` e lê o que foi escolhido (Ex: "Resort Mar de Prata", "R$ 950").
  2. Ele faz cálculos matemáticos: pega a data de check-in e check-out, calcula a diferença de dias para saber o número de noites, multiplica pelo valor da diária, e adiciona uma taxa fixa (ex: R$ 50).
  3. Mostra o resumo completo na tela.
  4. Quando o formulário do cartão é preenchido e enviado, ele gera um "comprovante" e salva novamente no `localStorage`.

### Minhas Reservas (`reservas.html`)
* **O que faz:** Mostra o histórico de viagens do usuário.
* **Como foi feito:** O sistema tem 3 reservas "falsas" (padrão) para a tela nunca ficar vazia, e então ele vai no `localStorage` buscar as reservas novas que o usuário acabou de criar no pagamento. Ele junta tudo e mostra na tela, pintando bolinhas de verde (Confirmada) ou amarelo (Pendente) dependendo do status de cada uma.

---

## 4. Decisões de Design e Estilo (O CSS)

Para que o site ficasse bonito, moderno e responsivo (funcionando bem em celulares ou telas grandes), algumas decisões técnicas foram tomadas no `css/style.css`:

* **Variáveis CSS:** No começo do arquivo, criamos variáveis (como `--primary-color: #2563eb`). Isso garante que o azul do botão seja exatamente igual em todas as páginas. Se quisermos mudar a cor da marca inteira, mudamos em um só lugar.
* **Flexbox e Grid:** São técnicas modernas de organização de tela. Em vez de empilhar os elementos, usamos "Grid" para dizer: *em telas grandes, mostre 4 hotéis lado a lado. Em celulares, mostre 1 por vez.*
* **Animações Suaves:** Colocamos pequenas animações (quando o mouse passa por cima de um botão, ou os hotéis subindo suavemente ao carregar a página). Isso faz o site parecer muito mais caro e profissional, chamado no mercado de "Micro-interações".

---

## 5. Dicas para a Apresentação

1. **Abra o código e mostre o arquivo `script.js`:** Mostre como os dados estão organizados (a lista `var hoteis = [...]`). Explique que se você adicionar mais um item nessa lista, ele magicamente aparece na tela sem precisar mudar o HTML.
2. **Mostre a "mágica" do LocalStorage:** Na tela de pagamento, clique em inspecionar elemento (F12) > Application/Aplicativo > Local Storage. Mostre para a plateia onde os dados estão salvos no navegador.
3. **Destaque a independência:** Reforce várias vezes que o site não precisa de internet ou banco de dados externo para funcionar a navegação básica, o que é um feito enorme para um projeto de estudo.
