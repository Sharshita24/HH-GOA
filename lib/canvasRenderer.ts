import { FrameStyle } from '../types/image';
import { loadImage } from './imageProcessor';

export const CANVAS_SIZE = 1080;

export interface RenderOptions {
  imageSrc: string;
  zoom: number; // e.g. 1.0
  positionX: number; // offset in px relative to 1080
  positionY: number; // offset in px relative to 1080
  rotation: number; // degrees 0, 90, 180, 270
  frameStyle: FrameStyle;
  name?: string;
  stack?: string;
  builderClass?: string;
}

/**
 * Renders the photo and selected HH Goa 2026 CIRCULAR profile picture frame overlay onto a 1080x1080 HTML Canvas.
 */
export async function renderFrameToCanvas(
  canvas: HTMLCanvasElement,
  options: RenderOptions
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;

  const centerX = CANVAS_SIZE / 2;
  const centerY = CANVAS_SIZE / 2;
  const avatarRadius = 450; // Circular Avatar Radius
  const name = options.name?.trim() || 'BUILD YOUR NAME';
  const stack = options.stack?.trim() || 'Product Engineer';
  const builderClass = options.builderClass?.trim() || 'Builder Class';

  // Clear canvas (transparent background for circular PNG)
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Fill outer canvas with transparent or dark deep green
  ctx.fillStyle = '#063c1f';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Load user image
  const img = await loadImage(options.imageSrc);

  // Draw User Image clipped inside a PERFECT CIRCLE
  ctx.save();

  // Create Circular Clip Path
  ctx.beginPath();
  ctx.arc(centerX, centerY, avatarRadius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  // Move origin to center of canvas for rotation and offset calculations
  ctx.translate(centerX + options.positionX, centerY + options.positionY);

  if (options.rotation !== 0) {
    ctx.rotate((options.rotation * Math.PI) / 180);
  }

  // Calculate cover fitting scale
  const imgAspect = img.width / img.height;
  let drawW = avatarRadius * 2;
  let drawH = avatarRadius * 2;

  if (imgAspect > 1) {
    drawH = avatarRadius * 2;
    drawW = avatarRadius * 2 * imgAspect;
  } else {
    drawW = avatarRadius * 2;
    drawH = (avatarRadius * 2) / imgAspect;
  }

  // Apply user zoom
  drawW *= options.zoom;
  drawH *= options.zoom;

  // Draw centered image inside circular clip
  ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

  ctx.restore();

  // Render Circular Frame Branding Overlay based on chosen style
  switch (options.frameStyle) {
    case 'beach':
      renderBeachCircularFrame(ctx, centerX, centerY, avatarRadius, { name, stack, builderClass });
      break;
    case 'builder-id':
      renderBuilderIdCircularFrame(ctx, centerX, centerY, avatarRadius, { name, stack, builderClass });
      break;
    case 'official':
    default:
      renderOfficialCircularFrame(ctx, centerX, centerY, avatarRadius, { name, stack, builderClass });
      break;
  }
}

/**
 * Render a team frame by arranging up to 4 images in a 2x2 grid inside
 * the same circular branded frame. Accepts array of imageSrc (URLs or dataURLs).
 */
export async function renderTeamFrame(canvas: HTMLCanvasElement, imageSrcs: string[], frameStyle: FrameStyle = 'official') {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;

  const centerX = CANVAS_SIZE / 2;
  const centerY = CANVAS_SIZE / 2;
  const avatarRadius = 450;

  // background
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = '#063c1f';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // create circular clip
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, avatarRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  // layout grid up to 4
  const slots = imageSrcs.slice(0, 4);
  const cols = slots.length === 3 ? 3 : Math.min(2, slots.length);
  const rows = Math.ceil(slots.length / cols);

  const cellW = (avatarRadius * 2) / Math.max(cols, 1);
  const cellH = (avatarRadius * 2) / Math.max(rows, 1);

  // start top-left of circle area
  const startX = centerX - avatarRadius;
  const startY = centerY - avatarRadius;

  for (let i = 0; i < slots.length; i++) {
    try {
      const img = await loadImage(slots[i]);
      const col = i % cols;
      const row = Math.floor(i / cols);

      const drawX = startX + col * cellW;
      const drawY = startY + row * cellH;

      // cover fit into cell
      const aspect = img.width / img.height;
      let drawW = cellW;
      let drawH = cellH;
      if (aspect > 1) {
        drawH = cellH;
        drawW = cellH * aspect;
      } else {
        drawW = cellW;
        drawH = cellW / aspect;
      }

      // center in cell
      const dx = drawX + (cellW - drawW) / 2;
      const dy = drawY + (cellH - drawH) / 2;

      ctx.drawImage(img, dx, dy, drawW, drawH);
    } catch (err) {
      console.error('Team slot image load failed', err);
    }
  }

  ctx.restore();

  // draw frame overlay
  const teamMeta = {
    name: 'TEAM HH GOA',
    stack: 'HACKER HOUSE BUILDERS',
    builderClass: 'TEAM',
  };

  switch (frameStyle) {
    case 'beach':
      renderBeachCircularFrame(ctx, centerX, centerY, avatarRadius, teamMeta);
      break;
    case 'builder-id':
      renderBuilderIdCircularFrame(ctx, centerX, centerY, avatarRadius, teamMeta);
      break;
    case 'official':
    default:
      renderOfficialCircularFrame(ctx, centerX, centerY, avatarRadius, teamMeta);
      break;
  }
}

/**
 * Circular Frame 1: Official HH Goa 2026 Round Profile Frame
 */
function renderOfficialCircularFrame(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  meta: { name: string; stack: string; builderClass: string }
) {
  ctx.save();

  // 1. Outer Solid Circle Border Ring (Sun Yellow & Goa Green)
  ctx.strokeStyle = '#ffd600';
  ctx.lineWidth = 22;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Inner Green Accent Ring
  ctx.strokeStyle = '#0b6635';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 15, 0, Math.PI * 2);
  ctx.stroke();

  // 4 Hot Pink Accent Corner Dots around ring
  const dotOffset = radius + 2;
  const angles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
  ctx.fillStyle = '#ff007a';
  angles.forEach((angle) => {
    const dx = centerX + Math.cos(angle) * dotOffset;
    const dy = centerY + Math.sin(angle) * dotOffset;
    ctx.beginPath();
    ctx.arc(dx, dy, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffd600';
    ctx.lineWidth = 4;
    ctx.stroke();
  });

  // 2. Top Banner Header: HACKER HOUSE + "गोवा" Overlay
  ctx.fillStyle = '#063d1f';
  ctx.beginPath();
  ctx.roundRect(centerX - 270, centerY - radius - 10, 540, 110, 30);
  ctx.fill();

  ctx.strokeStyle = '#ffd600';
  ctx.lineWidth = 5;
  ctx.stroke();

  // "2:47 PM STUDIO" Top Micro Badge
  ctx.fillStyle = '#ffd600';
  ctx.beginPath();
  ctx.roundRect(centerX - 90, centerY - radius - 26, 180, 30, 6);
  ctx.fill();

  ctx.font = '900 14px "Fira Code", monospace, sans-serif';
  ctx.fillStyle = '#063d1f';
  ctx.textAlign = 'center';
  ctx.fillText('2:47 PM STUDIO', centerX, centerY - radius - 6);

  // "HACKER HOUSE" Text
  ctx.font = '900 48px "Playfair Display", "Bebas Neue", serif';
  ctx.fillStyle = '#ffd600';
  ctx.textAlign = 'center';
  ctx.fillText('HACKER   HOUSE', centerX, centerY - radius + 55);

  // Pink "गोवा" Center Badge Overlay
  const devnagariW = 120;
  const devnagariH = 46;
  const devnagariX = centerX - devnagariW / 2;
  const devnagariY = centerY - radius + 22;

  ctx.fillStyle = '#ffd600';
  ctx.beginPath();
  ctx.roundRect(devnagariX - 3, devnagariY - 3, devnagariW + 6, devnagariH + 6, 14);
  ctx.fill();

  ctx.fillStyle = '#ff007a';
  ctx.beginPath();
  ctx.roundRect(devnagariX, devnagariY, devnagariW, devnagariH, 12);
  ctx.fill();

  ctx.font = '900 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText('गोवा', centerX, devnagariY + 34);

  // 3. Bottom Curved Signboard Footer
  const footerW = 620;
  const footerH = 150;
  const footerY = centerY + radius - 110;

  // Yellow Signboard Box
  ctx.fillStyle = '#ffd600';
  ctx.beginPath();
  ctx.roundRect(centerX - footerW / 2, footerY, footerW, footerH, 24);
  ctx.fill();

  ctx.strokeStyle = '#063d1f';
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.font = '900 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#063d1f';
  ctx.textAlign = 'center';
  ctx.fillText(meta.name.toUpperCase(), centerX, footerY + 42);
  ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(meta.stack.toUpperCase(), centerX, footerY + 72);
  ctx.font = '900 20px "Fira Code", monospace, sans-serif';
  ctx.fillStyle = '#ff007a';
  ctx.fillText(`CLASS // ${meta.builderClass.toUpperCase()}`, centerX, footerY + 102);

  // Hot Pink #FrameInGoa Button Pill
  const pillW = 320;
  const pillH = 54;
  const pillY = footerY + 76;

  ctx.fillStyle = '#ff007a';
  ctx.beginPath();
  ctx.roundRect(centerX - pillW / 2, pillY, pillW, pillH, 27);
  ctx.fill();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.font = '900 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('#FrameInGoa', centerX, pillY + 37);

  ctx.restore();
}

/**
 * Circular Frame 2: Goa Beach Round Frame
 */
function renderBeachCircularFrame(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  meta: { name: string; stack: string; builderClass: string }
) {
  ctx.save();

  // Glowing Outer Yellow Ring
  ctx.strokeStyle = '#ffd600';
  ctx.lineWidth = 26;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Inner Hot Pink Accent Ring
  ctx.strokeStyle = '#ff007a';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 17, 0, Math.PI * 2);
  ctx.stroke();

  // Top Sun Badge: HH GOA 2026
  ctx.fillStyle = '#063d1f';
  ctx.beginPath();
  ctx.roundRect(centerX - 220, centerY - radius - 15, 440, 90, 45);
  ctx.fill();
  ctx.strokeStyle = '#ffd600';
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.font = '900 36px "Playfair Display", serif';
  ctx.fillStyle = '#ffd600';
  ctx.textAlign = 'center';
  ctx.fillText('HACKER HOUSE', centerX - 45, centerY - radius + 42);

  // Hot Pink "2026" Badge
  ctx.fillStyle = '#ff007a';
  ctx.beginPath();
  ctx.roundRect(centerX + 105, centerY - radius + 8, 90, 44, 22);
  ctx.fill();

  ctx.font = '900 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('2026', centerX + 150, centerY - radius + 38);

  // Bottom Beach Hut Signboard
  const footerY = centerY + radius - 100;

  ctx.fillStyle = '#ffd600';
  ctx.beginPath();
  ctx.roundRect(centerX - 280, footerY, 560, 130, 20);
  ctx.fill();

  ctx.strokeStyle = '#063d1f';
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.font = '900 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#063d1f';
  ctx.textAlign = 'center';
  ctx.fillText(meta.name.toUpperCase(), centerX, footerY + 38);
  ctx.font = '700 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(meta.stack.toUpperCase(), centerX, footerY + 66);
  ctx.font = '900 18px "Fira Code", monospace, sans-serif';
  ctx.fillStyle = '#ff007a';
  ctx.fillText(`BUILD ${meta.builderClass.toUpperCase()}`, centerX, footerY + 92);

  // Pink Hashtag Pill
  ctx.fillStyle = '#ff007a';
  ctx.beginPath();
  ctx.roundRect(centerX - 160, footerY + 100, 320, 48, 24);
  ctx.fill();

  ctx.font = '900 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('#FrameInGoa', centerX, footerY + 133);

  ctx.restore();
}

