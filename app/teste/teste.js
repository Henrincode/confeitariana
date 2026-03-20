import bcrypt from "bcryptjs"

async function hashPassword(password) {
    // O número 10 é o "cost factor" (custo de processamento). 
    // 10 é o padrão seguro atual para equilíbrio entre segurança e performance.
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    console.log(hash)

    return hash
}