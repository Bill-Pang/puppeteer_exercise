// const puppeteer = require("puppeteer");
// (async () => {
//   // 获取浏览器实例
//   const browser = await puppeteer.launch();
//   // 获取pages实例
//   const page = await browser.newPage();
//   // 初始化的屏幕大小默认为 800px x 600px 通过page.setViewport
//   // await page.setViewport({width: 50, height: 50});
//   await page.goto("http://www.baidu.com");
//   await page.screenshot({ path: "blog.png" });
//   await page.pdf({ path: "blog.pdf", format: "A4" });
//   await browser.close();
// })();

const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
  // headless: false 在启动node 的时候打开浏览器 默认为true不开启
  // headless = 无头模式
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 0, // slow down by 250ms Puppeteer操作的速度降低指定的毫秒数。这是帮助了解发生了什么的另一种方法。
    devtools: true, // 默认启动打开控制台
  });

  // 更改默认测试超时
  // jest.setTimeout(20);
  const page = await browser.newPage();

  await page.setViewport({ width: 1300, height: 1000 });
  // 监听控制台的输出
  // 在goto(url , {timeout:99999}) 设置超时时间
  await page.goto("https://www.jspang.com", { timeout: 1200000 });
  // Get the "viewport" of the page, as reported by the page.
  // 等待必要dom元素加载完成
  // await page.waitForSelector("body>div.list");
  // 模拟点击事件
  await page.click(".list-title > a:nth-child(1)");
  // 等待时间 不然会获取不到点击后页面的dom
  // await page.waitFor(1000);
  // 等待dom 这个更严谨
  await page.waitForNavigation();
  // 需要把获取的数据进行return
  const result = await page.evaluate(() => {
    console.log("我是爬虫君,这是当前打开网页的devtools");
    console.log(document.querySelectorAll(".detailed-title"));
    // let TitleArr = [];
    // let TitleDoms = document.querySelectorAll(".list-title > a");
    // for (let i of TitleDoms) {
    //   TitleArr.push(i.innerHTML);
    // }
    // return TitleArr;
  });
  // let content = result.map((o) => {
  //   return JSON.stringify(o);
  // });
  // console.log(content);
  // console.log(JSON.stringify(result));
  // fs.writeFile("titleList.json", JSON.stringify(result), function (err, data) {
  //   // console.log(data);
  // });
})();
