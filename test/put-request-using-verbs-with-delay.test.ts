import axios from "axios";
import nock from "nock";

const delayTimeInMiliseconds = 2000;  // wait for 2 seconds for response

beforeEach(() => {
  const scope = nock("http://www.example.com")
    .intercept("/logout", "PUT")
    .delay(delayTimeInMiliseconds)
    .reply(200, { message: "You are now logged out" });
});

test("put mock with verbs and delay with nock", async () => {
  const t0 = Date.now();
  const { data } = await axios.put("http://www.example.com/logout");
  const timeItTook = Date.now() - t0;
  expect(timeItTook).toBeGreaterThanOrEqual(delayTimeInMiliseconds);
  expect(data.message).toBe("You are now logged out");
});
