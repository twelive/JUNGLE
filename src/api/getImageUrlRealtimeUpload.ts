export const getPbImageURL = (
  bucketName: string,
  fileName: string,
  folderName?: string
) => {
  const url = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/${bucketName}`;
  const cacheBuster = new Date().getTime(); // 현재 시간을 밀리초로 반환

  if (folderName) {
    return `${url}/${folderName}/${fileName}?v=${cacheBuster}`;
  } else {
    return `${url}/${fileName}?v=${cacheBuster}`;
  }
};
