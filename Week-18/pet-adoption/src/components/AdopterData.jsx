import React, { Component } from 'react'

export class AdopterData extends Component {
  render() {
    const { formData, handleGoBack } = this.props;
    return (
      <div>
        <table className="border-collapse w-full border border-[#ddd] text-lg text-left p-2 bg-[#f2f2f2] text-[#333] capitalize font-sans mt-5 mb-5">
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Pet Type</th>
              <th>Adopter Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((data, index) => (
              <tr key={index}>
                <td>{data.petName}</td>
                <td>{data.petType}</td>
                <td>{data.adopterName}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-5 text-center'>
          <button onClick={handleGoBack} className='px-10 py-2'>
            Go Back
          </button>
        </div>

      </div>
    )
  }
}

export default AdopterData