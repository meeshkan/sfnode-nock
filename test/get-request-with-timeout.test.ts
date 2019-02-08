import axios from "axios";
import nock from "nock";

const delayInMiliseconds = 2000;
const timeoutInMiliseconds = delayInMiliseconds / 2;

beforeEach(() => {
  const scope = nock("http://www.example.com")
    .get("/")
    .delayConnection(delayInMiliseconds)
    .reply(200, { title: "bar", content: "foo" });
});

test("get with timeout with nock", async () => {
  await axios.get("http://www.example.com/", { timeout: timeoutInMiliseconds }).catch((error) => {
      expect(error.message).toContain("timeout");
      expect(error.message).toContain(timeoutInMiliseconds);
  });
});
