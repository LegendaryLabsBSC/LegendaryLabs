import React from 'react'

function Home() {
  return (
    <>
      <div className="nk-gap-3" />
      <div className="nk-header-title-md nk-header-title-parallax nk-header-title-parallax-opacity">
        {/* <!-- <div className="bg-image op-6">
                <img src="assets/images/PhoenixTop3.png" alt="" className="jarallax-img"/>
            </div> --> */}
        <div className="nk-header-table">
          <div className="nk-header-table-cell">
            {/* <!-- <div className="nk-header-text">
                        <h1 className="nk-title display-3">GodLike</h1>
                        <div> An atmospheric gaming HTML template based on Bootstrap 4 </div>
                        <div id="root-react-app"></div>
                        <div className="nk-gap-3"></div>
                        <a href="https://1.envato.market/godlike-html-info" target="_blank" className="nk-btn nk-btn-lg nk-btn-color-main-1 link-effect-4">
                            <span>Purchase</span>
                        </a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="#demos" className="nk-btn nk-btn-lg link-effect-4">
                            <span>See Demos</span>
                        </a>
                    </div> --> */}
            {/* <!-- Landing page Title --> */}

            <div className="container d-md-flex vertical_align" style={{ alignItems: 'center' }}>
              {/* <!-- Landing page Title --> */}
              <div>
                <h1 className="nk-title">Legendary Labs</h1>
                <h2 className="nk-sub-title">A unique NFT breeding platform launching Winter 2021.</h2>
              </div>
              {/* <!-- Hero image --> */}
              <div className="">
                <figure className="">
                  <img className="phoenix-image" src="assets/images/PhoenixTop3.png" alt="" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nk-gap-3" />
      <div className="nk-box bg-dark-1">
        <div className="container">
          <div className="nk-gap-3" />
          <p>
            Legendary Labs is a unique NFT breeding platform, launching Winter 2021. Utilizing a proprietary 3D model
            protocol, Legendary Labs will allow for greater genetic variation, making for a more interesting breeding
            and collecting experience than currently-available platforms. Beginning with a series of
            beautifully-designed phoenixes, Legendary Labs aims to release new seasons of NFTs in the future, while
            restricting breeding on prior seasons to allow for increasing value. Future additions to the platform will
            include NFT training, an arena, accessories, and more!
            {/* <!--- Simply hold
                    your LGND tokens and watch them increase in value as the breeding game gains popularity,
                    or hop into the game itself to create NFTs with value in themselves!--> */}
          </p>
          <div className="nk-gap-3" />
        </div>
      </div>
      <div className="container" style={{ display: 'grid' }}>
        <div className="nk-gap-3" />
        <img src="assets/images/DNAroadmapbig.png" alt="roadmap" style={{ margin: 'auto', width: '50%' }} />
        <div className="nk-gap-3" />
        <div className="nk-gap-6" />
      </div>
    </>
  )
}

export default Home
