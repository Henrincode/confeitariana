//---- table: clients
export interface ClientDB {
    id_client: number
    id_client_type_fk: number
    name: string
    contact_name: string | null
    cpf: string | null
    cnpj: string | null
    email: string | null
    phone: string | null
    whatsapp: string | null
    birth_date: Date | null
    details: string | null
    image_url: string | null
    created_at: Date
    deleted_at: Date | null
}

// view: client
export interface Client extends ClientDB {
    type: string
}

// -------------------------------------------------------

// table: client_categories
export interface ClientTypeDB {
    id_client_type: number
    name: string
    created_at: Date
}

// view: client category
export interface ClientType extends ClientTypeDB { }

// -------------------------------------------------------

// table: client_addresses
export interface ClientAddressDB {
    id_client_address: number
    id_client_fk: number
    name: string
    zip: string
    number: string
    street: string
    district: string
    city: string
    state: string
    country_code: string

    condominium: string
    building_block: string
    unit_number: string
    internal_street: string

    details: string
    created_at: Date
    deleted_at: Date
}

// view: client addresses
export interface ClientAddress extends ClientAddressDB { }

// uplad image
export interface ClientUploadImage {
    id_client: number
    file: File
}