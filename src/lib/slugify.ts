// Helper function to replace Turkish characters with their English equivalents
const turkishCharMap: { [key: string]: string } = {
  ç: "c",
  ş: "s",
  ı: "i",
  ğ: "g",
  ö: "o",
  ü: "u",
};

// Helper function to slugify the username and remove Turkish characters
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[çşğıöü]/g, (match) => turkishCharMap[match] || match) // Replace Turkish chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple hyphens with one
    .replace(/^-+/, "") // Remove leading hyphens
    .replace(/-+$/, ""); // Remove trailing hyphens
};

export default slugify;
