const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000');
});

afterEach(async () => {
    await page.close();
});

test('The header has the correct text', async () => {
    // const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    const text = await page.getContentsOf('a.brand-logo');
    expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
    // wait for the browser to navigate to the url
    await page.click('.right a');

    // Get the URL of the page we navigated to
    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
    
    await page.login();

    // const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    const text = await page.getContentsOf('a[href="/auth/logout"]');
    expect(text).toEqual('Logout');

});