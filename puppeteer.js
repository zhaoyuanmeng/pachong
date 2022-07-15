const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrape(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  var movies = await page.evaluate(() => {
    var titlesList = document.querySelectorAll(".zhishu-titleone");
    var movieArr = [];
    for (var i = 0; i < titlesList.length; i++) {
      movieArr[i] = {
        title: titlesList[i].innerText.trim(),
        // summary: titlesList[i].nextElementSibling.innerText.trim(),
      };
    }
    return movieArr;
  });
  fs.writeFile(
    "./netflixscrape.json",
    JSON.stringify(movies, null, 3),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Great Success");
    }
  );
  browser.close();
}

scrape(
  "https://weathernew.pae.baidu.com/weathernew/pc?query=%E6%B2%B3%E5%8C%97%E7%9F%B3%E5%AE%B6%E5%BA%84%E5%A4%A9%E6%B0%94&srcid=4982"
);
