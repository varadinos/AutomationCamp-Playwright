import { expect, type Locator, type Page } from '@playwright/test';
import fs from "fs/promises";
import path from "path";

export class FormsInteractionsPage {
    readonly page: Page;
    readonly url: string;
    readonly singleUploadButton: Locator;
    readonly multipleUploadButton: Locator;
    readonly validateSingleUpload: Locator;
    readonly validateMultipleUpload: Locator;
    readonly downloadFile: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = '/forms.html';
        this.singleUploadButton = page.locator('#upload_cv');
        this.multipleUploadButton = page.locator('#upload_files');
        this.validateSingleUpload = page.locator('#validate_cv');
        this.validateMultipleUpload = page.locator('#validate_files');
        this.downloadFile = page.getByText('Click here to Download');
    }
    
    //Navigate to Forms Interactions Page
    async goTo(): Promise<void> {
        await this.page.goto(this.url);
    }

    //Delete file after downloading to have clean project
    async deleteFile(filePath: string): Promise<void> {
        try {
            await fs.access(filePath);
            await fs.unlink(filePath);
        } catch (error) {
            console.warn(`File not found: ${filePath}`);
        }
    }
    //Check if file is donwloaded
    async isFileDownloaded(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}