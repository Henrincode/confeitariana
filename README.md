# Confeitariana 🍰

Projeto integrador do curso do Senac, reunindo as habilidades adquiridas nas UC1, UC2, UC3, UC4 e UC5.

O objetivo do projeto é desenvolver um site para uma confeiteira, exibindo seus produtos, depoimentos e fornecendo múltiplas formas de contato, com design responsivo para computadores, smartphones e smart TVs.

---

## Tecnologias Utilizadas 🛠️

* **Front-end:** HTML, CSS, SASS/SCSS, JavaScript, React, Vite
* **Roteamento:** react-router-dom
* **Design e prototipagem:** Figma

### Tecnologias aprendidas mas não utilizadas neste projeto:

Bootstrap, WordPress, Linux, Docker, Supabase, instalação do site como app no PC e smartphone (manifest + webservices).

---

## Funcionalidades do Projeto ✨

* Exibição de produtos filtráveis por categorias
* Página de depoimentos
* Formas de contato variadas
* Layout responsivo para diferentes dispositivos

---

## Funcionalidades planejadas mas não implementadas 🚧

* **Envio de formulários por email com EmailJS:** permitir que os clientes enviem mensagens direto para o email da confeiteira.
* **Banco de dados com Supabase:** possibilitaria a administração de produtos, categorias, depoimentos, controle de vendas, pendências de clientes e geração de relatórios com gráficos.

---

## Acesso ao Projeto 🌐

Você pode ver o projeto online:
[confeitariana.vercel.app](https://confeitariana.vercel.app)

Ou instalar e rodar localmente:

### Pré-requisitos

* Node.js instalado

### Passos

```bash
git clone https://github.com/Henrincode/confeitariana.git
cd confeitariana
npm i
npm run dev
```

O site estará disponível em `http://localhost:5173`.

---

## Estrutura do Projeto 📁

### Componentes

* **CardBlur:** Cartão com efeito blur de background. Recebe `children` (conteúdo interno), `className` (estilos personalizados) e `img` (imagem de fundo, caso não seja preenchido, usa imagem padrão).
* **Categorias:** Exibe categorias de produtos com imagem padrão, título e link para a página correspondente.
* **Depoimentos:** Mostra depoimentos da confeiteira. Parâmetro `max` define quantos depoimentos exibir, padrão é infinito.
* **Divider:** Componente de divisão de seções. Recebe `titulo` para identificar a seção.
* **Footer:** Área inferior do site, contendo apenas um iframe do Google Maps com o endereço da confeiteira.
* **NavBar:** Barra de navegação do site.

### Páginas

* **Home:** Página inicial com breve apresentação, categorias e alguns depoimentos.
* **Cardápio:** Apresenta todos os produtos separados por categorias, com possibilidade de filtragem.
* **Depoimentos:** Página dedicada a todos os depoimentos.
* **Contato:** Página de contato com todos os meios e informações da confeiteira.

### Outras Pastas

* **data:** "Banco de dados" local temporário para testes.
* **utils:** Funções utilitárias para evitar repetição de código.

---

## Experiência com React ⚛️

Aprender React foi desafiador no início devido à sua programação declarativa e uso intenso de hooks. Porém, após a adaptação, tornou-se muito prático programar de forma modular e componentizada — basta encaixar as peças.

---

## Observações Finais 📝

Este projeto integra várias habilidades adquiridas durante o curso, servindo como um exemplo prático de desenvolvimento web moderno, responsivo e modular. Ele pode ser expandido futuramente com envio de formulários, banco de dados e administração online.
