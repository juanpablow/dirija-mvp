const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const svgContent = fs.readFileSync('./public/favicon.svg', 'utf8');

async function generatePNG(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Desenhar fundo com gradiente
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#0284c7');
  gradient.addColorStop(1, '#0369a1');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
  ctx.fill();
  
  // Desenhar letra D em forma de carro
  const scale = size / 128;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3 * scale;
  
  ctx.beginPath();
  ctx.moveTo(35 * scale, 35 * scale);
  ctx.lineTo(75 * scale, 35 * scale);
  ctx.bezierCurveTo(95 * scale, 35 * scale, 95 * scale, 50 * scale, 95 * scale, 64 * scale);
  ctx.bezierCurveTo(95 * scale, 78 * scale, 95 * scale, 93 * scale, 75 * scale, 93 * scale);
  ctx.lineTo(35 * scale, 93 * scale);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Mira/alvo no centro
  ctx.strokeStyle = '#0284c7';
  ctx.fillStyle = '#0284c7';
  ctx.lineWidth = 2.5 * scale;
  
  ctx.beginPath();
  ctx.arc(64 * scale, 64 * scale, 12 * scale, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(64 * scale, 64 * scale, 3 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Linhas da mira
  ctx.lineWidth = 2 * scale;
  ctx.lineCap = 'round';
  
  ctx.beginPath();
  ctx.moveTo(64 * scale, 52 * scale);
  ctx.lineTo(64 * scale, 56 * scale);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(64 * scale, 72 * scale);
  ctx.lineTo(64 * scale, 76 * scale);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(52 * scale, 64 * scale);
  ctx.lineTo(56 * scale, 64 * scale);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(72 * scale, 64 * scale);
  ctx.lineTo(76 * scale, 64 * scale);
  ctx.stroke();
  
  // Rodas do carro
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.arc(48 * scale, 93 * scale, 8 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(48 * scale, 93 * scale, 4 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.arc(82 * scale, 93 * scale, 8 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(82 * scale, 93 * scale, 4 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Salvar arquivo
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`./public/${filename}`, buffer);
  console.log(`✅ Gerado: ${filename} (${size}x${size})`);
}

async function generateAllFavicons() {
  console.log('🎨 Gerando favicons...\n');
  
  await generatePNG(16, 'favicon-16x16.png');
  await generatePNG(32, 'favicon-32x32.png');
  await generatePNG(180, 'apple-touch-icon.png');
  await generatePNG(192, 'icon-192.png');
  await generatePNG(512, 'icon-512.png');
  
  console.log('\n✨ Todos os favicons foram gerados com sucesso!');
}

generateAllFavicons().catch(console.error);
