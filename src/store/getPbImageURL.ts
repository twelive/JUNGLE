


  export const getPbImageURL = (bucketName: string, fileName: string, folderName?: string) => {
    if (folderName) {
      return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${folderName}/${fileName}`;
    } else {
      return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${fileName}`;
    }
  

  }
