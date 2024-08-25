import React, { useEffect, useState } from 'react'
import PokemonCards from './PokemonCards';

const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');



    const API = 'https://pokeapi.co/api/v2/pokemon?limit=124';

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data);

            const detailedPokemonData = data.results.map(async (currPokemon) => {
                const res = await fetch(currPokemon.url);
                const data = await res.json();
                return data;
            });

            // console.log(detailedPokemonData);

            const detailedResponse = await Promise.all(detailedPokemonData);

            console.log(detailedResponse);

            setPokemon(detailedResponse);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    }


    useEffect(() => {
        fetchPokemon();
    }, []);



     // search functionanlity

    const searchData = pokemon.filter((currPokemon) =>
        currPokemon.name.toLowerCase().includes(search.toLowerCase())
    );


    if (loading) {
        return (
            <div className='loading'>
                <p>Loading...</p>
            </div>
        )
    }



    if (error) {
        return (
            <div className='Error'>
                <p>{error.message} ☹</p>
            </div>
        )
    }


    return (
        <section>
            <header className='header'>
                <h2>Pokemon Cards Once Again</h2>
            </header>

            <div className="pokemon-search">
                <input
                    type="text"
                    placeholder='search pokemon'
                    className='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
            </div>

            <ul className='grid-col-4'>
                {
                    searchData.map((currPokemon) => {
                        return <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
                    })
                }
            </ul>
        </section>
    )
}

export default Pokemon
