import React, {useEffect, useState} from "react";

const Home = () => {

const [arrayoflist, SetArrayoflist] = useState([]);
const [inputvalue, SetInputvalue] = useState();
const [disablebutton, SetDisableButton] = useState(false);
const [nameuser, SetNameUser] = useState();
const [updatelistserver, SetUpdateListServer] = useState([])
const [downloadlistoftasks, SetDownloadListOfTasks] = useState();

const catchInputValue = (event) => {
	if (event.keyCode === 13) {
		SetInputvalue(event.target.value);
		SetArrayoflist([...arrayoflist, event.target.value]);
		let listitem = {label: event.target.value, done: false}
		SetUpdateListServer([...updatelistserver, listitem])
		event.target.value = "";
		console.log("listitem", listitem)
	}

};

console.log(inputvalue)
// console.log("text object", "{label:", inputvalue, "done: false}")
console.log(arrayoflist)
console.log("server", updatelistserver)


const removeProduct = (index) => {
	SetArrayoflist([
	  ...arrayoflist.slice(0, index),
	  ...arrayoflist.slice(index + 1, arrayoflist.length)
	]);
	SetUpdateListServer([
		...updatelistserver.slice(0, index),
		...updatelistserver.slice(index + 1, updatelistserver.length)
	]);
  }

const createUser = () => {
	SetDisableButton(!disablebutton);
	let Name = window.prompt("Type the Name of the User you want to create","");
	SetNameUser(Name)
	createNewUser(Name);
	console.log("name", Name)
	window.alert("User Created")
}

const getListOfUser = () => {
	let Name2 = window.prompt("Type the Name of the User you want to download the list","");
	SetNameUser(Name2)
	downloadListOfUser(Name2); // CRIAR A FUNÇÃO PARA DOWNLOAD DA LIST
	console.log("name2", Name2);
	window.alert("Download of the list is Complete");
	
}

console.log("username", nameuser)

const updateListOfTasks = () => {
	// fetch('https://assets.breatheco.de/apis/fake/todos/user/', nameuser, {
	fetch(nameuser? 'https://assets.breatheco.de/apis/fake/todos/user/' + nameuser : 'https://assets.breatheco.de/apis/fake/todos/user/TestMS', {
      method: "PUT",
      body: JSON.stringify(updatelistserver),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        
    })
    .then(data => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server

    })

    .catch(error => {
        //error handling
        console.log(error);
    });
}

const createNewUser = (username) => {
	fetch('https://assets.breatheco.de/apis/fake/todos/user/' + username, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(error => {
        console.log(error);
    });
	
};

const downloadListOfUser = (Name2) => {
	fetch('https://assets.breatheco.de/apis/fake/todos/user/' + Name2, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((resp) => resp.json()
        // console.log(resp.ok); // will be true if the response is successfull
        // console.log(resp.status); // the status code = 200 or code = 400 etc.

        // console.log(resp.text()); // will try return the exact result as string
        
    )
    .then((data) => {
        //here is were your code should start after the fetch finishes
        SetDownloadListOfTasks(data);
		console.log(data);
		 //this will print on the console the exact object received from the server
    })
	// .then((data2) => {
	// 	const listoftasksdownloaded = downloadlistoftasks?.map((item, indexD) => {
	// 		return item.label
	// 	});
		
		
	// })


    .catch(error => {
        //error handling
        console.log(error);
    });
}
console.log("data3", downloadlistoftasks)


const deleteUser = () => {
	fetch('https://assets.breatheco.de/apis/fake/todos/user/' + nameuser, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(error => {
        console.log(error);
    });
};


useEffect(() => {
    updateListOfTasks();
  }, [arrayoflist]);

const listoftasksdownloaded = downloadlistoftasks?.map((item, indexD) => {
	return (
		
			<li key={indexD}
			className="list-group-item d-flex justify-content-between" 
			style={{liststyle: "none", height: ""}}
			>
				<span className="p-2 text-left">{item.label}</span>
			<span 
				className="p-2 text-danger" 
				onClick={() => {
					removeProduct(indexD);
				}}
				style={{cursor: "pointer"}}> X
			</span>
			</li> 

)
})
console.log("final", listoftasksdownloaded)

const listoftasks = arrayoflist?.map((task, index) => {

    return (
		
			<li key={index}
			className="list-group-item d-flex justify-content-between" 
			style={{liststyle: "none", height: ""}}
			>
				<span className="p-2 text-left">{task}</span>
			<span 
				className="p-2 text-danger" 
				onClick={() => {
					removeProduct(index);
				}}
				style={{cursor: "pointer"}}> X
			</span>
			</li> 

	)
});



	return (
		<div className="container-fluid text-center"> 
		<h1 className="bg-light text-muted mt-5">{nameuser? "TODO LIST OF " + nameuser : "TODO LIST"}</h1>
		<br></br>
		<div className="row justify-content-md-center p-2">
				<div className="d-flex justify-content-evenly col col-lg-6">
					{/* <input className="" placeholder="Name of your User"></input> */}
					<button type="button" className="btn btn-dark btn-sm text-warning" onClick={getListOfUser}>Get the List of your User</button>
					<button type="button" className="btn btn-dark btn-sm text-warning" onClick={createUser} disabled={disablebutton}>Create a new User</button>
				</div>
			</div>
			<br></br>
			<div className="row justify-content-md-center">
				<input 
					className=" border-1 col col-lg-6" 
					placeholder="Type here what needs to be done?"
					size="100"
					onKeyDown={catchInputValue}
					maxLength={50}
				/>
			</div>
			<br></br>

			<div className="row justify-content-md-center">
				<ul 
					className="border-0 col col-lg-6 list-group d-flex"
					size="100"				
				>
					{listoftasksdownloaded? listoftasksdownloaded : listoftasks}
				</ul>
			</div>
			<br></br>
			<div className="row justify-content-md-center ">
				<div className="d-flex justify-content-evenly col col-lg-6">

					<button type="button" className="btn btn-danger btn-sm" onClick={() => {deleteUser(); window.alert("User Deleted")}}>Delete all the tasks</button>
					<button type="button" className="btn btn-primary btn-sm">TESTE</button>
				</div>
			</div>
			<footer className="position-absolute bottom-0 start-50 translate-middle-x text-center"> 
   					 <span className="bg-light text-muted">TODO LIST with fetch. </span>
						<br></br>
					 <span className="">If you create a new user all the list will be updated for this new user. </span>
					 	<br></br>
					 <span className="">If you don´t create any user the list will be set to the user "TestMS". </span>
						<br></br>
					 <span className="">The other option is to download the list of your user.</span>
					 <br></br>
					 <br></br>					 
  			</footer>
		</div>
	);
};

export default Home;

