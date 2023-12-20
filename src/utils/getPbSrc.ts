export const getPbSrc = async (bucketName: string, fileName: string, folderName?: string) => {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${folderName ? `${folderName}/` : ''}${fileName}`);
  const data = await response.json();

  if (!response.ok) {
    console.error('Error fetching image URL:', data);
    return null;
  }

  return data;
};