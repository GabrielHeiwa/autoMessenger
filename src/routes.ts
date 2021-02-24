import { Router } from "express";
import { Client } from "whatsapp-web.js";


const router = Router();


router.get("/qrcode", (request, response) => {
    const ClientWhatsapp = new Client({});
    const qrcode = require("qrcode-terminal");


    ClientWhatsapp.on("qr", (qr) => {
        response.send(`<img src="${qr}" />`);
        console.log(qrcode.generate(qr));
    });


    ClientWhatsapp.initialize();
});

export { router };
