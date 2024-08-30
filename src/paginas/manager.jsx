import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/configFirebase.';

export default function Manager() {
    const [data, setData] = useState([]);

    // Fetch data from Firestore
    useEffect(() => {
        const fetchData = async () => {
            const mensajesRef = collection(db, "mensajes");
            const res = await getDocs(mensajesRef);
            const getData = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            console.log("Datos de la base", getData);
            setData(getData);
        };

        fetchData();
    }, []);

    // Handle checkbox change
    const handleCheckboxChange = (id) => {
        setData(prevData => 
            prevData.map(item => 
                item.id === id ? { ...item, aprobado: !item.aprobado } : item
            )
        );
    };
    

    // Handle form submission

    const onSubmit = async (id, aprobado) => {
        const mensajeRef = doc(db, "mensajes", id); // Get the document reference
        await updateDoc(mensajeRef, { aprobado }); // Enviar el valor actual del checkbox
        console.log(`Mensaje con ID ${id} actualizado a aprobado: ${aprobado}`);
    };


    return (
        <> <div className='manager-container'>

            <h2 className='manager-title'>Ceratwit Manager</h2>
            <section style={{width: '80vw',height: '100%', display: 'flex', flexDirection: 'column', backGroundColor: 'black'}}>
                {data.map((d) => (
                    <article key={d.id} style={{ color: "white", display: 'flex', border: 'solid 1px white', backGroundColor: 'black' }}>
                        <div className="nombre">
                            <p>{d.nombre}</p>
                        </div>
                        <div className="texto">
                            <p>{d.texto}</p>
                        </div>
                        <div style={{ textAlign: 'center', marginLeft: '3em' }}>
                            <p style={{ color: 'white' }}>Visible</p>
                            <input
                                type="checkbox"
                                checked={d.aprobado} // Reflect the current state
                                onChange={() => handleCheckboxChange(d.id)} // Update the state for this checkbox
                            />
                        </div>
                        <div style={{display: 'flex', justifyContent:'end', width: '100%'}}>

                        <button style={{alignSelf: 'center'}}
                            className='boton' 
                            onClick={() => onSubmit(d.id, d.aprobado)} // Submit the current state
                        >
                            Actualizar
                        </button>
                        </div>
                        
                    </article>
                    
                ))}
            </section>
        </div>
        </>
    );
}
