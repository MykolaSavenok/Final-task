import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import cors from "@fastify/cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify();


server.register(cors, {});

server.register(fastifyStatic, {
   root: path.join(__dirname, "../../dist"),
});

server.get('/', (_, reply) => {
   reply.sendFile('index.html')
});

const port = process.env.PORT || 9999;
const host = process.env.HOST || "localhost";

server
   .listen({ port, host })
   .then(() => {
      console.log("Server is running");
   })
   .catch((error) => {
      console.error(error);
   });