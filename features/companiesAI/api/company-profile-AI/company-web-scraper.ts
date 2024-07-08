// import { Builder, By, until } from "selenium-webdriver";
// import chrome from "selenium-webdriver/chrome";

// export const ScrapeWebsiteContent = async (url: string): Promise<string> => {
//   const options = new chrome.Options();
//   options.addArguments(
//     "--headless",
//     "--no-sandbox",
//     "--disable-dev-shm-usage",
//     "proxy-bypass-list=<-loopback>"
//   );

//   const driver = await new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions(options)
//     .build();

//   try {
//     await driver.get(url);
//     await driver.wait(until.elementLocated(By.tagName("body")), 10000);
//     const body = await driver.findElement(By.tagName("body")).getText();
//     return body;
//   } finally {
//     await driver.quit();
//   }
// };
