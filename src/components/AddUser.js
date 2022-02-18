import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from '../context';
import axios from 'axios'
import { Link } from 'react-router-dom';




const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: {
            display: "block"
        }
    },
    hidden: {
        opacity: 0, applyAtEnd: {
            display: "none"
        }
    }
});



class AddUser extends Component {

    state = {
        visible: false,
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



    addUser = async (dispatch, e) => {
        e.preventDefault();

        const { name, department, salary } = this.state;
        const newUser = {
            name,
            department,
            salary
        }
        const response = await axios.post("http://localhost:3000/users/", newUser)
        dispatch({ type: "ADD_USER", payload: response.data })

        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }


        // redırect ana sayfa yonlendırme
        // window.location.replace("/");
    }

    changeVisible = (e) => {
        this.setState({
            visible: !this.state.visible
        })
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {


        const { visible, name, department, salary ,error} = this.state;
        return (<UserConsumer>
            {
                value => {
                    const { dispatch } = value;
                    return (

                        <div style={{ maxWidth: "40rem" }}>
                            
                          

                            <button style={{ fontSize: "1.1rem" }} onClick={this.changeVisible} className='btn btn-info form-control mb-2' >{visible ? "Hide Form" : "Show Form"}</button>

                            <Animation
                                pose={this.state.visible ? 'visible' : 'hidden'}
                            >
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
                                        <form onSubmit={this.addUser.bind(this, dispatch)}>
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
                                            <button type="submit" className='btn btn-danger form-control' >Add User</button>

                                            <hr>
                                            </hr>
                                            <Link to={"/"}>
                                <button type="submit" className='btn btn-success form-control' >Işçi Sayfasına Git</button>
                            </Link>
                                        </form>
                                    </div>
                                </div>
                            </Animation>
                        </div>
                    )
                }
            }
        </UserConsumer>)



    }
}


export default AddUser;