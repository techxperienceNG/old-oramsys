import { Backdrop, Fade, FormControl, InputLabel, Modal, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { DropzoneArea } from 'material-ui-dropzone';
import Autocomplete from "@material-ui/lab/Autocomplete";

const AddSourceOfRepayment = ({ show, onHide, getModalData, data, mode, getEditData, isView }) => {

    const [sourceOfRepayment, setSourceOfRepayment] = useState({
        type: "",
        instrument: "",
        evidence: "",
    })
    const [error, setError] = useState({})

    const typeOptions = [
        'Primary',
        'Secondary',
        'Tertiary',
    ]

    const handleChangeFile = (file) => {
        if (file) {
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          }).then((res) => setSourceOfRepayment({ ...sourceOfRepayment, evidence: res }));
        }
      }

    const options = [
        'Borrower Cash-flow',
        'Assigned Receivables',
        'Proceeds from L/Cs',
        'Guarantees',
        'SBLCs',
        'Proceeds Performance Bonds',
        'Credit Insurance proceeds',
    ]

    useEffect(() => {
        if (data) {
            setSourceOfRepayment({
                type: data.type,
                instrument: data.instrument,
                evidence: data.evidence,
            })
        }
        console.log('data', data)
    }, [data])

    const validation = () => {
        let flag = false
        let error = {}

        if (!sourceOfRepayment.type) {
            flag = true
            error.type = 'Please enter type'
        }

        if (!sourceOfRepayment.instrument) {
            flag = true
            error.instrument = 'Please enter instrument'
        }

        if (!sourceOfRepayment.evidence) {
            flag = true
            error.evidence = 'Please enter evidence'
        }
        setError(error)
        return flag

    }


    const saveData = () => {
        if (validation()) {
            return
        }

        if (data) {
            getEditData({ value: sourceOfRepayment, id: data.tableData.id })
            onHide()
        } else {
            getModalData(sourceOfRepayment)
            onHide()
        }
    }

    // const editData = () => {
    //     console.log('data', data)
    // }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className='model'
                open={show}
                onClose={onHide}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={show}>
                    <div className='modal-content'>
                        <div className='d-flex justify-content-between'>
                            <h2 id="transition-modal-title" className='modal-title'>Source of Repayment</h2>
                            <img src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row>
                                    <Col lg={6}>
                                        <Autocomplete
                                            options={typeOptions}
                                            getOptionLabel={(option) => option}
                                            id="disable-clearable"
                                            label="Type"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Type" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setSourceOfRepayment({ ...sourceOfRepayment, type: newValue });
                                            }}
                                            disableClearable
                                            value={sourceOfRepayment.type}
                                            disabled={isView}
                                        />
                                        {error && error.type && <span style={{ color: 'red' }}>{error.type}</span>}
                                    </Col>
                                    <Col lg={6}>
                                        <Autocomplete
                                            // options={sourceOfRepayment.type ? options : [] || data.type && sourceOfRepayment.type}
                                            options={sourceOfRepayment.type ? options : []}
                                            getOptionLabel={(option) => option}
                                            id="disable-clearable"
                                            label="Instrument"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Instrument" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setSourceOfRepayment({ ...sourceOfRepayment, instrument: newValue });
                                            }}
                                            disableClearable
                                            disabled={isView}
                                            value={sourceOfRepayment.instrument}
                                        />
                                        {error && error.instrument && <span style={{ color: 'red' }}>{error.instrument}</span>}
                                    </Col>
                                   
                                </Row>
                                
                            </div>
                            <Row>
                                    <Col>
                                    <div className='drag-and-drop add-evidence'>
                                        <DropzoneArea
                                        Icon="none"
                                        filesLimit={1}
                                        showPreviews={true}
                                        showPreviewsInDropzone={true}
                                        useChipsForPreview
                                        previewGridProps={{ container: { spacing: 1, } }}
                                        dropzoneText='Upload Payment Evidence'
                                        previewText=""
                                        onChange={(e) => handleChangeFile(e[0])}
                                        dropzoneProps={{ disabled: mode === "View" }}
                                        />
                                        {error && error?.evidence && <span style={{ color: 'red' }}>{error.evidence}</span>}
                                    </div>
                                    </Col>
                                </Row>
                            <div className='d-flex justify-content-between mt-4'>
                                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                <button onClick={() => { saveData() }} className={`footer_next_btn ${isView && 'd-none'}`}>{data ? 'Edit' : 'Save'}</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default AddSourceOfRepayment