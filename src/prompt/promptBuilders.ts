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
You are a senior frontend engineer.

Generate a ${device}-first ${style} UI screen for a "${appType}" app.

Screen: ${screenName}
Theme: ${theme}

STRICT RULES:
- Return ONLY a single root <div> element.
- Do NOT include <!DOCTYPE>, <html>, <head>, <body>
- Do NOT include Tailwind CDN
- Do NOT include markdown code fences
- Do NOT explain anything
- Output raw HTML only
- Use Tailwind CSS classes

Your response must start with <div and end with </div>.
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
You are a senior frontend engineer.

Here is the existing UI markup:
---
${existingHtml}
---

Task:
${userPrompt}

STRICT RULES:
- Return ONLY updated markup
- Do NOT include <!DOCTYPE>, <html>, <head>, <body>
- Do NOT include markdown (no \`\`\`)
- Do NOT include explanations
- Keep Tailwind CSS classes
- Keep the structure similar unless modification is required
- Output must start with <div and end with </div>

Return raw HTML only.
`;
}




export function cleanHtmlOutput(html: string) {
  if (!html) return "";

  let cleaned = html
    .replace(/```html/g, "")
    .replace(/```/g, "")
    .trim();

  // Remove full document wrappers if model still sends them
  cleaned = cleaned
    .replace(/<!DOCTYPE[^>]*>/i, "")
    .replace(/<html[^>]*>/i, "")
    .replace(/<\/html>/i, "")
    .replace(/<head[\s\S]*?<\/head>/i, "")
    .replace(/<body[^>]*>/i, "")
    .replace(/<\/body>/i, "")
    .trim();

  return cleaned;
}

