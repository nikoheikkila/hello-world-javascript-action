import * as path from "node:path";

await Bun.build({
  entrypoints: [path.join('src', 'index.ts')],
  outdir: 'dist',
  target: 'node',
  format: 'esm',
  sourcemap: 'inline',
  minify: true,
});
