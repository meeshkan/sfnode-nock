import axios from "axios";
import nock from "nock";

const LOGIN = { username: "pgte", password: "foobar" };
beforeEach(() => {
  const scope = nock("http://www.example.com")
    .post("/login", LOGIN)
    .reply(200, { id: "123ABC" });
});

test("basic post mock works with nock", async () => {
  const { data } = await axios.post("http://www.example.com/login", LOGIN);
  expect(data.id).toBe("123ABC");
});
