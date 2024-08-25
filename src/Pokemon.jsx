import React, { useEffect, useState } from 'react'
import PokemonCards from './PokemonCards';

const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);



    const API = 'https://pokeapi.co/api/v2/pokemon?limit=24';

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

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchPokemon();
    }, []);


    return (
        <section>
            <div className="container">
                <header className='header'>
                    <h2>Pokemon Cards Once Again</h2>
                </header>
                    <ul className='grid-col-4'>
                        {
                            pokemon.map((currPokemon) => {
                                return <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
                            })
                        }
                    </ul>
            </div>
        </section>
    )
}

export default Pokemon
