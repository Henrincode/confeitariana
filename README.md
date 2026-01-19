# 🎂 Confeitariana - Gestão de Pedidos (Integrador Backend)

Este projeto foi desenvolvido como parte do **Desafio do Projeto Integrador de Backend do SENAC**. O foco principal é a construção de uma API sólida e um banco de dados inteligente para gerenciar o ecossistema de uma confeitaria.

## 🚀 O Projeto

O sistema permite que a confeiteira tenha controle total sobre seu cardápio e vendas, garantindo que os dados históricos sejam preservados mesmo com o passar dos anos.

### 🛠️ Principais Funcionalidades (Backend)

* **Gestão de Inventário:** Cadastro de produtos com suporte a categorias hierárquicas (subcategorias) e diferentes tipos de unidades (kg, g, un).
* **CRM de Clientes:** Cadastro completo de clientes com múltiplos endereços vinculados.
* **Logística de Entrega:** Estrutura preparada para integração com APIs de geolocalização (Google Maps/PostGIS) para cálculo de frete baseado em distância.
* **Controle de Vendas:** Sistema de checkout que preserva o "snapshot" dos dados no momento da compra (preço e endereço fixados para histórico).
* **Integridade de Dados:** Implementação de regras de negócio via banco de dados:
* **Soft Delete:** Registros não são apagados permanentemente, garantindo relatórios financeiros precisos.
* **Integridade Referencial:** Uso estratégico de `ON DELETE CASCADE` e `RESTRICT` para evitar dados órfãos.
* **Segurança de Login:** Uso de `CITEXT` para garantir que e-mails e nomes de usuário sejam únicos e insensíveis a maiúsculas/minúsculas.



## 🗄️ Arquitetura do Banco de Dados

O projeto utiliza **PostgreSQL** (via Supabase) com uma estrutura normalizada de alta performance.

### Principais Tecnologias

* **Banco de Dados:** PostgreSQL
* **Extensões:** `CITEXT` (para buscas case-insensitive), `TIMESTAMPTZ` (para gestão global de horários).
* **Ferramentas de Modelagem:** dbdiagram.io

## Estrutura do banco de dados

```sql
-- 1. Ativar extensões necessárias
CREATE EXTENSION IF NOT EXISTS citext;

-- 2. Criar tabelas independentes (Nível 1)
CREATE TABLE tb_ana_users (
    id_user BIGSERIAL PRIMARY KEY,
    username CITEXT NOT NULL UNIQUE,
    pass_hash TEXT,
    name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE tb_ana_clients (
    id_client BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    details TEXT,
    email VARCHAR(255),
    phone VARCHAR(20),
    whatsapp VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE tb_ana_categories (
    id_category BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parent_id BIGINT REFERENCES tb_ana_categories(id_category),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE tb_ana_unity_types (
    id_unity_type BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    abreviation VARCHAR(10) NOT NULL,
    allows_decimal BOOLEAN NOT NULL DEFAULT FALSE
);

-- 3. Criar tabelas dependentes (Nível 2)
CREATE TABLE tb_ana_addresses (
    id_address BIGSERIAL PRIMARY KEY,
    id_client_fk BIGINT NOT NULL REFERENCES tb_ana_clients(id_client) ON DELETE CASCADE,
    zip VARCHAR(20),
    street VARCHAR(255),
    number VARCHAR(20),
    extra VARCHAR(100),
    district VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(50),
    country VARCHAR(50) DEFAULT 'Brasil',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tb_ana_products (
    id_product BIGSERIAL PRIMARY KEY,
    id_category_fk BIGINT NOT NULL REFERENCES tb_ana_categories(id_category),
    id_unity_type_fk BIGINT NOT NULL REFERENCES tb_ana_unity_types(id_unity_type),
    name VARCHAR(255) NOT NULL,
    details TEXT,
    price NUMERIC(10,2),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE tb_ana_sales (
    id_sale BIGSERIAL PRIMARY KEY,
    id_client_fk BIGINT NOT NULL REFERENCES tb_ana_clients(id_client),
    total_price DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'aguardando', 
    zip VARCHAR(20),
    street VARCHAR(255),
    number VARCHAR(20),
    extra VARCHAR(100),
    district VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(50),
    country VARCHAR(50) DEFAULT 'Brasil',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 4. Criar itens da venda (Nível 3)
CREATE TABLE tb_ana_sale_items (
    id_sale_items BIGSERIAL PRIMARY KEY,
    id_sale_fk BIGINT NOT NULL REFERENCES tb_ana_sales(id_sale) ON DELETE CASCADE,
    id_product_fk BIGINT NOT NULL REFERENCES tb_ana_products(id_product),
    quantity DECIMAL(10,3) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL
);
```