import axios from 'axios'

export default function handler(req, res) {
    const { name } = req.query
    const { level } = req.query

    let speciesurl = 'https://pokeapi.co/api/v2/pokemon-species/' + name
    
    axios.get(speciesurl)
        .then(function (response) {
            let growth = response.data.growth_rate.name
            let exp = 0;
            if (growth == "slow") {
                exp = 5 * level * level * level / 4
            } else if (growth == "medium") {
                exp = level * level * level
            } else if (growth == "fast") {
                exp = 4 * level * level * level / 5
            } else if (growth == "medium-slow") {
                exp = 6 * level * level * level / 5 - 15 * level * level + 100 * level - 140
            } else if (growth == "slow-then-very-fast") {
                if (level < 50) {
                    exp = (level * level * level * (100 - level))/50
                } else if (level < 68) {
                    exp = (level * level * level * (150 - level))/100
                } else if (level < 98) {
                    exp = (level * level * level * Math.floor((1911 - 10n) / 3))/500
                } else {
                    exp = (level * level * level * (160 - level))/100
                }
            } else if (growth == "fast-then-very-slow") {
                if (level < 15) {
                    exp = level * level * level * (Math.floor((level + 1)/3) + 24) / 50
                } else if (level < 36) {
                    exp = (level * level * level * (14 + level))/50
                } else {
                    exp = level * level * level * (Math.floor(level/2) + 32) / 50
                }
            }

            const experience  = {
                experience : exp 
            }
            res.status(200).send(experience)
        })
        .catch(function (error) {
            res.status(400).send("Not a valid pokemon!");
        })


}



