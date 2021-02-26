import { Router } from "express";
import WebWhatsappClient from "./services"

const router = Router();

router.get("/qrcode", (request, response) => {
    try {
        WebWhatsappClient.qrcode()
        return response.status(200);
    } catch (err) {
        return response.status(400).json({
            msg: "Error in send QRCode from user",
        });
    };
});

router.post("/send", (request, response) => {
    try {
        console.log(request.body);
        WebWhatsappClient.sendMessages(request.body);
        return response.status(200);
    } catch (err) {
        return response.status(400).json({
            msg: "Error in send QRCode from user",
        });
    };
});

export { router };
