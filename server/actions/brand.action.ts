'use server'

import { Brand } from "@/types/brand.types";
import brandService from "../services/brand.service";
import { ApiResponse } from "@/types/ApiResponse";

// find
export async function findBrands(): ApiResponse<Brand[]> {
    try {
        const data = await brandService.find()
        return { success: true, data }
    } catch (error) {
        console.log("ERROR ACTION findBrands", error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}