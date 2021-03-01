import { Router } from "express";
import { socketServer } from ".";
import WebWhatsappClient from "./services"

const router = Router();
let client: WebWhatsappClient;

router.get("/qrcode", (request, response) => {
    let socketSession = 0;
    try {
        socketServer.on("connect", socket => {
            socket.on("disconnect", async () => { 
                client.destroyClient();
                console.info(`socket:${socket.id} desconectado`);
            });

            if (socket.connected) {
                socketSession++;
            };

            if(socketSession !== 1) return;

            console.log(`socket:${socket.id} conectado.`);

            client = new WebWhatsappClient(socket.id);
            client.qrcode();
        });
        return response.status(200).send("ok");
    } catch (err) {
        return response.status(400).json({
            msg: "Error in send QRCode from user",
        });
    };
});

router.post("/send", (request, response) => {
    try {
        console.log(request.body);
        client.sendMessages(request.body);
        return response.status(200).send("ok");
    } catch (err) {
        return response.status(400).json({
            msg: "Error in send QRCode from user",
        });
    };
});

export { router };
