import React, { Component } from "react";
import PropTypes from "prop-types";
import UserConsumer from "../context";
import axios from 'axios'
import { Link } from 'react-router-dom'

class User extends Component {
    state = {
        isVisible: false,
    };
    onClickEvent = (event) => {
        this.setState({
            isVisible: !this.state.isVisible,
        });
    };
    deleteClickUser = async (dispatch, e) => {
        const { id } = this.props
        await axios.delete(`http://localhost:3000/users/${id}`)
        dispatch({ type: "DELETE_USER", payload: id })
    };
    render() {
        const {id, name, department, salary } = this.props;
        const { isVisible } = this.state;

        return (
            <UserConsumer>
                {(value) => {
                    const { dispatch } = value;
                    return (
                        <div>
                            <div
                                style={{ maxWidth: "40rem" }}
                                className="card text-white bg-warning mb-3 "
                            >
                                <div className="card-header d-flex justify-content-between">
                                    <h5 className="d-inline" style={{ cursor: "pointer" }} onClick={this.onClickEvent}>
                                        {name}
                                    </h5>
                                    <i
                                        onClick={this.deleteClickUser.bind(this, dispatch)}
                                        className="fa-solid fa-trash-can"
                                        style={{ cursor: "pointer" }}
                                    ></i>
                                </div>

                                {isVisible ? (
                                    <div className="card-body">
                                        <h5 className="card-text">Department: {department}</h5>
                                        <h5 className="card-text">Maaş: {salary}</h5>
                                        <hr></hr>
                                        <Link to= {`edit/${id}`} className='btn btn-primary form-control' >İşçi Güncelle</Link>
                                    </div>

                                ) : null}
                            </div>
                        </div>
                    );
                }}
            </UserConsumer>
        );
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
};
User.defaultProps = {
    name: "Bilgi yok",
    department: "Bilgi yok",
    salary: "Bilgi yok",
};

export default User;
