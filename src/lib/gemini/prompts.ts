export function coverPrompt(childName: string, gender: "male" | "female") {
  const heroWord = gender === "male" ? "мальчик" : "девочка";
  return `Children's fairy tale book cover. A ${heroWord} as the main character standing in a magical world full of wonder. The title "${childName} и Волшебные Истории" is elegantly written at the top. Style: beautiful premium watercolor illustration for a children's book. Warm, inviting colors. Magical sparkles and stars.`;
}

export function sceneWithFacePrompt(
  sceneDescription: string,
  childName: string,
  gender: "male" | "female"
) {
  const pronoun = gender === "male" ? "He" : "She";
  return `${sceneDescription}. The main character is named ${childName}. ${pronoun} looks happy and determined. Style: beautiful watercolor illustration for a premium children's book. Warm colors, magical atmosphere.`;
}

export function backgroundPrompt(sceneDescription: string) {
  return `${sceneDescription}. Style: beautiful watercolor illustration for a premium children's book. No people or characters in this scene — only environment, nature, and magical elements. Warm colors.`;
}
