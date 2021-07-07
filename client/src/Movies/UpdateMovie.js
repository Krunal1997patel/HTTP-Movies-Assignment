import React,{useState, useEffect} from 'react';
import axios from 'axios'

const initialItem = {
    title: '',
    director: '',
    metascore: ''
}


const UpdateMovie = props => {

    const [item , setItem] = useState(initialItem)
    

    const getMovieData = ID =>{
        axios
        .get(`http://localhost:5000/api/movies/${ID}`)
        .then(res => setItem(res.data))
        .catch(err => console.log(err));
    }

    // console.log(props.match.params.id)

    useEffect(() => {
        getMovieData(props.match.params.id)
    },[props.match.params.id])

    const changeHandler = e =>{
        // console.log(e.target.name, e.target.value)
        setItem({
            ...item,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmite = e => {
        e.preventDefault()
        axios
        .put(`http://localhost:5000/api/movies/${props.match.params.id}`, item)
        .then(res =>{
            props.history.push('/')
        })
        .catch(err => console.log(err));
    }

    return(
        <div>
            <h1>Update The Movie</h1>
            <form onSubmit={handleSubmite}>

            <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="Movie Title"
                value={item.title}
            />
            <input
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="Director"
                value={item.director}
            />
            <input
                type="text"
                name="metascore"
                onChange={changeHandler}
                placeholder="Score"
                value={item.metascore}
            />

            <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default UpdateMovie;