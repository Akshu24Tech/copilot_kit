"use client"
import { useState } from "react";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core"; 

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

   // Define Copilot action
   useCopilotAction({
    name: "addTodoItem",
    description: "Add a new todo item to the list",
    parameters: [
      {
        name: "todoText",
        type: "string",
        description: "The text of the todo item to add",
        required: true,
      }
    ],
    handler: async ({ todoText }) => {
      addTodo(todoText);
    },
  });

     // Define Copilot action
     useCopilotAction({
      name: "deleteTodoItem",
      description: "Delete a new todo item from the list",
      parameters: [
        {
          name: "todoIndex",
          type: "number",
          description: "The index of the todo item to delete",
          required: true,
        }
      ],
      handler: async ({ todoIndex }) => {
        deleteTodo(todoIndex);
      },
    });

  // Function to handle adding new todo
  const addTodo = (todoText) => {
    if (todoText.trim() !== "") {
      setTodos([...todos, todoText]);
      setNewTodo(""); // Clear input after adding
    }
  };

  // Function to handle deleting todo
  const deleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  return (
    <main className="bg-orange-200 container mx-auto p-8 my-10 rounded-xl shadow-lg max-w-3xl">
      <h1 className="font-bold text-3xl text-center text-gray-800 mb-8">Welcome to Copilot</h1>
      <div className="flex flex-col items-center mb-8">
        <textarea
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="3"
        ></textarea>
        <button
          onClick={()=>{addTodo(newTodo)}}
          className="w-full md:w-1/3 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
        >
          Add Todo
        </button>
      </div>

      {todos.length > 0 ? (
        <ul className="list-none space-y-4">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow-sm"
            >
              <span className="text-gray-700 font-medium">{todo}</span>
              <button
                onClick={() => deleteTodo(index)}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No todos yet! Add one above.</p>
      )}

      <CopilotPopup
        instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
        labels={{
          title: "Popup Assistant",
          initial: "Need any help?",
        }}
      />
    </main>
  );
}
