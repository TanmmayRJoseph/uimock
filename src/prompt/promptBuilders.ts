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
You are a senior frontend engineer and professional UI/UX designer.

Generate a ${device}-first, visually rich, production-quality ${style} UI screen.

App Type: ${appType}
Screen: ${screenName}
Theme: ${theme}

DESIGN REQUIREMENTS:
- Use modern SaaS-level design
- Strong visual hierarchy
- Generous spacing
- Rounded corners (rounded-xl / rounded-2xl)
- Soft shadows (shadow-md / shadow-lg)
- Use gradient backgrounds when appropriate
- Add hover effects (hover:scale-105, hover:shadow-xl, transition-all)
- Use flex and grid properly
- Include icons using: <i data-lucide="icon-name"></i>
- Include realistic Unsplash placeholder images:
  Example: https://source.unsplash.com/600x400/?${appType}
- Add subtle animations using Tailwind transitions
- Add badges, cards, avatars where appropriate
- Make it look like a premium startup product

ICON RULE:
Use lucide icons with:
<i data-lucide="shopping-cart"></i>

STRICT RULES:
- Return ONLY a single root <div>
- Do NOT include <!DOCTYPE>, <html>, <head>, <body>
- Do NOT include Tailwind CDN
- Do NOT include markdown
- Do NOT explain anything
- Output raw HTML only
- Must start with <div and end with </div>

Before generating, internally think about layout structure, spacing, and design polish.

Now generate the screen.
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
You are a senior frontend engineer and UI designer.

Existing UI:
---
${existingHtml}
---

User wants:
${userPrompt}

IMPROVEMENT RULES:
- Improve visual hierarchy
- Add icons where appropriate using <i data-lucide="">
- Add subtle animations and hover transitions
- Improve spacing and layout
- Enhance with shadows and rounded corners
- Add images if beneficial
- Make it feel premium and modern
- Maintain responsiveness
- Keep structure similar unless major redesign required

STRICT RULES:
- Return ONLY updated markup
- No <!DOCTYPE>, <html>, <head>, <body>
- No markdown
- No explanations
- Must start with <div and end with </div>

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
