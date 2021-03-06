import { Client } from "whatsapp-web.js";
import { toDataURL } from "qrcode";
import socketIOServer from "../socket";


interface DataMessages {
    message: string;
    time: number;
    numbers: string[];
}

// WebWhatsapp Class client.
class WebWhatsappClient {
    private ClientWhatsapp: Client;
    private socketID: string;
    constructor(socketID: string) {
        this.socketID = socketID;

        this.ClientWhatsapp = new Client({
            puppeteer: {
                args: [
                    '--no-sandbox',
                ],
            },

        });

        this.ClientWhatsapp.on("disconnected", (reason) => {
            socketIOServer.to(this.socketID).emit("status", "Whatsapp disconectado!");
        });

        this.ClientWhatsapp.on("ready", () => {
            socketIOServer.to(this.socketID).emit("status", "Whatsapp conectado!")
        });

        this.ClientWhatsapp.initialize().catch(err => console.log(`\n Erro no inicializar:` + err.message));
    };

    async qrcode() {
        // Function for send QrCode authentication.
        this.ClientWhatsapp.on("qr", async (qr) => {
            try {
                const qrcode = await toDataURL(qr, {})
                socketIOServer.to(this.socketID).emit("qr", qrcode);
                return socketIOServer.to(this.socketID).emit("status", "Enviando QrCode!");
            } catch (err) {
                return socketIOServer
                    .to(this.socketID)
                    .emit("status", "Erro ao enviar o QrCode para o cliente.");
            };
        });
    };

    async sendMessages(dataMessages: DataMessages) {
        // Function for send messages.
        socketIOServer.to(this.socketID).emit("status", "Enviando mensagens!");
        let count = 0;
        let interval = setInterval(async () => {
            if (count === dataMessages.numbers.length) {
                try {
                    await this.ClientWhatsapp.logout();
                    clearInterval(interval);
                    return;
                } catch (err) {
                    return socketIOServer
                        .to(this.socketID)
                        .emit("status", `Erro ao finalizar o client`);
                };
            };

            // Send messages for numbers.
            try {
                await this.ClientWhatsapp
                    .sendMessage(dataMessages.numbers[count] + "@c.us", dataMessages.message)
                    .then(() => socketIOServer.to(this.socketID).emit("total-messages", count));
                socketIOServer.to(this.socketID).emit("messages-status", {
                    message: dataMessages.message,
                    to: dataMessages.numbers[count],
                    time: new Date().toISOString(),
                });
                count++;
                return;
            } catch (err) {
                socketIOServer
                    .to(this.socketID)
                    .emit("status", `Erro ao enviar a mensagem para ${dataMessages.numbers[count]}`);
                return;
            };
        }, dataMessages.time);
    };

    async destroyClient() {
        await this.ClientWhatsapp.pupBrowser.close();
    };
};

export default WebWhatsappClient;