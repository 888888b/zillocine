import FetchMovies from '/src/components/ContainerMovies';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";
import { LuSearch } from "react-icons/lu";
import Search from "/src/components/SearchBar";
import Footer from '/src/components/footer';
import '/src/App.css';

function Series() {
    const [btnAtivo, setBtnAtivo] = useState('btnDesativado');
    const navigate = useNavigate();
    const [autorizado, setAutorizado] = useState(false);
    const [genreMovie, setGenreMovie] = useState('lançamentos');
    const [hideBar, setHideBar] = useState(true);
    const AppRef = useRef();
    const genreBtns = useRef();

    const btnClick = () => {
        if (btnAtivo === 'btnDesativado'){
          setBtnAtivo('btnAtivo')
        }else{
          setBtnAtivo('btnDesativado')
        }
    }
    
    const handleGenres = (e) => {
        const valor = e.target.value
        setGenreMovie(valor);
        handleColorBtn(e.target.value);
    }

    const btnNavigate = (e) => {
        console.log(e);
        navigate(`/${e.target.id}`)
    }

    const HandleHideChange = (newValue) => {
        setHideBar(newValue);
        AppRef.current.style.opacity = '0';
        AppRef.current.style.zIndex = '-200';
    }

    const hideBarSearch = () => {
        if (hideBar === true) {
          setBtnAtivo('desativado');
          setHideBar(false);
        AppRef.current.style.opacity = '.9';
        AppRef.current.style.zIndex = '100';
        }
    }

    const handleColorBtn = (genre) => {
        if (genreBtns.current){
            const children = genreBtns.current.children;
            for (let child in children){
                if (children[child].childNodes[0].value === genre){
                    children[child].childNodes[0].style.color = 'white';
                }else{
                    children[child].childNodes[0].style.color = 'rgba(255, 255, 255, 0.7)';
                }
            }
        }
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            setAutorizado(true);
        }, 1000);
    },[]);

    return(
        <main className="moviesPageContainer">
            <div ref={AppRef} className='opacity-div'></div>
            <div className="div-menu" id={btnAtivo}>
                <ul>
                    <li><button onClick={btnClick}><h1 id="p-1">/</h1><h1 id="p-2">\</h1></button></li>
                    <li><p id='' onClick={btnNavigate}>Inicio</p></li>
                    <li><p id='Series' onClick={btnNavigate}>Series</p></li>
                    <li><p id='Filmes' onClick={btnNavigate}>Filmes</p></li>
                    <li><p onClick={hideBarSearch}>Pesquisar</p></li>
                    <li><p id='Perfil' onClick={btnNavigate}>Conta</p></li>
                </ul>
            </div>

            <Search onValueChange={HandleHideChange} hide={hideBar}/>

            <div className="header-links">
                <div className='links-content'>
                    <div id="btn-filmes-series" className="link-icons">
                        <button onClick={btnClick} className="btn-menu">|||</button>
                        <a onClick={btnNavigate} id='' className='btn-header'>Home</a>
                        <a className='btn-header' id='Filmes' onClick={btnNavigate}>Filmes</a>
                    </div>

                    <div className="links-titulo">
                        <h1>MovieZilla</h1>
                    </div>

                    <div className='link-icons'>
                        <LuSearch onClick={hideBarSearch} className='lupa-icon'/>
                        <div className="button-header-div">
                        <button  id='Perfil' onClick={btnNavigate}>C</button>
                        <h3 id='Perfil' onClick={btnNavigate}>Conta</h3>
                        </div>
                    </div>
                </div>
            </div>

            {autorizado === true ? (
                    <div className='barraGeneros'>
                        <ul ref={genreBtns}>
                            <li><button value='Lançamentos' onClick={handleGenres}>Lançamentos</button></li>
                            <li><button value='Terror' onClick={handleGenres}>Suspense</button></li>
                            <li><button value='Ação' onClick={handleGenres}>Ação</button></li>
                            <li><button value='Comedia' onClick={handleGenres}>Comedia</button></li>
                            <li><button value='Documentario' onClick={handleGenres}>Documentarios</button></li>
                        </ul>
                    </div>
                ) : null
            }

                <div className='box-series'>
                    <FetchMovies titulo={genreMovie} btn='false' page='1' tipo='serie' genre={genreMovie}/>
                    <FetchMovies  page='2' tipo='serie' genre={genreMovie}/>
                    <FetchMovies  page='3' tipo='serie' genre={genreMovie}/>
                    <FetchMovies  page='4' tipo='serie' genre={genreMovie}/>
                    <FetchMovies  page='5' tipo='serie' genre={genreMovie}/>
                </div>
            
            <Footer/>
        </main>
    )
}

export default Series;