const downloadFile = function (sUrl) {
  // iOS devices do not support downloading. We have to inform user about this.
  if (/(iP)/g.test(navigator.userAgent)) {
    // alert('Your device does not support files downloading. Please try again in desktop browser.');
    window.open(sUrl, '_blank');
    return false;
  }
  // If in Chrome or Safari - download via virtual link click
  if (downloadFile.isChrome || downloadFile.isSafari) {
    // Creating new link node.
    const link = document.createElement('a');
    link.href = sUrl;
    link.setAttribute('target', '_blank');

    if (link.download !== undefined) {
      // Set HTML5 download attribute. This will prevent file from opening if supported.
      const fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
      link.download = fileName;
    }

    // Dispatching click event.
    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }

  // Force file download (whether supported by server).
  if (sUrl.indexOf('?') === -1) {
    sUrl += '?download';
  }

  window.open(sUrl, '_blank');
  return true;
};

downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
export default downloadFile;
