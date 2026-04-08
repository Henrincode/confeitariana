'use server'

import { ApiResponse } from "@/types/ApiResponse";
import { Unit } from "@/types/unit.types";
import unitService from "../services/unit.service";

// find
export async function findUnits(): ApiResponse<Unit[]> {
    try {
        const data = await unitService.find()
        return { success: true, data }
    } catch (error) {
        console.error("ERROR ACTION findUnits", error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}