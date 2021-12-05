const downloadFile = (
  data,
  separator,
  title,
  fileType,
  fileExt
) => {
  const element = document.createElement("a");
  const file = new Blob([data.join(separator)], { type: fileType });

  element.href = URL.createObjectURL(file);
  element.download = `${title}-${Date()}.${fileExt}`;

  document.body.appendChild(element); // Required for this to work in FireFox

  element.click();
}

export default downloadFile

