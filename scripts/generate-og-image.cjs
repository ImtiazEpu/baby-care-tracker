const sharp = require('sharp');
const path = require('path');

const SIZE = { width: 1200, height: 630 };

// Create OG image with gradient background and text
const svgImage = `
<svg width="${SIZE.width}" height="${SIZE.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4f46e5;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bg)"/>

  <!-- Baby icon circle -->
  <circle cx="600" cy="240" r="100" fill="rgba(255,255,255,0.2)"/>

  <!-- Baby icon -->
  <g transform="translate(540, 180)">
    <circle cx="60" cy="35" r="30" fill="white"/>
    <ellipse cx="60" cy="90" rx="45" ry="35" fill="white"/>
    <circle cx="50" cy="30" r="4" fill="#6366f1"/>
    <circle cx="70" cy="30" r="4" fill="#6366f1"/>
    <ellipse cx="60" cy="42" rx="8" ry="5" fill="#fda4af"/>
    <path d="M 52 38 Q 60 45 68 38" stroke="#6366f1" stroke-width="2" fill="none"/>
  </g>

  <!-- App name -->
  <text x="600" y="380" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">MyBabyCare</text>

  <!-- Tagline -->
  <text x="600" y="440" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.9)" text-anchor="middle">Baby Care &amp; Vaccine Tracker</text>

  <!-- Subtitle -->
  <text x="600" y="490" font-family="Arial, sans-serif" font-size="22" fill="rgba(255,255,255,0.7)" text-anchor="middle">Based on Bangladesh EPI Schedule</text>

  <!-- Bottom decoration -->
  <rect x="500" y="540" width="200" height="4" rx="2" fill="rgba(255,255,255,0.5)"/>
</svg>
`;

async function generateOgImage() {
  const outputPath = path.join(__dirname, '../public/og-image.png');

  await sharp(Buffer.from(svgImage))
    .png()
    .toFile(outputPath);

  console.log('Generated:', outputPath);
}

generateOgImage().catch(console.error);
