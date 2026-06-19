import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files từ thư mục dist
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback: mọi route đều trả về index.html (cần thiết cho SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại port ${PORT}`);
});
