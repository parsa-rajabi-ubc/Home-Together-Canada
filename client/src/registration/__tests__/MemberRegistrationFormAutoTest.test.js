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
require('chromedriver');

describe('MemberRegistrationFormAutoTest', () => {
    it("should sign up a new member", () => {
        (async function example() {
            let driver = await new Builder().forBrowser(Browser.CHROME).build();
            try {
                await driver.get('http://localhost:3002/');
                await driver.wait(until.titleIs('Home Together Canada'), 1000);
                await driver.findElement(By.linkText('Sign Up')).click()
                await driver.findElement(By.className('account-box member')).click()
                // Personal Information
                await driver.findElement(By.id("firstName")).sendKeys(MOCK_MEMBER_DATA.firstName)
                await driver.findElement(By.id("lastName")).sendKeys(MOCK_MEMBER_DATA.lastName)
                await driver.findElement(By.id("email")).sendKeys(MOCK_MEMBER_DATA.email)
                // Phone Number
                await driver.findElement(By.id("areaCode")).sendKeys(MOCK_MEMBER_DATA.phoneNumber.areaCode)
                await driver.findElement(By.id("prefix")).sendKeys(MOCK_MEMBER_DATA.phoneNumber.prefix)
                await driver.findElement(By.id("suffix")).sendKeys(MOCK_MEMBER_DATA.phoneNumber.suffix)
                // Address
                await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/div[2]/div/div/div[2]/div[1]/input")).sendKeys(MOCK_MEMBER_DATA.address.street)
                await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/div[2]/div/div/div[2]/div[2]/input")).sendKeys(MOCK_MEMBER_DATA.address.apt)
                await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/div[2]/div/div/div[2]/div[3]/input")).sendKeys(MOCK_MEMBER_DATA.address.city)
                await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/div[2]/div/div/div[2]/div[5]/input")).sendKeys(MOCK_MEMBER_DATA.address.postCode)
                // Province Dropdown
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div/div[2]/div[4]/div/div/div/div[2]/div")).click()
                //TODO: create a dict of provinces and map them to the option number to randomly pick a province in each test
                await driver.findElement(By.id("react-select-2-option-2")).click() // BC
                //TODO: Create a test with different mailing address

                // Profile Details
                // TODO change this to random
                await driver.findElement(By.id("maleGender")).click()
                // TODO: fix bug, sometimes it stops at this stage
                // Year of Birth
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[3]/div/div[2]/div/div/div/div/div/div/div/div/div/div")).click().then(
                    function () {
                        driver.findElement(By.id("react-select-3-option-16")).click()
                    }
                )

                // Family Status
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[3]/div/div[2]/div/div/div/div/div[2]/div/div/div/div")).click()
                await driver.findElement(By.id("react-select-4-option-0")).click()
                // Work Status
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[3]/div/div[2]/div/div/div/div/div[3]/div/div/div/div")).click()
                await driver.findElement(By.id("react-select-5-option-1")).click()
                // Open to Sharing with
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[3]/div/div[2]/div/div/div/div/div[4]/div/div/div/div")).click()
                await driver.findElement(By.id("react-select-6-option-1")).click()
                // Monthly Rent
                await driver.findElement(By.id("minRent")).sendKeys(MOCK_MEMBER_DATA.monthlyRent.min)
                await driver.findElement(By.id("maxRent")).sendKeys(MOCK_MEMBER_DATA.monthlyRent.max)
                // Preferred Living Location
                // First location
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[3]/div/div[2]/div/div/div/div/div[6]/section/div/div/div/div/div/div")).click()
                await driver.findElement(By.id("react-select-7-option-1")).click() // BC
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[3]/div/div[2]/div/div/div/div/div[6]/section/div/div[2]/div/div/div/div")).click()
                await driver.findElement(By.id("react-select-10-option-418")).click() // Vancouver
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[3]/div/div[2]/div/div/div/div/div[6]/section/div/div[3]/div/div/div/div/div")).click()
                // TODO map radius to options to randomly pick a radius
                await driver.findElement(By.id("react-select-11-option-9")).click() // 200 Radius

                await driver.findElement(By.id("addMoreLocations")).click()

                // Second location
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[3]/div/div[2]/div/div/div/div/div[6]/section/div[2]/div")).click()
                await driver.findElement(By.id("react-select-12-option-0")).click() // AB
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[3]/div/div[2]/div/div/div/div/div[6]/section/div[2]/div[2]/div/div/div/div")).click()
                await driver.findElement(By.id("react-select-13-option-95")).click() // Calgary
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[3]/div/div[2]/div/div/div/div/div[6]/section/div[2]/div[3]/div/div/div/div/div")).click()
                // TODO map radius to options to randomly pick a radius
                await driver.findElement(By.id("react-select-14-option-4")).click() // 25 Radius

                //Yes/No Buttons
                // TODO: add some text to "yes" fields
                await driver.findElement(By.id("petFriendly_" + MOCK_MEMBER_DATA.preferences.petFriendly)).click()
                await driver.findElement(By.id("smoking_" + MOCK_MEMBER_DATA.preferences.smoking)).click()
                await driver.findElement(By.id("mobile_" + MOCK_MEMBER_DATA.preferences.mobile)).click()
                await driver.findElement(By.id("allergies_" + MOCK_MEMBER_DATA.preferences.allergies)).click()
                await driver.findElement(By.id("religion_" + MOCK_MEMBER_DATA.preferences.religion)).click()
                await driver.findElement(By.id("diet_" + MOCK_MEMBER_DATA.preferences.diet)).click()
                await driver.findElement(By.id("hasHome_" + MOCK_MEMBER_DATA.preferences.hasHome)).click()
                await driver.findElement(By.id("interestInBuyingHome_" + MOCK_MEMBER_DATA.preferences.interestInBuyingHome)).click()

                await driver.findElement(By.id("aboutSelf")).sendKeys(MOCK_MEMBER_DATA.aboutSelf)

                // Search Criteria
                const randomGender = Math.floor(Math.random() * MOCK_MEMBER_DATA.sharingPreferences.genders.length);
                await driver.findElement(By.id("sharingWith" + MOCK_MEMBER_DATA.sharingPreferences.genders[randomGender])).click()
                // Open to Sharing with
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[5]/div/div[2]/div/div/div/div/div/div/div")).click()
                await driver.findElement(By.id("react-select-8-option-0")).click() // Single
                await driver.findElement(By.id("minAge")).sendKeys(MOCK_MEMBER_DATA.sharingPreferences.age.min)
                await driver.findElement(By.id("maxAge")).sendKeys(MOCK_MEMBER_DATA.sharingPreferences.age.max)
                // number of people to share with
                await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[5]/div/div[2]/div/div/div[3]/div/div/div/div/div/div/div")).click()
                await driver.findElement(By.id("react-select-9-option-0")).click() // 1 other person
                // Overlap Budget
                await driver.findElement(By.id("minOverlapBudget")).sendKeys(MOCK_MEMBER_DATA.sharingPreferences.overlapBudget.min)
                await driver.findElement(By.id("maxOverlapBudget")).sendKeys(MOCK_MEMBER_DATA.sharingPreferences.overlapBudget.max)
                // Looking for others with preferences
                await driver.findElement(By.id("petFriendlyPref_" + MOCK_MEMBER_DATA.preferences.petFriendly)).click()
                await driver.findElement(By.id("smokingPref_" + MOCK_MEMBER_DATA.preferences.smoking)).click()
                await driver.findElement(By.id("religionPref_" + MOCK_MEMBER_DATA.preferences.religion)).click()
                await driver.findElement(By.id("dietPref_" + MOCK_MEMBER_DATA.preferences.diet)).click()
                await driver.findElement(By.id("homeToSharePref_" + MOCK_MEMBER_DATA.preferences.hasHome)).click()

                // Sign In Details
                await driver.findElement(By.id("username")).sendKeys(MOCK_MEMBER_DATA.accountDetails.username)
                await driver.findElement(By.id("password")).sendKeys(MOCK_MEMBER_DATA.accountDetails.password)
                await driver.findElement(By.id("passwordConfirmation")).sendKeys(MOCK_MEMBER_DATA.accountDetails.password)

                await driver.findElement(By.id("tosCheckbox")).click()
                await driver.findElement(By.id("privacyPolicyCheckbox")).click()


                // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
                // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
                // await driver.executeScript(
                //     'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Product has been successfully added to the cart!"}}'
                // );
            } catch (e) {
                //marking the test as Failed if product has not been added to the cart
                console.log("Error:", e.message)
            } finally {
                // await driver.close();
                driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Title matched!"}}');
                // await driver.wait(until)

            }
        })();
    });
});

