// import { writeFile } from "fs/promises";

// export async function uploadFile(file: File, type: "images" | "pdfs"): Promise<string> {
//     try {
//         const fileName = file.name.replace(" ", "_");
//         const filePathDir = `./public/${type}/${fileName}`;
//         const filePath = `/${type}/${fileName}`;
//         const arrayBuffer = await file.arrayBuffer();
//         const buffer = new Uint8Array(arrayBuffer);

//         await writeFile(filePathDir, buffer);

//         return filePath;
//     } catch (error) {
//         console.log(error);
//         throw new Error("Upload file error");
//     }
// }

"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

export async function uploadFile(file: File, type: "images" | "pdfs") {
    try {
        const fileName = file.name.replace(/\s+/g, "_"); // Replace all spaces with underscore
        const filePathDir = join(process.cwd(), "public", "ebookPDF", fileName);
        const filePath = `/ebookPDF/${fileName}`;
        
        // Convert File to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Create file in public/ebookPDF directory
        await writeFile(filePathDir, buffer);

        return filePath;
    } catch (error) {
        console.error("Upload error:", error);
        throw new Error("Upload file error");
    }
}
