import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'


import usersData from '../../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['company', 'industry', 'type', 'project', 'status', 'limit', 'issue']

const Tables = () => {
  return (
    <>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Qualitative Data
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersData}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                  'project' :
                  (item) => (
                      <td>
                      <a href={'avatars/sample.xlsx'} target="_blank">View Doc</a>
                      </td>
                      )
              }}
              
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
     
    </>
  )
}

export default Tables
