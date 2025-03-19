import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../constants/Constant'
import {useNavigate } from 'react-router-dom'
import Trailer from '../MovieTrailer/Trailer'
import Rooting from '../..'
 



function RowPost(props) {
const [movies,setMovies]=useState([])
const [moviesid,setid]=useState(0)
const navigate=useNavigate()



async function getmovies(){
  try {
      let res=await axios.get(props.url)
      console.log(res.data.results)
      setMovies(res.data.results)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
    getmovies()
},[])
function handleClick(endPoint,id){
   
    console.log(id)
    navigate(endPoint, { state: { id } });
}


    return (
        <>
        <div className='row'>
         
            <h2>{props.title}</h2>
            <div className='posters'>
                {movies.map((obj,index)=>{
                    return(
                        <div key={index}>
                     
                          <img  onClick={() => handleClick('/trailer', obj.id)}
                                className={props.ismall ? "smallposter" : "poster"}
                                alt="poster"
                                src={`${imageUrl + obj.poster_path}`} /> 
                            
                            <p>{props.ismall?obj.title:obj.original_name}</p>
                    </div>
               ) })}
               
            </div>
          
            
        </div>
     
        </>
        
    )
}

export default RowPost