import axios from "axios";
import nock from "nock";

beforeEach(() => {
  const scope = nock("http://www.example.com")
    .get("/news")
    .query(true)
    .reply(200, { title: "bar", content: "spam" }, { "X-Header": "zot" });
});

/**
 * Note from Nock's documentation:
 * Per HTTP/1.1 4.2 Message Headers specification, all message headers are case insensitive and thus
 * internally Nock uses **lower-case** for all field names even if some other combination of cases was
 * specified either in mocking specification or in mocked requests themselves.
 */

test("basic get with header response with nock", async () => {
  const response = await axios.get("http://www.example.com/news?article_id=foo&short=true");
  expect(response.headers["x-header"]).toBeDefined();  // Have to use lower case because of above comment
  expect(response.headers["x-header"]).toBe("zot");
});
