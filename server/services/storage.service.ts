import { supabase } from "@/server/supabase"

export async function upload(props: { file: File, filePath?: string }) {

    const { file, filePath = Math.random().toString() } = props

    const { data, error } = await supabase.storage
        .from('confeitariana')
        .upload(filePath, file)

    if (error) throw error

    // Retorna a url
    const { data: { publicUrl } } = supabase.storage
        .from('confeitariana')
        .getPublicUrl(filePath)

    return publicUrl
}

export async function move(props: { fromPath: string, toPath: string }) {
    const { fromPath, toPath } = props

    const { data, error } = await supabase.storage
        .from('confeitariana')
        .move(fromPath, toPath)

    if (error) throw error

    // Retorna a nova url pública atualizada
    const { data: { publicUrl } } = supabase.storage
        .from('confeitariana')
        .getPublicUrl(toPath)

    return publicUrl
}

export async function moveToTrash(fromPath: string) {
    const parsePath = fromPath.split('confeitariana/').pop()
    if(!parsePath) throw new Error('ERROR SERVICE STORAGE moveToTrash: Erro no caminho do arquivo')
        const toPath = `lixeira/${parsePath}`
    
    const { data, error } = await supabase.storage
        .from('confeitariana')
        .move(parsePath, toPath)

    if (error) throw error

    // Retorna a nova url pública atualizada
    const { data: { publicUrl } } = supabase.storage
        .from('confeitariana')
        .getPublicUrl(toPath)

    return publicUrl
}

const storageServices = {
    upload,
    move,
    moveToTrash
}

export default storageServices