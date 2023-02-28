//returns the next evolution step for a specified Pokemon. If the Pokemon is fully evolved, return the current evolution stage

import axios from 'axios'

export default function handler(req, res) {
    const { name } = req.query
    let originalurl = 'https://pokeapi.co/api/v2/pokemon-species/' + name
    axios.get(originalurl)
        .then(function (response) {
            let evolutionurl = response.data.evolution_chain.url;
            axios.get(evolutionurl)
                .then(function (response) {
                    const evolution = { 
                        evolution: lookfor(response.data.chain, name) 
                    };
                    res.status(200).send(evolution);
                })
                .catch(function (error) {
                    res.status(400).send("Not a valid pokemon!");
                })
        })
        .catch(function (error) {
            res.status(400).send("Not a valid pokemon!");
        })


}

function lookfor(data, name) {
    if (data.species.name == name) {
        let sol = [];
        for (let i = 0; i < data.evolves_to.length; i++) {
            sol.push(data.evolves_to[i].species.name)
        }
        return sol;
    } else {
        for (let i = 0; i < data.evolves_to.length; i++) {
            return lookfor(data.evolves_to[i], name);
        }
    }

}

