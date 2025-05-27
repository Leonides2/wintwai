

export const disableDialogs = () => {
    const dialog = document.querySelector('dialog');
    dialog?.setAttribute("style", "display: none;");
    dialog?.close()
}

export const enableDialogs = () => {
    const dialog = document.querySelector('dialog');
    dialog?.setAttribute("style", "display: flex;");
    dialog?.showModal()
}