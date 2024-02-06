import { useState, useEffect } from "react";

export default function App(){
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

  function handleRegister(){
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
    localStorage.setItem('@task', JSON.stringify([...tasks, input])) 
    // localStoraga para salvar as tasks quando atualizar a página.
  }


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
    localStorage.setItem('@task', JSON.stringify(allTasks))
  }

  function handleDelete(item: string){
    const removeTasks = tasks.filter( tasks => tasks !== item)
    setTasks(removeTasks)

    localStorage.setItem('@task', JSON.stringify(removeTasks))

  }

  function handleEdit(item: string){
    setInput(item)
    setEditTasks({
      enabled: true,
      tasks: item
    })
  
  }


  return(
    <div>
      <h1>Lista de tarefas</h1>
      <input
      placeholder="Digite o nome da tarefa"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleRegister}>
        {editTasks.enabled ? "Atualizar tarefa" : "Adicionar Tarefa"}
      </button>
      <hr />

      {tasks.map((item, index) => (
        <section key={item}>
          <span>{item}</span>
          <button onClick={() => handleEdit(item)}>Editar</button>
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