// Importar el módulo "supertest" para realizar las pruebas HTTP
const request = require("supertest");

// Importar el servidor que se va a probar
const server = require("../index");

// Descripción de las pruebas
describe("Operaciones CRUD de cafes", () => {
  
  // Prueba para la ruta GET/cafes
  it("Probando que la ruta GET/cafes devuelve status 200 y el tipo de dato es un arreglo con al menos 1 objeto", async () => {
    // Realizar una solicitud GET a la ruta /cafes
    const response = await request(server).get("/cafes").send();
    
    // Obtener el código de estado de la respuesta
    const code = response.statusCode;
    
    // Obtener el cuerpo de la respuesta (en este caso, un arreglo de objetos)
    const cafes = response.body;
    
    // Verificar que el código de estado sea 200
    expect(code).toBe(200);
    
    // Verificar que la variable "cafes" sea un arreglo
    expect(cafes).toBeInstanceOf(Array);
    
    // Verificar que el arreglo "cafes" tenga al menos un objeto
    expect(cafes.length).toBeGreaterThanOrEqual(1);
  });

  // Prueba para la ruta DELETE/cafes/:id
  it("Probando que se obtiene un status 404, cuando se intenta eliminar un cafe con un id que no existe", async () => {
    // Definir un token de autorización (jwt) y un id de cafe para eliminar
    const jwt = "token";
    const idCafeEliminar = 5;
    
    // Realizar una solicitud DELETE a la ruta /cafes/:id con el token de autorización y el id del cafe
    const response = await request(server)
      .delete(`/cafes/${idCafeEliminar}`)
      .set("Authorization", jwt)
      .send();
    
    // Verificar que el código de estado de la respuesta sea 404
    expect(response.statusCode).toBe(404);
  });

  // Prueba para la ruta POST/cafes
  it("Probando la ruta POST/cafes agrega un nuevo cafe y devuelve código 201", async () => {
    // Definir un nuevo cafe (con un id único y un nombre)
    const nuevoCafe = { id: Date.now(), nombre: "Lungo" };
    
    // Realizar una solicitud POST a la ruta /cafes con el cuerpo del nuevo cafe
    const response = await request(server).post(`/cafes`).send(nuevoCafe);
    
    // Imprimir en la consola el cuerpo de la respuesta y el código de estado
    /* console.log(response.body);
    console.log(response.statusCode); */
    
    // Verificar que el código de estado de la respuesta sea 201
    expect(response.statusCode).toBe(201);
  });

  // Prueba para la ruta PUT/cafes/:id
  it("Probando la ruta PUT/cafes devuelve status 400 si no coincide el id del req.params con el id enviado en el body", async () => {
    // Definir un cafe a editar (con un id que no coincide con el id en la ruta y un nombre)
    const editCafe = { id: 3, nombre: "Lungo" };
    
    // Realizar una solicitud PUT a la ruta /cafes/:id con el cuerpo del cafe editado
    const { body, statusCode } = await request(server).put(`/cafes/2`).send(editCafe);
    
    // Imprimir en la consola el mensaje recibido en el cuerpo de la respuesta
    console.log('El mensaje recibido es ', body.message);
    
    // Verificar que el código de estado de la respuesta sea 400
    expect(statusCode).toBe(400);
  });
});
