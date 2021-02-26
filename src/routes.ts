import { Router } from "express";
import { Client } from "whatsapp-web.js";
import { create, toDataURL } from "qrcode";
import { socketServer } from ".";


const router = Router();


router.get("/qrcode", (request, response) => {
    const ClientWhatsapp = new Client({
        puppeteer: {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ],
        }
    });
    const qrcode = require("qrcode-terminal");


    ClientWhatsapp.on("qr", async (qr) => {
        const imgSrc = await toDataURL(qr, {})
        socketServer.emit("qr", imgSrc);
    });
    
    ClientWhatsapp.on("ready", () => {
        console.log("Whathsapp conectado!");
    });

    ClientWhatsapp.initialize();

    return response.end()
});

export { router };
