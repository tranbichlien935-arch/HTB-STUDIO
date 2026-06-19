import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist');
const indexPath = path.join(distPath, 'index.html');
const notFoundPath = path.join(distPath, '404.html');

if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('Successfully copied index.html to 404.html for SPA routing fallback.');
} else {
    console.log('index.html not found, skipping 404.html creation.');
}
