import { useState } from "react";

export default function App(){
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState([
    'Ir para a academia as 6:00hrs e voltar as 8:00hrs',
    'Tomar café e ler a Bíblia',
    'Estudar React + Typescript'

  ])

  function handleRegister(){
    if(!input){
      alert("Preencha o nome da sua tarefa!")
      return;
    }
  }


  return(
    <div>
      <h1>Lista de tarefas</h1>
      <input
      placeholder="Digite o nome da tarefa"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleRegister}>Adicionar tarefa</button>
      <hr />

      {tasks.map((item, index) => (
        <section key={item}>
          <span>{item}</span>
        </section>
      ))} 
    </div>
  )
}

//{} chamar a função dentro do return
// .map para percorrer todos os itens da lista
// index é a posição da tarefa dentro da função
// item é o valor dentro. 