from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Increase the timeout for all actions
    page.set_default_timeout(60000)

    try:
        # Navigate to the home page
        page.goto("http://localhost:5173/")

        # Wait for the Logo text "NailsNow" to be visible
        page.get_by_text("NailsNow").wait_for()

        # Click the "Sign In" button in the header
        page.get_by_role("link", name="Sign In").click()

        # Wait for navigation to the login page
        page.wait_for_url("**/login")

        # Click the "Sign up" link
        page.get_by_role("link", name="Sign up").click()

        # Fill in the signup form
        page.get_by_placeholder("Username").fill("testuser")
        page.get_by_placeholder("Email").fill("testuser@example.com")
        page.get_by_placeholder("Password").fill("password")
        page.get_by_role("button", name="Sign Up").click()

        # Wait for navigation to the setup page
        page.wait_for_url("**/testuser/setup")

        # Fill in the instance setup form
        page.get_by_placeholder("Instance Name (e.g., Jane's Nail Salon)").fill("Test Salon")
        page.get_by_placeholder("Your Phone Number (e.g., +1234567890)").fill("1234567890")
        page.get_by_role("button", name="Create Instance").click()

        # Wait for the alert to appear and accept it
        page.on("dialog", lambda dialog: dialog.accept())

        # Wait for navigation to the admin page
        page.wait_for_url("**/testuser/admin")

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

        print("Verification successful!")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
