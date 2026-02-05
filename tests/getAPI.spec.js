import { test, expect } from "@playwright/test";

test("Test Get API", async ({ request }) => {

  const resp = await request.get("https://jsonplaceholder.typicode.com/posts/1");
  const respBody = await resp.body();
  const respHeaders = resp.headers();
  const respJson = await resp.json();
  const respStatus = resp.status();
  const respStatusText = resp.statusText();
  const respHeadersArray = resp.headersArray();
  console.log(respStatusText);
  expect(respStatus).toBe(200);
  expect(respStatusText).toBe("OK");
  expect(resp.ok()).toBeTruthy();
expect(respJson).toHaveProperty("userId", 1);
expect(respJson).toHaveProperty("id", 1);
expect(respJson).toHaveProperty(
  "title",
  "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
);

expect(respJson.body).toContain("quia et suscipit");
});
