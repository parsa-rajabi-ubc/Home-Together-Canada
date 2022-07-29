/**
 * @Author:     Parsa Rajabi
 * @Created:    June 2021
 *
 * @Description: Member profile form Component automated test.
 *
 */

const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const {MOCK_MEMBER_DATA} = require("../../mockData/MockMemberData");
const {Actions} = require("selenium-webdriver/lib/input");

(async function example() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        await driver.get('http://localhost:3002/');
        await driver.wait(until.titleIs('Home Together Canada'), 1000);
        await driver.findElement(By.linkText('Sign Up')).click()
        await driver.findElement(By.className('account-box member')).click()
        await driver.findElement(By.id("firstName")).sendKeys(MOCK_MEMBER_DATA.firstName)
        await driver.findElement(By.id("lastName")).sendKeys(MOCK_MEMBER_DATA.lastName)
        await driver.findElement(By.id("email")).sendKeys(MOCK_MEMBER_DATA.email)
        await driver.findElement(By.id("areaCode")).sendKeys(MOCK_MEMBER_DATA.phoneNumber.areaCode)
        await driver.findElement(By.id("prefix")).sendKeys(MOCK_MEMBER_DATA.phoneNumber.prefix)
        await driver.findElement(By.id("suffix")).sendKeys(MOCK_MEMBER_DATA.phoneNumber.suffix)
        await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/div[2]/div/div/div[2]/div[1]/input")).sendKeys(MOCK_MEMBER_DATA.address.street)
        await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/div[2]/div/div/div[2]/div[2]/input")).sendKeys(MOCK_MEMBER_DATA.address.apt)
        await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/div[2]/div/div/div[2]/div[3]/input")).sendKeys(MOCK_MEMBER_DATA.address.city)
        await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/div[2]/div/div/div[2]/div[4]/div")).ENTER
        await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/div[2]/div/div/div[2]/div[5]/input")).sendKeys(MOCK_MEMBER_DATA.address.postCode)


        // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        // await driver.executeScript(
        //     'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Product has been successfully added to the cart!"}}'
        // );
    } catch (e) {
        //marking the test as Failed if product has not been added to the cart
        // console.log("Error:", e.message)
        // await driver.executeScript(
        //     'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Some elements failed to load."}}'
        // );
    } finally {
        await driver.wait(5000);
        await driver.quit();
    }
})();

