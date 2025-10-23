from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # Log in as super admin
    page.goto("http://localhost:5173/admin-login", wait_until="networkidle")
    page.fill('input[name="username"]', "superadmin")
    page.fill('input[name="password"]', "password")
    page.click('button[type="submit"]')
    page.wait_for_url("http://localhost:5173/")

    # Take screenshot
    page.screenshot(path="jules-scratch/verification/authenticated_cta.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
