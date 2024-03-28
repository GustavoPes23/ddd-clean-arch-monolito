import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Customer 1",
        address: {
          street: "Street 1",
          number: 1,
          city: "City",
          zip: "12345",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Customer 1");
    expect(response.body.address.street).toBe("Street 1");
    expect(response.body.address.number).toBe(1);
    expect(response.body.address.city).toBe("City");
    expect(response.body.address.zip).toBe("12345");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "Customer 1",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const response1 = await request(app)
      .post("/customer")
      .send({
        name: "Customer 1",
        address: {
          street: "Street 1",
          number: 1,
          city: "City",
          zip: "12345",
        },
      });

    expect(response1.status).toBe(200);

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Customer 2",
        address: {
          street: "Street 2",
          number: 1,
          city: "City",
          zip: "12345",
        },
      });

    expect(response2.status).toBe(200);

    const response = await request(app).get("/customer").send();
    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);

    const customer = response.body.customers[0];
    expect(customer.name).toBe("Customer 1");
    expect(customer.address.street).toBe("Street 1");
    
    const customer2 = response.body.customers[1];
    expect(customer2.name).toBe("Customer 2");
    expect(customer2.address.street).toBe("Street 2");


    const listReponseXML = await request(app)
    .get("/customer")
    .set("Accept", "application/xml")
    .send();

    expect(listReponseXML.status).toBe(200);
    expect(listReponseXML.text).toContain("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    expect(listReponseXML.text).toContain("<customers>");
    expect(listReponseXML.text).toContain("<customer>");
    expect(listReponseXML.text).toContain("<name>Customer 1</name>");
    expect(listReponseXML.text).toContain("<address>");
    expect(listReponseXML.text).toContain("<street>Street 1</street>");
    expect(listReponseXML.text).toContain("<number>1</number>");
    expect(listReponseXML.text).toContain("<city>City</city>");
    expect(listReponseXML.text).toContain("<zip>12345</zip>");
    expect(listReponseXML.text).toContain("</address>");
    expect(listReponseXML.text).toContain("</customer>");
    expect(listReponseXML.text).toContain("</customers>");
  });
});
