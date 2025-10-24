
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the signup page
        await page.goto("http://localhost:5173/login")

        # Fill out the signup form
        await page.fill('input[name="name"]', 'testuser')
        await page.fill('input[name="email"]', 'testuser@example.com')
        await page.fill('input[name="password"]', 'password123')

        # Click the signup button
        await page.click('button[type="submit"]')

        # Wait for navigation to the setup page
        await page.wait_for_url("http://localhost:5173/testuser/setup")

        # Fill out the instance setup form
        await page.fill('input[name="name"]', 'Test Instance')
        await page.fill('input[name="phoneNumber"]', '+1234567890')

        # Take a screenshot
        await page.screenshot(path="jules-scratch/verification/user-setup.png")

        await browser.close()

asyncio.run(main())
