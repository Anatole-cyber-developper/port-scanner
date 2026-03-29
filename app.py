from flask import Flask, request, jsonify
import socket

app = Flask(__name__)

MAX_PORTS = 20

def scan_port(target, port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.5)
        result = sock.connect_ex((target, port))
        sock.close()
        return result == 0
    except:
        return False

@app.route("/scan")
def scan():
    target = request.args.get("target")
    ports = request.args.get("ports")

    try:
        ports = [int(p) for p in ports.split(",")][:MAX_PORTS]
    except:
        return jsonify({"error": "Invalid ports"}), 400

    results = {}

    for port in ports:
        results[port] = "open" if scan_port(target, port) else "closed"

    return jsonify(results)

if __name__ == "__main__":
    app.run()
