const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            devTools: process.env.NODE_ENV === 'development'
        }
    })

    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:8080')
        win.webContents.openDevTools()
        win.maximize()
    } else {
        win.loadFile('app/index.html')
    }

    return win
}

app.whenReady().then(() => {
    app.setName('Hello World');

    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
