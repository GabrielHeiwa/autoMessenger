// const socket = io("http://localhost:3000");
// const response = axios.get("http://localhost:3000/qrcode").then(response => console.log(response.data));
// io.on("", (data) => console.log(data));


// Start process for send messanger.
const btnSubmit = document.querySelector("button#btnSubmit");

btnSubmit.addEventListener("click", () => {

});


// Read CSV file for get numbers.
const inputFileCSV = document.querySelector("input#csvFile");

inputFileCSV.addEventListener("change", (e) => {
    const Reader = new FileReader();
    Reader.onload = (e) => {
        console.log(e.target.result);
    };
    Reader.readAsText(e);
});