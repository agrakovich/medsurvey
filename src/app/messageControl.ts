const electron = window.require('electron');
const { ipcRenderer } = electron;

export function send(message: string) {
    return new Promise((resolve) => {
        ipcRenderer.once('asynchronous-reply', (_: any, arg: unknown) => {
            resolve(arg);
        });
        ipcRenderer.send('asynchronous-message', message);
    });
}
