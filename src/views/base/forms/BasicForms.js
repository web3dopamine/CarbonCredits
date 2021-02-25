import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { Table, Tag, Space } from 'antd';


const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)

  //modal code
  const [modal, setModal] = React.useState(false);

  const toggle = () => {
    setModal(!modal);
  }
  const refreshPage = () => {
    window.location.reload();
  }

//input Table

  const columns = [
    {
      title: 'Data Source',
      dataIndex: 'dataSource',
      key: 'dataSource',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag == 'NOT CONNECTED') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <CButton type="reset" size="sm" color="danger">Delete</CButton>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      dataSource: '141310 - Carbon IOT',
      timestamp: '10th Feb, 2021',
      tags: ['connected', 'stable'],
    },
    {
      key: '2',
      dataSource: 'Health & Safety.xlsx',
      timestamp: '8th Feb, 2021',
      tags: ['NOT CONNECTED'],
    }
  ];

  return (
    <>

      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              Data Input
              <small> Source</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">IOT device</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="Addresss:PORT" />
                    <CFormText>Enter IP address of IOT device </CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CLabel col md="3" htmlFor="file-input">File input</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile id="file-input" name="file-input" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Multiple File input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInputFile
                      id="file-multiple-input"
                      name="file-multiple-input"
                      multiple
                      custom
                    />
                    <CLabel htmlFor="file-multiple-input" variant="custom-file">
                      Choose Files...
                    </CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col md={3}>Custom file input</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile custom id="custom-file-input" />
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      Choose file...
                    </CLabel>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={toggle}><CIcon name="cil-scrubber" /> Connect</CButton>&nbsp;&nbsp;
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>


              <CModal
                show={modal}
                onClose={toggle}
              >
                <CModalHeader closeButton>IOT device / file upload</CModalHeader>
                <CModalBody>
                  Are you sure you want to perform this action?
        </CModalBody>
                <CModalFooter>
                  <CButton color="primary" onClick={refreshPage}>Yes</CButton>{' '}
                  <CButton
                    color="secondary"
                    onClick={toggle}
                  >Cancel</CButton>
                </CModalFooter>
              </CModal>
            </CCardFooter>
          </CCard>

        </CCol>

      </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Create Table
            </CCardHeader>
            <CCardBody>
              <Table columns={columns} dataSource={data} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      
    </>
  )
}

export default BasicForms
