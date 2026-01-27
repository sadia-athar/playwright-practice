const {test, expect} = require('@playwright/test');

test('first playwright test', async ({page}) => {
   await page.goto('https://parabank.parasoft.com/parabank/index.htm');
   await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
   await page.getByRole('link', {name: 'Register'}).click();
   await page.getByText('Forgot login info?').click();
   await page.getByLabel('First Name:').fill('John');
   await page.getByLabel('Last Name:').fill('Doe');
   await page.getByLabel('Address:').fill('123 Main St');
   await page.getByLabel('City:').fill('Anytown');
   await page.getByLabel('State:').fill('CA');
   await page.getByLabel('Zip Code:').fill('90210');
   await page.getByLabel('SSN:').fill('123-45-6789');
   await page.getByRole('button', {name: 'Find My Login Info'}).click();
   await expect(page.getByText('Your login information was located successfully.')).toBeVisible();

   await page.getByAltText('ParaBank').click();
   await page.getByTitle('ParaBank').click();
});