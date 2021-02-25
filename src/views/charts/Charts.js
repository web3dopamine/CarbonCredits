import React from 'react'
import {
  CCardGroup,
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CButtonToolbar,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModal
} from '@coreui/react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs'

import CIcon from '@coreui/icons-react'
import MainChartExample from './MainChartExample.js'


import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


const { Option } = Select;

const areas = [
  { label: 'Line Graph', value: 'Shanghai' },
  { label: 'Bar Chart', value: 'Beijing' },
  { label: 'Pie Chart', value: 'Beijing' },
  { label: 'Doughnut Chart', value: 'Beijing' },
  { label: 'Polar Area Chart', value: 'Beijing' },
  { label: 'Radar Chart', value: 'Beijing' },
];

const tables = [
  { label: 'Carbon Emissions', value: 'Shanghai' },
  { label: 'Health & Safety', value: 'Beijing' },
  { label: 'Water Management', value: 'Beijing' },
];

const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Carbon Emissions', 'Timestamp'],
};



const Charts = () => {
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

  const showChart = () => {
    // setTableModal(!TableModal);
    setShowResults(true)

  }

  const refreshPage = () => {
    window.location.reload();
  }


  // Dropdown select option

  const DropdownSelect = () => {


    const [form] = Form.useForm();

    const onFinish = values => {
      console.log('Received values of form:', values);
    };

    const handleChange = () => {
      form.setFieldsValue({ sights: [] });
    };

    return (
      <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Form.Item name="area" label="Select Table">
          <Select options={tables} onChange={handleChange} />
        </Form.Item>
        <Form.Item name="area" label="Graph Type" rules={[{ required: true, message: 'Missing' }]}>
          <Select options={areas} onChange={handleChange} />
        </Form.Item>
        <Form.List name="sights">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    {...field}
                    label="X-Axis"
                    name={[field.name, '2']}
                    fieldKey={[field.fieldKey, '2']}
                    rules={[{ required: true, message: 'Missing ' }]}
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
                        rules={[{ required: true, message: 'Missing sight' }]}
                      >
                        <Select disabled={!form.getFieldValue('area')} style={{ width: 230 }}>
                          {(sights[form.getFieldValue('area')] || []).map(item => (
                            <Option key={item} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>


                  <MinusCircleOutlined onClick={() => remove(field.name)} />

                  <Form.Item
                    {...field}
                    label="Y-Axis"
                    name={[field.name, '1']}
                    fieldKey={[field.fieldKey, '1']}
                    rules={[{ required: true, message: 'Missing ' }]}
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
                        name={[field.name, '']}
                        fieldKey={[field.fieldKey, '']}

                      >
                        <Select disabled={!form.getFieldValue('area')} style={{ width: 230 }}>
                          {(sights[form.getFieldValue('area')] || []).map(item => (
                            <Option key={item} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>


                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add
              </Button>
              </Form.Item>
            </>
          )}
        </Form.List>


        <Form.Item>
          <Button type="primary" onClick={showChart}>
            Submit
        </Button>
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
              Analyse and Evaluate data
            </CCardHeader>
            <CCardBody>
              <DropdownSelect />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/*Line chart*/}
      {showResults ?
      <CCard>
    <CCardBody>
      <CRow>
        <CCol sm="5">
          <h4 id="traffic" className="card-title mb-0">Carbon Emissions</h4>

              <CButtonToolbar>
                <CButton color="warning" size="lg" onClick={toggle}>
                  Hook to the dashboard
                  </CButton>
              </CButtonToolbar> 

              <CModal
                show={modal}
                onClose={toggle}
              >
                <CModalHeader closeButton>Hook to dashboard</CModalHeader>
                <CModalBody>
                  Do you want to display this table on dashboard?
        </CModalBody>
                <CModalFooter>
                  <a href="http://localhost:3000/#/dashboard" target="_blank"><CButton color="primary">Yes, Do it!</CButton>{' '}</a>
                  <CButton
                    color="secondary"
                    onClick={toggle}
                  >No!</CButton>
                </CModalFooter>
              </CModal>
        </CCol>
        <CCol sm="7" className="d-none d-md-block">
               
          <CButton color="primary" className="float-right">
            <CIcon name="cil-cloud-download" />
          </CButton>
          
        </CCol>
      </CRow>
      <MainChartExample style={{ height: '300px', marginTop: '40px' }} />
    </CCardBody>
    <CCardFooter>
     
    </CCardFooter>
    
        </CCard>
        : null}
    {/*Charts*/}
    
    <CCardGroup columns className = "cols-2" >
      <CCard>
        <CCardHeader>
          Bar Chart
        </CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: 'Carbon emissions',
                backgroundColor: '#f87979',
                data: [140, 120, 112, 139, 110, 140, 139, 200, 140, 120, 112, 111]
              }
            ]}
            labels="months"
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Doughnut Chart
        </CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [40, 20, 80, 10]
              }
            ]}
            labels={['Automobile', 'IT', 'Chemical', 'Pharma']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Line Chart
        </CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={[
              {
          label: 'Consumed',
                backgroundColor: 'rgb(228,102,81,0.9)',
                data: [39, 39, 10, 50, 30, 70, 35]
              },
              {
          label: 'Total tokens',
                backgroundColor: 'rgb(0,216,255,0.9)',
                data: [39, 80, 40, 75, 40, 80, 45]
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels="months"
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Pie Chart
        </CCardHeader>
        <CCardBody>
          <CChartPie
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [40, 20, 80, 10]
              }
            ]}
            labels={['Automobile', 'IT', 'Chemical', 'Pharma']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Polar Area Chart
        </CCardHeader>
        <CCardBody>
          <CChartPolarArea
            datasets={[
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(179,181,198,0.2)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: 'rgba(179,181,198,1)',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                label: 'My Second dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: 'rgba(255,99,132,1)',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
              }
            ]}
            options={{
              aspectRatio: 1.5,
              tooltips: {
                enabled: true
              }
            }}
            labels={[
              'IT', 'Pharma', 'Chemical', 'Petroleum',
              'Automobile', 'Manufacture', 'Supply'
            ]}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Radar Chart
        </CCardHeader>
        <CCardBody>
          <CChartRadar
            datasets={[
              {
                label: '2019',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                tooltipLabelColor: 'rgba(179,181,198,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                label: '2020',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                tooltipLabelColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
              }
            ]}
            options={{
              aspectRatio: 1.5,
              tooltips: {
                enabled: true
              }
            }}
            labels={[
              'IT', 'Pharma', 'Chemical', 'Petroleum',
              'Automobile', 'Manufacture', 'Supply'
            ]}
          />
        </CCardBody>
      </CCard>
    </CCardGroup>
    </>
  )
}

export default Charts
