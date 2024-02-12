import { useEffect, useState } from 'react'

import './App.css'

import { useSelector,useDispatch } from 'react-redux'
import { fetchStudents,daleti,addStud ,editt,save} from './App/students/studentsSlice'

function App() {

  let [values,setvalues]=useState({
    name:'',
    hobby:''
  })
  let [show,setShow]=useState(0)
  let [datas,setDatas]=useState([])
  let [names,setNames]=useState({name:''})
  let [torf,setTorf]=useState(true)
  let [i,setI]=useState('')
  


  let  {loading, student, error,edit }=useSelector((state)=>state.student)
  console.log(student);
let dispatch=useDispatch()
let func3=()=>{
  let newarr=student.filter((e)=>e.name.toLowerCase().includes(names.name.toLowerCase()))
  setDatas(newarr)
}
let dal= (id)=>{
  setShow(show+100)
  dispatch(daleti(id))
  setShow(show+100)
}
useEffect(()=>{
  func3()
},[names])
let add=()=>{
if (values.name!=='' && values.hobby!=='') {
  dispatch(addStud(values))
  setShow(show+100)
}
  // console.log('salom');
}

let prev=(event)=>{
  event.preventDefault()
}
let func2=(id)=>{
  setTorf(false)
  setI(id)
  setShow(show+200)
  dispatch(editt(id))
  setvalues(edit)
  setShow(show+200)
  // console.log('salom');
}

let saves=(id)=>{
    dispatch(save(id,values))
    setShow(show+200)
}

let func4=()=>{
  if (student.length>0) {
    datas.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
}
let func5=()=>{
  datas.sort(function (a, b) {
    if (a.hobby < b.hobby) {
      return -1;
    }
    if (a.hobby > b.hobby) {
      return 1;
    }
    return 0;
  });
}

useEffect(()=>{
  dispatch(fetchStudents())
},[show])
  return (
    <>
      <div className=' z-20 w-full h-[80px] bg-[#0f0e32]  fixed top-0 left-0 border-t-2 border-t-cyan-700'>
         <div className="container">
         <form onSubmit={prev} className='w-full h-[80px] flex items-center gap-3'>
            <input value={values.name} onChange={(e)=>setvalues({...values,name:e.target.value})} className='w-[400px] rounded-lg h-[40px] pl-2' type="text" placeholder='# students name' />
            <input value={values.hobby} onChange={(e)=>setvalues({...values,hobby:e.target.value})}  className='w-[400px] rounded-lg h-[40px] pl-2' type="text" placeholder='# students hobby' />
            <div>
              <button onClick={()=>{
                if (torf) {
                  add()
                }else{
                  saves(i)
                }
              }} type="button" className="btn btn-primary">{torf? 'Add' : 'Save'}</button>
            </div>
            <p className='text-[30px] text-white  '>
              # Students CRUD
            </p>
          </form>
         </div>
        </div> 
        <div className='mt-[100px] w-full'>
          <div className="container">
            <p className='text-[30px] mb-[10px]'># Students :</p>
            <div className='w-full flex flex-col items-center gap-4 '>
                {
                  names.name===''?<div className='w-full'>
                    {
                  student.map((e,i)=>(
                    <div className='dd border w-full h-[70px] pr-[10px] pl-[20px] flex items-center justify-between hover:bg-[#bad4bb] rounded-sm' key={i}>

                        <p className='w-[300px] relative underline underline-offset-4 '>{i+1} {e.name} <p className=' absolute top-[-20px] left-[-20px] text-[10px]'># name :</p></p>
                        <p className='w-[300px] relative underline underline-offset-4'>{e.hobby} <p className='absolute top-[-20px] left-[-20px] text-[10px]'># hobby :</p></p>
                        <div className='flex gap-2 items-center'>
                          <button onClick={()=>func2(e.id)} className=' rounded text-[20px] text-[#3fbf42] hover:border-2'><i className='bx bxs-edit-alt'></i></button>
                          <span className='inline-block w-[1px] h-[20px] bg-black'></span>
                          <button onClick={()=>dal(e.id)} className=' rounded text-[20px]  text-[#f24828] hover:border-2'><i className='bx bxs-coffee-togo'></i></button>
                        </div>
                    </div>
                  ))
                }
                  </div>:<div  className='w-full'>
                  {
                  datas.map((e,i)=>(
                    <div className='dd border w-full h-[70px] pr-[10px] pl-[20px] flex items-center justify-between hover:bg-[#bad4bb] rounded-sm' key={i}>

                        <p className='w-[300px] relative underline underline-offset-4 '>{i+1} {e.name} <p className=' absolute top-[-20px] left-[-20px] text-[10px]'># name :</p></p>
                        <p className='w-[300px] relative underline underline-offset-4'>{e.hobby} <p className='absolute top-[-20px] left-[-20px] text-[10px]'># hobby :</p></p>
                        <div className='flex gap-2 items-center'>
                          <button onClick={()=>func2(e.id)} className=' rounded text-[20px] text-[#3fbf42] hover:border-2'><i className='bx bxs-edit-alt'></i></button>
                          <span className='inline-block w-[1px] h-[20px] bg-black'></span>
                          <button onClick={()=>dal(e.id)} className=' rounded text-[20px]  text-[#f24828] hover:border-2'><i className='bx bxs-coffee-togo'></i></button>
                        </div>
                    </div>
                  ))
                }
                  </div>
                }
            </div>
          </div>
        </div>
        <div className='w-full h-[80px] bg-[#0f0e32]  fixed bottom-0 left-0 flex items-center border-b-2 border-b-cyan-700'>
                <div className="container flex items-center gap-[20px]">
                  <input value={names.name} onChange={(e)=>setNames({name:e.target.value})} className='border rounded w-[450px] h-[40px] pl-[10px]' type="text" placeholder='# search student' />
                  <p className='text-white text-[40px]'># Search</p>
                  <span className='inline-block w-[1px] h-[40px] bg-white'></span>
                  <p className='text-white'># Sort Name <i className='bx bxs-hand-right'></i></p>
                  <button onClick={()=>func4()} className='text-white p-1 rounded-xl bg-[#49b91f] '>SN</button>
                  <span className='inline-block w-[1px] h-[40px] bg-white'></span>
                  <p className='text-white'># Sort Hobby <i className='bx bxs-hand-right'></i></p>
                  <button onClick={()=>func5(student)} className='text-white p-1 rounded-xl bg-[#49b91f] '>SH</button>
                </div>
        </div>
    </>
  )
}

export default App
