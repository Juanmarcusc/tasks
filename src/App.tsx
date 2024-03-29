import { useState, useEffect, useRef, useMemo, useCallback} from "react";
import "./App.css"

export default function App(){
  const inputRef = useRef<HTMLInputElement>(null); 
  const firstRender = useRef(true);

  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState<string[]>([])

  const [editTasks, setEditTasks] = useState({
    enabled: false,
    tasks: ''

  })

  useEffect(() => {
    const savesTasks = localStorage.getItem('@task')

    if(savesTasks){
      setTasks(JSON.parse(savesTasks));
    }
  }, [])

  useEffect(() => {

    if(firstRender.current){
      firstRender.current = false;
      return;
    }

    localStorage.setItem('@task', JSON.stringify(tasks))

  }, [tasks])


  const handleRegister = useCallback(() => {
    if(!input){
      alert("Preencha o nome da sua tarefa!")
      return;
    }

    if(editTasks.enabled){
      handleSaveEdit()
      return;
    }

    setTasks(tarefas => [...tarefas, input])
    /* função JS que faz adicionar todas as tarefas anteriores
    e acrecentar outras com o input */
    setInput("")
  }, [input, tasks])


  function handleSaveEdit(){
    const findIndexTasks = tasks.findIndex(tasks => tasks === editTasks.tasks)
    const allTasks = [...tasks];

    allTasks[findIndexTasks] = input;
    setTasks(allTasks);

    setEditTasks({
      enabled: false,
      tasks: ''
    })
    setInput("");
    
  }

  function handleDelete(item: string){
    const removeTasks = tasks.filter( tasks => tasks !== item)
    setTasks(removeTasks)
  }

  function handleEdit(item: string){

    inputRef.current?.focus();
    // focar no input ao clilcar no editar
    // ? significa se está vazio.

    setInput(item)
    setEditTasks({
      enabled: true,
      tasks: item
    })
  
  }

  const totalTasks = useMemo(() => {
    return tasks.length
  }, [tasks])


  return(
    <div className="container">
      <section className="background-image-title">
        <h1 className="title">Lista de tarefas</h1>
      </section>
      <input
      placeholder="Digite o nome da tarefa"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      ref = {inputRef}
      />
      <button onClick={handleRegister}>
        {editTasks.enabled ? "Atualizar tarefa" : "Adicionar Tarefa"}
      </button>

      <strong>Você tem {totalTasks} tarefas</strong>

      {tasks.map((item, index) => (
        <section key={item}>
          <span>{item}</span>
          <button  onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelete(item)}>Excluir</button>
        </section>
      ))} 
    </div>
  )
}

//{} chamar a função dentro do return
// .map para percorrer todos os itens da lista
// index é a posição da tarefa dentro da função
// item é o valor dentro. 