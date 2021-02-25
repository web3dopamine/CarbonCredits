import React, { useContext, useState, useEffect, useRef } from 'react';

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CButtonToolbar,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from '@coreui/react'

import './Table.css';

import { Table, Input, Button, Popconfirm, Form, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
const { Option } = Select;



const Tables = () => {

  //modal code
  const [modal, setModal] = useState(false);
  const [TableModal, setTableModal] = useState(false);
  const [showResults, setShowResults] = React.useState(false);


  const toggle = () => {
    setModal(!modal);

  }
  const toggleTableModal = () => {

    setTableModal(!TableModal);

  }

  const showTable = () => {
    // setTableModal(!TableModal);
    setShowResults(true)

  }

  const refreshPage = () => {
    window.location.reload();
  }

   interface ColumnData {
      value?:any      
   } 
  const Demo = () => {
    const [cheader, setCheader] = useState<ColumnData[]>([{ value: 'CarbonEmission' }]);
  }
  //Create Table Form

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
                <Button type="dashed" style={{ width: '25%', marginLeft:'150px' }} onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Header
              </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={showTable}>
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


  //Editable table
 

  const EditableContext = React.createContext<FormInstance<any> | null>(null);

  interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
  }

  interface EditableRowProps {
    index: number;
  }

  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<Input>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
      if (editing) {
        inputRef.current!.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();

        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
          <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
            {children}
          </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  type EditableTableProps = Parameters<typeof Table>[0];

  interface DataType {
    key: React.Key;
    CarbonEmission: string;
    timestamp: string;
  }

  interface EditableTableState {
    dataSource: DataType[];
    count: number;
  }

  type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

  class EditableTable extends React.Component<EditableTableProps, EditableTableState> {
    columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

    constructor(props: EditableTableProps) {
      super(props);

      this.columns = [
        {
          title: 'Carbon Emission (per day in tonnes)',
        dataIndex: 'CarbonEmission',
          width: '30%',
          editable: true,
        },
        {
          title: 'Timestamp',
      dataIndex: 'timestamp',
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          render: (_, record: { key: React.Key }) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                <Button type="link"><a>Delete</a></Button>
              </Popconfirm>
            ) : null,
        },
      ];

      this.state = {
        dataSource: [
          {
            key: '0',
            CarbonEmission: '0.000321',
            timestamp: '19th Feb, 2021 12:00:00',
          },
          {
            key: '1',
            CarbonEmission: '0.000317',
            timestamp: '18th Feb, 2021 12:00:00',
          },
          {
            key: '2',
            CarbonEmission: '0.000314',
            timestamp: '17th Feb, 2021 12:00:00',
          },
          {
            key: '3',
            CarbonEmission: '0.000322',
            timestamp: '16th Feb, 2021 12:00:00',
          },
          {
            key: '4',
            CarbonEmission: '0.000324',
            timestamp: '15th Feb, 2021 12:00:00',
          },
          {
            key: '5',
            CarbonEmission: '0.000314',
            timestamp: '14th Feb, 2021 12:00:00',
          },
          {
            key: '6',
            CarbonEmission: '0.000317',
            timestamp: '13th Feb, 2021 12:00:00',
          },
          {
            key: '7',
            CarbonEmission: '0.000317',
            timestamp: '12th Feb, 2021 12:00:00',
          },
          {
            key: '8',
            CarbonEmission: '0.000319',
            timestamp: '11th Feb, 2021 12:00:00',
          },
          {
            key: '9',
            CarbonEmission: '0.000321',
            timestamp: '10th Feb, 2021 12:00:00',
          },
        ],
        count: 10,
      };
    }

    handleDelete = (key: React.Key) => {
      const dataSource = [...this.state.dataSource];
      this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
      const { count, dataSource } = this.state;
      const newData: DataType = {
        key: count,
        CarbonEmission: ``,
        timestamp: '24th Feb, 2021 19:00:00',
        
      };
      this.setState({
        dataSource: [...dataSource, newData],
        count: count + 1,
      });
    };

    handleSave = (row: DataType) => {
      const newData = [...this.state.dataSource];
      const index = newData.findIndex(item => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      this.setState({ dataSource: newData });
    };

    render() {
      const { dataSource } = this.state;
      const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      };
      const columns = this.columns.map(col => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record: DataType) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
          }),
        };
      });
      return (
        <div>
          <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
            Add a row
        </Button>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns as ColumnTypes}
          />
        </div>
      );
    }
  }

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

      {showResults ?
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Data table
              <CButtonToolbar justify="center">
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
            </CCardHeader>
            <CCardBody>
              <EditableTable/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
        : null}
    </>
  )
}

export default Tables
