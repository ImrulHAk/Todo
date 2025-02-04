import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState("");
  const [editid, setEditid] = useState("");

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
        alert("Add successfull");
        setTask("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handledelete = (id) => {
    axios.delete(`http://localhost:8000/deletetodo/${id}`).then((data) => {
      console.log(data);
      alert("Data deleted");
    });
  };

  const handleupdate = (id) => {
    const taskUpdate = todos.find((item) => item._id == id);
    setEditid(id);
    setUpdate(taskUpdate.name);
    setEdit(true);
    console.log("click", id);
  };

  const handlesubmit = (id) => {
    axios
      .patch(`http://localhost:8000/updatetodo/${id}`, { name: update })
      .then((data) => {
        console.log(data);
        setEdit(false);
        setUpdate("");
        setEditid(null);
        gettodos();
      });
    console.log("click");
  };

  return (
    <>
      <div className="h-full w-full flex items-center justify-center font-sans ">
        <div className="bg-white rounded shadow border-2 p-6 m-4 w-full lg:w-3/4 lg:max-w-lg relative">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Todo List</h1>
            <div className="flex mt-4">
              <input
                onChange={handleTask}
                value={task}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
              />
              <button
                onClick={handleAdd}
                className="flex-no-shrink p-2 bg-green-500 rounded text-white"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            {todos.map((item) => (
              <div className="mb-4 items-center">
                <ul>
                  <li
                    key={item._id}
                    className=" flex items-center justify-between"
                  >
                    <span className="text-lg font-semibold">{item.name}</span>
                    <button
                      onClick={() => handleupdate(item._id)}
                      className="flex-no-shrink p-2 ml-auto mr-2 bg-green-500 rounded text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handledelete(item._id)}
                      className="flex-no-shrink p-2 bg-red-500 rounded text-white"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        {edit && (
          <div className=" absolute top-36 bg-teal-100 border-2 border-gray-700 rounded p-6">
            <h2 className="mb-4 text-2xl font-bold">Update box</h2>
            <input
              onChange={(e) => setUpdate(e.target.value)}
              value={update}
              type="text"
              className="bg-white appearance-none border rounded w-full py-2 px-3 mr-4"
              placeholder="Edit text"
            />
            <button
              onClick={() => handlesubmit(editid)}
              className="flex-no-shrink p-2 mt-2 bg-green-500 rounded text-white"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
