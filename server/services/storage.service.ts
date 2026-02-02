import { supabase } from "@/server/supabase"

export async function image(file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { data, error } = await supabase.storage
        .from('confeitariana')
        .upload(filePath, file)

        if(error) throw error

        // Retorna a url
        const {data: {publicUrl}} = supabase.storage
        .from('confeitariana')
        .getPublicUrl(filePath)

        return publicUrl
}

const storageServices = {
    image
}

export default storageServices