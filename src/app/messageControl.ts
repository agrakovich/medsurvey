// const electron = window.require('electron');
// const { ipcRenderer } = electron;

import { IpcRenderer } from 'electron';

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}

const { ipcRenderer } = window;


export function send(message: string) {
    return new Promise((resolve) => {
        ipcRenderer.once('asynchronous-reply', (_: any, arg: unknown) => {
            resolve(arg);
        });
        ipcRenderer.send('asynchronous-message', message);
    });
}
