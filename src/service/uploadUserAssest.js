export const uploadUserAssest = async (image) => {
  if (!image.type.startsWith("image/")) return;
  let formData = new FormData();
  formData.append("file", image);
  formData.append("cloud_name", "dkhgfsefj");
  formData.append("upload_preset", "chating");
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dkhgfsefj/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  return await response.json();
};
