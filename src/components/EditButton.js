import { deletebook } from "../redux/actions/bookActions";

function EditButton(props) {
    
      function btnClickedHandler() {
    //   console.log(props.data._id)
      deletebook(props.data._id)
      props.setdeleted(true)
      }
        return (
          <button onClick={btnClickedHandler}>Delete Me!</button>
        )
  }
export default EditButton