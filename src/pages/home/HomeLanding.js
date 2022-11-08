import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const HomeLanding = () => {
  return (
    <>
     <section className="financo-activities-wrap1">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-lg-4 col-md-6">
              <div className="financo-activities-box1">
                <div className="item-img-round">
                  <img src="./assets/img/figure/figure39.png" alt="figure" height="81" width="81" />
                  <div className="item-img">
                    <img src="./assets/img/figure/figure41.png" alt="figure" height="45" width="47" />
                  </div>
                </div>
                <h2 className="heading-title"><a href="#" className="text-decoration-none">Lorem, ipsum dolor.</a></h2>
                <p>Business whenknown printer aretook  galley of type and scrambled make type specimen book.</p>
                <div className="item-button">
                  <a href="#" className="item-btn text-decoration-none">+ <span>Read More</span></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="financo-activities-box1">
                <div className="item-img-round">
                  <img src="./assets/img/figure/figure39.png" alt="figure" height="81" width="81" />
                  <div className="item-img">
                    <img src="./assets/img/figure/figure42.png" alt="figure" height="41" width="45" />
                  </div>
                </div>
                <h2 className="heading-title"><a href="#">Lorem, ipsum dolor.</a></h2>
                <p>Business whenknown printer aretook  galley of type and scrambled make type specimen book.</p>
                <div className="item-button">
                  <a href="#" className="item-btn">+ <span>Read More</span></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="financo-activities-box1 financo-activities-box3">
                <div className="item-img-round">
                  <img src="./assets/img/figure/figure39.png" alt="figure" height="81" width="81" />
                  <div className="item-img">
                    <img src="./assets/img/figure/figure43.png" alt="figure" height="45" width="49" />
                  </div>
                </div>
                <h2 className="heading-title"><a href="#">Lorem, ipsum dolor.</a></h2>
                <p>Business whenknown printer aretook  galley of type and scrambled make type specimen book.</p>
                <div className="item-button">
                  <a href="#" className="item-btn">+ <span>Read More</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    <section className="about-finnaco-wrap1">
    <div className="background-shape6">
      <img src="./assets/img/figure/figure32.png" alt="figure" width="404" height="216" />
    </div>
    <div className="background-shape7">
      <img src="./assets/img/figure/figure29.png" alt="figure" width="747" height="256" />
    </div>
    <div className="background-shape8">
      <img src="./assets/img/my-img/figure33.png" alt="figure" width="783" height="439" />
    </div>
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-5 col-md-12">
          <div className="about-box1">
            <p className="section-subtitle">About OramSys</p>
            <h2 className="section-title">Lorem ipsum dolor sit, amet consectetur adipisicing</h2>
            <p>Bookan unknown printer took a galley of type and scrambled make It has survived not only five centuries.Lorem adipiscg incididuntlabore dolor ipsum dolor sit amet, consectetur.</p>
            <div className="media d-flex">
              <div className="item-img">
                <img src="./assets/img/figure/figure30.png" alt="figure" width="47" height="71" />
              </div>
              <div className="media-body">
                <h3 className="heading-title"><a href="#">consectetur adipisicing</a></h3>
                <p>Bookan unknown printer took a galley type and scrambled.</p>
              </div>
            </div>
            <div className="media d-flex">
              <div className="item-img">
                <img src="./assets/img/figure/figure31.png" alt="figure" width="51" height="66" />
              </div>
              <div className="media-body">
                <h3 className="heading-title"><a href="#">consectetur adipisicing</a></h3>
                <p>Bookan unknown printer took a galley type and scrambled.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-md-12">
          <div className="about-box2">
            <div className="about-img">
              {/* <!-- <img src="img/my-img/build-skt.png" alt="figure" width="800" height="700"> --> */}
              {/* <div className="build-img" style="background-image:url(img/my-img/computer.png)"></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}

export default HomeLanding