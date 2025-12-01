function copyUrlDesktop() {
  navigator.clipboard.writeText(window.location.href);
  const copyMessage = document.querySelector(".copy-message");
  if (copyMessage) {
    copyMessage.classList.remove("opacity-0");
    copyMessage.classList.add("opacity-100");
    copyMessage.classList.remove("bottom-9");
    copyMessage.classList.add("bottom-10");
    setTimeout(() => {
      copyMessage.classList.remove("opacity-100");
      copyMessage.classList.add("opacity-0");
      copyMessage.classList.remove("bottom-10");
      copyMessage.classList.add("bottom-9");
    }, 2000);
  }
}

function copyUrlMobile() {
  navigator.clipboard.writeText(window.location.href);
  const copyMessage = document.querySelector(".copy-message-mobile");
  if (copyMessage) {
    copyMessage.classList.remove("opacity-0");
    copyMessage.classList.add("opacity-100");
    copyMessage.classList.remove("right-9");
    copyMessage.classList.add("right-10");
    setTimeout(() => {
      copyMessage.classList.remove("opacity-100");
      copyMessage.classList.add("opacity-0");
      copyMessage.classList.remove("right-10");
      copyMessage.classList.add("right-9");
    }, 2000);
  }
}

export { copyUrlDesktop, copyUrlMobile };
