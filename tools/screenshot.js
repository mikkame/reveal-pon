const puppeteer = require('puppeteer');
const GIFEncoder = require('gifencoder');
const pngFileStream = require('png-file-stream');
const fs = require('fs');

const pager= (() => {
    let previousCount = '';
    let pageCount = 0;

    return async(page) => {
        pageCount++;
        const currentCount = await page.evaluate(_ => {
            return document.querySelector('.slide-number').innerText.trim()
        });

        if(previousCount === currentCount) {
            return false
        }
        if (pageCount == 5) { // 5ページ以上レンダリングしたら終了
            return false;
        }
        await page.screenshot({ path: `${__dirname}/${pageCount}.png` });
        previousCount = currentCount;
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(2000);
        return true
    }
})();

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("file://"+__dirname+"/../dist/index.html");


    while (true) {

        if (!await pager(page)) {
            break;
        }
    }
    const encoder = new GIFEncoder(800, 600);
    const stream = pngFileStream(`${__dirname}/?.png`)
        .pipe(encoder.createWriteStream({ repeat: 0, delay: 3000, quality: 10 }))
        .pipe(fs.createWriteStream(`${__dirname}/../dist/preview.gif`));
    await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
    });
    await browser.close();

})();
