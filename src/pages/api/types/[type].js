import axios from 'axios'

export default function hanlder(req, res) {

    const { type } = req.query

    let url = 'https://pokeapi.co/api/v2/type/' + type
    
    axios.get(url)
        .then(function (response) {
            const pokemon = {
                pokemon: response.data.pokemon
                    .map((element) => element.pokemon.name)
            };
            res.status(200).send(pokemon);
        })
        .catch(function (error) {
            res.status(400).send("Not a valid type!");
        })
}