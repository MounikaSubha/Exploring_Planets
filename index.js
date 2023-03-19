const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planets) {
    return planets['koi_disposition'] === 'CONFIRMED' && planets['koi_insol'] > 0.36 &&
        planets['koi_insol'] < 1.11 && planets['koi_prad'] < 1.6;
}
fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('error', (err) => {
        console.log(`oops ${err}`);
    })
    .on('end', () => {
        console.log(`Woohoo,We have found ${habitablePlanets.length} planets!`)
        console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name']
        }))
        console.log("All Done!");
    });