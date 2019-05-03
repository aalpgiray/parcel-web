export const getFileType = (name: string) => {
  const nameparts = name.split(".");
  if (nameparts.length < 2) {
    return "unknown";
  }
  if (
    /(webp|png|gif|jpg|jpeg|bmp|dpg)$/i.test(nameparts[nameparts.length - 1])
  ) {
    return "image";
  } else if (/(mp4|webm|ogg|3gp|flv)$/i.test(nameparts[nameparts.length - 1])) {
    return "video";
  }
  return "unknown";
};
