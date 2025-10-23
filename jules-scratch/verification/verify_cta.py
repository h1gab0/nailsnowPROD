from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # Log in as a regular user
    page.goto("http://localhost:5173/login")
    page.screenshot(path="jules-scratch/verification/login_page.png")
    page.locator('input[placeholder="Username"]').fill("testuser")
    page.locator('input[placeholder="Password"]').fill("password")
    page.locator('button[type="submit"]').click()
    page.wait_for_url("http://localhost:5173/")

    # Navigate to the landing page
    page.goto("http://localhost:5173/")

    # Take a screenshot of the authenticated CTA
    page.screenshot(path="jules-scratch/verification/authenticated_cta.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
