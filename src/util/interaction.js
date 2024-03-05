import { writable } from 'svelte/store';

export const confirmModal = writable(false)
export const confirmText = writable('')

let confirmResolve = new Function();

export function showConfirm(text = 'Are you sure?') {
  confirmText.set(text);
  confirmModal.set(true);
  return new Promise(_resolve => confirmResolve = _resolve)
}

export const yesClick = () => confirmResolve(true)
export const noClick = () => confirmResolve(false)



export const promptModal = writable(false)
export const promptText = writable('')
export const promptHint = writable('')
export const promptValue = writable('')

let promptResolve = new Function();

export function showPrompt(title = 'Some title', hint = 'Some hint') {
  promptValue.set('');
  promptText.set(title);
  promptHint.set(hint);
  promptModal.set(true);
  return new Promise(_resolve => promptResolve = _resolve)
}

export const okClick = (value = '') => promptResolve(value)
export const cancelClick = () => promptResolve(null)