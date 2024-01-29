import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import cors from "@fastify/cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Створення Fastify сервера
const server = fastify();

//Обробка cors запитів
server.register(cors, {});
//Шлях до кореневої директорії
server.register(fastifyStatic, {
   root: path.join(__dirname, "../../dist"),
});
//Обробник маршруту для HTTP GET-запитів
server.get('/', (_, reply) => {
   reply.sendFile('index.html')
});


const port = process.env.PORT || 5556;
const host = process.env.HOST || "localhost";

server
   .listen( { port, host })
   .then(() => {
      console.log("Server is running");
   })
   .catch((error) => {
      console.error(error);
   });