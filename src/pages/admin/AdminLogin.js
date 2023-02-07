import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import STORAGEKEY from '../../config/APP/app.config';
import { ApiPostNoAuth } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import { LOGIN } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'


const AdminLogin = () => {
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginData = useSelector(state => state.login.login)

    const [login, setLogin] = useState({})
    const [loginFormError, setLoginFormError] = useState({})

    useEffect(() => {
        if (loginData) {
            console.log('loginData', loginData)
            if (loginData.status === 200 && loginData.message === "Login Successfully") {
                // toast.success(loginData.message);
                navigate('/homeLanding')
            }
        }
    }, [loginData])

    const handelChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const validation = () => {
        let param = false
        let error = {}
        if (!login.email) {
            param = true
            error.email = "Please enter email!"
        } else {
            if (!emailReg.test(login.email)) {
                param = true
                error.email = "Please enter a valid email!"
            }
        }
        if (!login.password) {
            param = true
            error.password = "Please enter password!"
        }
        setLoginFormError(error);
        return param
    }
    const Login = (e) => {
        e.preventDefault();
        if (validation()) {
            return
        }
        let data = {
            user_name: login.email,
            password: login.password
        }
        ApiPostNoAuth('superAdmin/login', data).then(res => {
            dispatch({
                type: LOGIN,
                payload: { res: res, is_loggedin: true }
            })
            if (res.status === 200 && res.data.token) {
                toast.success(res.message);
                navigate('/homeLanding');
                AuthStorage.setStorageData(STORAGEKEY.token, res.data.token, true)
                AuthStorage.setStorageData(STORAGEKEY.roles, "superAdmin", true)
                AuthStorage.setStorageData(STORAGEKEY.userId, res.data.id, true)
                AuthStorage.setStorageData(STORAGEKEY.userData, JSON.stringify(res.data), true)
            } else {
                toast.error(res.message);
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <section className="login">
            <div className="container">
                <div className="sign-grd">
                    <div className="lft-pan">
                        <div className="form-box">
                            <div className='form'>
                                <h1 className='mb-5 mt-5'>Sign In</h1>
                                <input type="email" placeholder="Email" name='email' onChange={handelChange} />
                                {loginFormError.email && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{loginFormError.email}</span>}
                                <input type="password" placeholder="Password" name='password' onChange={handelChange} />
                                {loginFormError.password && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{loginFormError.password}</span>}
                                <a href="#" className="forgot">Forgot your password?</a>
                                <button onClick={(e) => Login(e)}>Sign In</button>
                            </div>
                        </div>
                    </div>
                    <div className="rgt-pan">
                    <p>This is the administrative portal, if you are not an administrator you cannot have access. Please go to the client login</p>
                        {/* <h1>Create Account</h1> */}
                        {/* <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore modi omnis vero a autem harum quidem quo deserunt quos minus
                        </p> */}
                        {/* <a onClick={() => navigate('/signup')} className="ghost">Create Account</a> */}
                        {/* <p>OR</p> */}
                        {/* <a onClick={btnLogic} className="ghost">{buttonText}</a> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminLogin