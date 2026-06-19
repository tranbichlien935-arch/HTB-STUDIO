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
        const routeParts = route.split('/');

        // 1. Tạo file [route].html (Ví dụ: dist/admin.html)
        const htmlFilePath = path.join(distPath, `${route}.html`);
        fs.mkdirSync(path.dirname(htmlFilePath), { recursive: true });
        fs.copyFileSync(indexPath, htmlFilePath);

        // 2. Tạo folder [route]/index.html (Ví dụ: dist/admin/index.html)
        const routeDir = path.join(distPath, route);
        fs.mkdirSync(routeDir, { recursive: true });
        fs.copyFileSync(indexPath, path.join(routeDir, 'index.html'));
    });

    console.log('Successfully generated FULL static route fallbacks ([route].html & [route]/index.html)!');
} else {
    console.log('index.html not found, skipping fallback creation.');
}
