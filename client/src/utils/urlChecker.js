export const urlChecker = (str) => {
  const reg = str.match(
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/gim
  );
  for (let key in reg) {
    str = str.replace(
      reg[key],
      '<a href="' + reg[key] + '" target="_blank">' + reg[key] + '</a>'
    );
  }
  return str;
};
