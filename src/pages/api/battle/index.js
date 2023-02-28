import axios from 'axios'

export default function handler(req, res) {
    const { pokemon1 } = req.body;
    const { pokemon2 } = req.body;
    let url1 = 'https://pokeapi.co/api/v2/pokemon/' + pokemon1
    let url2 = 'https://pokeapi.co/api/v2/pokemon/' + pokemon2
    let x = 0
    let y = 0
    axios.get(url1)
        .then(function (response) {
            for (let i = 0; i < data.stats.length; i++) {
                x = x + (data.stats[0].base_stat)
            }
        })
        .catch(function (error) {
            res.status(400).send("Not a valid pokemon!");
        })
    axios.get(url1)
        .then(function (response) {
            for (let i = 0; i < data.stats.length; i++) {
                y = y + (data.stats[0].base_stat)
            }
        })
        .catch(function (error) {
            res.status(400).send("Not a valid pokemon!");
        })
    const winner = {
        winner: x > y ? pokemon1 : pokemon2
    }
    res.status(200).send(winner);
}