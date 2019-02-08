import axios from "axios";
import nock from "nock";

beforeEach(() => {
  const scope = nock("http://www.i-forgot-to-set-my-env-variable.com/", { allowUnmocked: true })
    .get("/foo")
    .reply(400);
});

test("get with specific mocked path with nock", async () => {
  await axios.get("http://www.i-forgot-to-set-my-env-variable.com/foo").catch((error) => {
      expect(error.response.status).toBe(400);
  });
  const { data } = await axios.get("http://www.i-forgot-to-set-my-env-variable.com");
  expect(data.endsWith(".")).toBeTruthy(); // Mike made this, so outputs are proper sentences ending with '.' :-)
});
