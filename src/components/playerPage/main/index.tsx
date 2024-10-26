// Interface de tipos para objetos retornados pela api do TMDB
import { tmdbObjProps } from "@/components/contexts/tmdbContext";

// Componente para carregamento preguiçoso de imagens
import { LazyLoadImage } from "react-lazy-load-image-component";

import * as Style from '@/components/playerPage/styles';

type componentProps = {
    contentData: tmdbObjProps;   
    contentType: string;
};

export default function Main( props: componentProps ) {
    console.log(props.contentData);

     // Obtem o classificação geral do conteudo
    const getImdbReviews = ( vote_average: number, vote_count: number ) => {
        return (
            <p className='text-base font-medium font-noto_sans rounded'>
                <span className="mr-[6px]">Imdb: </span>

                <span className=' text-neutral-400 font-normal'>{ vote_average.toFixed(1) } ({ vote_count } Avaliações)</span>
            </p>
        );
    };

    // Obtem o orçamento do filme/serie
    const handleBudgetAndRevenue = ( value: number ) => {

        if ( value < 1000000000 ) {
            if ( value < 1000000 ){
                if ( value < 1000 ) {
                    if ( value > 0 ) return `${ value } dolares`;
                    return 'Valor não disponivel';
                };
        
                const division = parseInt(( value / 1000 ).toFixed(0));
                return `${ division } mil dolares`;
            };

            const division = parseInt(( value / 1000000 ).toFixed(0));
            return `${ division } milhões de dolares`;

        } else {
            if ( value > 0 ) {
                const division = parseInt(( value / 1000000000 ).toString()[0]);
                const rest = parseInt(( value % 1000000000 ).toString()[0]);
                return `${[ division, rest ].join('.')} bilhões de dolares`;
            };
        };

        return 'Valor não disponivel';
    };

    // Obtem o tempo de duração do filme 
    const getRunTime = ( runtime: number | null ) => {

        if ( !runtime || runtime === 0 ) {
            return (
                <span className="font-noto_sans whitespace-nowrap text-base font-normal text-neutral-400 ">
                    Duração não disponivel
                </span>
            );
        };

        if ( runtime < 60 ) {
            return <span className="font-noto_sans whitespace-nowrap text-base font-normal text-neutral-400 ">{ runtime }m</span>
        };

        const hours = ( runtime / 60 ).toFixed(0);
        const minites = runtime % 60;

        return  <span className="font-noto_sans whitespace-nowrap text-base font-normal text-neutral-400 ">{ hours }h { minites }m</span>
    };

    // Obtem o nome dos produtores do filme/serie
    const getContentProducers = ( crew: tmdbObjProps[] ) => {
        const producers = crew.filter( people => people.job === 'Producer');
        const producersName: string[] = [];

        if ( producers.length > 0 ) {
            producers.forEach( producer => {
                producersName.push( producer.name );
            });

            if ( producersName.length >= 2 ) return producersName.join(', ');
            return producersName[0];
        };

        return 'Informação não disponivel';
    };

    const getContentCreator = ( creators: tmdbObjProps[] ) => {
        const creatorsName: string[] = []

        if ( creators.length > 0 ) {
            creators.forEach( creator => {
                creatorsName.push( creator.name );
            });

            if ( creatorsName.length >= 2 ) return creatorsName.join(', ');
            return creatorsName[0];
        };

        return 'Informação não disponivel';
    };

    return (
        <div className="flex flex-col font-noto_sans">
                <p className='text-justify w-full text-[17px] leading-loose text-neutral-300 max-w-4xl px-4 md:px-6 lg:px-8'>
                    { props.contentData.overview.length > 3 ? props.contentData.overview : `Desculpe, a descrição deste conteúdo não pode ser carregada neste momento` }
                </p>

                <div className="bg-darkpurple w-full mt-5 pt-5 pb-10 px-4 md:px-6 lg:px-8">
                    <h2 className="text-xl lg:text-2xl font-semibold">
                        Mais sobre { props.contentType === 'movie' ? 'o filme' : 'a série' }
                    </h2>

                    <div className="mt-5 relative flex flex-col gap-y-7 items-start">
                        <div className="sm:absolute sm:left-0 h-full">
                            <LazyLoadImage
                                src={`https://image.tmdb.org/t/p/original${props.contentData.poster_path ?? props.contentData.backdrop_path}`}
                                alt={`${props.contentData.title ?? props.contentData.name} movie/serie presentation image`}
                                width={240}
                                height={'100%'}
                                effect="opacity"
                                placeholderSrc={`https://image.tmdb.org/t/p/w92/${props.contentData.poster_path ?? props.contentData.backdrop_path}`}
                                className='w-60  h-full object-cover bg-darkpurple image rounded'
                            />
                        </div>

                        <Style.ContentDetailsWrapper>                            
                            <div>
                                {getImdbReviews( props.contentData.vote_average, props.contentData.vote_count )}
                                <p className="content-detail text-base font-medium rounded">
                                    <span className="mr-[6px]">Gêneros:</span>

                                    <span className="text-neutral-400 font-normal ">
                                        { props.contentData.genres.map(( genre: Record<string, (string | number)> ) => genre.name ).join(', ')}
                                    </span>
                                </p>

                                { props.contentType === 'serie' ? (
                                    <p className="content-detail text-base font-medium rounded">
                                        <span className="mr-[6px]">Criado por:</span>

                                        <span className="text-neutral-400 font-normal ">
                                            {getContentCreator( props.contentData.created_by )}
                                        </span>
                                    </p>
                                ) : null }

                                <p className="content-detail text-base font-medium rounded">
                                    <span className="mr-[6px]">Direção:</span>

                                    <span className="text-neutral-400 font-normal ">
                                        {getContentProducers( props.contentData.credits.crew )}
                                    </span>
                                </p>

                                <p className="content-detail text-base font-medium rounded">
                                    <span className="mr-[6px]">Data de lançamento:</span>

                                    <span className="text-neutral-400 font-normal ">
                                        { props.contentData.release_date ?? props.contentData.first_air_date }
                                    </span>
                                </p>

                                { props.contentType === 'movie' ? (
                                    <p className="content-detail text-base font-medium rounded">
                                        <span className="mr-[6px]">Orçamento:</span>

                                        <span className="text-neutral-400 font-normal ">
                                            {handleBudgetAndRevenue( props.contentData.budget )}
                                        </span>
                                    </p>
                                ) : null }
                            </div>

                            <div>
                               { props.contentType === 'movie' ? (
                                    <p className="content-detail text-base font-medium rounded">
                                        <span className="mr-[6px]">Bilheteria:</span>

                                        <span className="text-neutral-400 font-normal ">
                                            {handleBudgetAndRevenue( props.contentData.revenue )}
                                        </span>
                                    </p>
                               ) : null }

                                <p className="content-detail text-base font-medium rounded">
                                    <span className="mr-[6px]">Pais de produção:</span>

                                    <span className="text-neutral-400 font-normal ">
                                        { props.contentData.production_countries.map(( genre: Record<string, (string | number)> ) => genre.name ).join(', ')}
                                    </span>
                                </p>

                                <p className="content-detail text-base font-medium rounded">
                                    <span className="mr-[6px]">Produtora(s):</span>

                                    <span className="text-neutral-400 font-normal ">
                                        { props.contentData.production_companies.map(( company: Record<string, (string | number)> ) => company.name ).join(', ')}
                                    </span>
                                </p>

                                { props.contentType === 'movie' ? (
                                    <p className="content-detail text-base font-medium rounded">
                                        <span className="mr-[6px]">Duração:</span>

                                        {getRunTime( props.contentData.runtime )}
                                    </p>
                                ) : null }

                               { props.contentType === 'serie' ? (
                                    <p className="content-detail text-base font-medium rounded">
                                        <span className="mr-[6px]">Numero de temporadas:</span>

                                        <span className="text-neutral-400 font-normal ">
                                            { props.contentData.number_of_seasons }
                                        </span>
                                    </p>
                               ) : null }

                                { props.contentType === 'serie' ? (
                                    <p className="content-detail text-base font-medium rounded">
                                        <span className="mr-[6px]">Numero de episódios:</span>

                                        <span className="text-neutral-400 font-normal ">
                                            { props.contentData.number_of_episodes }
                                        </span>
                                    </p>
                               ) : null }
                                    
                            </div>
                        </Style.ContentDetailsWrapper>
                    </div>
                </div>     
        </div>
    );
};