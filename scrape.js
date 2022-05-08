import puppeteer from "puppeteer";

let temp;

const findSolutions = async (errCode) => {
    let url = `https://www.google.co.il/search?q=${errCode}`

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const grabLinks = await page.evaluate(() => {
        const linksTags = document.querySelectorAll(".yuRUbf >a");
        let links = [];
        linksTags.forEach((tag) => {
            links.push(tag.href);
        });

        return links;
    });
    temp = grabLinks;
    await browser.close();

    return temp;
};

export {findSolutions}
