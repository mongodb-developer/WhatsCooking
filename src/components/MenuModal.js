import React from 'react';
import CafeIcon from '../images/OutdoorCafe.png';

const MenuModal = ({menu, setShowMenu, name, highlights}) => {
    console.log(name);

        let highlightedStringsArray =[];

        if (highlights.length > 0 ){
            for (let j = 0; j < highlights.length; j++)         // this is the number of phrases-menu items
            {   
                let highlightedString="";
                for (let k = 0; k < highlights[j].texts.length; k++){
                    highlightedString += highlights[j].texts[k].value;
                } 
                highlightedStringsArray.push(highlightedString);
            }
        }


    return (
        <div className="fixed inset-0 z-20 flex justify-center bg-smoke-dark">
        <div className="relative flex flex-col w-2/3 bg-white border border-black rounded h-2/3 mt-60 ">    
            <div className="p-4 mb-4 text-4xl font-bold text-center text-tolopea-500 font-body">{name} Menu</div>
        
        
        <div className="flex justify-around py-4 pl-2 pr-4">
            <img src={CafeIcon} alt="restaurant"  className="object-contain w-1/2 my-auto"/>
            
            <div className="flex flex-col ml-6 text-2xl font-body">
            
              { menu ? menu.map(item => 
                { if (!highlightedStringsArray.includes(item))
                    return (<div>{item}</div>);  
                    else {
                        let highlightedIndex = (highlightedStringsArray.indexOf(item));
                        let highlightedString=`<span className="flex flex-row">`;
                        for (let k = 0; k <highlights[highlightedIndex].texts.length; k++){
                            
                            if (highlights[highlightedIndex].texts[k].type === "hit"){
                                highlightedString += `<span style="background-color: #FFFF00">${highlights[highlightedIndex].texts[k].value} </span>`;
                            } else highlightedString += `<span>${highlights[highlightedIndex].texts[k].value} </span>`;          
                        } 
                        highlightedString +="</span>";
                    
                        return <div dangerouslySetInnerHTML={{__html: highlightedString}}></div>      
                    }
                             
              }) : <div>There are no menu items.</div>
              
            } 
           
            </div>
            
            
            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{ console.log("Click X");setShowMenu(false);}}
                className="absolute w-10 h-10 mt-10 text-red-700 bottom-8 right-10" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
        </div>
        </div>
            
        </div>
    )
}

export default MenuModal;