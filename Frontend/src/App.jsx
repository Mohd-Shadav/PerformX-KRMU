import React, { useEffect, useState } from 'react'
import Login from './components/Auth/Login.jsx'
import TrainersPage from './components/Trainers/TrainersPage.jsx'
import StudentPage from './components/StudentComponents/StudentPage.jsx'


function App() {


 const [role, setRole] = useState(null)


  useEffect(() => {
    const data = localStorage.getItem("USER")
    if (data) {
      const parsed = JSON.parse(data)
      setRole(parsed.role)
    
    }
  }, [])
  return (
    <div>
   

    {role==='trainer'?(
      <TrainersPage setRole={setRole}/>
    ):role==='student' ?(
      <StudentPage setRole={setRole}/>
    ):(
 <Login setRole={setRole}/>
    )

    }


    {/* <TrainersPage/> */}
    {/* <StudentPage/> */}
   

    
    </div>
  )
}

export default App