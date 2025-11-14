import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function upload(fileStream, fileName) {
    try {
        // Dynamic import use karen megajs ko
        const Mega = (await import('megajs')).default;
        
        return new Promise((resolve, reject) => {
            try {
                // Anonymous upload (credentials ke bina)
                const storage = new Mega({});
                
                console.log('📤 Starting file upload to Mega.nz...');
                
                fileStream.pipe(storage.upload({
                    name: fileName,
                    attributes: { type: 'file' }
                }))
                .on('complete', (file) => {
                    console.log('✅ File uploaded successfully:', file.name);
                    const downloadUrl = `https://mega.nz/file/${file.downloadId}`;
                    console.log('🔗 Download URL:', downloadUrl);
                    resolve(downloadUrl);
                })
                .on('error', (error) => {
                    console.error('❌ Upload error:', error);
                    reject(error);
                });
                
            } catch (pipeError) {
                console.error('❌ Pipe setup error:', pipeError);
                reject(pipeError);
            }
        });
        
    } catch (error) {
        console.error('❌ Mega.js import error:', error);
        
        // Fallback: Agar mega.js kaam na kare toh base64 return karen
        console.log('🔄 Using fallback base64 method...');
        return new Promise((resolve, reject) => {
            const chunks = [];
            
            fileStream.on('data', (chunk) => {
                chunks.push(chunk);
            });
            
            fileStream.on('end', () => {
                const fileBuffer = Buffer.concat(chunks);
                const base64Data = fileBuffer.toString('base64');
                console.log('📦 File converted to base64 (fallback)');
                resolve(base64Data);
            });
            
            fileStream.on('error', (streamError) => {
                reject(streamError);
            });
        });
    }
}

export { upload };
