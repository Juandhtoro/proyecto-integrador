import { Box } from "@mui/material";
import "./about.scss";

const About = () => {
    return (
        <Box className="about">
            <Box
                component="section"
                className="about__section">
                <h3>Misión</h3>
                <img
                    src="/images/about/mision.jpg"
                    alt="Fotrografía de la misión de la empresa"/>
                <p className="card__text card__text--short"> En nuestra empresa de ropa deportiva, tenemos el firme compromiso de transformar vidas a través del deporte y el movimiento. Nuestra misión es proporcionar a nuestros clientes prendas de alta calidad que no solo los ayuden a alcanzar sus metas deportivas, sino que también los inspiren a adoptar un estilo de vida activo y saludable.
                </p><br/>
                <p className="card__text card__text--short">
                Nos esforzamos por ser más que una simple marca de ropa; aspiramos a convertirnos en un símbolo de motivación y superación personal. Trabajamos incansablemente para ofrecer productos innovadores y funcionales que se adapten a las necesidades de cada persona, independientemente de su nivel de habilidad o de la disciplina deportiva que practiquen.
                </p> <br/>
                <p> Además de ofrecer productos de primera calidad, nos comprometemos a promover la inclusión, la diversidad y la sostenibilidad en todo lo que hacemos. Valoramos la integridad y la ética en todas nuestras operaciones, desde la selección de materiales hasta las prácticas de fabricación.
                </p>

            </Box>

            <Box
                component="section"
                className="about__section about__section--vision">
                <h3>Visión</h3>
                <img
                    src="/images/about/vision.jpg"
                    alt="Fotrografía de la visión de la empresa"/>
                <p>En nuestra visión, nos vemos como líderes mundiales en la industria de la moda deportiva, reconocidos por nuestra innovación, calidad y compromiso con el bienestar de nuestros clientes. Nos esforzamos por crear un mundo donde el deporte y el ejercicio sean accesibles para todos, y donde nuestra marca sea sinónimo de inspiración, rendimiento y estilo de vida activo.
                </p> <br/>
                <p> Visualizamos una comunidad global de entusiastas del deporte que encuentran en nuestros productos la motivación y la confianza para superar sus límites y alcanzar sus objetivos atléticos. Nos comprometemos a seguir siendo pioneros en la incorporación de tecnologías avanzadas y materiales sostenibles en nuestra producción, contribuyendo así a un mundo más saludable y respetuoso con el medio ambiente.
                </p> <br/>
                <p> Nuestra visión incluye el cultivo de relaciones sólidas y duraderas con nuestros clientes, empleados, socios y comunidades, basadas en la transparencia, el respeto y la responsabilidad social corporativa. Aspiramos a ser una fuerza positiva en la vida de las personas, inspirándolas a vivir con pasión, determinación y bienestar en cada aspecto de sus vidas.
                </p>
            </Box>

            <Box
                component="section"
                className="about__section">
                <h3>Historia</h3>
                <img
                    src="/images/about/historia.jpg"
                    alt="Fotrografía de la valores de la empresa"/>
                <p className="card__text card__text--short"> Powerful Mountain inicia como una idea de emprendimiento de ropa para aquellos que aman visitar la montaña, incluso en los lugares más inhóspitos e inaccesibles, expuestos a las condiciones climáticas más extremas. Desde las montañas de Antioquia, y entendiendo la necesidad de muchos por adquirir productos de
                    calidad a un precio asequible, Juan Henao funda Powerful Mountain, no sólo con la idea de brindar ropa de calidad a los montañistas, sino también con la idea de ofrecer excursiones a las grandiosas y agrestes montañas de todo el sistema montañoso de Colombia.
                </p><br/>
                <p> El 20 de Noviembre de 2023, se inaugura la primera tienda virtual, ofreciendo gran variedad de productos en diferentes diseños para que cada explorador tenga la oportunidad de elegir la prenda que mejor se ajuste según sus gustos y necesidades. </p>
                <p><br/>
                    Respecto a lo que se espera para los siguientes meses, será incierto, pero si hay una certeza de que Powerful Mountain seguirá con un sólido compromiso de ofrecer lo mejor para sus clientes, tanto en la innovación de su indumentaria, como en la implementación de nuevas rutas de nuestro amado y montañoso territorio colombiano.</p>
            </Box>
        </Box>
    );
};

export default About;