import React from 'react';
import logoImg from '../../assets/logo/smallLogo.png'

const Logo = () => {
    return (
        <div className='flex items-center gap-3 group cursor-pointer'>
            {/* Logo Image Container - Styled as a Retro Badge */}
            <div className="relative">
                <img 
                    className="max-h-[50px] border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all -rotate-3 group-hover:rotate-0" 
                    src={logoImg} 
                    alt="Compete-X Logo" 
                />
                {/* Decorative dots for a "mechanical" feel */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent border-2 border-black rounded-full"></div>
            </div>

            {/* Typography */}
            <h2 className='text-3xl font-black uppercase tracking-tighter text-black'>
                Compete
                <span className="text-primary bg-black px-2 ml-1 inline-block skew-x-[-10deg] shadow-[3px_3px_0px_0px_#8B5CF6]">
                    X
                </span>
            </h2>
        </div>
    );
};

export default Logo;