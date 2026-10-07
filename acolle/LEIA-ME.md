# Site institucional — Acolle

Site institucional completo do TCC **Acolle**, desenvolvido para apresentar o projeto de segurança digital com IA. Pronto para publicar — basta hospedar a pasta inteira (ex: GitHub Pages, Netlify, Vercel, ou qualquer hospedagem simples) ou abrir `index.html` direto no navegador.

## Estrutura de arquivos

```
acolle/
├── index.html                 → todo o conteúdo e estrutura do site (página única com âncoras)
├── css/styles.css             → todo o estilo visual, cores, responsividade e modo alto contraste
├── js/main.js                 → acessibilidade (fonte, contraste, leitura em voz alta), menu mobile,
│                                 carrossel da equipe, assistente flutuante e formulário
├── assets/
│   ├── logo-icon.png          → ícone oficial (casco de tartaruga) extraído do seu arquivo de logotipo,
│   │                             já com fundo transparente
│   └── favicon.png            → ícone da aba do navegador
└── vendor/fontawesome/        → ícones, hospedados localmente (o site funciona offline, sem depender de CDN)
```

## O que falta vocês completarem

### 1. Fotos da equipe
Como combinado, deixei os espaços prontos e sinalizados. Em `index.html`, procure por `team-card` (são 5 blocos, um por integrante). Em cada um:

- Troque o bloco `<div class="team-card__photo">...</div>` por uma tag de imagem, por exemplo:
  ```html
  <img src="assets/equipe/seu-nome.jpg" alt="Foto de [Nome]" class="team-card__photo-img">
  ```
  (adicione as fotos dentro de uma nova pasta `assets/equipe/`)
- Substitua `[Nome do integrante]`, `[Área/função no projeto]` e o link do LinkedIn (`href="#"`) pelos dados reais de cada pessoa.

> Dica: se quiser, posso gerar o CSS para deixar as fotos redondas e com o mesmo recorte do restante do card — é só pedir.

### 2. Formulário de contato
O formulário já valida nome, e-mail e mensagem no navegador e mostra uma confirmação visual. Porém, como é um site estático (sem back-end), **as mensagens ainda não são enviadas de verdade para lugar nenhum**. Para receber as mensagens de fato, conectem o formulário a um serviço como Formspree, EmailJS, ou uma rota própria de back-end — há uma nota deixada no código (`js/main.js`, dentro do listener `submit`) marcando exatamente onde isso deve entrar.

### 3. Dados de contato e endereço
Telefone, e-mail e endereço no rodapé/seção de contato estão com valores de exemplo — atualizem para os dados reais do projeto.

## Acessibilidade implementada

- Aumentar/diminuir/restaurar tamanho da fonte (A− / A / A+), com preferência salva no navegador
- Modo de alto contraste (preto/branco/amarelo, testado para não deixar nenhum texto invisível)
- Leitura da página em voz alta (via Web Speech API do navegador, em português)
- Navegação 100% por teclado, com foco visível
- HTML semântico, textos alternativos e áreas de clique grandes
- Layout que não quebra com fonte aumentada, testado até 150%
- Totalmente responsivo (celular, tablet, notebook, desktop)

## Identidade visual

Cores oficiais aplicadas: `#773fd1`, `#6c63ff`, `#faf7fc` e `#f47a07`, todas conferidas para atender aos níveis de contraste AA/AAA do WCAG. O ícone do logotipo foi extraído em alta resolução do arquivo `Logotipo_-_Ideais.pdf` enviado por vocês.
