import {
  dropTestDB,
  clearCollection,
  initializeTestDB,
} from "../../../config/database";
import request from "supertest";
import app from "../../../server";
import { Permission } from "../permission.model";

describe("POST /api/v1/access-control/roles", () => {
  //Test Suite: CREATE a Role

  beforeAll(async () => {
    initializeTestDB();
  });

  afterAll(() => {
    dropTestDB();
  });

  beforeEach(async () => {
    const permissionsArray = [
      {
        moduleName: "access-control",
        displayName: "Can create roles",
        genericName: "create-roles",
      },
      {
        moduleName: "access-control",
        displayName: "Can view roles",
        genericName: "read-roles",
      },
    ];

    permissionsArray.forEach(async (permission) => {
      await Permission.create(permission);
    });
  });

  afterEach(() => {
    clearCollection("roles");
    clearCollection("permissions");
  });

  it("should require a role-name", async () => {
    const payload = {};

    const res = await request(app)
      .post("/api/v1/access-control/roles")
      .send(payload)
      .expect(400);

    expect(res.body.data).toBeNull();
    expect(res.body.success).toBe(false);
    expect(res.body.developerMessage).toBeDefined();
    expect(res.body.message).toBe("Operation failed.");
    expect(res.body.userMessage).toBe(
      "Oops... Something went wrong, contact the admin..."
    );

    console.log("❌ Response: ", res.body);
  });

  it("should create and return an object of a role created", async () => {
    const permissions = await Permission.find().select("_id");
    const payload = {
      status: 0,
      permissions,
      name: "Administrator",
      description: "Super user of a system",
    };

    const res = await request(app)
      .post("/api/v1/access-control/roles")
      .send(payload)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.userMessage).toBeUndefined();
    expect(res.body.data.name).toBe("Administrator");
    expect(res.body.developerMessage).toBeUndefined();
    expect(res.body.message).toBe("Role created successfully.");

    console.log("✅ Response: ", res.body);
  });
});
