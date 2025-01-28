import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState("");

  const handleTask = (e) => {
    setTask(e.target.value);
  };

  const gettodos = () => {
    axios.get("http://localhost:8000/alltodos").then((data) => {
      setTodos(data.data);
    });
  };

  useEffect(() => {
    gettodos();
  }, []);

  const handleAdd = () => {
    axios
      .post("http://localhost:8000/add", {
        name: task,
      })
      .then((data) => {
        console.log(data);
        alert("add successfull");
        setTask("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handledelete = (id) => {
    axios.delete(`http://localhost:8000/deletetodo/${id}`).then((data) => {
      console.log(data);
      alert("data deleted");
    });
  };

  const handleedit = (id) => {
    console.log("click", id);
  };

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow border-2 p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
              <input
                onChange={handleTask}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
              />
              <button
                onClick={handleAdd}
                className="flex-no-shrink p-2 border-2 rounded text-teal border-teal"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            {todos.map((item) => (
              <div className="flex mb-4 items-center">
                <ul>
                  <li>
                    {item.name}
                    <button
                      onClick={() => handleedit(item._id)}
                      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-green"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handledelete(item._id)}
                      className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
