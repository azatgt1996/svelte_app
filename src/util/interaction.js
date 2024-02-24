import { writable } from 'svelte/store';

export const confirmModal = writable(false)
export const confirmText = writable('')

let confirmResolve = new Function();

export function showConfirm(text = 'Are you sure?') {
  confirmText.set(text);
  confirmModal.set(true);
  return new Promise(_reslove => confirmResolve = _reslove)
}

export const yesClick = () => confirmResolve(true)
export const noClick = () => confirmResolve(false)



export const promptModal = writable(false)
export const promptText = writable('')
export const promptValue = writable('')

let promptResolve = new Function();

export function showPrompt(text = 'Type value') {
  promptValue.set('');
  promptText.set(text);
  promptModal.set(true);
  return new Promise(_reslove => promptResolve = _reslove)
}

export const okClick = (value = '') => promptResolve(value)
export const cancelClick = () => promptResolve(null)