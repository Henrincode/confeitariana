import sql from "../db";
import { unstable_cache } from "next/cache";
import { Unit, UnitDB } from "@/types/unit.types";
import { CreateUnit, UpdateUnit } from "@/schemas/unit.schema";

// ------------------- unit

// find
const find = unstable_cache(
    async (): Promise<Unit[]> => {
        const rows = await sql<Unit[]>`
            SELECT * FROM ana_units
        `
        return rows.map(r => ({
            ...r,
            id_unit: Number(r.id_unit)
        }))
    },
    ['units-find'],
    { tags: ['units'] }
)

// findById
const findById = unstable_cache(
    async (id): Promise<Unit | null> => {
        const [row] = await sql<Unit[]>`
            SELECT * FROM ana_units
            WHERE id_unit = ${id}
        `
        if (!row) return null

        return {
            ...row,
            id_unit: Number(row.id_unit)
        }
    },
    ['units-findById'],
    { tags: ['units'] }
)

// create
async function create(params: CreateUnit): Promise<UnitDB> {
    const [row] = await sql<UnitDB[]>`
        INSERT INTO ana_units ${sql(params)}
        RETURNING *
    `
    return {
        ...row,
        id_unit: Number(row.id_unit)
    }
}

// update
async function update(params: UpdateUnit): Promise<UnitDB> {
    const [row] = await sql<UnitDB[]>`
        UPDATE ana_units
        SET ${sql(params)}
        WHERE id_unit = ${params.id_unit}
        RETURNING *
    `
    return {
        ...row,
        id_unit: Number(row.id_unit)
    }
}

// delete
// restore

const unitService = {
    find,
    findById,
    create,
    update
}

export default unitService