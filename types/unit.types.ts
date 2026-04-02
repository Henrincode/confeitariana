// ---- table: units
export interface UnitDB {
    id_unit: number
    name: string
    short_name: string
    created_at: Date
}

// view: units
export interface Unit extends UnitDB { }