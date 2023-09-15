'use client';
import React, { useState ,useEffect, FC} from 'react';
import Loading from './loading';
import Link from 'next/link';
import { set } from 'mongoose';
// interface User{
//   name:string,
//   phone:string,
//   ElecricityId:string,
//   ElectricityScNo:string,
//   ElectricityOfficeName:string,
//   email:string,
//   id:string,
//   enabled:boolean


// }
const Form :any=  (props: {value:boolean, user: {
  [x: string]: any; name: any; 
}; phone: String; ElecricityId: String; ElectricityScNo: String; ElectricityOfficeName: String; enabled: boolean; }):any=> {
  console.log(props?.user)
  const [name, setName] = useState(props.value?props.user.name:'');
  const [phoneNumber, setphoneNumber] = useState(props.value?props.user.phone:'');
  const [ElecricityID, setElecricityID] = useState(props.value?props.user.ElecricityId:'');
  const [ElecricityScNo, setElecricityScNo] = useState(props.value?props.user.ElectricityScNo:'');
  const [OfficeName, setOfficeName] = useState(props.value?props.user.ElectricityOfficeName:'');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [submited,setsubmited]=useState(false)
  const [enableFeature, setEnableFeature] = useState(props.value?props.user.enabled:false);
  console.log(props.value)
  const handleSubmit = async (e:any) => {

    setsubmited(true);

    if(! name&&phoneNumber&&ElecricityID&&ElecricityScNo&&OfficeName===''){

      
      alert("Form cannot be empty")
      return ;
    }
    e.preventDefault();

    try{
      let formdata=await fetch('/api/signup', {
      method: props.value?'PUT':'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone:phoneNumber, ElecricityId:ElecricityID,ElectricityScNo: ElecricityScNo,ElectricityOfficeName: OfficeName,enabled:enableFeature }),
    });


    let res=await formdata.json();
    alert("Successfully updated")
    setsubmited(false);

    }catch(err){
      alert("Error occured check all values and try again")
      setsubmited(false);
    }
    


   
   
  };

  const resetForm = () => {
    setName('');
    setphoneNumber('');
   
  };

  const handleImageChange = () => {

  };



 
  
if(submited){

  return <Loading />
}
                  
                
  


  return (
      
    <div className={`flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-end mt-4">
          
   
       </div>
        <h1 className="text-4xl text-center mb-4">Update Your Info</h1>
        <p className="text-lg text-center text-gray-600">
          Please fill in the form carefully and correctly as this will deduce your balance on a monthly basis. 
        </p>
        <form
          className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} rounded-md shadow-md p-6`}
          style={{ border: isDarkMode ? '2px solid purple' : '2px solid black' }}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="block text-lg font-medium">
              Name:
            </label>
            <input
            required
              type="text"
              id="name"
              placeholder="Enter your name"
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="phonenumber" className="block text-lg font-medium">
              PhoneNumber:
            </label>
            <input
            required
              type="text"
              id="phonenumber"
              placeholder=" Phone number associated with your account"
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div>
              <div>
            <label htmlFor="ElecricityID" className="block text-lg font-medium">
              Electricity IDNumber:
            </label>
            <input
            required
              type="text"
              id="ElecricityID"
              placeholder="Electricity ID Number"
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
              value={ElecricityID}
              onChange={(e) => setElecricityID(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
              <div>
            <label htmlFor="SCNO" className="block text-lg font-medium">
              Electricity SCNO:
            </label>
            <input
            required
              type="text"
              id="ElecricityScNo"
              placeholder="Electricity SC Number"
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
              value={ElecricityScNo}
              onChange={(e) => setElecricityScNo(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
              <div>
            <label htmlFor="OfficeName" className="block text-lg font-medium">
              Electricity OfficeName:
            </label>
            <input
            required
              type="text"
              id="OfficeName"
              placeholder="Enter the office name"
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
              value={OfficeName}
              onChange={(e) => setOfficeName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <label htmlFor="enableFeature">enable feature</label>
      <input id="enableFeature" type="checkbox" name="enableFeature" checked={enableFeature} onClick={(e) => setEnableFeature(!enableFeature)} />
          </div>
          <button
            onClick={(e)=>handleSubmit(e)}
            type="submit"
            className={`mt-4 w-full py-2 text-lg font-medium text-white bg-indigo-500 rounded-md ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};
    

export default Form;