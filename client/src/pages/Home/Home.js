import React from 'react';
import { Container } from "../../components/style.ts";
import './Home.css';

/*********** IMAGES ***********/
import Logo from "../../assets/logo/title-icon-white.png"
import slide1 from "../../assets/slide1.jpg"
import slide2 from "../../assets/slide2.jpg"
import slide3 from "../../assets/slide3.jpg"
/*********** IMAGES ***********/

export default function Home() {
  return(
    <Container style={{padding: 0}}>
    <header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-invisible">

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
    <a className="navbar-brand navbar-nav mr-auto" href="/">
    <img className="logo" src={Logo} alt="Logo"/>
    </a>
    <div className="form-inline mt-2 mt-md-0">
    <a className="navbar-brand navbar-nav mr-auto" href="/Register">
    <button className="btn btn-link my-2 my-sm-0 btn-orange" >Register</button>
    </a>
    <a className="navbar-brand navbar-nav mr-auto" href="/Login">
    <button className="btn btn-link my-2 my-sm-0 btn-orange" >Login</button>
    </a>
    </div>
    </div>
    </nav>
    </header>

    <div role="main">

    <div id="myCarousel" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>
    <div className="carousel-inner">
    <div className="carousel-item active">
    <img className="first-slide" src={slide1} alt="First slide"/>
    <div className="container">
    <div className="carousel-caption">
    <h1>Use our website to make your vehicle appointments!</h1>
    <p>Through our website you can choose the best day and time for your vehicle by scheduling it in your mobile device.</p>
    <p><a className="btn btn-lg btn-orange" href="/Login" role="button">Book Now</a></p>
    </div>
    </div>
    </div>
    <div className="carousel-item">
    <img className="second-slide" src={slide2} alt="Second slide"/>
    <div className="container">
    <div className="carousel-caption">
    <h1>Always thinking about our customers and how we can make their experience with us even better!</h1>
    <p><a className="btn btn-lg btn-orange" href="/Login" role="button">Book a Vehicle Inspection Now</a></p>
    </div>
    </div>
    </div>
    <div className="carousel-item">
    <img className="third-slide" src={slide3} alt="Third slide"/>
    <div className="container">
    <div className="carousel-caption">
    <h1>One more for good measure.</h1>
    <p>No matter where you're going, safety must be considered along the way.</p>
    <p><a className="btn btn-lg btn-orange" href="/Login" role="button">Book Now</a></p>
    </div>
    </div>
    </div>
    </div>
    </div>

    <div className="container marketing">

    <div className="row featurette">
    <div className="col-md-12">
    <p className="lead">If you have any questions, please don't hesitate to reach out by email <b> info@gersgarage.com </b> or phone <b> +353 (83) 123-4567 </b> </p>
    </div>
    </div>

    <hr className="featurette-divider"/>


    <div className="row featurette">
    <div className="col-md-12">
    <h2 className="featurette-heading">About Us</h2>
    <p className="lead">A small mechanic shop that provides repair and maintenance services for small and medium sized vehicles.</p>
    <p className="lead">We pride ourselves on our friendly and personalized approach.</p>
    <p className="lead">Operated by a small team of mechanics, with specialized skills and expertise in different areas of vehicle repair and maintenance.</p>
    <p className="lead">In addition, we offer sales and installation of aftermarket parts and accessories, as well as diagnostic testing and other specialized services.</p>
    </div>
    </div>

    <hr className="featurette-divider"/>

    <div className="row featurette">
    <div className="col-md-12 order-md-2 text-right">
    <h2 className="featurette-heading">Our Mission</h2>
    <p className="lead">Our mission is to provide top-quality services and repairs for our customers' vehicles.</p>
    <p className="lead">We are a team of experienced professionals who are dedicated to delivering reliable and affordable services.</p>
    <p className="lead">Whether you need a simple oil change or a complex engine repair, we are here to help.</p>
    <p className="lead">We value honesty, integrity, and customer satisfaction above all else.</p>
    <p className="lead">Thank you for choosing us, and we look forward to continuing to serve you in the future!</p>
    </div>
    </div>


    <hr className="featurette-divider"/>

    <hr/>

    </div>
    </div>

    </Container>
  );
};
