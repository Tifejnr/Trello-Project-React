import { useState, useEffect,useRef } from "react";
import { showCountsOfChecked } from "../../../JS functions/Utilis/EleDisplay";
import useStore from "../../Hooks/Zustand/usersStore";

export default function BoardsDisplaySection (props) {
  const [checkboxEle, setCheckboxEle]= useState([]);
  // const checkboxesArray = useStore(state => state.checkboxesArray);
  const setCheckboxes = useStore(state => state.setCheckboxes);
  const increment = useStore((state) => state.increment);
  const count = useStore((state) => state.count);
  const checkboxRef = useRef(null);
  const checkboxesArray = useStore((state) => state.checkboxesArray);
  const pushCheckboxesArray = useStore((state) => state.pushCheckboxesArray);

  const handleCheckBoxClick = ()=> {
    showCountsOfChecked()
    // increment() 
    // pushCheckboxesArray(checkboxRef.current)
}




  useEffect(() => {
  const checkboxEle = checkboxRef.current;

   pushCheckboxesArray(checkboxEle)

   
  }, []);


  console.log(checkboxesArray)


  return (
          <form className="item" name="main">
                <article className='label-article'>
                  <input
                  onClick={handleCheckBoxClick}
                    type="checkbox"
                    name="fruit"
                    ref={checkboxRef}
                    className="inputs board-checkbox"
                    id={`check${props.indexNo}`}
                  />
                  <label htmlFor={`check${props.indexNo}`} id={`labelcheck${props.indexNo}`}>
                    {props.board.name}
                  </label>
                </article>
          </form>
 );
};

