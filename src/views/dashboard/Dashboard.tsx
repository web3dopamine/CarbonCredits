import React, { lazy } from 'react'
import {
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
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import './DashboardTable.css';
import { Table, Input, Button, Popconfirm, Form, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

import MainChartExample from '../charts/MainChartExample.js'


const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {



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
    const [editing, setEditing] = React.useState(false);
    const inputRef = React.useRef<Input>(null);
    const form = React.useContext(EditableContext)!;

    React.useEffect(() => {
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
        CarbonEmission: `120`,
        timestamp: '32',

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
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Carbon Emissions</h4>
              
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
            </CCol>
          </CRow>
          <MainChartExample style={{ height: '300px', marginTop: '40px' }} />
        </CCardBody>
       
      </CCard>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Data table
              

            </CCardHeader>
            <CCardBody>
              <EditableTable />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      

     
    </>
  )
}

export default Dashboard
