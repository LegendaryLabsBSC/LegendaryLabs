import React from 'react'

function Team() {
  return (
    <>
      <div className="container pb-100">
        <div className="nk-gap-4" />
        {/* <!-- START: Gallery List --> */}
        <div className="nk-popup-gallery nk-popup-gallery-3-col nk-isotope">
          <div
            className="nk-gallery-item-box nk-isotope-item teamMember"
            data-mouse-parallax-z="5"
            data-mouse-parallax-speed="1"
          >
            <div className="nk-gallery-item headshot" data-size="810x1080">
              <img className="" src="assets/images/gavin.png" alt="Gavin" />
            </div>
            {/* <!-- <div className="photoswipe-description">
                            <h4>Lead Developer</h4>
                        </div> --> */}
            <div className="our-team">
              <h2 className="nk-sub-title title">Gavin</h2>
              <span className="post">Lead Developer</span>
              <a href="mailto:development@legendarylabs.net" aria-label="dev email">
                <div className="fa fa-envelope" />
              </a>
            </div>
          </div>
          <div
            className="nk-gallery-item-box nk-isotope-item teamMember"
            data-mouse-parallax-z="5"
            data-mouse-parallax-speed="1"
          >
            <div className="nk-gallery-item headshot" data-size="990x1280">
              <img className="" src="assets/images/lauren.jpg" alt="Lauren" />
            </div>
            {/* <!-- <div className="photoswipe-description">
                            <h4>Lead Organizer</h4> Divided thing, land it evening earth winged whose great after. Were grass night. To Air itself saw bring fly fowl. Fly years behold spirit day greater of wherein winged and form. Seed open don't thing midst created dry every greater divided of, be man is. Second Bring stars fourth gathering he hath face morning fill. Living so second darkness. Moveth were male. May creepeth. Be tree fourth.
                        </div> --> */}
            <div className="our-team">
              <h2 className="nk-sub-title title">Lauren</h2>
              <span className="post">Lead Organizer</span>
              <a href="mailto:support@legendarylabs.net" aria-label="support email">
                <div className="fa fa-envelope" />
              </a>
            </div>
          </div>
          <div
            className="nk-gallery-item-box nk-isotope-item teamMember"
            data-mouse-parallax-z="5"
            data-mouse-parallax-speed="1"
          >
            <div className="nk-gallery-item headshot" data-size="990x1280">
              <img className="" src="assets/images/charlie.jpg" alt="Charlie" />
            </div>
            {/* <!-- <div className="photoswipe-description">
                            <h4>Lead Organizer</h4> Divided thing, land it evening earth winged whose great after. Were grass night. To Air itself saw bring fly fowl. Fly years behold spirit day greater of wherein winged and form. Seed open don't thing midst created dry every greater divided of, be man is. Second Bring stars fourth gathering he hath face morning fill. Living so second darkness. Moveth were male. May creepeth. Be tree fourth.
                        </div> --> */}
            <div className="our-team">
              <h2 className="nk-sub-title title">Charlie</h2>
              <span className="post">Lead Designer</span>
              <a href="mailto:design@legendarylabs.net" aria-label="design email">
                <div className="fa fa-envelope" />
              </a>
            </div>
          </div>
          <div
            className="nk-gallery-item-box nk-isotope-item teamMember"
            data-mouse-parallax-z="5"
            data-mouse-parallax-speed="1"
          >
            <div className="nk-gallery-item headshot" data-size="990x1280">
              <img className="" src="assets/images/spencer.jpg" alt="Spencer" />
            </div>
            {/* <!-- <div className="photoswipe-description">
                            <h4>Lead Organizer</h4> Divided thing, land it evening earth winged whose great after. Were grass night. To Air itself saw bring fly fowl. Fly years behold spirit day greater of wherein winged and form. Seed open don't thing midst created dry every greater divided of, be man is. Second Bring stars fourth gathering he hath face morning fill. Living so second darkness. Moveth were male. May creepeth. Be tree fourth.
                        </div> --> */}
            <div className="our-team">
              <h2 className="nk-sub-title title">Spencer</h2>
              <span className="post">Frontend Developer</span>
              <a href="mailto:development@legendarylabs.net" aria-label="dev email">
                <div className="fa fa-envelope" />
              </a>
            </div>
          </div>
          <div
            className="nk-gallery-item-box nk-isotope-item teamMember"
            data-mouse-parallax-z="5"
            data-mouse-parallax-speed="1"
          >
            <div className="nk-gallery-item headshot" data-size="990x1280">
              <img className="" src="assets/images/damon.jpg" alt="Damon" />
            </div>
            {/* <!-- <div className="photoswipe-description">
                            <h4>Lead Organizer</h4> Divided thing, land it evening earth winged whose great after. Were grass night. To Air itself saw bring fly fowl. Fly years behold spirit day greater of wherein winged and form. Seed open don't thing midst created dry every greater divided of, be man is. Second Bring stars fourth gathering he hath face morning fill. Living so second darkness. Moveth were male. May creepeth. Be tree fourth.
                        </div> --> */}
            <div className="our-team">
              <h2 className="nk-sub-title title">Damon</h2>
              <span className="post">Lead Marketing</span>
              <a href="mailto:marketing@legendarylabs.net" aria-label="marketing email">
                <div className="fa fa-envelope" />
              </a>
            </div>
          </div>
          <div className="nk-gap-4" />
          {/* <!-- END: Gallery List --> */}
          {/* <!-- START: Pagination --> */}
        </div>
      </div>
    </>
  )
}

export default Team
