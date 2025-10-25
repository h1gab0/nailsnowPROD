
import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Capture console logs
        page.on("console", lambda msg: print(f"Browser console: {msg.text}"))

        try:
            # Add a delay to wait for the server to start
            await asyncio.sleep(5)

            # Go to the login page and take a screenshot for debugging
            await page.goto("http://localhost:5173/login")
            await page.screenshot(path="jules-scratch/verification/debug_login_page.png")

            # Sign up a new user
            await page.get_by_test_id("signup-toggle").click()
            await page.get_by_label("Name").fill("testuser")
            await page.get_by_label("Email").fill("test@example.com")
            await page.get_by_label("Password").fill("password")
            await page.get_by_role("button", name="Sign Up").click()
            await expect(page).to_have_url("http://localhost:5173/testuser/setup")

            # Sign in with the new user
            await page.goto("http://localhost:5173/login")
            await page.get_by_label("Email").fill("test@example.com")
            await page.get_by_label("Password").fill("password")
            await page.get_by_role("button", name="Sign In").click()
            await expect(page).to_have_url("http://localhost:5173/testuser")

            await page.screenshot(path="jules-scratch/verification/verification.png")
        finally:
            await browser.close()

asyncio.run(main())
