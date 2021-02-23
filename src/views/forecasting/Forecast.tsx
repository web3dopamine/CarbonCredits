import React, { useContext, useState, useEffect, useRef } from 'react';

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'

import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

import './Forecast.css';

const Tables = () => {
    

   interface ColumnData {
      value?:any      
   } 
  const Demo = () => {
    const [cheader, setCheader] = useState<ColumnData[]>([{ value: 'CarbonEmission' }]);
  }
  //Create Table Form
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
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
    DateLog: string;
    Average: string;
    Interpolated: string;
    stdDev: string;
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
          title: 'Date',
          dataIndex: 'DateLog',
        },
        {
          title: 'Average',
          dataIndex: 'Average',
        },
        {
          title: 'Interpolated',
          dataIndex: 'Interpolated',
        },
        {
          title: 'std Dev',
          dataIndex: 'stdDev',
        },

        
      ];

      this.state = {
        dataSource: [
          {
            key: '0',
            DateLog: '1/1/2021',
            Average: '413.61 ppm',
            Interpolated: '413.34 ppm',
            stdDev: '0.26',
          },
          {
            key: '1',
            DateLog: '1/2/2021',
            Average: '414.74 ppm',
            Interpolated: '413.48 ppm',
            stdDev: '0.25',
          },
          {
            key: '2',
            DateLog: '1/3/2021',
            Average: '416.45 ppm',
            Interpolated: '413.25 ppm',
            stdDev: '0.12',
          },
          {
            key: '3',
            DateLog: '1/4/2021',
            Average: '417.31 ppm',
            Interpolated: '414.99 ppm',
            stdDev: '0.24',
          },
          {
            key: '4',
            DateLog: '1/5/2021',
            Average: '416.62 ppm',
            Interpolated: '414.69 ppm',
            stdDev: '0.23',
          },
          {
            key: '5',
            DateLog: '1/6/2021',
            Average: '414.61 ppm',
            Interpolated: '415.14 ppm',
            stdDev: '0.16',
          },
          {
            key: '6',
            DateLog: '1/7/2021',
            Average: '412.78 ppm',
            Interpolated: '414.92 ppm',
            stdDev: '0.2',
          },
          {
            key: '7',
            DateLog: '1/8/2021',
            Average: '411.52 ppm',
            Interpolated: '415.1 ppm',
            stdDev: '0.1',
          },
          {
            key: '8',
            DateLog: '1/9/2021',
            Average: '411.51 ppm',
            Interpolated: '414.92 ppm',
            stdDev: '0.11',
          }, 
          {
            key: '9',
            DateLog: '1/10/2021',
            Average: '413.11 ppm',
            Interpolated: '415.14 ppm',
            stdDev: '0.08',
          },
          {
            key: '10',
            DateLog: '1/11/2021',
            Average: '414.25 ppm',
            Interpolated: '414.99 ppm',
            stdDev: '0.29',
          },
          {
            key: '11',
            DateLog: '1/12/2021',
            Average: '415.52 ppm',
            Interpolated: '415.25 ppm',
            stdDev: '0.17',
          }
        ],
        count: 2,
      };
    }

    handleDelete = (key: React.Key) => {
      const dataSource = [...this.state.dataSource];
      this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    // handleAdd = () => {
    //   const { count, dataSource } = this.state;
    //   const newData: DataType = {
    //     key: count,
    //     DataLog: `120`,
    //     timestamp: '32',
        
    //   };
    //   this.setState({
    //     dataSource: [...dataSource, newData],
    //     count: count + 1,
    //   });
    // };

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
              Forecast - Carbon Emission
            </CCardHeader>
            <CCardBody>
              <EditableTable/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
     
    </>
  )
}

export default Tables
