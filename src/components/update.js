import React, { useState, useEffect } from 'react';
import { Button, Form, Select } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Update() {
    let history = useHistory();
    const [id, setID] = useState(null)
    const [etat, setEtat] = useState("A servir");

    const etatOptions = [
        {key:'1', value:'a_servir', text: 'À servir'},
        {key:'2', value:'servi', text: 'Servi'},
        {key:'3', value:'extourne', text: 'Extourné'},
        {key:'4', value:'restitue', text: 'Restitué'},
        {key:'5', value:'bloque', text: 'Bloqué'},
        {key:'6', value:'debloque_a_servir', text: 'Débloqué à servir'},
    ]

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setEtat(localStorage.getItem('Etat'));
    }, []);

    const updateAPIData = () => {
        axios.put(`http://localhost:/${id}`, {
            etat
        }).then(() => {
            history.push('/read')
        })
    } 
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <Select value={etat} options={etatOptions}/>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
