// Função para fazer upload de arquivo para o Cloudinary
export const uploadToCloudinary = async (file: File): Promise<string> => {
  try {
    // Verifica se o arquivo existe
    if (!file) {
      throw new Error('Nenhum arquivo fornecido');
    }

    // Verifica o tamanho do arquivo (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('O arquivo é muito grande. O tamanho máximo permitido é 10MB');
    }

    // Verifica o tipo do arquivo
    if (!file.type.startsWith('image/')) {
      throw new Error('Apenas arquivos de imagem são permitidos');
    }

    // Verifica se as variáveis de ambiente estão configuradas
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Configurações do Cloudinary não encontradas');
    }

    // Converte o arquivo para base64
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]); // Remove o prefixo "data:image/jpeg;base64,"
      };
      reader.onerror = () => reject(new Error('Erro ao ler o arquivo'));
      reader.readAsDataURL(file);
    });

    // Cria o FormData para enviar o arquivo
    const formData = new FormData();
    formData.append('file', `data:${file.type};base64,${base64Data}`);
    formData.append('upload_preset', uploadPreset);
    formData.append('cloud_name', cloudName);
    
    // Adiciona apenas os parâmetros permitidos para upload não assinado
    formData.append('folder', 'g2c_forms');

    // Faz o upload para o Cloudinary usando a API REST
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro no upload: ${errorData.error?.message || 'Erro desconhecido'}`);
    }

    const data = await response.json();
    
    if (!data.secure_url) {
      throw new Error('URL da imagem não retornada pelo Cloudinary');
    }

    return data.secure_url;
  } catch (error) {
    console.error('Erro ao fazer upload para o Cloudinary:', error);
    throw error instanceof Error ? error : new Error('Falha ao fazer upload do arquivo');
  }
}; 