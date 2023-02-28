import axios from 'axios'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export default function handler(req, res) {
    const { pokemon } = req.body;
    const { pokeball } = req.body;
    let N = 0;
    if (pokeball == "pokeball") {
        N = getRandomInt(1, 256)
    } else if (pokeball == "greatball") {
        N = getRandomInt(0, 201)
    } else {
        N = getRandomInt(1, 151)
    }
    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon
    let HP_Max = 0;
    let BALL = 12;
    if (pokeball == "greatball") {
        BALL = 8;
    } 
    
    axios.get(url)
        .then(function (response) {
            HP_Max = response.data.stats[0].base_stat;
            let HP_Current = getRandomInt(1, HP_Max);
        
            let f = (HP_Max * 255 * 4) / (HP_Current * BALL);
            const caught = {
                caught: f >= N ? true : false
            }
            res.status(200).send(caught);
    
        })
        .catch(function (error) {
            res.status(400).send("Not a valid pokemon!");
        })
    
    
}