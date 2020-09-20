import React from 'react';
import {Col, DatePicker, Divider, Pagination, Row, Select, Table, Breadcrumb} from "antd";
import axios from "axios";

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
const {Option} = Select;
const {RangePicker} = DatePicker;

function generateDisplayContent(page, pageImgNum, resultList) {
    const maxWidth = 270;
    const maxHeight = 270;
    const rowNum = Math.ceil(pageImgNum / 6);
    const rows = [];
    rows.push(<Divider/>);
    for (let i = 0; i < rowNum; i++) {
        const cols = [];
        const lineImgNum = Math.min(6, pageImgNum - 6 * i);
        if (lineImgNum > 0) {
            for (let j = 0; j < lineImgNum; j++) {
                let index = (page - 1) * 24 + 6 * i + j;
                let width = resultList[index].width;
                let height = resultList[index].height;
                let radio = width / height;
                if (radio < 1) {
                    height = Math.min(height, maxHeight);
                    width = Math.ceil(height * radio);
                } else {
                    width = Math.min(width, maxWidth);
                    height = Math.ceil(width / radio);
                }
                let image_name = resultList[index].image_name;
                image_name = image_name.replace(new RegExp('\\+', 'g'), '%2B')
                    .replace(new RegExp('/', 'g'), '%2F')
                    .replace(new RegExp('\\?', 'g'), '%3F')
                    .replace(new RegExp('%', 'g'), '%25')
                    .replace(new RegExp('#', 'g'), '%23')
                    .replace(new RegExp('&', 'g'), '%26');
                let src = 'http://localhost:8080/get-result-image?imageName=' + image_name;
                cols.push(<Col span={4}>
                    <img alt="预览"
                         style={{width: width, height: height}}
                         src={src}/>
                </Col>)
            }
            rows.push(<Row align="middle" justify="center" gutter={[16, 16]}>{cols}</Row>);
        }
    }
    return rows;
}

class CategoryView extends React.Component {
    state = {
        categoryContent: <Table columns={[{
            title: '分类名',
            dataIndex: 'name',
            key: 'name',
            render: text => <a data-id={text} onClick={(e) => this.onClick(e)}>{text}</a>,
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
        ]}
                                dataSource={data}
                                pagination={{
                                    position: ['bottomCenter'],
                                    defaultCurrent: 1,
                                    defaultPageSize: 10,
                                    showSizeChanger: false,
                                    total: 110
                                }}/>,
        breadcrumbContent: <React.Fragment/>,
        displayContent: [],
        footerContent: <React.Fragment/>,
        resultList: [],
        resultNum: 0,
        selectContent: <React.Fragment/>,
    }
    onClick = (e) => {
        e.preventDefault();
        let category = e.currentTarget.dataset.id;
        axios.get('http://localhost:8080/image-retrieval-input', {params: {searchValue: category}})
            .then(response => {
                let categoryContent = (<React.Fragment/>);
                this.setState({categoryContent: categoryContent});
                let breadcrumbContent = (<Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>分类浏览</Breadcrumb.Item>
                    <Breadcrumb.Item>{category}</Breadcrumb.Item>
                </Breadcrumb>);
                this.setState({breadcrumbContent: breadcrumbContent});
                let resultList = [];
                resultList.push(...response.data);
                this.setState({resultList: resultList});
                this.setState({resultNum: resultList.length});
                const pageImgNum = Math.min(24, resultList.length);
                const rows = generateDisplayContent(1, pageImgNum, resultList);
                this.setState({displayContent: rows});
                let footerContent = (
                    <Pagination defaultCurrent={1} defaultPageSize={24} showSizeChanger={false}
                                total={6759}
                                onChange={this.handlePageChange}/>);
                this.setState({footerContent: footerContent});
                let selectContent = (<div>
                    <br/>
                    <Select defaultValue="全部类型" style={{width: 120}}>
                        <Option value="全部类型">全部类型</Option>
                        <Option value="jpg">jpg</Option>
                        <Option value="png">png</Option>
                        <Option value="bmp">bmp</Option>
                    </Select>
                    <Select defaultValue="全部尺寸" style={{width: 120}}>
                        <Option value="全部尺寸">全部尺寸</Option>
                        <Option value="大尺寸">大尺寸</Option>
                        <Option value="中尺寸">中尺寸</Option>
                        <Option value="小尺寸">小尺寸</Option>
                    </Select>
                    <RangePicker/>
                </div>);
                this.setState({selectContent: selectContent});
            })
    }

    render() {
        return (
            <div>
                {this.state.breadcrumbContent}
                <div style={{textAlign: 'center'}}>
                    {this.state.selectContent}
                    {this.state.displayContent}
                    {this.state.categoryContent}
                    {this.state.footerContent}
                </div>
            </div>
        );
    }
}

export default CategoryView;