import React from 'react'
import { Icon, InlineIcon } from '@iconify/react';


const Footer = () => {
    return (
        <div className="d-flex align-items-center justify-content-around py-2 px-2 footer" style={{background:'#7666E4'}}>
            <div>
                Created by Ashvinjeet Singh
                <span id="year">&copy; {new Date().getFullYear()}</span>
            </div>
            <span><a href="https://github.com/AshvinjeetSingh/Crypto-tracker" style={{color:'#fff'}}><i class="fa fa-github" style={{fontSize:'36px'}}></i></a></span>
        </div>
    )
}

export default Footer
