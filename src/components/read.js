import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
   useEffect(() => {
        axios.get(``)
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, []); 
    

    const setData = (data) => {
        let { id, ref, etat } = data;
        localStorage.setItem('Référence', ref)
        localStorage.setItem('ID', id);
        localStorage.setItem('Etat', etat)
    }

    const getData = () => {
        axios.get(``)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:/${id}`)
        .then(() => {
            getData();
        })
    }

    //Une fonction qui sert à envoyer une requête à un endpoint qui provoquera l'envoi d'une notification au bénéficiaire
    const giveNotification = (id) => {
        axios.post(`http://localhost:/${id}`)
        .then(() => {
            getData();
        })
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Référence</Table.HeaderCell>
                        <Table.HeaderCell>Montant</Table.HeaderCell>
                        <Table.HeaderCell>Client</Table.HeaderCell>
                        <Table.HeaderCell>Bénéficiaire</Table.HeaderCell>
                        <Table.HeaderCell>Motif</Table.HeaderCell>
                        <Table.HeaderCell>Etat</Table.HeaderCell>
                        <Table.HeaderCell>PIN</Table.HeaderCell>
                        <Table.HeaderCell>Notification</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>


                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.ref}</Table.Cell>
                                <Table.Cell>{data.montant} DH</Table.Cell>
                                <Table.Cell>{data.client}</Table.Cell>
                                <Table.Cell>{data.beneficiaire}</Table.Cell>
                                <Table.Cell>{data.motif}</Table.Cell>
                                <Table.Cell>
                                <Link to='/update'>
                                    <Table.Cell> 
                                        <Button onClick={() => setData(data)}>{data.etat}</Button>
                                    </Table.Cell>
                                </Link>
                                </Table.Cell>
                                <Table.Cell>{data.pin}</Table.Cell>
                                <Table.Cell> 
                                    <Button onClick={() => giveNotification(data.id)}>Oui</Button>
                                </Table.Cell>
                                <Table.Cell>
                                <Button onClick={() => onDelete(data.id)}>Supprimer</Button> 
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
