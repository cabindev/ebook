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

import { put } from "@vercel/blob";
import { join } from "path";

export async function uploadFile(file: File, type: "images" | "pdfs") {
    try {
        const fileName = file.name.replace(" ", "_");
        const pathname = join(type, fileName);
        const blob = await put(pathname, file, { access: "public" });

        return blob.url;
    } catch (error) {
        throw new Error("Upload file error");
    }
}
