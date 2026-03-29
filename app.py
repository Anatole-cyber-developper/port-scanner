from flask import Flask, request, jsonify
import socket

app = Flask(__name__)

def scan_port(target, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    result = sock.connect_ex((target, port))
    sock.close()
    return result == 0

@app.route("/scan")
def scan():
    target = request.args.get("target")
    ports = request.args.get("ports")

    ports = [int(p) for p in ports.split(",")]

    results = {}

    for port in ports:
        results[port] = "open" if scan_port(target, port) else "closed"

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
