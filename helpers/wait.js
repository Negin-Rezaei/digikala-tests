// @js-check

/**
 * Wait for any common loading overlay/spinner to disappear.
 * Mirrors the helper used in the upstream Bazorg test project so generated
 * tests can stay consistent across both codebases.
 */
export async function waitForSpinner(page) {
  await page.locator('.MuiBackdrop-root, .MuiCircularProgress-root, [class*="loading"], [class*="spinner"]')
    .waitFor({ state: 'detached', timeout: 10000 }).catch(() => { });
}
