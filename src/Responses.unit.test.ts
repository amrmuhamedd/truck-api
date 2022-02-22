import Responses from "./Responses";

test("Responses is an object", () => {
  expect(typeof Responses).toBe("object");
});

test("_200 works", () => {
  const res = Responses._200({ name: "Amr Mohamed" });
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe("string");
  expect(res.headers["Content-Type"]).toBe("application/json");
});

test("_400 works", () => {
  const res = Responses._400({ name: "Amr Mohamed" });
  expect(res.statusCode).toBe(400);
  expect(typeof res.body).toBe("string");
  expect(res.headers["Content-Type"]).toBe("application/json");
});

test("_404 works", () => {
  const res = Responses._404({ name: "Amr Mohamed" });
  expect(res.statusCode).toBe(404);
  expect(typeof res.body).toBe("string");
  expect(res.headers["Content-Type"]).toBe("application/json");
});

test("define response", () => {
  const res = Responses._DefineResponse(382, { any: "thing" });
  expect(res.statusCode).toBe(382);
  expect(res.body).toBe(JSON.stringify({ any: "thing" }));
});
