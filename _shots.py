from playwright.sync_api import sync_playwright
exe = r'C:/Users/SID/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe'
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=exe, args=['--enable-unsafe-swiftshader'])
    page = browser.new_page(viewport={'width':1440,'height':900})
    for route, name, scroll in [('/about','about-hero',0),('/about','about-chain',1200),('/businesses','biz-hero',0),('/services','services-stages',900),('/contact','contact-hero',0),('/sustainability','sus-hero',0),('/insights','insights-hero',0)]:
        page.goto('http://localhost:3000'+route, wait_until='networkidle', timeout=30000)
        page.wait_for_timeout(3000)
        if scroll: page.mouse.wheel(0, scroll); page.wait_for_timeout(1500)
        page.screenshot(path=f'_shot-{name}.png')
    browser.close()
print('done')
