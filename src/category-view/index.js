import React from 'react';
import {Table} from "antd";

const columns = [
    {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: '图片数',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '分类描述',
        dataIndex: 'address',
        key: 'address',
    }
];

const data = [
    {
        key: '1',
        name: '图纸',
        age: 6759,
        address: '项目图纸',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: '施工现场',
        age: 8821,
        address: '施工现场照片',
        tags: ['loser'],
    },
    {
        key: '3',
        name: '人员',
        age: 7562,
        address: '人员照片',
        tags: ['cool', 'teacher'],
    },
    {
        key: '4',
        name: '会议',
        age: 4564,
        address: '会议照片',
        tags: ['nice', 'developer'],
    },
    {
        key: '5',
        name: '绿化',
        age: 1231,
        address: '绿化设计图',
        tags: ['loser'],
    },
    {
        key: '6',
        name: '室内',
        age: 7456,
        address: '室内照片',
        tags: ['cool', 'teacher'],
    },
    {
        key: '7',
        name: '水电',
        age: 7641,
        address: '水电设计图',
        tags: ['nice', 'developer'],
    },
    {
        key: '8',
        name: '污水管路',
        age: 9135,
        address: '污水管路设计图',
        tags: ['loser'],
    },
    {
        key: '9',
        name: '装修',
        age: 5798,
        address: '装修照片',
        tags: ['cool', 'teacher'],
    },
    {
        key: '10',
        name: '概念图',
        age: 199,
        address: '建筑概念图',
        tags: ['cool', 'teacher'],
    }
];

class CategoryView extends React.Component {
    render() {
        return (
            <div>
                <br/>
                {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                {/*    <Breadcrumb.Item>分类浏览</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>建筑</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
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
        )
    }
}

export default CategoryView;