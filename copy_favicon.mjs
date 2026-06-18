import fs from 'fs';
fs.mkdirSync('public', { recursive: true });
fs.copyFileSync('C:/Users/admin/.gemini/antigravity/brain/d5753562-09b7-4236-a313-635b904bb255/uploaded_image_0_1781748539564.png', 'public/favicon.png');
console.log('done');
