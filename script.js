async function scan() {
    let target = document.getElementById("target").value;
    let ports = document.getElementById("ports").value;
    let result = document.getElementById("result");

    result.innerHTML = "Scan en cours...";

    try {
        let res = await fetch(`https://port-scanner-jen6.onrender.com/scan?target=${target}&ports=${ports}`);
        let data = await res.json();

        let html = "";

        for (let port in data) {
            let color = data[port] === "open" ? "lime" : "red";
            html += `<p style="color:${color}">Port ${port} : ${data[port]}</p>`;
        }

        result.innerHTML = html;

    } catch {
        result.innerHTML = "❌ Erreur serveur";
    }
}
