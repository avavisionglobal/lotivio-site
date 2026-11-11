const sharp = require(process.env.HOME + '/brandiamemory/lotivio-site/node_modules/sharp');
const fs = require('fs');
const svg = fs.readFileSync(process.env.HOME + '/brandiamemory/lotivio-site/assets/brand/lotivio-mark.svg', 'utf8');
const d = [...svg.matchAll(/<path transform="[^"]+" d="([^"]+)"/g)].map((m) => m[1]);
const sq = d[0], sym = d[d.length - 1], T = 'translate(0 512) scale(0.1 -0.1)';
const [cx, cy, size] = [+process.argv[2], +process.argv[3], +process.argv[4]];
const k = size / 512, x0 = cx - size / 2, y0 = cy - size / 2;
const layer = (dx, dy, fill, op) => `<g transform="translate(${x0 + dx} ${y0 + dy}) scale(${k} ${k * 0.97})" opacity="${op}"><g clip-path="url(#c)"><path transform="${T}" d="${sym}" fill="${fill}"/></g></g>`;
const over = `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="2048"><defs><clipPath id="c"><path transform="${T}" d="${sq}"/></clipPath>
<filter id="b"><feGaussianBlur stdDeviation="0.8"/></filter></defs>
<g filter="url(#b)">${layer(0, 2.2, '#ffffff', 0.10)}${layer(0, -1.4, '#000000', 0.55)}${layer(0, 0, '#1b1918', 0.62)}</g></svg>`;
(async () => {
  await sharp('main-masque-plein.png').composite([{ input: Buffer.from(over), blend: 'atop' }]).png().toFile('main-logo.png');
  await sharp('main-logo.png').extract({ left: 420, top: 300, width: 640, height: 640 }).flatten({ background: '#F7F6F3' }).jpeg({ quality: 90 }).toFile('check-logo.jpg');
})();
