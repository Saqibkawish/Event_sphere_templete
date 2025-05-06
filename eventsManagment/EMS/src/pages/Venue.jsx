export const Venue = () => {
    return (
        <>
        <br />
        <br />
     
   
    <section id="venue" className="wow fadeInUp">
  <div className="container-fluid">
    <div className="section-header">
      <h2>Event Venue</h2>
      <p>Event venue location info and gallery</p>
    </div>

    <div className="row no-gutters">
      <div className="col-lg-6 venue-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          title="Event Venue Map"
        ></iframe>
      </div>

      <div className="col-lg-6 venue-info">
        <div className="row justify-content-center">
          <div className="col-lg-11 col-lg-8">
            {/* Corrected col-11 to col-lg-11 */}
            <h3>Downtown Conference Center, New York</h3>
            <p>
              Iste nobis eum sapiente sunt enim dolores labore accusantium autem.
              Cumque beatae ipsam. Est quae sit qui voluptatem corporis velit. Qui
              maxime accusamus possimus. Consequatur sequi et ea suscipit enim
              nesciunt quia velit.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="container-fluid venue-gallery-container">
    <div className="row no-gutters">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
        <div key={num} className="col-lg-3 col-md-4">
          <div className="venue-gallery">
            <a
              href={`img/venue-gallery/${num}.jpg`}
              className="venobox"
              data-gall="venue-gallery"
            >
              <img
                src={`img/venue-gallery/${num}.jpg`}
                alt={`Venue ${num}`}
                className="img-fluid"
              />
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
<section id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h2>About The Event</h2>
            <p>Sed nam ut dolor qui repellendus iusto odit. Possimus inventore eveniet accusamus error amet eius aut
              accusantium et. Non odit consequatur repudiandae sequi ea odio molestiae. Enim possimus sunt inventore in
              est ut optio sequi unde.</p>
          </div>
          <div className="col-lg-3">
            <h3>Where</h3>
            <p>Downtown Conference Center, New York</p>
          </div>
          <div className="col-lg-3">
            <h3>When</h3>
            <p>Monday to Wednesday<br/>10-12 December</p>
          </div>
        </div>
      </div>
    </section>

 
        </>
    );
};
