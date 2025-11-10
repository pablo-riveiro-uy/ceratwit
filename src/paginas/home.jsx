import React from 'react';
import '../App.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/configFirebase.';
import Footer from '../components/footer';

const MAX = 140;

export default function Home() {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const [messageSent, setMessageSent] = useState(false); // Estado para el mensaje de éxito
    const texto = watch('texto', '');
    const len = (texto || '').trim().length;
    const over = len > MAX;

    const onSubmit = handleSubmit(async (data) => {
        // Sanitización: remover HTML, colapsar espacios, trim y cortar a MAX
        const clean = (s = "") =>
          s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
        const textoSan = clean(data.texto).slice(0, MAX);
        const nombreSan = clean(data.nombre || "").slice(0, 60);
        if (!textoSan) return; // no enviar vacío

        const mensajeRef = collection(db, "mensajes");
        await addDoc(mensajeRef, {
          texto: textoSan,
          nombre: nombreSan,
          aprobado: false,
          createdAt: Date.now()
        });

        reset();
        setMessageSent(true);
        setTimeout(() => setMessageSent(false), 2500);
    });

    return (
        <>
            <section className='container' style={{ width: '100%', padding: '24px' }}>
                <div className="bg-overlay" aria-hidden="true" style={{ background: 'rgba(0,0,0,0.6)' }}></div>
                <header>
                    <h1>CERATWIT</h1>
                    <p>Dejanos lo que diga tu corazón sobre Gustavo.</p>
                </header>
                <main>
                    <form className='form-Container' onSubmit={onSubmit}>
                        <textarea
                            className='textarea'
                            rows="7"
                            cols="50"
                            id='mensaje'
                            aria-invalid={over}
                            aria-describedby="count help"
                            placeholder="Escribí tu mensaje (máx. 140)"
                            style={{ borderRadius: 12, marginBottom: '24px', outline: 'none', boxShadow: '0 0 0 2px transparent', transition: 'box-shadow 0.15s ease-in-out' }}
                            {...register('texto', {
                                required: true,
                                maxLength: MAX
                            })}
                            onFocus={(e)=>e.target.style.boxShadow='0 0 0 2px #0A84FF'}
                            onBlur={(e)=>e.target.style.boxShadow='0 0 0 2px transparent'}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                          <span
                            id="count"
                            role="status"
                            aria-live="polite"
                            style={{
                              fontWeight: 600,
                              color: over ? 'crimson' : (len >= 120 ? 'orange' : 'white'),
                              textShadow: '0 0 3px black'
                            }}
                          >
                            {len}/{MAX}
                          </span>
                        </div>
                        {over && (
                          <div
                            id="help"
                            style={{ color: 'white', fontWeight: 500, marginTop: 4, textShadow: '0 0 3px black' }}
                          >
                            Máximo 140 caracteres.
                          </div>
                        )}
                        <label className='label-nombre' htmlFor="nombre" style={{ marginTop: '16px' }}>Tu nombre</label>
                        <input
                            style={{ color: 'white', borderRadius: 12, outline: 'none', boxShadow: '0 0 0 2px transparent', transition: 'box-shadow 0.15s ease-in-out' }}
                            className='elemento'
                            type="text"
                            id="nombre"
                            {...register('nombre', {
                                required: true
                            })}
                            onFocus={(e)=>e.target.style.boxShadow='0 0 0 2px #0A84FF'}
                            onBlur={(e)=>e.target.style.boxShadow='0 0 0 2px transparent'}
                        />
                        {errors.nombre && <span>🛸 Hey, incluye un nombre 🛸</span>}
                        <button
                          className='boton'
                          type='submit'
                          disabled={over || len === 0}
                          style={{
                            borderRadius: 12,
                            background: over || len === 0 ? 'rgba(10,132,255,.35)' : '#0A84FF',
                            color: 'white',
                            height: 48,
                            padding: '0 20px',
                            border: 'none',
                            marginTop: '24px'
                          }}
                        >
                          Enviar mensaje
                        </button>
                    </form>
                    {messageSent && (
                      <span style={{ display:'block', marginTop: '8px', color:'#34C759', fontWeight: 500, textAlign:'center' }}>
                        Mensaje enviado con éxito.
                      </span>
                    )}
                </main>
            </section>
            <Footer />
        </>
    );
}
