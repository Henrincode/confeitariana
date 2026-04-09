# Integrador Backend - Confeitariana

Este projeto foi desenvolvido como parte do **Desafio do Projeto Integrador de Backend do SENAC**. O foco principal é a construção de uma API sólida e um banco de dados inteligente para gerenciar o ecossistema de uma confeitaria.

## O Projeto

O sistema permite que a confeiteira tenha controle total sobre seu cardápio e vendas, garantindo que os dados históricos sejam preservados mesmo com o passar dos anos.

### Principais Funcionalidades (Backend)

* **Gestão de Inventário:** Cadastro de produtos com suporte a categorias hierárquicas (subcategorias).
* **CRM de Clientes:** Cadastro completo de clientes com múltiplos endereços vinculados.
* **Integridade de Dados:** Implementação de regras de negócio via banco de dados:
* **Soft Delete:** Registros não são apagados permanentemente, garantindo relatórios financeiros precisos.
* **Integridade Referencial:** Uso estratégico de `ON DELETE CASCADE` e `RESTRICT` para evitar dados órfãos.
* **Segurança de Login:** Uso de `(LOWER(valor))` para garantir que e-mails e nomes de usuário sejam únicos e insensíveis a maiúsculas/minúsculas.

## Principais Tecnologias

* **Motor:** Node.js
* **Backend:** Framework Next.js TS
* **Frontend**: Biblioteca React TS
* **Bibliotecas backend:**
    * @supabase/supabase-js
    * postgres
    * zod
    * bcryptjs
    * next-auth
* **Bibliotecas frontend:** browser-image-compression
* **Servidor de banco de dados:** Supabase - PostgreSQL
* **Servidor de banco de arquivos:** Supabase - Storage buckets
* **Servidor de hospedagem:** Vercel
* **Ferramentas de Modelagem:** dbdiagram.io, excalidraw, figma


## Entregáveis do projeto:

### 1. Documentação e Modelagem (O Planejamento)

- #### UML (caso de uso)

    É o diagrama que descreve quem faz o quê no sistema. Ele identifica os "Atores" (Ex: Administrador, Cliente) e as funcionalidades (Ex: Cadastrar Produto, Finalizar Pedido). Serve para alinhar as expectativas sobre o que o software entrega.

    ![alt text](<docs/UML - caso de uso/uml.png>)

- #### Fluxogramas dos 3 principais funcionalidades

    Uma representação visual do "passo a passo" lógico do sistema, ex:

    - Autenticação do Staff (frontend).

    ![alt text](<docs/Fluxogramas das 3 principais funcionalidades/01 fluxo de login.png>)

    - Autenticação do Staff (backend - action).

        Valida dados no backend com a biblioteca zod evitando técnicas de invasão como query injection

    ![alt text](<docs/Fluxogramas das 3 principais funcionalidades/02 fluxo de login - auth.action.png>)

    - Autenticação do Staff (backend - service).

        Depois que a action valida os dados a service consulta o banco de dados com segurança.

    ![alt text](<docs/Fluxogramas das 3 principais funcionalidades/03 fluxo de login - auth.service.png>)

- DER (diagrama entidade relacionamento)

    É o mapa do banco de dados. Ele mostra como as tabelas montadas (Clientes, Produtos, Categorias, ...) se conectam através das Primary Keys e Foreign Keys. É a estrutura que sustenta toda a aplicação.

    Para ver o fluxograma do banco com animação das chaves estrangeiras [clique aqui!](https://dbdiagram.io/e/690938a26735e111700f9551/69d42a64808962968430803c)

    ![alt text](<docs/DER - diagrama entidade relacionamento/database.png>)

### 2. Design e Experiência do Usuário

- #### Wireframe

    O "esqueleto" das telas. Não precisa de cores ou imagens finais; o objetivo aqui é definir onde os botões, tabelas e formulários ficarão posicionados antes de começar a codar o CSS/Tailwind.

    Para ver o Wireframe diretamente no Figma [clique aqui!](https://www.figma.com/design/THe9i9YVrhxVQjOfZSOIxs/Sem-t%C3%ADtulo?node-id=8-92&m=dev&t=4hGhHSoKV1wVYz8Z-1)

    - Página de lista de clientes

    ![alt text](<docs/Wireframe/Lista de clientes.png>)

    - Página de perfil de cliente

    ![alt text](<docs/Wireframe/Perfil do cliente.png>)

### 3. Desenvolvimento Técnico (O "Mão na Massa")

- #### Aplicação Back-end

    Toda a lógica do servidor, regras de negócio e comunicação com o banco de dados.
    
    *Eu escolhi:*

    - Next.js com Server Actions
    - Supabase Database
    - Supabase Storage
    - back-end está integrado e seguro.

- #### Aplicação front-end necessária para a apresentação do back-end

    A interface visual que o usuário interage. E garante que o site / dashboard seja intuitivo e responsivo.

    *Eu escolhi:*
    
    - Next.js + React
    - Tailwind

- #### Código no github

    O repositório onde todo o histórico de desenvolvimento está salvo. Com um README.md bem organizado com as instruções de como rodar o projeto.

- #### Aplicação publicada em um servidor

    O projeto deve estar online e acessível por uma URL. Ter o site "no ar"

    *Eu escolhi:*

    - Vercel

## Considerações Finais

Este projeto foi o maior divisor de águas na minha jornada como desenvolvedor, marcando minha transição do nível iniciante para o intermediário. 

**O Desafio Técnico** Iniciei o desenvolvimento com uma base sólida em HTML, CSS e JavaScript, mas com o grande desafio de conectar o sistema a um banco de dados de forma segura. Após explorar o Express e entender as particularidades de deploy na Vercel, encontrei no **Next.js** a solução ideal. A arquitetura Full Stack do framework me permitiu unir o poder do **React** no frontend com a segurança de funções rodando no servidor, garantindo proteção para informações sensíveis e um SEO otimizado através da renderização no backend.

**Segurança e Arquitetura** Aprofundando meus estudos, implementei uma estrutura de segurança em três camadas que hoje considero fundamentais em meus projetos:
1.  **Persistência:** PostgreSQL (Supabase) com uma camada de **Services** para lógica de dados.
2.  **Validação:** Uso da biblioteca **Zod** integrada a **Server Actions**, garantindo que nenhum dado chegue ao banco sem estar devidamente tipado e sanitizado.
3.  **Interface:** Frontend dinâmico com React e Hooks (**useState**, **useEffect**, etc), focado na experiência do usuário.

**Evolução e Aprendizado** Embora o plano inicial fosse um sistema completo (incluindo fornecedores e vendas), o tempo investido em aprender e aplicar corretamente tecnologias como **Tailwind CSS**, **NextAuth** e a integração com o **Supabase** foi recompensador. Até o momento, entreguei com sucesso os módulos de autenticação, gestão de clientes e a estrutura base de produtos.

Hoje, finalizo este integrador com a certeza de que sei construir sistemas complexos, seguros e escaláveis. O que antes parecia um obstáculo, como o uso de ORMs ou validações de esquema, agora faz parte do meu kit básico de ferramentas.