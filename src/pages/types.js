import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import { Button, Box } from '@mui/material';

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function Types() {
    const type = "normal"

    const { data, error, isLoading, isValidating } = useSWR(`/api/types/${type}`, fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Must Implement your API. Data is empty</h2>
        </>
    )
    let { pokemon } = data


    return (
        <>
        <Box
            sx={{
            my: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Type: {type}</h2>
                    <ul>{pokemon.map(poke => <ul>{poke}</ul>)}</ul>
                </>
            )}
            </Box>
        </>
    )
}