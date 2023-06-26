function decodeIPv4Header(binaryStr) {
    var fields = [
        {name: "Version", bits: 4},
        {name: "IHL", bits: 4},
        {name: "DSCP", bits: 6},
        {name: "ECN", bits: 2},
        {name: "Total Length", bits: 16},
        {name: "Identification", bits: 16},
        {name: "Flags", bits: 3},
        {name: "Fragment Offset", bits: 13},
        {name: "TTL", bits: 8},
        {name: "Protocol", bits: 8},
        {name: "Header Checksum", bits: 16},
        {name: "Source IP Address", bits: 32},
        {name: "Destination IP Address", bits: 32}
    ];

    var start = 0;
    var decodedHeader = {};
    for (var i=0; i<fields.length; i++) {
        var field = fields[i];
        var bits = binaryStr.slice(start, start+field.bits);
        if (field.name.includes("Address")) {
            // Convert to IP address
            var hexVal = parseInt(bits, 2).toString(16).padStart(8, "0");
            var ipParts = [];
            for (var j=0; j<8; j+=2) {
                ipParts.push(parseInt(hexVal.slice(j, j+2), 16));
            }
            decodedHeader[field.name] = ipParts.join(".");
        } else {
            var hexVal = parseInt(bits, 2).toString(16).padStart(field.bits / 4, "0");
            decodedHeader[field.name] = hexVal;
        }
        start += field.bits;
    }
    return decodedHeader;
}

function decode() {
    var binaryStr = document.getElementById("binary_str").value;
    if (binaryStr.length !== 160) {
        alert("Input should be a 160-bit binary string.");
        return;
    }
    var decodedHeader = decodeIPv4Header(binaryStr);
    var output = "";
    for (var key in decodedHeader) {
        output += key + ": " + decodedHeader[key] + "\n";
    }
    document.getElementById("output").innerText = output;
}