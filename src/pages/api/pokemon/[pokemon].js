import axios from 'axios'

export default function hanlder(req, res) {
    //GT - returns the name, sprite, and type of a certain Pokemon
    const { pokemon } = req.query
    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon
    axios.get(url)
        .then(function (response) {
            const poke = {
                pokemonName: response.data.name,
                sprite: response.data.sprites.front_default,
                types: response.data.types
                    .map((element) => element.type.name)
                    .join(", ")
            };
            res.status(200).send(poke);
        })
        .catch(function (error) {
            res.status(400).send("Not a valid pokemon!");
        })
}