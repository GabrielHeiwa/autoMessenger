import { Router } from "express";
import { Client } from "whatsapp-web.js";
import { create, toDataURL } from "qrcode";


const router = Router();


router.get("/qrcode", (request, response) => {
    const ClientWhatsapp = new Client({});
    const qrcode = require("qrcode-terminal");


    ClientWhatsapp.on("qr", async (qr) => {
        const imgSrc = await toDataURL(qr, {})
        response.send(`<img src="${imgSrc}"/>`);
    });

    ClientWhatsapp.on("ready", () => {
        console.log("Whathsapp conectado!");
    });


    ClientWhatsapp.initialize();
});

export { router };
