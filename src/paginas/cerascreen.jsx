import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/configFirebase.';
import video from '../assets/fondo-byn.mp4';
import 'animate.css';
import Footer from '../components/footer';

export default function CeraScreen() {
    const [data, setData] = useState([]);
    const [visibleArticles, setVisibleArticles] = useState([]); // Estado para los artículos visibles

    const fetchMessages = async () => {
        const mensajesRef = collection(db, "mensajes");
        const q = query(mensajesRef, where('aprobado', '==', true));
        const res = await getDocs(q);
        const getData = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setData(getData);
        startDisplayingMessages(getData);
    };

    useEffect(() => {
        fetchMessages(); // Llamar a fetchMessages al cargar el componente
    }, []);

    const startDisplayingMessages = (messages) => {
        setVisibleArticles([]); // Reiniciar artículos visibles
        let index = 0; // Índice para controlar el mensaje actual

        const displayNextMessage = () => {
            if (index < messages.length) {
                setVisibleArticles([messages[index]]); // Mostrar el mensaje actual
                index++; // Incrementar el índice
                setTimeout(displayNextMessage, 6000); // Esperar 6 segundos antes de mostrar el siguiente
            } else {
                // Si se han mostrado todos los mensajes, consultar nuevos mensajes
                setTimeout(() => {
                    fetchMessages(); // Consultar nuevos mensajes
                }, 6000); // Esperar 6 segundos antes de reiniciar
            }
        };

        displayNextMessage(); // Iniciar la visualización de mensajes
    };

    return (
        <>
            <section className='mensajes-Container'>
                <h2 className='titulo'>Dejá tu CERATWIT usando el código QR</h2>
                <video className='video' loop autoPlay muted>
                    <source src={video} type="video/mp4" />
                </video>
                <Footer/>
                {visibleArticles.map((d) => (
                    <article className='mensaje animate__animated animate__backInLeft' key={d.id}>
                        <p >{d.texto}</p>
                        <h4 style={{ fontStyle: 'italic' }}>{d.nombre}</h4>
                    </article>
                ))}
                
            </section>
        </>
    );
}
