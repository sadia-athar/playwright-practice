import { test, expect } from '@playwright/test';
const loginPayLoad = {userEmail: "sadiarain2002@gmail.com", userPassword: "Sadia123*22"}
test.beforeAll( () =>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
         {
            data:loginPayLoad
        })
        expect(loginResponse.ok()).toBeTruthy();
        const LoginResponsejson = await loginResponse.json();
        const token = LoginResponsejson.token;
        console.log(token);
}
)
