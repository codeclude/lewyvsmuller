var fs = require('fs');
const { parseData } = require('./StatsLoader');

fs.readFile('./src/lewygoals.json', 'utf-8', async (err, data) => {
    if (err) throw err;

    parseData("https://www.transfermarkt.pl/robert-lewandowski/leistungsdaten/spieler/38253/plus/0?saison=2020")
    .then((lewygoals) => {
        if(JSON.stringify(lewygoals) != data) {
            fs.writeFile('./src/lewygoals.json', JSON.stringify(lewygoals), function (err) {
                if (err) return console.log(err);
                console.log('File modified');
              });
        }
    })
    .catch((e) => console.warn(e));
    
});