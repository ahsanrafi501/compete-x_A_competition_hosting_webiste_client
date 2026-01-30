import React from 'react';
import logoImg from '../../assets/logo/smallLogo.png'

const Logo = () => {
    return (
        <div className='flex items-center gap-1'>
            <img className="max-h-[50px] border-4 border-red-500 rounded-4xl" src={logoImg} alt="" />
            <h2 className='text-2xl font-bold'>Compete-X</h2>
        </div>
    );
};

export default Logo;