import PDFMerger from 'pdf-merger-js';
import fs from 'fs';

export const mergePdfs = async (p1, p2) => {
    const merger = new PDFMerger();

    await merger.add(p1);
    await merger.add(p2);
    
    const outputFilePath = 'public/merged.pdf';
    await merger.save(outputFilePath);
    
    // Optionally delete the uploaded files after merging
    fs.unlinkSync(p1);
    fs.unlinkSync(p2);
};
