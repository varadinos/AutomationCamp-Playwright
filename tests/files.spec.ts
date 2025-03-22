import { test, expect } from "../setup/fixtures";
import path from "path";

test('Single file upload', async ({ formsInteractionsPage }) => {
    // Define the file path for upload
    const filePath = path.resolve(__dirname, '../data/files/file1.pdf');

    // Upload the file
    await formsInteractionsPage.singleUploadButton.setInputFiles(filePath);

    // Validate that the uploaded file is displayed
    await expect(formsInteractionsPage.validateSingleUpload).toBeVisible();
    await expect(formsInteractionsPage.validateSingleUpload).toHaveText('file1.pdf');
});

test('Multiple file upload', async ({ formsInteractionsPage }) => {
    // Define multiple file paths for upload
    const filePaths = [
        path.resolve(__dirname, '../data/files/file1.pdf'),
        path.resolve(__dirname, '../data/files/file2.pdf'),
        path.resolve(__dirname, '../data/files/file3.pdf')
    ];

    // Upload multiple files
    await formsInteractionsPage.multipleUploadButton.setInputFiles(filePaths);

    // Validate that the uploaded files are displayed
    await expect(formsInteractionsPage.validateMultipleUpload).toBeVisible();

    // Verify each uploaded file is listed correctly
    for (const filePath of filePaths) {
        const fileName = path.basename(filePath);
        await expect(formsInteractionsPage.validateMultipleUpload).toContainText(fileName);
    }
});

test('Download file', async ({ formsInteractionsPage, page }) => {
    // Wait for the download event before clicking the download button
    const downloadPromise = page.waitForEvent('download');
    await formsInteractionsPage.downloadFile.click();
    const download = await downloadPromise;

    // Define the file save path
    const downloadPath = path.join(__dirname, '../data/files', download.suggestedFilename());
    await download.saveAs(downloadPath);

    // Validate that the file has been successfully downloaded
    await expect(formsInteractionsPage.isFileDownloaded(downloadPath)).resolves.toBe(true);

    // Delete the downloaded file after validation
    await formsInteractionsPage.deleteFile(downloadPath);
});