import { Link, useLocation, useHistory } from "react-router-dom";
import "./movie.css";
import { useContext, useState, useEffect ,useRef,useCallback} from "react";
import { Publish } from "@material-ui/icons";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";
import axios from "axios";

export default function Movie() {
  const location = useLocation();
  const movie = location.movie;
  console.log(movie);
  const history = useHistory();
  const id = location.pathname.split("/")[2];
  const [newMovie, setMovie] = useState(movie);

  const { dispatch } = useContext(MovieContext);

  useEffect(() => {
    const getMovie = async () => {
      const res = await axios.get("/movies/find/" + id);
      console.log(res.data);
      setMovie(res.data);
    };
    getMovie();
  }, [id]);

  function useDebounce(fn, delay, dep = []) {
    const { current } = useRef({ fn, timer: null });
    useEffect(function () {
      current.fn = fn;
    }, [fn]);
  
    return useCallback(function f(...args) {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn(...args);
      }, delay);
    }, dep)
  }

  const handleChange = useDebounce(function(e){
    const value = e.target.value;
    setMovie({ ...newMovie, [e.target.name]: value });
  },1000)

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMovie(newMovie, dispatch);
    history.push("/movie/" + newMovie._id);
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={newMovie.img} alt="" className="productInfoImg" />
            <span className="productName">{newMovie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{newMovie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{newMovie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{newMovie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{newMovie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input 
              type="text" 
              placeholder={newMovie.title} 
              name="title"
              onChange={handleChange}
            />
            <label>Year</label>
            <input 
              type="text" 
              placeholder={newMovie.year} 
              name="year"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input 
              type="text" 
              placeholder={newMovie.genre} 
              name="genre"
              onChange={handleChange}
            />
            <label>Limit</label>
            <input 
              type="text" 
              placeholder={newMovie.limit} 
              name="limit"
              onChange={handleChange}
            />
            <label>Trailer</label>
            <input 
              type="file" 
              placeholder={newMovie.trailer} 
              name="trailer"
              onChange={handleChange}
            />
            <label>Video</label>
            <input 
              type="file" 
              placeholder={newMovie.video} 
              name="video"
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={newMovie.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button
              className="productButton"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
