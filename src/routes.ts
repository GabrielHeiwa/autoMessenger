import { Router } from "express";
import { socketServer } from ".";
import WebWhatsappClient from "./services"

const router = Router();
let client: WebWhatsappClient;
router.get("/qrcode", (request, response) => {
    try {
        client = new WebWhatsappClient();
        socketServer.on("connection", socket => {
            console.log(socket.id);
            
            client.qrcode(socket.id);
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
