import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

// import carousel1 from './img/carousel-1.jpg';
// import carousel2 from './img/carousel-2.jpg';
// import engine from './img/engine.jpg';
import injecao from './img/injecao.png';
import manutencao from './img/manutencao.png';
import suspencao from './img/suspencao.png';
import oleo from './img/oleo.png';
import marcas1 from './img/marcas1.png';
import marcas2 from './img/marcas2.png';
import marcas3 from './img/marcas3.png';


const Home = () => {

    return (
        <>
            <div className="carousel carousel-slider center">
            <div className="carousel-fixed-item center">
              <Link to="/login" className="btn waves-effect white white-text red darken-4">agende um horario</Link>
            </div>
            <div className="carousel-item white-text" href="https://br.freepik.com/fotos-vetores-gratis/carro">
                <img src="{carousel1}" alt="" className="responsive-img" /> 
            </div>

            <div className="carousel-item green white-text" href="https://br.freepik.com/fotos-vetores-gratis/carro">
                <img src="{carousel2}" alt="" className="responsive-img" />
            </div>
          </div>

            <section className="center">
              <h3>BEM VINDO À REPCAR</h3>
            <h6>A oficina mecânica certa para quem procura profissionalismo, rapidez e qualidade.</h6>
            <div className="row center">
              <div className="col l3 s12">
                <h5>Manutenção</h5> 
                  <img src={manutencao} className="icon-workshop" />
                  <p>A manutenção veicular tem como principal propósito evitar possíveis falhas ou 
                    problemas que possam aparecer ao longo da vida útil do veículo.</p>
                </div>
              <div className="col l3 s12">
                <h5>Injeção eletrônica</h5>
                <img src={injecao} className="icon-workshop " />
                <p>Devido a sua complexidade, o Sistema de Injeção Eletrônica somente deve ser 
                  manuseado por profissionais competentes.</p>
              </div>
              <div className="col l3 s12">
                <h5>Suspenção</h5>
                <img src={suspencao} className="icon-workshop  " />
                <p>Um carro só anda macio e oferece segurança se todos seus componentes estiverem funcionando bem.</p>
              </div>
              <div className="col l3 s12">
                <h5>Troca de óleo</h5>
                <img src={oleo} className="icon-workshop  " />
                <p>O óleo do carro é essencial para lubrificar, limpar e refrigerar o motor, e tem seu desempenho 
                  prejudicado quando não é trocado no prazo correto.</p>
              </div>
            </div>
            </section>
            
              
<div className="fixed-action-btn">
  <a className=" btn-small red darken-4" id="top">
    <i className="large material-icons">arrow_drop_up
    </i>
  </a>
</div>
          <div className="parallax-container">
            <div className="parallax">
              <img src="{engine}" />
              
            </div>
          </div>

         <div className="center">
           <h3 >TRABALHAMOS COM DIVERSAS MARCAS</h3>
           <div className="row">
             <div className="col s12 m4">
               <img src={marcas1} alt="" className="responsive-img" />
             </div>
             <div className="col s12 m4">
              <img src={marcas2} alt="" className="responsive-img" />
            </div>
            <div className="col s12 m4">
              <img src={marcas3} alt="" className="responsive-img" />
            </div>
           </div>
         </div>
        </>
    )
}

export default Home;