function decodeIPv4Header(binaryInput) {
  const result = {};

  if (binaryInput.length !== 162) {
    throw new Error('Input must be exactly 162 binary digits');
  }

  const hexString = parseInt(binaryInput, 2).toString(16).padStart(40, '0');
  const hexValues = hexString.match(/.{1,2}/g);

  result.version = parseInt(hexValues[0][0], 16);
  result.headerLength = parseInt(hexValues[0][1], 16);
  result.tos = hexValues[1];
  result.totalLength = parseInt(hexValues[2] + hexValues[3], 16);
  result.identification = hexValues[4] + hexValues[5];
  result.flagsAndFragments = hexValues[6] + hexValues[7];
  result.ttl = parseInt(hexValues[8], 16);
  result.protocol = parseInt(hexValues[9], 16);
  result.headerChecksum = hexValues[10] + hexValues[11];
  result.source = hexValues.slice(12, 16).join('');
  result.destination = hexValues.slice(16, 20).join('');

  return result;
}

function displayIPv4Header(binaryInput) {
  try {
    const ipv4Header = decodeIPv4Header(binaryInput);
    console.log(`Version: ${ipv4Header.version}`);
    console.log(`Header length: ${ipv4Header.headerLength} (${ipv4Header.headerLength * 4} bytes)`);
    console.log(`TOS: 0x${ipv4Header.tos}`);
    console.log(`Total Length: 0x${ipv4Header.totalLength.toString(16).padStart(4, '0')} (${ipv4Header.totalLength} bytes)`);
    console.log(`Identification: 0x${ipv4Header.identification}`);
    console.log(`Flags and Fragments: 0x${ipv4Header.flagsAndFragments}`);
    console.log(`TTL: 0x${ipv4Header.ttl.toString(16).padStart(2, '0')} (${ipv4Header.ttl} hops)`);
    console.log(`Protocol: 0x${ipv4Header.protocol.toString(16).padStart(2, '0')} (UDP)`);
    console.log(`Header Checksum: 0x${ipv4Header.headerChecksum}`);
    console.log(`Source: 0x${ipv4Header.source} (${parseInt(ipv4Header.source.slice(0, 2), 16)}.${parseInt(ipv4Header.source.slice(2, 4), 16)}.${parseInt(ipv4Header.source.slice(4, 6), 16)}.${parseInt(ipv4Header.source.slice(6, 8), 16)})`);
    console.log(`Destination: 0x${ipv4Header.destination} (${parseInt(ipv4Header.destination.slice(0, 2), 16)}.${parseInt(ipv4Header.destination.slice(2, 4), 16)}.${parseInt(ipv4Header.destination.slice(4, 6), 16)}.${parseInt(ipv4Header.destination.slice(6, 8), 16)})`);
  } catch (error) {
    console.error(error.message);
  }
}

const binaryInput = '01000101000000000000000001000100101011010000101100000000000000000100000000010001011100100111001010101100000101000000000000000110';
displayIPv4Header(binaryInput);