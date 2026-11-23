from playwright.sync_api import sync_playwright
exe = r'C:/Users/SID/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe'
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=exe)
    page = b.new_page(viewport={'width':1440,'height':900})
    page.goto('http://localhost:3000/about', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(4000)
    page.screenshot(path='_m1.png')
    page.goto('http://localhost:3000/services', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(3000)
    page.mouse.wheel(0, 900); page.wait_for_timeout(1500)
    page.screenshot(path='_m2.png')
    page.goto('http://localhost:3000/businesses/construction', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(3000)
    page.mouse.wheel(0, 1400); page.wait_for_timeout(1500)
    page.screenshot(path='_m3.png')
    b.close()
print('done')
