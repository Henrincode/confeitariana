import z from "zod";


export const authSchema = z.object({
    username: z.string('Nome de usuário deve ser texto e/ou números').min(3, 'Precisa ao menos de 3 caracteres'),
    password: z.string('Senha deve ser um texto e/ou números').min(4, 'Precisa ao menos de 4 caracteres')
})