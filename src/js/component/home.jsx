import React from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [newTodo, setNewTodo] = useState("")
	const [todoList, setTodoList] = useState([])
	
	

	const showTodos = () => {return todoList.map(formatTodo)} 
	const formatTodo = (todo,index) =>
		 {return <li className=" list-group-item d-flex justify-content-between align-items-center" key= {index}>{todo}
						<button className="btn" 
						onClick={()=>{
							let copyTodolist = [...todoList]
							copyTodolist.splice(index,1)
							setTodoList(copyTodolist)
												}}
						>x</button>
						</li>
				}
	return (
		<div className="background bg-light">
			{/* HEADER */}
			<div className="text-center d-flex justify-content-center">
				<h1 className="todos text-center text-black-50 fw-light mt-5">todos</h1>
			
			</div>
			{/* NOTES */}
			<div className="row d-flex justify-content-center px-4 pt-5  bg-light">
				
			<div className="col-4 border px-5 shadow pt-3  bg-body">
					<input className="form-control form-control-lg" type="text" placeholder="ex: Wash my Hands" aria-label=".form-control-lg example"
						value = {newTodo}
						onChange={(e)=>{setNewTodo(e.target.value)}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								todoList.push(newTodo)
								setNewTodo("")
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
		</div>
	);
};

export default Home;


