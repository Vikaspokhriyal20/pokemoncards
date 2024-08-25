import React from 'react'
import './PokemonCard.css'

const PokemonCards = ({ pokemonData }) => {
    return (
        <li className='pokemon-card'>
            <figure>
                <img src={pokemonData.sprites.other.dream_world.front_default}
                    alt={pokemonData.name} className='pokemon-image' />
            </figure>

            <p className='pokemon-name'>{pokemonData.name}</p>

            <p className='pokemon-type'>
                {pokemonData.types.map((curType) => curType.type.name).join(' , ')}
            </p>

            <div className="pokemon-details">
                <div>
                    <p>{pokemonData.height}</p>
                    <p>Height</p>
                </div>
                <div>
                    <p>{pokemonData.weight}</p>
                    <p>Weight</p>
                </div>
                <div>
                    <p>{pokemonData.stats[5].base_stat}</p>
                    <p>Speed</p>
                </div>
            </div>

            <p className='Base-Experience'>Base-Experience : {pokemonData.base_experience}</p>





        </li>
    )
}

export default PokemonCards
