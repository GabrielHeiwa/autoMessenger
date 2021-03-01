let activeButtonForSendMessages = false;
const qrCodeImg = document.querySelector("img");
const btnSubmit = document.querySelector("button#btnSubmit");
const inputFileCSV = document.querySelector("input#csvFile");
const inputMessage = document.querySelector("textarea#message");
let validNumbers = [], invalidNumbers = [];

btnSubmit.disabled = true;

const socket = io();
socket.on("connect", async () => {
    console.info(`socket:${socket.id} connect`);
    // await axios.get("/qrcode").then(res => console.info(res.data));

    socket.on("status", status => {
        console.info(status);
        if (status === "Whatsapp conectado!") return btnSubmit.disabled = false;
    });

    socket.on("messages-status", messages_status => console.table(messages_status));

    socket.on("qr", (data) => qrCodeImg.src = data);

});

btnSubmit.addEventListener("click", async () => {
    if (inputFileCSV.files.length === 0) return alert("Selecione um arquivo com os números que deseja enviar.");
    if (inputMessage.value === "") return alert("Escreva uma mensagem para os contatos");

    const variables = {
        message: inputMessage.value,
        numbers: validNumbers,
        time: 5000
    };
    await axios.post("http://localhost:4444/send", variables)
});


// Read CSV file for get numbers.
inputFileCSV.addEventListener("change", async (e) => {
    readCSVFile(e.target.files[0]);

    function readCSVFile(CSV) {
        const reader = new FileReader();
        reader.onload = (e) => {
            parseCSVFile(e.target.result)

        };
        reader.readAsText(CSV);
    };

    function parseCSVFile(CSVText) {
        let numberList = CSVText.split("\n").map(n => n.replace(/\D/gi, ""));
        validateNumbers(numberList);
    };

    function validateNumbers(numberList) {
        for (let i = 0; i < numberList.length; i++) {
            console.log(numberList[i].length);
            if (numberList[i].length === 12) {
                validNumbers.push(numberList[i]);
            };
        };

        console.log(validNumbers, invalidNumbers);
    };

});
