import React from 'react';
import {Button, Table, Modal, Input} from "antd";

const columns = [
    {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '删除图片数',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '分类描述',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: text => <a>{text}</a>,
    }
];

const data = [
    {
        key: '1',
        name: '图纸',
        age: 6759,
        address: '项目图纸',
        tags: ['nice', 'developer'],
        action: '删除',
    },
    {
        key: '2',
        name: '施工现场',
        age: 8821,
        address: '施工现场照片',
        tags: ['loser'],
        action: '删除',
    },
    {
        key: '3',
        name: '人员',
        age: 7562,
        address: '人员照片',
        tags: ['cool', 'teacher'],
        action: '删除',
    },
    {
        key: '4',
        name: '会议',
        age: 4564,
        address: '会议照片',
        tags: ['nice', 'developer'],
        action: '删除',
    },
    {
        key: '5',
        name: '绿化',
        age: 1231,
        address: '绿化设计图',
        tags: ['loser'],
        action: '删除',
    },
    {
        key: '6',
        name: '室内',
        age: 7456,
        address: '室内照片',
        tags: ['cool', 'teacher'],
        action: '删除',
    },
    {
        key: '7',
        name: '水电',
        age: 7641,
        address: '水电设计图',
        tags: ['nice', 'developer'],
        action: '删除',
    },
    {
        key: '8',
        name: '污水管路',
        age: 9135,
        address: '污水管路设计图',
        tags: ['loser'],
        action: '删除',
    },
    {
        key: '9',
        name: '装修',
        age: 5798,
        address: '装修照片',
        tags: ['cool', 'teacher'],
        action: '删除',
    },
    {
        key: '10',
        name: '概念图',
        age: 199,
        address: '建筑概念图',
        tags: ['cool', 'teacher'],
        action: '删除',
    }
];
const {TextArea} = Input;

class CategoryManage extends React.Component {
    state = {visible: false};
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <div>
                    <br/>
                    <Button type="primary" onClick={this.showModal}>
                        新增分类
                    </Button>
                    <Modal
                        title="新增分类"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>分类名</p>
                        <Input placeholder="请输入分类名"/>
                        <p>分类描述</p>
                        <TextArea placeholder="请输入分类描述" rows={4}/>
                    </Modal>
                </div>
                <div style={{textAlign: 'center'}}>
                    <br/>
                    <Table columns={columns}
                           dataSource={data}
                           pagination={{
                               position: ['bottomCenter'],
                               defaultCurrent: 1,
                               defaultPageSize: 10,
                               showSizeChanger: false,
                               total: 110
                           }}/>
                </div>
            </div>
        );
    }
}

export default CategoryManage;