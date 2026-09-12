import { test, expect } from '@playwright/test'

test('Verify Bilingual Audio buttons and Interleaved Voiceover Mode', async ({ page }) => {
  // Navigate to video learning page with Steve Jobs speech
  await page.goto('http://localhost:4173/#/video-learning?v=UF8uR6Z6KLc', {
    waitUntil: 'networkidle',
  })

  // Wait for cues to load (Desktop & Mobile both render cues)
  const firstCue = page.locator('[data-cue-id="1"]').first()
  await firstCue.waitFor({ timeout: 15000 })
  await expect(firstCue).toBeVisible()

  // 1. Verify EN button exists in cue
  const enBtn = firstCue.locator('button:has-text("EN")')
  await expect(enBtn).toBeVisible()

  // 2. Verify VI button exists in cue
  const viBtn = firstCue.locator('button:has-text("VI")')
  await expect(viBtn).toBeVisible()

  // 3. Verify Song ngữ button exists in cue
  const bilingualBtn = firstCue.locator('button:has-text("Song ngữ")')
  await expect(bilingualBtn).toBeVisible()

  // 4. Verify Thuyết minh xen kẽ button exists in YouTubePlayer toolbar
  const interleavedToggle = page.locator('button:has-text("Thuyết minh xen kẽ")').first()
  await expect(interleavedToggle).toBeVisible()

  // 5. Toggle Thuyết minh xen kẽ mode
  await interleavedToggle.click()
  await expect(interleavedToggle).toHaveClass(/bg-purple/)

  // 6. Take visual screenshot evidence
  await page.screenshot({
    path: '/home/vodailoc/.gemini/antigravity-cli/brain/7073eb20-3b6f-4c30-954f-17a757424379/interleaved-audio-verified.png',
    fullPage: false,
  })

  console.log('✅ All bilingual audio buttons and interleaved mode verified successfully!')
})