/**
 * Circular Frame 3: Builder ID Round Avatar Frame
 */
function renderBuilderIdCircularFrame(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  meta: { name: string; stack: string; builderClass: string }
) {
  ctx.save();

  // Outer Dual Ring (Yellow & Green)
  ctx.strokeStyle = '#ffd600';
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#0b6635';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 15, 0, Math.PI * 2);
  ctx.stroke();

  // Top Tech Header Badge
  ctx.fillStyle = '#0b6635';
  ctx.beginPath();
  ctx.roundRect(centerX - 240, centerY - radius - 15, 480, 70, 20);
  ctx.fill();
  ctx.strokeStyle = '#ffd600';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.font = '900 20px "Fira Code", monospace, sans-serif';
  ctx.fillStyle = '#ffd600';
  ctx.textAlign = 'center';
  ctx.fillText('2:47 PM STUDIO // BUILDER ID', centerX, centerY - radius + 28);

  // Bottom Floating Cream ID Card Badge
  const cardW = 580;
  const cardH = 160;
  const cardY = centerY + radius - 110;

  // Shadow Box
  ctx.fillStyle = '#042613';
  ctx.beginPath();
  ctx.roundRect(centerX - cardW / 2 + 6, cardY + 6, cardW, cardH, 20);
  ctx.fill();

  // Cream Card
  ctx.fillStyle = '#fffef0';
  ctx.beginPath();
  ctx.roundRect(centerX - cardW / 2, cardY, cardW, cardH, 20);
  ctx.fill();

  ctx.strokeStyle = '#ffd600';
  ctx.lineWidth = 4;
  ctx.stroke();

  // ID Avatar Circle Badge
  ctx.fillStyle = '#0b6635';
  ctx.beginPath();
  ctx.arc(centerX - cardW / 2 + 65, cardY + 65, 38, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#ff007a';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#ffd600';
  ctx.beginPath();
  ctx.arc(centerX - cardW / 2 + 65, cardY + 56, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(centerX - cardW / 2 + 65, cardY + 90, 22, Math.PI, 0);
  ctx.fill();

  // Text
  ctx.font = '900 26px "Playfair Display", Georgia, serif';
  ctx.fillStyle = '#063d1f';
  ctx.textAlign = 'left';
  ctx.fillText(meta.name.toUpperCase(), centerX - cardW / 2 + 120, cardY + 54);

  ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ff007a';
  ctx.fillText(meta.stack.toUpperCase(), centerX - cardW / 2 + 120, cardY + 84);

  ctx.font = '900 18px "Fira Code", monospace, sans-serif';
  ctx.fillStyle = '#0b6635';
  ctx.fillText(`CLASS ${meta.builderClass.toUpperCase()}`, centerX - cardW / 2 + 120, cardY + 108);

  // Pink Hashtag Pill
  ctx.fillStyle = '#0b6635';
  ctx.beginPath();
  ctx.roundRect(centerX - cardW / 2 + 120, cardY + 118, 220, 40, 20);
  ctx.fill();

  ctx.font = '900 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffd600';
  ctx.textAlign = 'center';
  ctx.fillText('#FrameInGoa', centerX - cardW / 2 + 230, cardY + 144);

  ctx.restore();
}
