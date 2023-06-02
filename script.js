const fs = require('fs');
fs.readFile('./eiendommer.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const eiendommer = [];
    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i+=6) {
        const gardsnr = lines[i];
        const bruksnr = lines[i+2];
        const kommune = lines[i+4];
        eiendommer.push({gardsnr, bruksnr, kommune});
    }
    const getData = async (eiendommer) => {
        for (i = 0; i < eiendommer.length; i++) {
            const eiendom = eiendommer[i];
            console.log(`Fetching data ${i} of ${eiendommer.length}`)
            const res = await fetch(`https://ws.geonorge.no/eiendom/v1/geokoding?omrade=true&kommunenummer=${eiendom.kommune}&gardsnummer=${eiendom.gardsnr}&bruksnummer=${eiendom.bruksnr}&utkoordsys=4258`)
            const data = await res.json();
            eiendom.geometri = data;
        }
        console.log(JSON.stringify(eiendommer, null, 2));
    }

    getData(eiendommer);
});
