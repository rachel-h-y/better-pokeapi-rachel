import axios from 'axios'

export default function hanlder(req, res) {
    //GT - returns the name, sprite, and type of a certain Pokemon
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }
    let randNum = getRandomInt(1, 1009)

    let url = 'https://pokeapi.co/api/v2/pokemon/' + randNum
    axios.get(url)
        .then(function (response) {
            const random = {
                name: response.data.name,
                sprite: response.data.sprites.front_default,
                types: response.data.types
                    .map((element) => element.type.name)
            };
            res.status(200).send(random);
        })
        .catch(function (error) {
            res.status(400).send("Not a valid pokemon!");
        })
}