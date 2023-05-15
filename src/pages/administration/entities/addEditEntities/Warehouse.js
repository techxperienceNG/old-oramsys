import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import WarehouseEditModal from '../../../../component/Modal/WarehouseEditModal'
import { useSelector, useDispatch } from 'react-redux'
import { companydataAction } from '../../../../redux/actions/companydataAction'
import { useLocation } from 'react-router-dom'

const Warehouse = ({ hendelNext, hendelCancel }) => {

    const dispatch = useDispatch()

    const [editModal, setEditModal] = useState(false)
    const [mode, setMode] = useState("")
    const [editData, setEditData] = useState('')
    const [warehouse, setWarehouse] = useState([])
    const location = useLocation()
    const isView = location.state[1]?.isView

    const companyData = useSelector((state) => state.companydata.companydata)
    const countryData = useSelector((state) => state.countryData.country)

    useEffect(() => {
        if (companyData && companyData.warehouses && countryData?.data) {
            setWarehouse(companyData.warehouses.map((ele) => {
                return {
                    nature: ele.nature,
                    name: ele.name,
                    type: ele.type,
                    city: ele.city,
                    country: countryData?.data.find((item) => item._id === ele.country)?.name,
                    governingLaw: ele.governingLaw,
                }
            }))
        }
    }, [companyData, countryData])

    const Delete = (data) => {
        let body = {
            ...companyData,
            warehouses: companyData.warehouses.filter((e, i) => i !== data.tableData.id)
        }
        dispatch(companydataAction(body))
    }

    return (
        <>
            <div className='add-edit-product'>

                <div className='product'>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <h2 className='m-0'>Warehouse</h2>
                        <button className={`add_btn me-3 ${isView ? 'd-none' : 'd-block'}`} onClick={() => { setEditModal(true); setMode("Add") }}> <img src='../../assets/img/about/plus.png' className='me-2' alt='' />Add</button>
                    </div>
                    <MaterialTable
                        title=""
                        columns={[
                            { title: 'Nature', field: 'nature' },
                            { title: 'Name', field: 'name' },
                            { title: 'Type', field: 'type' },
                            { title: 'City', field: 'city' },
                            { title: 'Country', field: 'country' },
                            { title: 'Governing law', field: 'governingLaw' },
                        ]}
                        data={warehouse}
                        actions={isView ? [
                            {
                                icon: 'preview',
                                tooltip: 'View Warehouse',
                                onClick: (e, data) => { setEditModal(true); setMode("View"); setEditData(data.tableData.id) }
                            },
                        ] : [
                            {
                                icon: 'edit',
                                tooltip: 'Edit Warehouse',
                                onClick: (e, data) => { setEditModal(true); setMode("Edit"); setEditData(data.tableData.id) }
                            },
                            {
                                icon: 'preview',
                                tooltip: 'View Warehouse',
                                onClick: (e, data) => { setEditModal(true); setMode("View"); setEditData(data.tableData.id) }
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete Warehouse',
                                onClick: (e, data) => { Delete(data) }
                            }
                        ]}
                        options={{
                            filtering: true,
                            actionsColumnIndex: -1,
                            sorting: true,
                            pageSize: 10,
                            search: false,
                        }}
                    />
                </div>
                <div className='footer_'>
                    <button onClick={() => { hendelCancel() }} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => { companyData?.warehouses?.length > 0 && hendelNext() }} className='footer_next_btn'> Next</button>
                </div>
            </div>
            {
                editModal && <WarehouseEditModal show={editModal} onHide={() => setEditModal(false)} mode={mode} editData={editData} />
            }
        </>
    )
}

export default Warehouse