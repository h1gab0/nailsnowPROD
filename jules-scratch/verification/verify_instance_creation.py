
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the login page
    page.goto("http://localhost:5173/login")

    # Sign up as a new user
    page.get_by_test_id("signup-toggle").click()
    page.get_by_placeholder("Username").fill("testuser")
    page.get_by_placeholder("Password").fill("password")
    page.get_by_role("button", name="Sign Up").click()

    # Wait for navigation to the setup page
    page.wait_for_url("**/testuser/setup")

    # Fill in the phone number and create the instance
    page.get_by_placeholder("Your Phone Number (e.g., +1234567890)").fill("1234567890")
    page.get_by_role("button", name="Create Instance").click()

    # Wait for navigation to the new instance's page
    page.wait_for_url("**/testuser")

    # Verify the title and take a screenshot
    hero_title = page.locator("#hero-section h1")
    expect(hero_title).to_have_text("testuser")
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
