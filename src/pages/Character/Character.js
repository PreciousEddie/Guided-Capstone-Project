import React, { useState, useEffect } from "react";
import IceAndFireApi from "../../services/IceAndFireApi";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";

const Character = () => {
    const { characterId } = useParams();
    const [character, setCharacter] = useState(null);
    const [allegiances, setAllegiances] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                console.log("Fetching character with ID:", characterId);
                const response = await IceAndFireApi.getCharacterById(characterId);
                console.log("Character response:", response);
                setCharacter(response);
                await fetchAllegiances(response.allegiances);
            } catch (error) {
                console.error("Error fetching character:", error);
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

        console.log("Effect - characterId:", characterId);
        fetchCharacter();
    }, [characterId]);

    console.log("Render - character:", character);
    console.log("Render - allegiances:", allegiances);

    if (!character) {
        return <Spinner color="light"></Spinner>;
    }

    return (
        <Container>
            <h1 className="mt-5 mb-4">Character Information</h1>
            { error && <p className="text-danger">{ error }</p> }
            <Card>
                <Card.Body>
                    <Card.Title>
                        { character.name || (character.aliases.length > 0 ? character.aliases[0] : "Unnamed") }
                    </Card.Title>
                    <Card.Text>
                        <p>Culture: { character.culture || "Unknown" }</p>
                        <p>Gender: { character.gender === "Male" ? "♂️" : character.gender === "Female" ? "♀️" : "Unknown" }</p>
                        <p>Born: { character.born || "Unknown" }</p>
                        <p>Died: { character.died || "Unknown" }</p>
                        <p>Titles: { character.titles.join(", ") || "No Titles" }</p>
                        <p>Aliases: { character.aliases.join(", ") || "No Aliases" }</p>
                        <p>Father: { character.father || "Unknown" }</p>
                        <p>Mother: { character.mother || "Unknown" }</p>
                        <p>
                            Spouse:{ " " }
                            { character.spouse ? (
                                <Link to={ `/character/${character.spouse.split("/").pop()}` }>{ character.spouse.split("/").pop() }</Link>
                            ) : (
                                "Unknown"
                            ) }
                        </p>
                        <p>
                            Allegiances:{ " " }
                            { allegiances.length > 0 ? (
                                allegiances.map((allegiance, index) => (
                                    <Link
                                        key={ index }
                                        to={ `/house/${character.allegiances[index].split("/").pop()}` }
                                        className="mr-2"
                                    >
                                        { allegiance }
                                    </Link>
                                ))
                            ) : (
                                "Unknown"
                            ) }
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Character;
