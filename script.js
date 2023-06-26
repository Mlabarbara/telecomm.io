document.getElementById('decodeButton').addEventListener('click', () => {
    const binaryInput = document.getElementById('binaryInput').value;
    const result = document.getElementById('result');
    
    if (/^[01\s]+$/.test(binaryInput)) {
      const binaryString = binaryInput.replace(/\s+/g, '');
      const decodedString = String.fromCharCode(parseInt(binaryString, 2));
      result.innerText = `Decoded: ${decodedString}`;
    } else {
      result.innerText = 'Invalid binary input';
    }
  });