export const fillTranslation = (
  translation: string,
  vars: { [key: string]: number | string }
): string => {
  let newTranslation: string = `${translation}`;
  for (let key in vars) {
    newTranslation = newTranslation.replaceAll(`{{ ${key} }}`, `${vars[key]}`);
  }
  return newTranslation;
};
