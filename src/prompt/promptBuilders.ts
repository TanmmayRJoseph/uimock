// prompt for generate screen
export function buildUIScreenPrompt({
  appType,
  screenName,
  theme,
  style,
  device,
}: {
  appType: string;
  screenName: string;
  theme: string;
  style: string;
  device: string;
}) {
  return `
You are an expert UI engineer.

Generate a ${device}-first ${style} UI for a "${appType}" app.

Screen: ${screenName}
Theme: ${theme}

Rules:
- Use semantic HTML
- Use Tailwind CSS classes
- No explanations
- Return ONLY HTML
`;
}

// prompt for edit screen
export function buildEditScreenPrompt({
  existingHtml,
  userPrompt,
}: {
  existingHtml: string;
  userPrompt: string;
}) {
  return `
You are an expert UI engineer.

Here is the existing HTML UI:
---
${existingHtml}
---

Task:
${userPrompt}

Rules:
- Modify ONLY what is necessary
- Keep Tailwind CSS
- Do not add explanations
- Return ONLY updated HTML
`;
}
