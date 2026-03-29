async function scan() {
    let target = document.getElementById("target").value;
    let ports = document.getElementById("ports").value;
    let result = document.getElementById("result");

    result.innerHTML = "Scan en cours...";

    try {
        let res = await fetch(`http://127.0.0.1:5000/scan?target=${target}&ports=${ports}`);
        let data = await res.json();

        let html = "";
        for (let port in data) {
            html += `Port ${port} : ${data[port]}<br>`;
        }

        result.innerHTML = html;

    } catch {
        result.innerHTML = "Erreur serveur";
    }
}
