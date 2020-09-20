import React from 'react';
import {Button, Table} from 'antd';

const columns = [
    {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
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
        render: text => <a onClick={event => {event.preventDefault();alert("图片恢复成功！")}}>{text}</a>,
    }
];

const data = [
    {
        key: '1',
        name: '图纸',
        age: 6,
        address: '项目图纸',
        tags: ['nice', 'developer'],
        action: '恢复',
    },
    {
        key: '2',
        name: '施工现场',
        age: 8,
        address: '施工现场照片',
        tags: ['loser'],
        action: '恢复',
    },
    {
        key: '3',
        name: '人员',
        age: 2,
        address: '人员照片',
        tags: ['cool', 'teacher'],
        action: '恢复',
    },
    {
        key: '4',
        name: '会议',
        age: 4,
        address: '会议照片',
        tags: ['nice', 'developer'],
        action: '恢复',
    },
    {
        key: '5',
        name: '绿化',
        age: 1,
        address: '绿化设计图',
        tags: ['loser'],
        action: '恢复',
    },
    {
        key: '6',
        name: '室内',
        age: 5,
        address: '室内照片',
        tags: ['cool', 'teacher'],
        action: '恢复',
    },
    {
        key: '7',
        name: '水电',
        age: 1,
        address: '水电设计图',
        tags: ['nice', 'developer'],
        action: '恢复',
    },
    {
        key: '8',
        name: '污水管路',
        age: 0,
        address: '污水管路设计图',
        tags: ['loser'],
        action: '恢复',
    },
    {
        key: '9',
        name: '装修',
        age: 8,
        address: '装修照片',
        tags: ['cool', 'teacher'],
        action: '恢复',
    },
    {
        key: '10',
        name: '概念图',
        age: 9,
        address: '建筑概念图',
        tags: ['cool', 'teacher'],
        action: '恢复',
    }
];

class ImageManageRecover extends React.Component {
    render() {
        return (
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
        );
    }
}

export default ImageManageRecover;