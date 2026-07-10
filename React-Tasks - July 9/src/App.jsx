import EmployeeCard from "./components/EmployeeCard";
import Counter from "./components/Counter";
import LoginForm from "./components/LoginForm";
import ThemeToggle from "./components/ThemeToggle";
import TodoApp from "./components/TodoApp";
import EmployeeList from "./components/EmployeeList";
import SearchFilter from "./components/SearchFilter";
import StatusBadge from "./components/StatusBadge";
import Reusable from "./components/Reusable";
import FetchUsers from "./components/FetchUsers";

function App() {


const task = 10;


return (

<>

    {
      task === 1 && 
      <EmployeeCard
        id={101}
        name="Nivetha"
        age={22}
        department="Software"
        salary={50000}
      />
    }


    {
      task === 2 &&
      <Counter />
    }


    {
      task === 3 &&
      <LoginForm />
    }


    {
      task === 4 &&
      <ThemeToggle />
    }


    {
      task === 5 &&
      <TodoApp />
    }

    {
      task===6 &&
      <EmployeeList/>
    }

    {
      task===7 &&
      <SearchFilter/>
    }

    {
      task===8 &&
      <StatusBadge/>
    }

    {
      task===9 &&
      <Reusable/>
    }

    {
      task===10 &&
      <FetchUsers/>
    }
</>

);

}


export default App;

