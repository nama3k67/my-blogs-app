export const convertUsername = (name: string) => {
  const nameArray = name.split(" ");
  return nameArray.map((item) => item[0].toUpperCase()).join("");
};
