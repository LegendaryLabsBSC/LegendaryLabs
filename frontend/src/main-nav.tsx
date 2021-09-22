import React from 'react'

const MainNav: React.FC = () => {
  return (
    <>
      <header className="nk-header nk-header-opaque">
        {/* <!--
    START: Top Contacts

    Additional Classes:
        .nk-contacts-top-light
--> */}
        <div className="nk-contacts-top">
          <div className="container">
            <div className="nk-contacts-left">
              <div className="nk-navbar">
                <ul className="nk-nav">
                  <li className="nk-drop-item">
                    <a href="/">USA</a>
                    <ul className="dropdown">
                      <li>
                        <a href="/">USA</a>
                      </li>
                      <li>
                        <a href="/">Russia</a>
                      </li>
                      <li>
                        <a href="/">United Kingdom</a>
                      </li>
                      <li>
                        <a href="/">France</a>
                      </li>
                      <li>
                        <a href="/">Spain</a>
                      </li>
                      <li>
                        <a href="/">Germany</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/">Privacy</a>
                  </li>
                  <li>
                    <a href="page-contact.html">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="nk-contacts-right">
              <div className="nk-navbar">
                <ul className="nk-nav">
                  <li>
                    <a href="https://twitter.com/nkdevv" target="_blank" rel="noreferrer">
                      <span className="ion-social-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="https://dribbble.com/_nK" target="_blank" rel="noreferrer">
                      <span className="ion-social-dribbble-outline" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="ion-social-instagram-outline" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="ion-social-pinterest" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- END: Top Contacts --> */}
        {/* // <!--
    //     START: Navbar

    //     Additional Classes:
    //         .nk-navbar-sticky
    //         .nk-navbar-transparent
    //         .nk-navbar-autohide
    //         .nk-navbar-light
    //         .nk-navbar-no-link-effect
    // --> */}
        <nav className="nk-navbar nk-navbar-top nk-navbar-sticky nk-navbar-transparent nk-navbar-autohide">
          <div className="container">
            <div className="nk-nav-table">
              <a href="index.html" className="nk-nav-logo">
                <img src="assets/images/logo.svg" alt="" width="90" />
              </a>
              <ul className="nk-nav nk-nav-right d-none d-lg-block" data-nav-mobile="#nk-nav-mobile">
                <li className="active  nk-drop-item">
                  <a href="index.html"> Home</a>
                  <ul className="dropdown">
                    <li className="active  ">
                      <a href="index.html"> Landing</a>
                    </li>
                    <li className="  ">
                      <a href="index-main.html"> Main</a>
                    </li>
                    <li className="  ">
                      <a href="index-game-promo.html"> Game Promo</a>
                    </li>
                  </ul>
                </li>
                <li className="  nk-drop-item">
                  <a href="page-contact.html"> Legends</a>
                  <ul className="dropdown">
                    <li className="  nk-drop-item">
                      <a href="page-contact.html">All</a>
                      <ul className="dropdown">
                        <li className="  ">
                          <a href="forum.html"> Forum</a>
                        </li>
                        <li className="  ">
                          <a href="page-contact.html"> Contact</a>
                        </li>
                        <li className="  ">
                          <a href="page-coming-soon.html"> Coming Soon</a>
                        </li>
                        <li className="  ">
                          <a href="page-404.html"> 404</a>
                        </li>
                        <li className="  ">
                          <a href="page-age-check.html"> Age Check</a>
                        </li>
                      </ul>
                    </li>
                    <li className="  nk-drop-item">
                      <a href="layout-nav-default.html">My Legends</a>
                      <ul className="dropdown">
                        <li className="  ">
                          <a href="layout-nav-default.html"> Default</a>
                        </li>
                        <li className="  ">
                          <a href="layout-nav-default-transparent.html"> Default Transparent</a>
                        </li>
                        <li className="  ">
                          <a href="layout-nav-main-top.html"> Main Top Only</a>
                        </li>
                        <li className="  ">
                          <a href="layout-nav-main-side.html"> Main Side</a>
                        </li>
                        <li className="  ">
                          <a href="layout-nav-main-top-fullscreen.html"> Main Top + Fullscreen</a>
                        </li>
                        <li className="  ">
                          <a href="layout-nav-fullscreen-side.html"> Fullscreen + Side</a>
                        </li>
                      </ul>
                    </li>
                    <li className="  nk-drop-item">
                      <a href="layout-page-header.html">Marketplace</a>
                      <ul className="dropdown">
                        <li className="  ">
                          <a href="layout-header.html"> Size Default</a>
                        </li>
                        <li className="  ">
                          <a href="layout-header-sm.html"> Size Small</a>
                        </li>
                        <li className="  ">
                          <a href="layout-header-md.html"> Size Mid</a>
                        </li>
                        <li className="  ">
                          <a href="layout-header-lg.html"> Size Large</a>
                        </li>
                        <li className="  ">
                          <a href="layout-header-full.html"> Size Full</a>
                        </li>
                        <li className="  ">
                          <a href="layout-header-video.html"> Video</a>
                        </li>
                        <li className="  ">
                          <a href="layout-header-video-plain.html"> Video Plain</a>
                        </li>
                        <li className="  ">
                          <a href="layout-header-no.html"> NO Header</a>
                        </li>
                      </ul>
                    </li>
                    <li className="  ">
                      <a href="widgets.html">Training</a>
                    </li>
                    <li className="  ">
                      <a href="https://nkdev.info/docs/godlike-html/">Arena</a>
                    </li>
                  </ul>
                </li>
                {/* <!-- <li className=" nk-mega-item nk-drop-item">
                                <a href="#">My Legends</a>
                                <div className="dropdown">
                                    <div className="bg-image">
                                        <img src="assets/images/bg-menu.jpg" alt="" className="jarallax-img" />
                                    </div>
                                    <ul>
                                        <li>
                                            <ul>
                                                <li className="  ">
                                                    <a href="element-carousels.html"> Carousels</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-image-boxes.html"> Image Boxes</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-icon-boxes.html"> Icon Boxes</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-counters.html"> Counters</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-blockquotes.html"> Block Quotes</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-testimonials.html"> Testimonials</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-team-members.html"> Team Members</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li className="  ">
                                                    <a href="element-video-blocks.html"> Video Blocks</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-gif.html"> Gif Animations</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-forms.html"> AJAX Forms</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-countdown.html"> Countdown</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-text-typed.html"> Typed Text</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-tabs.html"> Tabs</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-accordions.html"> Accordions</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li className="  ">
                                                    <a href="element-info-boxes.html"> Info Boxes / Alerts</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-call-to-action.html"> Call to Action Blocks</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-progress.html"> Progress Bars</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-pagination.html"> Pagination</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-pricing-tables.html"> Pricing Tables</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-modals.html"> Modals</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li className="  ">
                                                    <a href="element-typography.html"> Typography</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-titles.html"> Titles [headings]</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-dropcaps.html"> Dropcaps</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-colors.html"> Colors</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-buttons.html"> Buttons</a>
                                                </li>
                                                <li className="  ">
                                                    <a href="element-breadcrumbs.html"> Breadcrumbs</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="  nk-drop-item">
                                <a href="news-list.html">Marketplace</a>
                                <ul className="dropdown">
                                    <li className="  ">
                                        <a href="news-list.html"> List</a>
                                    </li>
                                    <li className="  ">
                                        <a href="news-list-classic.html"> Classic List</a>
                                    </li>
                                    <li className="  ">
                                        <a href="news-grid-2.html"> Grid 2 Columns</a>
                                    </li>
                                    <li className="  ">
                                        <a href="news-grid-3.html"> Grid 3 Columns</a>
                                    </li>
                                    <li className="  nk-drop-item">
                                        <a href="news-single-image.html"> Single Post</a>
                                        <ul className="dropdown">
                                            <li className="  ">
                                                <a href="news-single-image.html"> Single Image</a>
                                            </li>
                                            <li className="  ">
                                                <a href="news-single-video.html"> Single Video</a>
                                            </li>
                                            <li className="  ">
                                                <a href="news-single-audio.html"> Single Audio</a>
                                            </li>
                                            <li className="  ">
                                                <a href="news-single-gallery.html"> Single Gallery</a>
                                            </li>
                                            <li className="  ">
                                                <a href="news-single-quote.html"> Single Block Quote</a>
                                            </li>
                                            <li className="  ">
                                                <a href="news-single-standard.html"> Single Standard</a>
                                            </li>
                                            <li className="  ">
                                                <a href="news-single-big-content.html"> Single Big Content Example</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="  nk-drop-item">
                                <a href="social-user-activity.html">Training</a>
                                <ul className="dropdown">
                                    <li className="  nk-drop-item">
                                        <a href="social-user-activity.html"> User</a>
                                        <ul className="dropdown">
                                            <li className="  ">
                                                <a href="social-user-activity.html"> Activity</a>
                                            </li>
                                            <li className="  ">
                                                <a href="social-user-notifications.html"> Notifications</a>
                                            </li>
                                            <li className="  ">
                                                <a href="social-user-messages.html"> Messages</a>
                                            </li>
                                            <li className="  ">
                                                <a href="social-user-messages-single.html"> Messages Single</a>
                                            </li>
                                            <li className="  ">
                                                <a href="social-user-messages-compose.html"> Messages Compose</a>
                                            </li>
                                            <li className="  ">
                                                <a href="social-user-friends.html"> Friends</a>
                                            </li>
                                            <li className="  ">
                                                <a href="social-user-settings.html"> Settings</a>
                                            </li>
                                            <li className="  ">
                                                <a href="social-user-settings-email.html"> Settings Email</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="  nk-drop-item">
                                        <a href="social-group-activity.html"> Group</a>
                                        <ul className="dropdown">
                                            <li className="  ">
                                                <a href="social-group-activity.html"> Activity</a>
                                            </li>
                                            <li className="  ">
                                                <a href="social-group-members.html"> Members</a>
                                            </li>
                                            <li className="  ">
                                                <a href="social-group-manage.html"> Manage</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="  nk-drop-item">
                                <a href="store.html">Arena</a>
                                <ul className="dropdown">
                                    <li className="  ">
                                        <a href="store.html"> Store</a>
                                    </li>
                                    <li className="  ">
                                        <a href="store-product.html"> Single Product</a>
                                    </li>
                                    <li className="  ">
                                        <a href="store-cart.html"> Cart</a>
                                    </li>
                                    <li className="  ">
                                        <a href="store-checkout.html"> Checkout</a>
                                    </li>
                                    <li className="  ">
                                        <a href="store-account.html"> Account</a>
                                    </li>
                                </ul>
                            </li> --> */}
                <li className="  nk-drop-item">
                  <a href="gallery.html">News</a>
                  <ul className="dropdown">
                    <li className="  ">
                      <a href="gallery.html"> Gallery 1 Column</a>
                    </li>
                    <li className="  ">
                      <a href="gallery-2-col.html"> Gallery 2 Columns</a>
                    </li>
                    <li className="  ">
                      <a href="gallery-3-col.html"> Gallery 3 Columns</a>
                    </li>
                    <li className="  ">
                      <a href="videos.html"> Videos 1 Column</a>
                    </li>
                    <li className="  ">
                      <a href="videos-2-col.html"> Videos 2 Columns</a>
                    </li>
                  </ul>
                </li>
                <li className="  nk-drop-item">
                  <a href="gallery.html">About</a>
                  <ul className="dropdown">
                    <li className="  ">
                      <a href="gallery.html"> Gallery 1 Column</a>
                    </li>
                    <li className="  ">
                      <a href="gallery-2-col.html"> Gallery 2 Columns</a>
                    </li>
                    <li className="  ">
                      <a href="gallery-3-col.html"> Gallery 3 Columns</a>
                    </li>
                    <li className="  ">
                      <a href="videos.html"> Videos 1 Column</a>
                    </li>
                    <li className="  ">
                      <a href="videos-2-col.html"> Videos 2 Columns</a>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="nk-nav nk-nav-right nk-nav-icons">
                <li className="single-icon d-lg-none">
                  <a href="/" className="no-link-effect" data-nav-toggle="#nk-nav-mobile">
                    <span className="nk-icon-burger">
                      <span className="nk-t-1" />
                      <span className="nk-t-2" />
                      <span className="nk-t-3" />
                    </span>
                  </a>
                </li>
                <li className="single-icon">
                  <a href="/" className="nk-search-toggle no-link-effect">
                    <span className="nk-icon-search" />
                  </a>
                </li>
                <li className="single-icon">
                  <a href="/" className="nk-cart-toggle no-link-effect">
                    <span className="nk-icon-toggle">
                      <span className="nk-icon-toggle-front">
                        <span className="ion-android-cart" />
                        <span className="nk-badge">8</span>
                      </span>
                      <span className="nk-icon-toggle-back">
                        <span className="nk-icon-close" />
                      </span>
                    </span>
                  </a>
                </li>
                <li className="single-icon">
                  <a href="/" className="nk-sign-toggle no-link-effect">
                    <span className="nk-icon-toggle">
                      <span className="nk-icon-toggle-front">
                        <span className="fa fa-sign-in" />
                      </span>
                      <span className="nk-icon-toggle-back">
                        <span className="nk-icon-close" />
                      </span>
                    </span>
                  </a>
                </li>
                <li className="single-icon">
                  <a href="/" className="no-link-effect" data-nav-toggle="#nk-side">
                    <span className="nk-icon-burger">
                      <span className="nk-t-1" />
                      <span className="nk-t-2" />
                      <span className="nk-t-3" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* <!-- END: Navbar --> */}
      </header>
      {/* <!--
    START: Right Navbar

    Additional Classes:
        .nk-navbar-right-side
        .nk-navbar-left-side
        .nk-navbar-lg
        .nk-navbar-align-center
        .nk-navbar-align-right
        .nk-navbar-overlay-content
        .nk-navbar-light
        .nk-navbar-no-link-effect
--> */}
      <nav
        className="nk-navbar nk-navbar-side nk-navbar-right-side nk-navbar-lg nk-navbar-align-center nk-navbar-overlay-content"
        id="nk-side"
      >
        <div className="nk-navbar-bg">
          <div className="bg-image">
            <img src="assets/images/bg-nav-side.jpg" alt="" className="jarallax-img" />
          </div>
        </div>
        <div className="nano">
          <div className="nano-content">
            <div className="nk-nav-table">
              <div className="nk-nav-row">
                <a href="index.html" className="nk-nav-logo">
                  <img src="assets/images/logo.svg" alt="" width="150" />
                </a>
              </div>
              <div className="nk-nav-row nk-nav-row-full nk-nav-row-center">
                <ul className="nk-nav">
                  <li className=" ">
                    <a href="page-contact.html"> Contact</a>
                  </li>
                  <li className=" ">
                    <a href="page-coming-soon.html"> Coming Soon</a>
                  </li>
                  <li className=" ">
                    <a href="page-404.html"> 404</a>
                  </li>
                  <li className=" ">
                    <a href="page-age-check.html"> Age Check</a>
                  </li>
                  <li className=" nk-drop-item">
                    <a href="/"> Sub Menu Example</a>
                    <ul className="dropdown">
                      <li className=" ">
                        <a href="#1"> Sub Item 1</a>
                      </li>
                      <li className=" nk-drop-item">
                        <a href="#2"> Sub Item 2</a>
                        <ul className="dropdown">
                          <li className=" ">
                            <a href="#1"> Sub Item 1</a>
                          </li>
                          <li className=" ">
                            <a href="#2"> Sub Item 2</a>
                          </li>
                        </ul>
                      </li>
                      <li className=" nk-drop-item">
                        <a href="#3"> Sub Item 3</a>
                        <ul className="dropdown">
                          <li className=" ">
                            <a href="/"> Sub Item</a>
                          </li>
                        </ul>
                      </li>
                      <li className=" nk-drop-item">
                        <a href="#4"> Sub Item 4</a>
                        <ul className="dropdown">
                          <li className=" ">
                            <a href="/"> Sub Item</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="nk-nav-row">
                <div className="nk-nav-footer">
                  {' '}
                  &copy; 2020 nK Group Inc. Developed in association with LoremInc. IpsumCompany, SitAmmetGroup, CumSit
                  and related logos are registered trademarks. All Rights Reserved.{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <!-- END: Right Navbar -->
        <!--
    START: Navbar Mobile

    Additional Classes:
        .nk-navbar-left-side
        .nk-navbar-right-side
        .nk-navbar-lg
        .nk-navbar-overlay-content
        .nk-navbar-light
        .nk-navbar-no-link-effect
--> */}
      <div
        id="nk-nav-mobile"
        className="nk-navbar nk-navbar-side nk-navbar-left-side nk-navbar-overlay-content d-lg-none"
      >
        <div className="nano">
          <div className="nano-content">
            <a href="index.html" className="nk-nav-logo">
              <img src="assets/images/logo.svg" alt="" width="90" />
            </a>
            <div className="nk-navbar-mobile-content">
              <ul className="nk-nav">
                {/* <!-- Here will be inserted menu from [data-mobile-menu="#nk-nav-mobile"] --> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- END: Navbar Mobile --> */}
    </>
  )
}

export default MainNav
