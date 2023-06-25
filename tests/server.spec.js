const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Probando que la ruta GET/cafes devuelve status 200 y el tipo de dato es un arreglo con al menos 1 objeto", async () => {
    const response = await request(server).get("/cafes").send();
    console.log(response);
    const code = response.statusCode;
    const cafes = response.body;
    console.log(cafes);
    expect(code).toBe(200);
    expect(cafes).toBeInstanceOf(Array);
  });
});
