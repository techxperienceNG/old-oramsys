import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { countrieAction } from '../../../../redux/actions/countrieAction';
import { ratingAgencyGetByIdAction } from '../../../../redux/actions/ratingAgenciesAction';
// import { toast } from 'react-toastify'
import Autocomplete from "@material-ui/lab/Autocomplete";
import { RATINGAGENCIES_GET_BY_ID } from '../../../../redux/types';

const Details = ({ hendelNext, hendelCancel, getData }) => {

    const searchParams = new URLSearchParams(window.location.search)
    const id = searchParams.get('id')
    const location = useLocation();
    const isView = location.state?.isView
    const [state, setState] = useState({
        country: '',
        name: '',
        street: "",
        state: "",
        postcode: "",
        city: "",
        addressLine2: "",
        addressLine3: ""
    });
    const [error, setError] = useState()
    const dispatch = useDispatch()
    
    const handleChange = (event) => {
        const name = event.target.name;
        let postcode = /^[0-9\b]*$/;
        if (name === "postcode") {
            console.log('event.target.value', event.target.value)
            console.log('postcode.test(event.target.value)', postcode.test(event.target.value))
            if (event.target.value.length <= 6 && postcode.test(event.target.value)) {
                setState({
                    ...state,
                    [name]: event.target.value
                });
            }
        } else {
            setState({
                ...state,
                [name]: event.target.value
            });
        }
    };

    const [countryOption, setcountryOption] = useState([])
    const countryOptions = useSelector(state => state.countryData.country)
    const dataGetById = useSelector(state => state.ratingAgenciesData.ratingAgencyGetId)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(countrieAction("all"))
    }, [dispatch])

    useEffect(() => {
        if (countryOptions && countryOptions.data) {
            setcountryOption(countryOptions.data)
        }
    }, [countryOptions])

    useEffect(() => {
        if (id) {
            dispatch(ratingAgencyGetByIdAction(id))
        }
    }, [dispatch, id])

    // useEffect(() => {
    //   return(() => {
    //     dispatch({
    //         type: RATINGAGENCIES_GET_BY_ID,
    //         payload: null
    //     })
    //   })
    // }, [])

    useEffect(() => {
        console.log('dataGetById', dataGetById)
        if (dataGetById && dataGetById?.data) {
            setState({
                country: dataGetById.data.country,
                name: dataGetById.data.name,
                street: dataGetById.data.street,
                state: dataGetById.data.state,
                postcode: dataGetById.data.postcode,
                city: dataGetById.data.city,
                addressLine2: dataGetById.data.addressLine2,
                addressLine3: dataGetById.data.addressLine3,
            })
        }
    }, [dataGetById])

    useEffect(() => {
        dispatch(countrieAction('all'))
    }, [dispatch])


    const validation = () => {
        let param = false
        let error = {}
        let postcode =  /^[1-6]\d{0,6}$/
        if (!state.name) {
            param = true
            error.name = "Please enter name!"
        }

        if (!state.street) {
            param = true
            error.street = "Please enter street!"
        }

        if (!state.addressLine2) {
            param = true
            error.addressLine2 = "Please enter Address line 2!"
        }

        if (!state.city) {
            param = true
            error.city = "Please enter City!"
        }

        if (!state.postcode) {
            param = true
            error.postcode = "Please enter Post Code!"
        } else if (!postcode.test(state.postcode)) {
            param = true
            error.postcode = "Please enter valid Post Code!"
        }

        if (!state.state) {
            param = true
            error.state = "Please enter State/County/Province!"
        }

        if (!state.country) {
            param = true
            error.country = 'Please select Country!'
        }
        setError(error);
        return param
    }

    const nextstep = () => {
        if (validation()) {
            return
        }
        getData(state)
        hendelNext()
    }

    return (
        <div className='add-edit-product'>
            <h1 className=''>Rating agencies</h1>
            <div className='form'>
                <h2 className='mb-3'>Details</h2>
                <div>
                    <Row>
                        <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                            <TextField
                                label="Name"
                                variant="standard"
                                color="warning"
                                name='name'
                                value={state.name}
                                onChange={handleChange}
                                disabled={isView}
                            />
                            {error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.name}</span>}
                        </Col>
                        <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                            <TextField
                                label="Street"
                                name='street'
                                value={state.street}
                                onChange={handleChange}
                                variant="standard"
                                color="warning"
                                disabled={isView}
                            />
                            {error?.street && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.street}</span>}
                        </Col>
                        <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>

                            <TextField
                                label="Address line 2"
                                variant="standard"
                                color="warning"
                                name='addressLine2'
                                value={state.addressLine2}
                                onChange={handleChange}
                                disabled={isView}
                            />
                            {error?.addressLine2 && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.addressLine2}</span>}
                        </Col>
                        <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                            <TextField
                                label="Address line 3"
                                variant="standard"
                                color="warning"
                                name='addressLine3'
                                value={state.addressLine3}
                                onChange={handleChange}
                                disabled={isView}
                            />
                            {/* {error?.addressLine3 && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.addressLine3}</span>} */}
                        </Col>
                        <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                            <TextField
                                label="City"
                                variant="standard"
                                color="warning"
                                name="city"
                                value={state.city}
                                onChange={handleChange}
                                disabled={isView}
                            />
                            {error?.city && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.city}</span>}
                        </Col>
                        <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                            <TextField
                                label="Postcode"
                                variant="standard"
                                color="warning"
                                name="postcode"
                                value={state.postcode}
                                onChange={handleChange}
                                disabled={isView}
                            />
                            {error?.postcode && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.postcode}</span>}
                        </Col>
                        <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                            <TextField
                                label="State/County/Province"
                                variant="standard"
                                color="warning"
                                name="state"
                                value={state.state}
                                onChange={handleChange}
                                disabled={isView}
                            />
                            {error?.state && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.state}</span>}
                        </Col>
                        <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                            {/* <Autocomplete
                                onChange={q => setText(q)}
                                getOptions={getOptions}
                            /> */}
                            <Autocomplete
                                label="Country"
                                id="disable-clearable"
                                getOptionLabel={(option) => option.name}
                                options={countryOption}
                                disableClearable
                                renderInput={(params) => (
                                    <TextField {...params} label="Country" variant="standard" />
                                )}
                                disabled={isView}
                                onChange={(e, newVal) => setState({ ...state, country: newVal._id })}
                                value={(countryOption.length > 0 && state.country) && countryOption.find((item) => item._id === state.country)}
                            />
                            {error?.country && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.country}</span>}
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='footer_'>
                <button onClick={() => {
                    dispatch({
                        type: RATINGAGENCIES_GET_BY_ID,
                        payload: null
                    });
                    navigate('/rating-agencies');
                }
                } className="footer_cancel_btn">cancel</button>
                <button onClick={() => { nextstep() }} className='footer_next_btn'> Next</button>
            </div>
        </div>
    )
}

export default Details