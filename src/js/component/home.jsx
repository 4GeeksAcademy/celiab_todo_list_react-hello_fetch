import React, { useEffect } from "react";
import { useState } from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [newTodo, setNewTodo] = useState("")
	const [todoList, setTodoList] = useState([])
	
	
	useEffect(() => { 
			updateTodoList()
		},[todoList]);

	const updateTodoList = ()=> {
			
			fetch('https://playground.4geeks.com/todo/users/celiabernal')
			.then((res)=>{if (!res.ok) throw Error(res.statusText);
				return res.json();})
			.then((data) =>{setTodoList(data.todos)})
			.catch((err)=>{err})
				};
		
	const showTodos = () => {return todoList.map(formatTodo)} 
	// ELIMINATE TODO 
	const formatTodo = (todo,index) =>
		 {return <li className=" list-group-item d-flex justify-content-between align-items-center" key= {index}>{todo.label}
						<button className="btn button-hide" 
						onClick={()=>{
							deleteTodo(todo.id)
							// let copyTodolist = [...todoList] 
							// copyTodolist.splice(index,1)
							// setTodoList(copyTodolist)
												}}
						>x</button>
						</li>
				}
		
// CREATE USER				
const createUser = () =>{
	fetch(`https://playground.4geeks.com/todo/users/celiabernal`,{ 
		method: 'POST',
	}
	)		
	.then(res => {
		if (!res.ok) throw Error(res.statusText);
		return res.text();
	  })
	.then(response => console.log('Success:', response))
	.catch(error => console.error(error));	
 }


// ADD TODO - ENTER
	const addTodo = (todo) =>{ 
		fetch('https://playground.4geeks.com/todo/todos/celiabernal',{ 
			method: 'POST',
			body: JSON.stringify(({ label: todo,
									is_done: false
			 })),
			 headers: {
				'Content-Type': 'application/json'
			  }}
			 
		)		
		.then(res => {
			if (!res.ok) throw Error(res.statusText);
			return res.json();
		  })
		.then(response => console.log('Success:', response))
		.catch(error => console.error(error));	
	}

// DELETE TODO
	const deleteTodo = (id) =>{
		fetch(`https://playground.4geeks.com/todo/todos/${id}`,{ 
			method: 'DELETE',
		}

		)		
		.then(res => {
			if (!res.ok) throw Error(res.statusText);
			return res.text();
		  })
		.then(response => console.log('Success:', response))
		.catch(error => console.error(error));	
	 }

//DELETE ALL TODOS
	const deleteAllTodos = () =>{ 
			todoList.map((todo)=>{deleteTodo(todo.id)})
}
	return (
		<div className="background bg-light">
			{/* HEADER */}
			<div className="text-center d-flex justify-content-center">
				<h1 className="todos text-center text-black-50 fw-light mt-5">todos</h1>
			
			</div>
			{/* NOTES */}
			<div className="row d-flex justify-content-center px-4 pt-5  bg-light">
	{/* AÑADIR TODOS			 */}
			<div className="col-4 border px-5 shadow pt-3  bg-body">
					<input className="form-control form-control-lg" type="text" placeholder="ex: Wash my Hands" aria-label=".form-control-lg example"
						value = {newTodo}
						onChange={(e)=>{setNewTodo(e.target.value)}} //ADD TODO
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								addTodo(newTodo)
								// todoList.push(newTodo)
								setNewTodo("");
								createUser();
								
							}
						}}
					/>
					

					

				{/* TODOS */}
				<ul className= "list-group list-group-flush ">{showTodos()}
						
					
				</ul>
				<div className="mt-5 border-top text-secondary">
					<p>{todoList.length} items left.</p>

				</div>
			</div>
			
			</div>
			
			<div className="row d-flex justify-content-center mx-4 bg-light">
			<div className="col-4 border shadow pt-1 bg-body">
				
			</div>
			
			</div>
			<div className="row d-flex justify-content-center mx-5 bg-light">
			<div className="col-4 border shadow pt-1 mb-5 bg-body">
				
			</div>

			</div>
			<div className="d-flex justify-content-center"><button type="button" className=" d btn btn-secondary m-5"
			onClick={()=>{deleteAllTodos()}}
			>Reset Todos</button></div>

		</div>
	);
};

export default Home;


