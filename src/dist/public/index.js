const socket = io("http://localhost:3333");
const qrCodeImg = document.querySelector("img");
socket.on("qr", (data) => qrCodeImg.src = data);
const response = axios.get("http://localhost:4444/qrcode").then(response => console.log(response.data));

const btnSubmit = document.querySelector("button#btnSubmit");
const inputFileCSV = document.querySelector("input#csvFile");
const inputMessage = document.querySelector("textarea#message");
let validNumbers = [], invalidNumbers = [];

btnSubmit?.addEventListener("click", () => {
    if (inputFileCSV.files.length === 0) return alert("Selecione um arquivo com os números que deseja enviar.");
    if (inputMessage.value === "") return alert("Escreva uma mensagem para os contatos");

    const variables = {
        message: inputMessage.value,
        numbers: validNumbers,
        time: 5000
    };
    axios.post("http://localhost:4444/send", variables)
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
