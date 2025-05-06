export const Home = () => {
  return (
      <>
          <section id="intro">
              <div className="intro-container wow fadeIn">
                  <h1 className="mb-4 pb-0">Transform Your Expo Experience<br/><span>EventSphere Management</span></h1>
                  <p className="mb-4 pb-0">Next-Generation Event Management Solutions for Modern Exhibitions</p>
                  <a href="https://www.example.com/demo" className="venobox play-btn mb-4" data-vbtype="video"
                     data-autoplay="true"></a>
                  <a href="#about" className="about-btn scrollto">Discover Our Solution</a>
              </div>
          </section>

          <section id="about">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-6">
                          <h2>Revolutionizing Expo Management</h2>
                          <p>EventSphere Management addresses critical challenges in traditional expo organization through innovative technology solutions. We eliminate manual processes, fragmented communications, and information gaps with our integrated platform that offers:</p>
                          <ul>
                              <p>Automated registration systems</p>
                              <p>Unified communication channels</p>
                              <p>Real-time event analytics</p>
                              <p>Interactive floor planning tools</p>
                          </ul>
                      </div>
                      <div className="col-lg-3">
                          <h3>Industries We Serve</h3>
                          <p>Technology<br/>Healthcare<br/>Manufacturing<br/>Consumer Goods</p>
                      </div>
                      <div className="col-lg-3">
                          <h3>Global Reach</h3>
                          <p>50+ Successful Events<br/>30 Countries<br/>100K+ Participants</p>
                      </div>
                  </div>
              </div>
          </section>
      </>
  );
};