import socketIOServer from "./socket";
import HTTPServer from "./server";
import WebWhatsappClient from "./services";

let client: WebWhatsappClient;
socketIOServer.on("connect", socket => {
    console.log(`socket:${socket.id} conectado.`);

    client = new WebWhatsappClient(socket.id);
    client.qrcode();

    socket.on("disconnect", () => {
        console.info(`socket:${socket.id} desconectado.`);
        client.destroyClient();
    })
})

const PORT = process.env.PORT || 4444;
HTTPServer.listen(PORT, () => console.info("> Running in " + PORT));