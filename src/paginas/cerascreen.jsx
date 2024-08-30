import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/configFirebase.';
import video from '../assets/fondo-byn.mp4'
import 'animate.css';


export default function CeraScreen() {
    const [data, setData] = useState([]);
    const [visibleArticles, setVisibleArticles] = useState([]); // Estado para los artículos visibles

    useEffect(() => {
        const mensajesRef = collection(db, "mensajes");
        const q = query(mensajesRef, where('aprobado', '==', true));
    
        getDocs(q)
            .then((res) => {
                let getData = [];
                
                res.docs.forEach((doc) => {
                    getData.push({ ...doc.data(), id: doc.id });
                });
                
                console.log("de la base", getData);
                setData(getData); 

                // Mostrar cada artículo con un retraso de 6 segundos
                getData.forEach((item, index) => {
                    setTimeout(() => {
                        setVisibleArticles(prev => [...prev, item]); // Agregar el artículo al estado visible
                    }, index * 6000); // Multiplicar por 6000 para 6 segundos
                });
            });
    }, []);

    return (
        <>
            <section className='mensajes-Container'>
                <h2 className='titulo'>Dejá tu CERATWIT usando el código QR</h2>
                <video className='video' loop autoPlay muted>
                    <source src={video} type="video/mp4" />
                </video>
                {visibleArticles.map((d) => (
                    <article className='mensaje animate__animated animate__backInLeft  animate__delay-6s' key={d.id}>
                        <p>{d.texto}</p>
                        <h4 style={{fontStyle: 'italic'}}>{d.nombre}</h4>
                        
                    </article>
                ))}
            </section>
        </>
    );
}
