async function scan() {
    let target = document.getElementById("target").value;
    let ports = document.getElementById("ports").value;
    let resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "Scan en cours...";

    try {
        let response = await fetch(`http://127.0.0.1:5000/scan?target=${target}&ports=${ports}`);
        let data = await response.json();

        let html = "";

        for (let port in data) {
            html += `Port ${port} : ${data[port]}<br>`;
        }

        resultDiv.innerHTML = html;

    } catch {
        resultDiv.innerHTML = "Erreur de connexion au serveur";
    }
}
