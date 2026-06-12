import React, { useState } from 'react'
import AdopterData from './AdopterData';
import { validation } from '../utils/validation';

const PetAdoptionForm = () => {
  const [formData, setFormData] = useState([]);
  const [values, setValues] = useState({
    petName: "",
    petType: "Dog",
    adopterName: "",
    email: "",
    phone: ""
  });

  const[showTable, setShowTable] = useState(false);
  const { petName, petType, adopterName, email, phone } = values;
  console.log(petName, petType, adopterName, email, phone);

  const [errors, setErrors] = useState({
    petName: "",
    petType: "",
    adopterName: "",
    email: "",
    phone: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    let errorsCopy = { ...errors };
    const errorR = validation(name, value, errorsCopy);
    setErrors(errorR);
  }

  const handleSubmit = () => {
    console.log(
      `Pet Name: ${petName} 
      Pet Type: ${petType} 
      Adopter Name: ${adopterName} 
      Email: ${email} 
      Phone: ${phone}`
    );
    if (!petName
      || !adopterName
      || !email || !phone) {
      alert("Please fill out all fields");
      return;
    }
    const hasErrors = Object.values(errors).some((val) => val);
    if (hasErrors) {
      alert("Please fill out all fields");
      return;
    }

    const data = { petName, petType, adopterName, email, phone };
        setFormData((prevData) => [...prevData, data]);
        setShowTable(true);
        setValues({
            petName: "",
            petType: "Dog",
            adopterName: "",
            email: "",
            phone: ""
        })
        setErrors({
            petName: "",
            petType: "",
            adopterName: "",
            email: "",
            phone: ""
        })
  }

  const handleGoBack = () => setShowTable(!showTable);

  if (!showTable) {
        return (
            <div className='form'>
                <div>
                    <label htmlFor="petName">Pet Name</label>
                    <input
                        type="text"
                        name="petName"
                        placeholder="Pet Name"
                        value={petName}
                        onChange={handleChange}
                    />
                    <small>{errors.petName}</small>
                </div>
                <div>
                    <label htmlFor="petType">Pet Type</label>
                    <select value={petType} name="petType" onChange={handleChange}>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Bird">Bird</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='adopterName'>Your Name</label>
                    <input type="text"
                        name="adopterName"
                        placeholder='Your Name'
                        value={adopterName}
                        onChange={handleChange} />
                    <small>{errors.adopterName}</small>
                </div>
                <div>
                    <label htmlFor='email'>
                        Email
                    </label>
                    <input type="email" name="email" placeholder='Email' value={email} onChange={handleChange} />
                    <small>{errors.email}</small>
                </div>
                <div>
                    <label htmlFor='phone'>
                        Phone
                    </label>
                    <input type="text"
                        name="phone"
                        placeholder='Phone'
                        value={phone}
                        onChange={handleChange} />
                    <small>{errors.phone}</small>

                </div>
                <div className='text-center'>
                    <button type="submit" onClick={handleSubmit} className='px-10 py-2'>
                        Submit
                    </button>
                </div>
            </div>
        )
    }
  return <AdopterData formData={formData} handleGoBack={handleGoBack}></AdopterData>
}

export default PetAdoptionForm