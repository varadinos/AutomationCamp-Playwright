// DialogHandler class to manage browser dialog events (e.g., alerts, prompts, and confirms)
import { Page } from '@playwright/test';

export class DialogHandler {

    async handleDialog(page: Page, dialogAction: 'accept' | 'dismiss'): Promise<void> {
        // Attach a listener to handle dialog events (such as alert, confirm, prompt)
        page.on('dialog', dialog => {
            // If action is 'accept', accept the dialog
            if (dialogAction === 'accept') {
                dialog.accept();
            // If action is 'dismiss', dismiss the dialog
            } else if (dialogAction === 'dismiss') {
                dialog.dismiss();
            }
        });
    }
}
