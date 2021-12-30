import React from 'react'
const Preloader = () => {
return (
    /*
    this is jsx, which is a combination of 
    js and html that allows you to write html within js
    */
<div className="center-align">
    <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
            <div className="circle"></div>
        </div><div className="gap-patch">
            <div className="circle"></div>
        </div><div className="circle-clipper right">
            <div className="circle"></div>
        </div>
        </div>
    </div>
</div>


)
}
export default Preloader;
