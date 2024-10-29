import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        address: '',
        work: '',
        mobile: '',
        salary: ''
    });

    const [data, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    // Fetch data
    useEffect(() => {
        axios
            .get("http://localhost:5000/person")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (isEdit && editIndex !== null) {
            axios.put(`http://localhost:5000/person/${editIndex}`, formData)
                .then(() => {
                    setData(data.map(item => item._id === editIndex ? { ...item, ...formData } : item));
                });
        } else {
            axios.post('http://localhost:5000/person', formData)
            .then(() => {
                setData(prevData => [...prevData, { ...formData }]);
            });
        }
        setFormData({
            name: '',
            email: '',
            age: '',
            address: '',
            work: '',
            mobile: '',
            salary: ''
        });
        setIsEdit(false);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/person/${id}`)
            .then(() => {
                setData((prevData) => prevData.filter((item) => item._id !== id));
            })
            .catch((err) => {
                console.error("Error deleting data:", err);
            });
    };

    const handleEdit = (person) => {
        setIsEdit(true);
        setFormData(person);
        setEditIndex(person._id);
    };

    return (
        <>

            <div className="form-main">
                <h3>Add Details</h3>
                <div>
                    <input type="text" placeholder="Enter Name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <input type="number" placeholder="Enter age" name="age" value={formData.age} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Enter work" name="work" value={formData.work} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Enter mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Enter address" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div>
                    <input type="number" placeholder="Enter salary" name="salary" value={formData.salary} onChange={handleChange} />
                </div>
                <div>
                    <button onClick={handleSubmit}>{isEdit ? 'Update' : 'Submit'}</button>
                </div>
            </div>

            {data.length > 0 && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((e, ) => (
                            <tr key={e._id}>
                                <td>{e.name}</td>
                                <td>{e.work}</td>
                                <td>
                                <button className="edit-button" onClick={() => handleEdit(e)}>Edit</button>
                                <button onClick={() => handleDelete(e._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Form;
