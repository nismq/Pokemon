import { useEffect, useState } from "react"
import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/'
const IMG_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
const countAddress = API_URL + 'pokemon-species/?limit=0'


export default function Pokemon({index, random}) {
    const [pokeCount, setPokeCount] = useState(0)
    const [pokemonReady, setPokemonReady] = useState(false)
    const [pokeId, setPokeId] = useState(0)
    const [types, setTypes] = useState([])
    const [name, setName] = useState('')
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [abilities, setAbilities] = useState([])
    const [imgfront, setImagfront] = useState('')
    const [imgback, setImgback] = useState('')

    useEffect(() => {
        if(random === true){
            index = Math.floor(Math.random() * pokeCount + 1)
        }
        const address = API_URL + 'pokemon/' + index;
        axios.get(countAddress)
            .then((response) => {
                setPokeCount(response.data.count)
            }).catch(error => {
                
            })

        axios.get(address)
            .then((response) => {
                console.log(response.data)
                setPokeId(response.data.id)
                setTypes(response.data.types)
                setName(response.data.name)
                setHeight(response.data.height)
                setWeight(response.data.weight)
                setAbilities(response.data.abilities)
                setImagfront(IMG_URL + index + '.png')
                setImgback(IMG_URL + 'back/' + index + '.png')    
                setPokemonReady(true)
            }).catch(error => {
                setPokemonReady(false)
            })
    },[index]) //useEffect is triggered when index changes

    function showImages(){
        //Checking if back images exists. If not then show only front image centered
        fetch(imgback, { method: 'HEAD' })
            .then(res => {
                if (res.ok) {
                    console.log('Image exists.');
                } else {
                    setImgback(null)
                }
            }).catch(err => console.log('Error:', err));
        
        if(imgback){
            return(
                <>
                    <td><img src={imgfront} alt='' /></td>
                    <td><img src={imgback} alt='' /></td>
                </>
            )
        }else{
            return <td colSpan={2}><img src={imgfront} alt='' /></td>
        }
    }
    
    function showTypeList(){
        //Checking if pokemon has one or two types
        const typeList = types.map(types => (
            <td class="types" id={types.type.name}>{types.type.name}</td>
            ))

        if(typeList.length === 1){
            return <td colSpan={2}>{typeList[0]}</td>
        }else{
            return(
                <>
                    <td>{typeList[0]}</td> 
                    <td>{typeList[1]}</td>
                </>
                ) 
        }

    }

    const abilitiesList = abilities.map(abilities => (
        <td class="abilities">{abilities.ability.name}</td>
    ))

    if(pokemonReady){
        return (
            <>
            <div id="container">
                <table>
                    <tr>
                        <th colSpan={2}>#{pokeId.toString().padStart(3,'0')}</th>
                    </tr>
                    <tr>
                        <th colSpan={2}>{name.toUpperCase()}</th>
                    </tr>
                    <tr>
                        {showImages()}
                    </tr>
                    <tr>
                        <th colSpan={2}>Type</th>
                    </tr>
                    <tr>
                        {showTypeList()}
                    </tr>
                    <tr>
                        <th>Height</th>
                        <th>Weight</th>
                    </tr>
                    <tr>
                        <td>{height/10} m</td>
                        <td>{weight/10} kg</td>
                    </tr>
                    <tr>
                        <th colSpan={2}>Abilities</th>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {abilitiesList}
                        </td>
                    </tr>
                </table>
            </div>
            </>
        )
    } else{
        return null
    }


}