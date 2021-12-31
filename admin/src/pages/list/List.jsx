import { Link, useLocation, useHistory } from "react-router-dom";
import { useContext, useState, useEffect,useRef,useCallback} from "react";
import "./list.css";
import { ListContext } from "../../context/listContext/ListContext";
import { updateList } from "../../context/listContext/apiCalls";
import axios from "axios";

export default function List() {
  const location = useLocation();
  const list = location.list;
  const id = location.pathname.split("/")[2];
  // const path = location.pathname;
  // console.log(path)
  const history = useHistory();
  const [newlist, setList] = useState(list);
  // const [addList,setAddList]=useState([])
  const { dispatch } = useContext(ListContext);
  console.log(id)
  useEffect(() => {
    const getList = async () => {
      const res = await axios.get("/lists/find/" + id);
      console.log(res.data);
      setList(res.data);
    };
    getList();
  },[id]);


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
    setList({ ...newlist, [e.target.name]: value });
  },1000)
  
  const handleUpdate = (e) => {
    e.preventDefault();
    updateList(newlist, dispatch);
    history.push("/list/"+newlist._id);
  };
  console.log(newlist);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{newlist.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{newlist._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{newlist.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{newlist.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              placeholder={newlist.title}
              name="title"
              onChange={handleChange}
            />
            <label>Type</label>
            <input
              type="text"
              placeholder={newlist.type}
              name="type"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={newlist.genre}
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
