import { eventGenerator } from "./testUtils/eventGenerator";
import { isApiGatewayResponse } from "./testUtils/validator";
import { createTruck, getTruck, listTruck, loadTruck, unloadTruck } from "./trucks";

describe("create truck integration tests", () => {
  test("create truck is work correctly", async () => {
    const event = eventGenerator({
      name: "truck",
      weight: 0,
      truckID: "123456",
    });
    const res = await createTruck(event);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(201);
    expect(JSON.parse(res.body)).toMatchObject({
      parcels: [],
      name: "truck",
      weight: 0,
      parcelsNumber: 0,
      truckID: "123456",
    });
    expect(isApiGatewayResponse(res)).toBe(true);
  });
  test("get truck by Id is work correctly", async () => {
    const event = eventGenerator({}, { id: "123456" });
    const res = await getTruck(event);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toMatchObject({
      parcels: [],
      name: "truck",
      weight: 0,
      parcelsNumber: 0,
      truckID: "123456",
    });
    expect(isApiGatewayResponse(res)).toBe(true);
  });
  test("get All trucks is work correctly", async () => {
    const event = eventGenerator({});
    const res = await listTruck(event);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toMatchObject([
      {
        parcels: [],
        name: "truck",
        weight: 0,
        parcelsNumber: 0,
        truckID: "123456",
      },
    ]);
    expect(isApiGatewayResponse(res)).toBe(true);
  });
  test("load truck is work correctly", async () => {
    const event = eventGenerator({ parcels: [{ name: "truck", weight: 20 }] }, { id: "123456" });
    const res = await loadTruck(event);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toMatchObject({
      parcels: [{ name: "truck", weight: 20 }],
      name: "truck",
      weight: 20,
      parcelsNumber: 1,
      truckID: "123456",
    });
    expect(isApiGatewayResponse(res)).toBe(true);
  });
  test("unload truck is work correctly", async () => {
    const event = eventGenerator({}, { id: "123456" });
    const res = await unloadTruck(event);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toMatchObject({
      parcels: [],
      name: "truck",
      weight: 0,
      parcelsNumber: 0,
      truckID: "123456",
    });
    expect(isApiGatewayResponse(res)).toBe(true);
  });
});
