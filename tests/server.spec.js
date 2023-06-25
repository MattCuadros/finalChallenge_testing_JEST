const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Probando que la ruta GET/cafes devuelve status 200 y el tipo de dato es un arreglo con al menos 1 objeto", async () => {
    const response = await request(server).get("/cafes").send();
    const code = response.statusCode;
    const cafes = response.body;
    expect(code).toBe(200);
    expect(cafes).toBeInstanceOf(Array);
    expect(cafes.length).toBeGreaterThanOrEqual(1);
  });
  it("Probando que se obtiene un status 404, cuando se intenta eliminar un cafe con un id que no existe", async () => {
    const jwt = "token";
    const idCafeEliminar = 5;
    const response = await request(server)
      .delete(`/cafes/${idCafeEliminar}`)
      .set("Authorization", jwt)
      .send();
    expect(response.statusCode).toBe(404);
  });
  it("Probando la ruta POST/cafes agrega un nuevo cafe y devuelve código 201", async () => {
    const nuevoCafe = { id: Date.now(), nombre: "Lungo" };
    const response = await request(server).post(`/cafes`).send(nuevoCafe);
    console.log(response.body);
    console.log(response.statusCode);
    expect(response.statusCode).toBe(201);
  });
  it("Probando la ruta PUT/cafes devuelve status 400 si no coincide el id del req.params con el id enviado en el body", async () => {
    const editCafe = { id: 3, nombre: "Lungo" };
    const {body, statusCode} = await request(server).put(`/cafes/2`).send(editCafe);
    console.log('El mensaje recibido es ',body.message);
    expect(statusCode).toBe(400);
  });
});
