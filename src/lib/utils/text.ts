// Personalize story text by replacing placeholders with child's data
export function personalizeText(
  text: string,
  name: string,
  gender: "male" | "female"
): string {
  const isMale = gender === "male";
  return text
    .replace(/{name}/g, name)
    .replace(/{name_genitive}/g, name)
    .replace(/{he_she}/g, isMale ? "он" : "она")
    .replace(/{He_She}/g, isMale ? "Он" : "Она")
    .replace(/{his_her}/g, isMale ? "его" : "её")
    .replace(/{him_her}/g, isMale ? "него" : "неё")
    .replace(/{boy_girl}/g, isMale ? "мальчик" : "девочка")
    .replace(/{a}/g, isMale ? "" : "а")
    .replace(/{la}/g, isMale ? "" : "а")
    .replace(/{Blank}/g, "")
    .replace(/{zhegl}/g, isMale ? "ёг" : "гла");
}
