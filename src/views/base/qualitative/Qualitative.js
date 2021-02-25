import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButtonToolbar,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton
} from '@coreui/react'

import { Table, Input, Button, Popconfirm, Form, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';


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

  //modal code
  const [modal, setModal] = React.useState(false);
  const [TableModal, setTableModal] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);


  const toggle = () => {
    setModal(!modal);

  }
  const toggleTableModal = () => {

    setTableModal(!TableModal);

  }

  const showTable = () => {
    setTableModal(!TableModal);
    setShowResults(true)

  }

  const refreshPage = () => {
    window.location.reload();
  }


  const areas = [
    { label: '141310 - Carbon IOT', value: '141310 - Carbon IOT' },
    { label: '(Sample) Data Collection Template_Occupational Health & Safety.xlsx', value: 'Health & Safety.xlsx' },
    { label: 'Health & Safety.xlsx : Type of Suppliers', value: 'Health & Safety.xlsx' },
    { label: 'Health & Safety.xlsx : Target for 2020 ', value: 'Health & Safety.xlsx' },
    { label: 'Health & Safety.xlsx : 2020', value: 'Health & Safety.xlsx' },
    { label: 'Health & Safety.xlsx : 2019', value: 'Health & Safety.xlsx' },
    { label: 'Health & Safety.xlsx : 2018', value: 'Health & Safety.xlsx' },
  ];


  const CreateTable = () => {
    const [form] = Form.useForm();

    const onFinish = values => {
      console.log('Received values of form:', values);
    };

    const handleChange = () => {
      form.setFieldsValue({ sights: [] });
    };

    return (
      <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">

        <Form.List name="sights">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    {...field}
                    label="Column Hearder"
                    name={[field.name, 'price']}
                    fieldKey={[field.fieldKey, 'price']}

                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="Value"
                        name={[field.name, 'sight']}
                        fieldKey={[field.fieldKey, 'sight']}

                      >
                        <Select style={{ width: 530 }} options={areas}>



                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>


                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" style={{ width: '25%', marginLeft: '150px' }} onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Header
              </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={toggleTableModal}>
            Submit
        </Button>

          <CModal
            show={TableModal}
            onClose={toggleTableModal}
          >
            <CModalHeader closeButton>Table Creation</CModalHeader>
            <CModalBody>
              Are you sure you want to Create Table?
        </CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={showTable}>Yes</CButton>{' '}
              <CButton
                color="secondary"
                onClick={refreshPage}
              >Cancel</CButton>
            </CModalFooter>
          </CModal>
        </Form.Item>
      </Form>
    );
  };
  return (
    <>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Create Table
            </CCardHeader>
            <CCardBody>
              <CreateTable />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


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
