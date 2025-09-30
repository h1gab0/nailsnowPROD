from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the protected super admin route, which will redirect to login
        page.goto("http://localhost:5173/super-admin")

        # Expect to be redirected to the login page
        expect(page.get_by_role("heading", name="Super Admin Login")).to_be_visible(timeout=10000)

        # Login as super admin
        page.get_by_placeholder("Username").fill("superadmin")
        page.get_by_placeholder("Password").fill("superpassword")
        page.get_by_role("button", name="Login").click()

        # After login, we should be redirected back to the Super Admin Dashboard
        expect(page.get_by_role("heading", name="Super Admin Dashboard")).to_be_visible(timeout=10000)

        # Set up a handler for the alert dialog that will appear
        page.on("dialog", lambda dialog: dialog.accept())

        # Create a new instance with a unique ID to avoid conflicts
        instance_name = "My Test Salon"
        instance_id = f"test-salon-{int(time.time())}"
        app_name = "Test Salon App"

        page.get_by_placeholder("Instance Name (e.g., Jane's Nail Salon)").fill(instance_name)
        page.get_by_placeholder("Instance URL ID (e.g., janes-nails)").fill(instance_id)
        page.get_by_placeholder("Custom App Name (e.g., Nail Creations)").fill(app_name)
        page.get_by_role("button", name="Create Instance").click()

        # Wait for the instance to be created and the alert to be handled
        page.wait_for_timeout(1000)

        # Go to the new instance's public page
        page.goto(f"http://localhost:5173/{instance_id}")

        # Check for the custom app name in the header
        header_logo = page.get_by_role("link", name=app_name)
        expect(header_logo).to_be_visible(timeout=10000)
        expect(header_logo).to_have_text(app_name)

        # Take a screenshot for verification
        page.screenshot(path="jules-scratch/verification/verification.png")
        print("Screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)