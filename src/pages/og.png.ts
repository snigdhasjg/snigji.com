import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';

// Rendered at build time into dist/og.png. Edit src/assets/og.svg to change it.
// Paths are resolved from the project root because this module is bundled.
const assets = path.join(process.cwd(), 'src/assets');
const fontFile = path.join(assets, 'fonts/JetBrainsMono-Regular.ttf');

export const GET: APIRoute = async () => {
  const svg = await readFile(path.join(assets, 'og.svg'), 'utf8');

  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: {
      // Only use the bundled font so output doesn't depend on the build machine.
      loadSystemFonts: false,
      fontFiles: [fontFile],
      defaultFontFamily: 'JetBrains Mono',
      monospaceFamily: 'JetBrains Mono',
    },
  })
    .render()
    .asPng();

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
