import React, { Component } from 'react'
import UserConsumer from '../context';
import axios from 'axios'
import { Link } from 'react-router-dom';


class UpdateUser extends Component {
    state = {
        name: "",
        department: "",
        salary: "",
        error: false
    }

    validateForm = () => {
        const { name, department, salary } = this.state;
        if (name === "" || department === "" || salary === "") {
            return false;
        }
        return true;
    }

    componentDidMount = async () => {
        const { id } = this.props;
        const response = await axios.get(`http://localhost:3000/users/${id}`)
        const { name, department, salary } = response.data;

        this.setState({
            name,
            department,
            salary
        })
    }




    updateUser = async (dispatch, e) => {
        e.preventDefault();
        const { name, department, salary } = this.state;
        const { id } = this.props;

        const updatedUser = {
            name,
            department,
            salary,

        }
        const response = await axios.put(`http://localhost:3000/users/${id}`, updatedUser)

        dispatch({ type: "UPDATED_USER", payload: response.data })

        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

    }


    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { name, department, salary, error } = this.state;
        return (
            <UserConsumer>

                {
                    value => {
                        const { dispatch } = value;
                        return (



                            <div style={{ maxWidth: "40rem" }}>
                                <Link to={"/"}>
                                    <button type="submit" className='btn btn-success form-control' >Işçi Sayfasına Git</button>
                                </Link>
                                <hr />


                                <div className='card text-white bg-secondary mb-3' >

                                    {
                                        error ?
                                            <div className='alert alert-primary' >Lutfen bilgileri kontrol edin</div>
                                            : null
                                    }

                                    <div className='card-header'>
                                        <h4>Add User</h4>
                                    </div>
                                    <div className='card-body' >
                                        <form onSubmit={this.updateUser.bind(this, dispatch)} >
                                            <div className='form-group mb-3'>
                                                <label htmlFor='name'>Name</label>
                                                <input onChange={this.changeInput} type="text" name='name' placeholder='Enter Name' className="form-control" id="name" value={name} />
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label htmlFor='department'>Demartment</label>
                                                <input onChange={this.changeInput} type="text" name='department' placeholder='Enter Demartmen' className="form-control" value={department} id="department" />
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label htmlFor='salary'>Salary</label>
                                                <input onChange={this.changeInput} type="text" name='salary' placeholder='Enter Salary' className="form-control" value={salary} id="salary" />
                                            </div>
                                            <hr />
                                            <button type="submit" className='btn btn-danger form-control' >Update User</button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>)



    }
}

export default UpdateUser;
