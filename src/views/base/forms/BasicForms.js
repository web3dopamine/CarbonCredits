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
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)

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
                    <CInput id="text-input" name="text-input" placeholder="Addresss" />
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
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>

        </CCol>

      </CRow>


    </>
  )
}

export default BasicForms
