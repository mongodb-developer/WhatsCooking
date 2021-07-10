import React from 'react';
import Select from 'react-select';

const Selector = ({setPathOptions}) => {

    const options = [
      { value: 'name', label: 'name 💁' },
      { value: 'cuisine', label: 'cuisine 🌮 🍔 🥢' },
      { value: 'menu', label: 'menu' }
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
      let pathArray = [];
      for (let i = 0; i < selectedOption.length; i++){
          pathArray.push(selectedOption[i].value)
      }
      setPathOptions(pathArray);
    };

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
}

export default Selector;