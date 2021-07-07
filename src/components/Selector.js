import React, {useState, useEffect} from 'react';
import Select from 'react-select';

const Selector = ({setPathOptions, setFilterOption, name}) => {

    const options = [
        { value: 'name', label: 'name 💁' },
        { value: 'cuisine', label: 'cuisine 🌮 🍔 🥢' },
        { value: 'menu', label: 'menu' },
        { value: 'borough', label: 'borough 🏙️' }
    ];

    const filterOptions = [
        { value: 'Manhattan', label: 'Manhattan' },
        { value: 'Brooklyn', label: 'Brooklyn' },
        { value: 'Queens', label: 'Queens' },
        { value: 'Bronx', label: 'Bronx' },
        { value: 'Staten Island', label: 'Staten Island' }
    ];

    const customTheme=(theme)=>{
        return {
            ...theme,
            colors:{
                ...theme.colors,
                primary25: 'white',
                primary:'black'
            }
        }
    }

    const customStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            
          return {
            ...styles,
            ':hover':{
                backgroundColor: '#f6e05e',
            }
          };
        },
      //  multiValueLabel, multiValueRemove, multiValue
      multiValue: (styles) => {
        return {
          ...styles,
          backgroundColor: '#e2e8f0',   
        };
      },
      multiValueRemove: (styles) => {
        return {
          ...styles,
          ':hover': {
            backgroundColor: '#A53060',
            color: 'white',
          },   
        };
      },
      
      multiValueLabel: (styles) => ({
        ...styles,
        backgroundColor: '#e2e8f0',
      
      }),
        control: styles => ({ ...styles, backgroundColor: '#f7fafc', width:200 })
        
      };


    const handleMultiChange = selectedOption => {        
        if (name==="main"){
            let pathArray = [];
            for (let i = 0; i < selectedOption.length; i++){
                pathArray.push(selectedOption[i].value)
            }
            setPathOptions(pathArray);
        } 
      };

      const setBorough =(e) =>setFilterOption(e.value);

     if (name === "main"){
        return (
            <div className="flex justify-center my-auto text-base w-200">
                <Select 
                    theme={customTheme}
                    className="focus:outline-none"
                    options={options} 
                    onChange={handleMultiChange}
                    defaultValue={ options[0] }
                    styles={customStyles}
                    menuPortalTarget={document.body}
                    menuPosition={'fixed'} 
                    menuColor='#f7fafc'
                    isMulti
                />
        </div>
        );
     } else if (name==="borough"){
        return (
            <div className="flex justify-center w-full my-auto text-base bg-gray-100">
                <Select 
                    className="w-full text-sm border rounded focus:outline-none active:border-tolopea-800" 
                    options={filterOptions} 
                    onChange={setBorough}
                />
        </div>
        );

     }
}

export default Selector;