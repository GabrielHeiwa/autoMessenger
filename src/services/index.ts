import { Client } from "whatsapp-web.js";
import { socketServer } from "../index";
import { toDataURL } from "qrcode";

interface DataMessages {
    message: string;
    time: number;
    numbers: string[];
}

class WebWhatsappClient {
    private ClientWhatsapp: Client;
    constructor() {

        this.ClientWhatsapp = new Client({
            puppeteer: {
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                ],
                headless: false
            },
            
        });

        this.ClientWhatsapp.on("disconnected", () => {
            console.log("Disconnected!");
            this.ClientWhatsapp.destroy();
        });

        this.ClientWhatsapp.on("ready", () => {
            console.log("Whathsapp conectado!");
        });

        this.ClientWhatsapp.initialize();
    };

    async qrcode(socketID: string) {
        this.ClientWhatsapp.on("qr", async (qr) => {
            const qrcode = await toDataURL(qr, {})

            socketServer.to(socketID).emit("qr", qrcode);
            console.log("send qr from: " + socketID );
            
        });
    };

    async sendMessages(dataMessages: DataMessages) {
        let count = 0;
        let interval = setInterval(async () => {
            if (count === dataMessages.numbers.length) {
                await this.ClientWhatsapp.logout();
                clearInterval(interval);
                return console.log("End messages");
            };

            await this.ClientWhatsapp.sendMessage(dataMessages.numbers[count] + "@c.us", dataMessages.message);
            console.log(dataMessages.numbers[count] + "@c.us");
            count++;
        }, dataMessages.time);
    };
};

export default WebWhatsappClient;