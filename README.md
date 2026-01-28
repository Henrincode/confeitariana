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

Para ver o fluxograma do banco [clique aqui!](https://dbdiagram.io/e/696d62b3d6e030a02462527c/696db5aad6e030a02467400d)

### Criando tabelas

```sql
-- ==========================================================
-- 1. CONFIGURAÇÕES INICIAIS
-- ==========================================================

-- O comportamento Case-Insensitive será tratado via índices funcionais LOWER().

-- ==========================================================
-- 2. NÍVEL 1: TABELAS BASE (DIMENSÕES)
-- ==========================================================

-- Cargos e Níveis de Acesso: Define as permissões do sistema.
CREATE TABLE ana_auth_staff_roles (
    id_auth_staff_role BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gestão de Acesso: Armazena credenciais e níveis de permissão.
CREATE TABLE ana_auth_staff (
    id_auth_staff BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE, -- Tratado com índice LOWER para login.
    pass_hash TEXT NOT NULL,
    name VARCHAR(255),
    id_auth_staff_role_fk BIGINT NOT NULL REFERENCES ana_auth_staff_roles(id_auth_staff_role),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Segmentação de Clientes: Grupos como 'VIP', 'Corporativo' ou 'Revenda'.
CREATE TABLE ana_client_categories (
    id_client_category BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Entidades de Consumo: Cadastro central de clientes.
CREATE TABLE ana_clients (
    id_client BIGSERIAL PRIMARY KEY,
    id_client_category_fk BIGINT REFERENCES ana_client_categories(id_client_category),
    name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(100),
    CPF VARCHAR(255),
    CNPJ VARCHAR(255),
    email VARCHAR(255), -- Tratado com índice LOWER para buscas/CRM.
    phone VARCHAR(20),
    whatsapp VARCHAR(20),
    birth_date DATE,
    details TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Localidades de Clientes: Suporta múltiplos endereços.
CREATE TABLE ana_client_addresses (
    id_client_address BIGSERIAL PRIMARY KEY,
    id_client_fk BIGINT NOT NULL REFERENCES ana_clients(id_client) ON DELETE CASCADE,
    name VARCHAR(100),                     -- Apelido do local (Ex: Trabalho, Casa, Academia)
    zip VARCHAR(20),                       -- CEP ou código postal da localidade
    number VARCHAR(20),                    -- Número do imóvel ou lote na via principal
    street VARCHAR(255),                   -- Nome da via pública principal (Rua, Avenida)
    district VARCHAR(100),                 -- Bairro ou região administrativa
    city VARCHAR(100),                     -- Município do endereço
    state VARCHAR(50),                     -- Estado ou província
    country_code CHAR(2) DEFAULT 'BR',     -- Código do país em formato ISO (Padrão Brasil)

    condominium VARCHAR(100),              -- Nome do Condomínio (Ex: Residencial Flores)
    building_block VARCHAR(20),            -- Bloco / Torre
    unit_number VARCHAR(20),               -- Número do Apto / Número da Casa interna
    internal_street VARCHAR(255),          -- Rua interna (para condomínios grandes de casas)

    details TEXT,                          -- Ponto de referência ou instruções de entrega
    created_at TIMESTAMPTZ DEFAULT NOW(),  -- Registro de data/hora da criação do cadastro
    deleted_at TIMESTAMPTZ                 -- Data de exclusão para controle de Soft Delete
);

-- Cadeia de Suprimentos: Parceiros comerciais para compra de insumos.
CREATE TABLE ana_suppliers (
    id_supplier BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(100),
    cpf VARCHAR(20),
    cnpj VARCHAR(20),
    email VARCHAR(255), -- Tratado com índice LOWER.
    phone VARCHAR(20),
    whatsapp VARCHAR(20),

    zip VARCHAR(20),
    number VARCHAR(20),
    street VARCHAR(255),
    district VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(50),
    country_code CHAR(2) DEFAULT 'BR',

    condominium VARCHAR(100),              -- Nome do Condomínio (Ex: Residencial Flores)
    building_block VARCHAR(20),            -- Bloco / Torre
    unit_number VARCHAR(20),               -- Número do Apto / Número da Casa interna
    internal_street VARCHAR(255),          -- Rua interna (para condomínios grandes de casas)

    details TEXT,                          -- Ponto de referência ou instruções de entrega
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Tesouraria: Controle de saldos em bancos ou caixas.
CREATE TABLE ana_banks (
    id_bank BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    account_name VARCHAR(100),
    balance_initial NUMERIC(10,2) DEFAULT 0,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Fluxo de Trabalho: Status da fatura.
CREATE TABLE ana_invoice_status (
    id_invoice_status BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Identidade Visual: Marcas de produtos e insumos.
CREATE TABLE ana_brands (
    id_brand BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Padronização de Medidas (kg, g, un, etc).
CREATE TABLE ana_units (
    id_unit BIGSERIAL PRIMARY KEY,
    name VARCHAR(50), 
    short_name VARCHAR(10) NOT NULL UNIQUE, 
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organização de Insumos.
CREATE TABLE ana_supply_categories (
    id_supply_category BIGSERIAL PRIMARY KEY,
    id_parent_fk BIGINT REFERENCES ana_supply_categories(id_supply_category),
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Catálogo de Insumos.
CREATE TABLE ana_supplies (
    id_supply BIGSERIAL PRIMARY KEY,
    id_supply_category_fk BIGINT NOT NULL REFERENCES ana_supply_categories(id_supply_category),
    id_brand_fk BIGINT REFERENCES ana_brands(id_brand),
    id_unit_fk BIGINT NOT NULL REFERENCES ana_units(id_unit),
    name VARCHAR(100) NOT NULL,
    size_value NUMERIC(10,3),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Árvore de Produtos Finais.
CREATE TABLE ana_product_categories (
    id_product_category BIGSERIAL PRIMARY KEY,
    id_parent_fk BIGINT REFERENCES ana_product_categories(id_product_category),
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Modalidades Financeiras.
CREATE TABLE ana_payment_methods (
    id_payment_method BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Status do pagamento
CREATE TABLE ana_payment_status (
    id_payment_status BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ==========================================================
-- 3. NÍVEL 2: PRODUTOS E FATURAMENTO
-- ==========================================================

-- Portfólio de Vendas.
CREATE TABLE ana_products (
    id_product BIGSERIAL PRIMARY KEY,
    id_product_category_fk BIGINT NOT NULL REFERENCES ana_product_categories(id_product_category),
    id_brand_fk BIGINT REFERENCES ana_brands(id_brand),
    id_unit_fk BIGINT NOT NULL REFERENCES ana_units(id_unit),
    name VARCHAR(255) NOT NULL,
    price_original NUMERIC(10,2) NOT NULL DEFAULT 0,
    price_discount NUMERIC(10,2) DEFAULT 0,
    price_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Tipo de invoice "Venda" "Compra"
CREATE TABLE ana_invoice_types (
    id_invoice_type BIGSERIAL PRIMARY KEY,
    name varchar(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documento Fiscal/Comercial: Compras e Vendas.
CREATE TABLE ana_invoices (
    id_invoice BIGSERIAL PRIMARY KEY,
    id_invoice_type_fk BIGINT REFERENCES ana_invoice_types(id_invoice_type), 
    id_client_fk BIGINT REFERENCES ana_clients(id_client) ON DELETE RESTRICT,
    id_supplier_fk BIGINT REFERENCES ana_suppliers(id_supplier) ON DELETE RESTRICT,
    id_invoice_status_fk BIGINT NOT NULL REFERENCES ana_invoice_status(id_invoice_status),
    id_auth_staff_fk BIGINT NOT NULL REFERENCES ana_auth_staff(id_auth_staff),
    price_original NUMERIC(10,2) NOT NULL DEFAULT 0,
    price_discount NUMERIC(10,2) NOT NULL DEFAULT 0,
    price_final NUMERIC(10,2) NOT NULL DEFAULT 0,
    details TEXT, 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    delivered_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    CONSTRAINT check_invoice_owner CHECK (
        (id_client_fk IS NOT NULL AND id_supplier_fk IS NULL) OR
        (id_client_fk IS NULL AND id_supplier_fk IS NOT NULL)
    )
);

-- ==========================================================
-- 4. NÍVEL 3: DETALHAMENTO (ITENS E FINANCEIRO)
-- ==========================================================

-- Itens vendidos.
CREATE TABLE ana_invoice_product_items (
    id_invoice_product_item BIGSERIAL PRIMARY KEY,
    id_invoice_fk BIGINT NOT NULL REFERENCES ana_invoices(id_invoice) ON DELETE CASCADE,
    id_product_fk BIGINT NOT NULL REFERENCES ana_products(id_product),
    quantity NUMERIC(10,3) NOT NULL,
    price_unit NUMERIC(10,2) NOT NULL,
    price_final NUMERIC(10,2) NOT NULL
);

-- Itens comprados.
CREATE TABLE ana_invoice_supply_items (
    id_invoice_supply_item BIGSERIAL PRIMARY KEY,
    id_invoice_fk BIGINT NOT NULL REFERENCES ana_invoices(id_invoice) ON DELETE CASCADE,
    id_supply_fk BIGINT NOT NULL REFERENCES ana_supplies(id_supply),
    quantity NUMERIC(10,3) NOT NULL,
    price_unit NUMERIC(10,2) NOT NULL,
    price_final NUMERIC(10,2) NOT NULL
);

-- Tipos de pagamentos "entrada", "saída"
CREATE TABLE ana_payment_types (
    id_payment_type BIGSERIAL PRIMARY KEY,
    name varchar(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conciliação Bancária.
CREATE TABLE ana_payments (
    id_payment BIGSERIAL PRIMARY KEY,
    id_bank_fk BIGINT NOT NULL REFERENCES ana_banks(id_bank),
    id_invoice_fk BIGINT NOT NULL REFERENCES ana_invoices(id_invoice) ON DELETE CASCADE,
    id_payment_method_fk BIGINT NOT NULL REFERENCES ana_payment_methods(id_payment_method),
    id_payment_status_fk BIGINT NOT NULL REFERENCES ana_payment_status(id_payment_status),
    id_payment_type_fk BIGINT NOT NULL REFERENCES ana_payment_types(id_payment_type),
    payment_name VARCHAR(100), 
    amount NUMERIC(10,2) NOT NULL,
    details TEXT,
    paid_at TIMESTAMPTZ DEFAULT NOW()
);

-- Receita Técnica (BOM).
CREATE TABLE ana_product_recipe_items (
    id_product_fk BIGINT NOT NULL REFERENCES ana_products(id_product) ON DELETE CASCADE,
    id_supply_fk BIGINT NOT NULL REFERENCES ana_supplies(id_supply) ON DELETE CASCADE,
    PRIMARY KEY (id_product_fk, id_supply_fk)
);

-- Logística de Entrega (Snapshot).
CREATE TABLE ana_invoice_addresses (
    id_invoice_address BIGSERIAL PRIMARY KEY,
    id_invoice_fk BIGINT NOT NULL UNIQUE REFERENCES ana_invoices(id_invoice) ON DELETE CASCADE,
    zip VARCHAR(20),
    number VARCHAR(20),
    street VARCHAR(255),
    district VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(50),
    country_code CHAR(2) DEFAULT 'BR',

    condominium VARCHAR(100),              -- Nome do Condomínio (Ex: Residencial Flores)
    building_block VARCHAR(20),            -- Bloco / Torre
    unit_number VARCHAR(20),               -- Número do Apto / Número da Casa interna
    internal_street VARCHAR(255),          -- Rua interna (para condomínios grandes de casas)
    details TEXT,                          -- Ponto de referência ou instruções de entrega
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- ==========================================================
-- 5. ÍNDICES DE PERFORMANCE (VELOCIDADE BILIONÁRIA)
-- ==========================================================

-- OTIMIZAÇÃO CASE-INSENSITIVE
-- Estes índices garantem que buscas por login e e-mail sejam rápidas mesmo com milhões de linhas.
-- Importante: Em suas queries, use WHERE LOWER(coluna) = LOWER('valor')
CREATE INDEX idx_staff_username_lower ON ana_auth_staff (LOWER(username));
CREATE INDEX idx_clients_email_lower ON ana_clients (LOWER(email));
CREATE INDEX idx_suppliers_email_lower ON ana_suppliers (LOWER(email));

-- Buscas Frequentes
CREATE INDEX idx_inv_client ON ana_invoices(id_client_fk) WHERE id_client_fk IS NOT NULL;
CREATE INDEX idx_inv_supplier ON ana_invoices(id_supplier_fk) WHERE id_supplier_fk IS NOT NULL;
CREATE INDEX idx_inv_status ON ana_invoices(id_invoice_status_fk);
CREATE INDEX idx_client_birthday ON ana_clients (EXTRACT(MONTH FROM birth_date));

-- Engenharia de Receita
CREATE INDEX idx_recipe_items_product ON ana_product_recipe_items(id_product_fk);
CREATE INDEX idx_recipe_items_supply ON ana_product_recipe_items(id_supply_fk);
```

### Pupulando tabelas

```sql
-- ==========================================================
-- POPULAÇÃO INICIAL (SETUP DO SISTEMA)
-- ==========================================================

-- 1. Cargos Padrão
INSERT INTO ana_auth_staff_roles (name) VALUES 
('Administrador'), ('Gerente'), ('Vendedor'), ('Produção');

-- 2. Status de Fatura
INSERT INTO ana_invoice_status (name) VALUES 
('Pendente'), ('Pago'), ('Cancelado'), ('Em Separação'), ('Entregue');

-- 3. Tipos de Fatura
INSERT INTO ana_invoice_types (name) VALUES 
('Venda'), ('Compra');

-- 4. Tipos de Movimentação Financeira
INSERT INTO ana_payment_types (name) VALUES 
('Entrada (Receita)'), ('Saída (Despesa)');

-- 5. Métodos de Pagamento
INSERT INTO ana_payment_methods (name) VALUES 
('Dinheiro'), ('Pix'), ('Cartão de Crédito'), ('Cartão de Débito'), ('Boleto');

-- 6. Status de Pagamento
INSERT INTO ana_payment_status (name) VALUES 
('Aguardando'), ('Confirmado'), ('Estornado');

-- 7. Unidades de Medida
INSERT INTO ana_units (short_name, full_name) VALUES 
('un', 'Unidade'), ('kg', 'Quilograma'), ('g', 'Grama'), ('L', 'Litro'), ('pack', 'Pack');
```