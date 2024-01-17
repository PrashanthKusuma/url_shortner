const generateKey = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
};

const copy = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    setOpen(true);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const isValidUrl = (url) => {
  const urlPattern =
    /^(?:(https?:)?\/\/)?(?:www\.)?([a-z0-9.-]+\.[a-z]{2,})(\/\S*)?$/i;
  return urlPattern.test(url);
};

export { generateKey, copy, isValidUrl };
