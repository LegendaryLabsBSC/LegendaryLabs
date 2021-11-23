import React from 'react'

function ComingSoon() {
  return (
    <div className="container pt-10pct">
        <div className="text-center">
            <h2 className="nk-title display-4">Coming Soon</h2>
            <div className="nk-title-sep-icon">
                <span className="icon"><span className="ion-clock"/></span>
            </div>
            <div className="nk-gap-2"/>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <p className="lead">It&apos;s gonna be Legendary...</p>
                    <div className="nk-gap-2"/>
                    {/* <div className="nk-countdown" data-end="2021-11-26 14:30" data-timezone="EST"></div> */}
                </div>
            </div>
        </div>
    </div>
  );
}

export default ComingSoon;