# Simple File Server

A simple and lightweight file server built with Node.js and Express. It provides a clean web interface to list, upload, and download files on your local network.

---

## Features

* **List Files**: Automatically lists all files from the designated `uploads` directory.
* **File Upload**: Upload files through a simple web form.
* **File Download**: Download any listed file with a single click.
* **Mobile Access**: Generates a QR code in the console that you can scan with your phone to access the server.

---

## How to Use

1.  **Install Dependencies**
    Run this command to install `express`, `multer`, and `qrcode-terminal`.
    ```bash
    npm install
    ```

2.  **Run the Server**
    Start the server with the following command:
    ```bash
    node server.js
    ```

3.  **Access the File Server**
    Once the server is running, your console will display access information:
    ```
    ✅ Server is running!
    > Local:   http://localhost:3000
    > Network: http://192.168.1.102:3000

    Scan the QR code below with your phone to access the server:
    ... (QR Code will be displayed here) ...
    ```
    * Open `http://localhost:3000` in your browser on the same machine.
    * To access from another device (like your phone), make sure it's on the **same Wi-Fi network** and either scan the QR code or manually enter the network URL (e.g., `http://192.168.1.102:3000`).

