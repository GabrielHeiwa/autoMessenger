import socketIOServer from "./socket";
import WebWhatsappClient from "./services";

let client: WebWhatsappClient;
socketIOServer.on("connect", socket => {
    console.log(`socket:${socket.id} conectado.`);

    socket.on("disconnect", () => {
        console.info(`socket:${socket.id} desconectado.`);
        client.destroyClient();
    })

    client = new WebWhatsappClient(socket.id);
    client.qrcode();
})