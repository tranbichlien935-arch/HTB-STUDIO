import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist');
const indexPath = path.join(distPath, 'index.html');
const notFoundPath = path.join(distPath, '404.html');

if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);

    // Tự động fake các thư mục route để bypass hoàn toàn lỗi Rewrite của Render
    const routes = [
        'about',
        'services',
        'portfolio',
        'contact',
        'admin',
        'admin/login',
        'admin/albums',
        'admin/bookings',
        'admin/services'
    ];

    routes.forEach(route => {
        const routeDir = path.join(distPath, route);
        fs.mkdirSync(routeDir, { recursive: true });
        // Copy index.html vào trong từng thư mục
        fs.copyFileSync(indexPath, path.join(routeDir, 'index.html'));
    });

    console.log('Successfully generated static route fallbacks!');
} else {
    console.log('index.html not found, skipping fallback creation.');
}
