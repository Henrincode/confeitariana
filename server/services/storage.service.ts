import { supabase } from "@/server/supabase"

export async function image(props: {file: File, filePath?: string}) {

    const {file, filePath = Math.random().toString()} = props

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