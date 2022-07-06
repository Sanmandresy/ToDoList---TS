import React, {ChangeEvent, Dispatch, SetStateAction, useState} from 'react';
import './styles/styles.css';
import './App.css';


/*const Counter: React.FC<{color?:string}> = (props) => {
  const [count,setCount] = useState<number>(0);
  return (<button onClick={():void => {
    setCount(count + 1);
  }} >Increment :  {count}</button>);
};*/


//Status
enum StatusList{
  todo = "todo",
  in_progress = "in_progress",
  done = "done"
};

//Task
interface Task{
    title : string;
    description : string;
    status?: StatusList;
}


const CardItem : React.FC<{items:Task}> = (props) => {
      const {items} = props;
      const {title,description} = items;
      return(<>
        <h3 className="task-title">{title}</h3>
        <p className='description'>{description}</p>
      </>);
}

const Card : React.FC<{tasks:Task[],head:string}> = (props) => {
        const {tasks,head} = props;
        return(<>
            <div className='card'>
              <h1>{head}</h1>
              <ul>
                {tasks.map((todo) => (
                  <li className='task'>
                    <CardItem items={todo}/>
                  </li>
                ))}
              </ul>
            </div>
        </>);
};


//Form component
const Form:React.FC <{setTodos:Dispatch<SetStateAction<Task[]>>,
  setToProgress:Dispatch<SetStateAction<Task[]>>,
  setToDone:Dispatch<SetStateAction<Task[]>>}> = (props) => {
    const {setTodos,setToProgress,setToDone} = props;
    const keys  = Object.values(StatusList);

    const [title,setTitle] = useState<string>("");
    const [description,setDescription] = useState<string>("");
    const [status,setStatus] = useState<string>("");
    

   
    const taskList:Task = {
      title:title,
      description:description,
    };


    return(<>
    
        <form className='form-card'>
          <div className="form-part">
            <label>Title : </label><input type={"text"} name="title" value={title} onChange={(e:ChangeEvent<HTMLInputElement>) =>{
              setTitle(e.target.value);
            }} />
          </div>
          <div className="form-part form-two">
            <label>Description :</label>
            <textarea value={description} onChange={(e:ChangeEvent<HTMLTextAreaElement>) =>{
              setDescription(e.target.value);
            }} />
          </div>
          <div className="form-part">
            <label>Status : </label>
            <select onChange={(e) => {
                setStatus(e.target.value);
            }}>
              {keys.map((values) => (
                <option className='status' value={values}>{values}</option>
              ))}
            </select>
          </div>
          <button className='add-btn' onClick={(e) => {
              e.preventDefault();
              if(status === "todo"){
                setTodos((previousState) => {
                  return [...previousState,taskList];
                });
              }
              else if (status === "in_progress"){
                setToProgress((previousState) => {
                return [...previousState,taskList];
              });
              }
              else if(status === "done"){
                setToDone((previousState) => {
                return [...previousState,taskList];
              });
              }

          }}>Add</button>
        </form>
    
    </>);
};

const App:React.FC = () => {
  let [todo,setTodos ]= useState<Task[]>([{title:"",description:"",status:StatusList.todo}]);
  let [progress,setProgress ]= useState<Task[]>([{title:"",description:"",status:StatusList.in_progress}]);
  let [done,setToDone ]= useState<Task[]>([{title:"",description:"",status:StatusList.done}]);
  return (
    <div className="App">
       <header className="title">To Do List</header>
       <Form setTodos={setTodos} setToDone={setToDone} setToProgress={setProgress}/>
       <div className="card-box">
        <Card tasks={todo} head="To do"/>
        <Card tasks={progress} head="In progress" />
        <Card tasks={done} head="Done" />
       </div>
    </div>
  );
}

export default App;
