import React, { useState}  from 'react';

export const SearchFormProvider =()=>{
    const [searchTerm, setSearchTerm] = useState('');
    const [operator, setOperator] = useState('text');
    const [distance, setDistance] = useState(1);
    const [pathOptions, setPathOptions] = useState(['name']);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState();
    const [stars, setStars] = useState(1);
    const [borough, setBorough] = useState();


    return(<div>SearchFormProvider</div>);
}
