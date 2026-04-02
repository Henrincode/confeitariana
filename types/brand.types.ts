// ---- table: brands
export interface BrandDB {
    id_brand: number
    name: string
    image_url: string | null
    created_at: Date
    deleted_at: Date | null
}

// view: brands
export interface Brand extends BrandDB { }