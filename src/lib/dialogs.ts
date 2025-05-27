

export const disableDialogs = () => {
    let dialog = document.querySelector('dialog');
    dialog?.setAttribute("style", "display: none;");
    dialog?.close()
}

export const enableDialogs = () => {
    let dialog = document.querySelector('dialog');
    dialog?.setAttribute("style", "display: flex;");
    dialog?.showModal()
}