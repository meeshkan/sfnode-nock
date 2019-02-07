import axios from "axios";
import nock from "nock";

beforeEach(() => {
  const scope = nock("https://api.github.com")
    .get("/repos/atom/atom/license")
    .reply(200, {
      license: {
        key: "mit",
        name: "MIT License",
        node_id: "MDc6TGljZW5zZTEz",
        spdx_id: "MIT",
        url: "https://api.github.com/licenses/mit",
      },
    });
});

test("basic get mock works with nock", async () => {
  const { data } = await axios("https://api.github.com/repos/atom/atom/license");
  expect(data.license.key).toBe("mit");
});
