const path = require("path");
const {app, BrowserWindow} = require('electron');

const urls = [
    "https://bajopalabra.com.mx"
]


const createWindow = () =>{
    win = new BrowserWindow({
        center: true,
        resizable: true,
        webPreferences:{
            preload: path.join(app.getAppPath(), 'preload.js'),
            nodeIntegration: true,
            show: false
        },
    });
    win.maximize();
    // win.webContents.openDevTools();
    //win.webContents.

    win.loadURL(urls[0]);
    // win.loadURL(url.format({
    //     pathname: path.join(__dirname,"index.html"),
    //     protocol: 'file',
    //     slashes: true
    // }));
    win.once('ready-to-show',()=>{
        win.show()
    });

    win.on('closed',()=>{
        win = null;
    });
}

app.on('ready', createWindow);