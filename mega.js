import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Mega from 'megajs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mega.nz credentials - aap inko apne credentials se replace karen
const MEGA_EMAIL = process.env.MEGA_EMAIL || 'your-email@example.com';
const MEGA_PASSWORD = process.env.MEGA_PASSWORD || 'your-password';

async function upload(fileStream, fileName) {
    return new Promise((resolve, reject) => {
        try {
            const storage = new Mega({
                email: MEGA_EMAIL,
                password: MEGA_PASSWORD,
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            });

            storage.on('ready', () => {
                console.log('✅ Mega.nz connected successfully');
                
                fileStream.pipe(storage.upload({
                    name: fileName,
                    attributes: {
                        type: 'file'
                    }
                }))
                .on('complete', (file) => {
                    console.log('📤 File uploaded successfully:', file.name);
                    const downloadUrl = `https://mega.nz/file/${file.downloadId}`;
                    resolve(downloadUrl);
                })
                .on('error', (error) => {
                    console.error('❌ Upload error:', error);
                    reject(error);
                });
            });

            storage.on('error', (error) => {
                console.error('❌ Mega storage error:', error);
                reject(error);
            });

        } catch (error) {
            console.error('❌ Mega upload catch error:', error);
            reject(error);
        }
    });
}

// Alternative method agar credentials na hon
async function uploadAnonymous(fileStream, fileName) {
    return new Promise((resolve, reject) => {
        try {
            // Anonymous upload without credentials
            const storage = new Mega({});
            
            fileStream.pipe(storage.upload({
                name: fileName,
                attributes: {
                    type: 'file'
                }
            }))
            .on('complete', (file) => {
                console.log('📤 File uploaded anonymously:', file.name);
                const downloadUrl = `https://mega.nz/file/${file.downloadId}`;
                resolve(downloadUrl);
            })
            .on('error', (error) => {
                console.error('❌ Anonymous upload error:', error);
                reject(error);
            });

        } catch (error) {
            console.error('❌ Anonymous upload catch error:', error);
            reject(error);
        }
    });
}

// Main upload function jo aap use karenge
async function uploadFile(fileStream, fileName) {
    try {
        // Pehle authenticated upload try karenge
        const url = await upload(fileStream, fileName);
        return url;
    } catch (error) {
        console.log('🔄 Authenticated upload failed, trying anonymous...');
        try {
            // Agar authenticated fail ho toh anonymous use karenge
            const url = await uploadAnonymous(fileStream, fileName);
            return url;
        } catch (anonError) {
            console.error('❌ Both upload methods failed');
            throw anonError;
        }
    }
}

export { uploadFile as upload };
