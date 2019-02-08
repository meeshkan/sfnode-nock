import axios from "axios";
import nock from "nock";

beforeEach(() => {
  const scope = nock("http://www.example.com")
    .post("/login")
    .query(true)
    .replyWithError("Something terrible happened :(");
});

test("basic post mock works with nock", async () => {
    axios.post("http://www.example.com/login", { user: "foo", password: "hashed-bar" })
    .catch((error) => {
        expect(error.message).toBe("Something terrible happened :(");
    });
});
