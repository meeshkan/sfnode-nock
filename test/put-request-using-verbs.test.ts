import axios from "axios";
import nock from "nock";

beforeEach(() => {
  const scope = nock("http://www.example.com")
    .intercept("/logout", "PUT") // Can be post, get, merge, delete, put, head, patch, options
    .reply(404);
});

test("put mock with verbs and 404 with nock", async () => {
  await axios.put("http://www.example.com/logout").catch((error) => {
    expect(error.response).toBeDefined();
    expect(error.response.status).toBe(404);
  });
});
