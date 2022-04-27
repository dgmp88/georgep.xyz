export function downloadSVG(draw) {
  // this does some funky magic where it creates then deletes a url for easy downloading
  let data = draw.svg();
  let filename = 'background.svg';
  let type = 'plain/text';
  var file = new Blob([data], { type: type });
  var a = document.createElement('a'),
    url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}
