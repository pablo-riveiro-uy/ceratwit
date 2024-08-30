import React from 'react';
import '../App.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/configFirebase.';
import Footer from '../components/footer';

export default function Home() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [chars, setChars] = useState(0);

    const handleCount = () => {
        const textarea = document.getElementById('mensaje');
        setChars(textarea.value.length);
    };

    const onSubmit = handleSubmit(async (data) => {
        console.log("mensaje a enviar", data);
        const mensajeRef = collection(db, "mensajes");
        Object.assign(data, { aprobado: false });
        await addDoc(mensajeRef, data);
        reset(); // Resetea el formulario después de enviar
    });

    return (
        <>
            <section className='container'>
                <header>
                    <h1>CERATWIT</h1>
                    <p>Dejanos lo que diga tu corazón sobre Gustavo</p>
                </header>
                <main>
                    <form className='form-Container' onSubmit={onSubmit}>
                        <textarea
                            className='textarea'
                            rows="7"
                            cols="50"
                            id='mensaje'
                            {...register('texto', {
                                required: true,
                                maxLength: 140
                            })}
                            onChange={handleCount} />
                        <div className='count'>{chars}</div>
                        {errors.texto?.type === 'required' && <span>🛸 Por favor, escribe un mensaje 🛸</span>}
                        {errors.texto?.type === 'maxLength' && <span>🛸 Puedes escribir hasta 140 caracteres 🛸</span>}
                        <label className='label-nombre' htmlFor="nombre">Tu nombre </label>
                        <input
                            style={{ color: 'white' }}
                            className='elemento'
                            type="text"
                            {...register('nombre', {
                                required: true
                            })} />
                        {errors.nombre && <span>🛸 Hey, incluye un nombre 🛸</span>}
                        <button className='boton' type='submit'>Envíar</button>
                    </form>
                    <Footer />
                </main>
            </section>
        </>
    );
}
