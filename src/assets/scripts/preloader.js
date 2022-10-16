const windowOnLoad = () => {
  document.body.classList.add('loaded--hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded--hiding');
  }, 500);
};

window.addEventListener('load', windowOnLoad);
