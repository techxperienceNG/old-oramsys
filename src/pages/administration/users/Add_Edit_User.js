import { TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  userAddAction,
  userGetByIdAction,
  userUpdateAction,
} from "../../../redux/actions/userAction"
import { toast } from "react-toastify"
import { USER_ADD, USER_GET_BY_ID, USER_UPDATE } from "../../../redux/types"
import Autocomplete from "@material-ui/lab/Autocomplete"

const Add_Edit_User = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const id = searchParams.get("id")
  const location = useLocation()
  const isView = location.state?.isView

  let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  const [state, setState] = React.useState({
    name: "",
    email: "",
    department: "",
    profile: "",
  })
  const [error, setError] = useState()

  const userEdit = useSelector((state) => state.userData.userGetId)
  const userUpdated = useSelector((state) => state.userData.userUpdate)
  const userAddData = useSelector((state) => state.userData.userAdd)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(userGetByIdAction(id))
    }
    // console.log('id=============', id)
  }, [id])

  useEffect(() => {
    if (userAddData && userAddData.status === 200) {
      dispatch({
        type: USER_ADD,
        payload: [],
      })
      navigate("/users")
      toast.success(userAddData.message)
    }
  }, [userAddData])


  useEffect(() => {
    return () => {
      dispatch({
        type: USER_GET_BY_ID,
        payload: null,
      })
    }
  }, [])

  useEffect(() => {
    console.log('userEdit=======/=========', userEdit)
    if (userEdit?.data && id) {
        setState({
            ...state,
            name: userEdit.data?.name,
            email: userEdit.data?.email,
            department: userEdit.data?.department,
            profile: userEdit.data?.profile,
        })
    }
}, [userEdit])

  useEffect(() => {
    if (userUpdated && userUpdated.status === 200) {
        toast.success(userUpdated.message)
        dispatch({
            type: USER_UPDATE,
            payload: []
        })
        navigate('/users')
    }
    console.log('userUpdated', userUpdated)
}, [userUpdated])


  useEffect(() => {
    console.log("state", state)
  }, [state])

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const validation = () => {
    let param = false
    let error = {}
    if (!state.name) {
      param = true
      error.name = "Please enter name!"
    }
    if (!state.email) {
      param = true
      error.email = "Please enter email!"
    } else {
      if (!emailReg.test(state.email)) {
        param = true
        error.email = "Please enter a valid email!"
      }
    }
    if (!state.department) {
      param = true
      error.department = "Please select department!"
    }
    if (!state.profile) {
      param = true
      error.profile = "Please select profile!"
    }
    setError(error)
    return param
  }

  const saveData = () => {
    if (validation()) {
      return
    }
    if (id) {
      dispatch(userUpdateAction(state, id))
    } else {
      dispatch(userAddAction(state))
    }
  }

  const options = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua",
    "Argentina",
    "India",
  ]

  const profileOption = ["User", "Admin", "Tester"]

  const departmentOption = [
    "Credit",
    "Operations",
    "Compliance",
    "Information Technology",
    "Finance",
    "Credit Remediation",
    "Senior Management",
  ]

  return (
    <>
      <div className='add-edit-product'>
        <h1 className=''>User</h1>
        <div className='form'>
          <h2 className='mb-3'>Details</h2>
          <div>
            <Row className='mt-4'>
              <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                <TextField
                  label='Name'
                  variant='standard'
                  color='warning'
                  name='name'
                  value={state.name}
                  onChange={handleChange}
                  disabled={isView}
                />
                {error?.name && (
                  <span
                    style={{
                      color: "#da251e",
                      width: "100%",
                      textAlign: "start",
                    }}
                  >
                    {error?.name}
                  </span>
                )}
              </Col>
              <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                <TextField
                  label='Email'
                  variant='standard'
                  color='warning'
                  name='email'
                  value={state.email}
                  onChange={handleChange}
                  disabled={isView}
                />
                {error && error?.email && (
                  <span
                    style={{
                      color: "#da251e",
                      width: "100%",
                      textAlign: "start",
                    }}
                  >
                    {error.email}
                  </span>
                )}
              </Col>
              <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                <Autocomplete
                  options={departmentOption}
                  getOptionLabel={(option) => option}
                  id='disable-clearable'
                  label='Department'
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Department'
                      variant='standard'
                    />
                  )}
                  onChange={(event, newValue) => {
                    setState({ ...state, department: newValue })
                  }}
                  value={state.department}
                  disabled={isView}
                  disableClearable
                />
                {error?.department && (
                  <span
                    style={{
                      color: "#da251e",
                      width: "100%",
                      textAlign: "start",
                    }}
                  >
                    {error?.department}
                  </span>
                )}
              </Col>
              <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                <Autocomplete
                  options={profileOption}
                  getOptionLabel={(option) => option}
                  id='disable-clearable'
                  label='Profile'
                  renderInput={(params) => (
                    <TextField {...params} label='Profile' variant='standard' />
                  )}
                  onChange={(event, newValue) => {
                    setState({ ...state, profile: newValue })
                  }}
                  value={state.profile}
                  disableClearable
                  disabled={isView}
                />
                {error?.profile && (
                  <span
                    style={{
                      color: "#da251e",
                      width: "100%",
                      textAlign: "start",
                    }}
                  >
                    {error?.profile}
                  </span>
                )}
              </Col>
            </Row>
          </div>
        </div>
        <div className='footer_'>
          <button
            onClick={() => navigate("/users")}
            className='footer_cancel_btn'
          >
            cancel
          </button>
          <button onClick={() => saveData()} className={`footer_next_btn ${isView ? 'd-none' : 'd-block'}`}>{id ? "Edit" : "Save"}</button>

        </div>
      </div>
    </>
  )
}

export default Add_Edit_User
