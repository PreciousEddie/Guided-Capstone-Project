import React, { useState, useEffect } from "react";
import IceAndFireApi from "../../services/IceAndFireApi";
import { useParams } from "react-router-dom";

const Character = () => {
    const { characterId } = useParams();
    const [character, setCharacter] = useState(null);
    const [allegiances, setAllegiances] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await IceAndFireApi.getCharacterById(characterId);
                setCharacter(response);
                await fetchAllegiances(response.allegiances);
            } catch (error) {
                setError("Error fetching character. Please try again later.");
            }
        };

        const fetchAllegiances = async (allegianceUrls) => {
            const allegiancePromises = allegianceUrls.map(async (url) => {
                try {
                    const response = await IceAndFireApi.getAllegianceByUrl(url);
                    return response.name || "Unknown Allegiance";
                } catch (error) {
                    return "Unknown Allegiance";
                }
            });

            const allegianceNames = await Promise.all(allegiancePromises);
            setAllegiances(allegianceNames);
        };

        fetchCharacter();
    }, [characterId]);

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Character Information</h1>
            { error && <p>{ error }</p> }
            <div>
                <h2>{ character.name || (character.aliases.length > 0 ? character.aliases[0] : "Unnamed") }</h2>
                <p>Culture: { character.culture || "Unknown" }</p>
                <p>Gender: { character.gender === "male" ? "♂️" : character.gender === "female" ? "♀️" : "Unknown" }</p>
                <p>Born: { character.born || "Unknown" }</p>
                <p>Died: { character.died || "Unknown" }</p>
                <p>Titles: { character.titles.join(", ") || "No Titles" }</p>
                <p>Father: { character.father || "Unknown" }</p>
                <p>Mother: { character.mother || "Unknown" }</p>
                <p>
                    Spouse:{ " " }
                    { character.spouse ? (
                        <a href={ character.spouse } target="_blank" rel="noopener noreferrer">
                            Click To View
                        </a>
                    ) : (
                        "Unknown"
                    ) }
                </p>
                <p>
                    Allegiances:{ " " }
                    { allegiances.length > 0 ? (
                        allegiances.map((allegiance, index) => (
                            <a key={ index } href={ character.allegiances[index] } target="_blank" rel="noopener noreferrer">
                                { allegiance }
                            </a>
                        ))
                    ) : (
                        "Unknown"
                    ) }
                </p>
            </div>
        </div>
    );
};

export default Character;
