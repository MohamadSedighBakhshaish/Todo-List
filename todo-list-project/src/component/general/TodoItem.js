import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../redux/actione/action";


function TodoItem({ todo }) {
  const [edit, setEdit] = useState(false);
  const [editinput, setEditinput] = useState(todo.title);

  const dispatch = useDispatch();
  function removeTodo(id) {
    dispatch(deleteTodo(id));
  }

  const submit = (e) => {
    e?.preventDefault();
    setEdit(edit=>!edit);
    if (edit) {
      dispatch(editTodo({ id: todo.id, title: editinput }));
    }   
  };
  return (
    <form
      className="form-item"
      onSubmit={submit}
    >
      <div>
        <li>
          {edit ? (
            <input
              type="text"
              value={editinput}
              onChange={({target:{value}}) => setEditinput(value)}
              ref={(node)=> node && node?.focus()}
            />
          ) : (
            <span onDoubleClick={() => setEdit((edit) => !edit)}>
              {todo.title}
            </span>
          )}
        </li>
      </div>
      <div>
        <button className="submit-edit" onClick={submit}>
          {edit ? "Submit" : "Edit"}
        </button>
        <button className="remove" onClick={() => removeTodo(todo.id)}>
          Remove
        </button>
      </div>
    </form>
  );
}
export default TodoItem;
