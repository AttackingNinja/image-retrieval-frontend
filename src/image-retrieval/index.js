import React from 'react';
import {Col, Input, message, Modal, Pagination, Row, Spin, Tooltip, Upload, Tag} from 'antd';
import {CameraTwoTone, PictureOutlined} from '@ant-design/icons';
import axios from 'axios';
import "./index.css";

const {Search} = Input;
const {Dragger} = Upload;

function getBase64FromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function getBase64FromArrayBuffer(img) {
    return `data:image/jpeg;base64,${window.btoa(
        new Uint8Array(img).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
        )
    )}`;
}

function generateTagContent(tagList) {
    const tags = [];
    for (let i = 0; i < tagList.length; i++) {
        tags.push(<Tag>{tagList[i]}</Tag>)
    }
    return tags;
}

function generateDisplayContent(page, pageImgNum, resultList) {
    const rowNum = Math.ceil(pageImgNum / 6);
    const rows = [];
    for (let i = 0; i < rowNum; i++) {
        const cols = [];
        const lineImgNum = Math.min(6, pageImgNum - 6 * i);
        if (lineImgNum > 0) {
            for (let j = 0; j < lineImgNum; j++) {
                cols.push(<Col span={4}>
                    <img alt="预览" style={{width: 270, height: 180}}
                         src={`http://localhost:8080/image-retrieval-upload?imageName=${resultList[(page - 1) * 24 + 6 * i + j].imageName}`}/>
                </Col>)
            }
            rows.push(<Row gutter={[16, 16]}>{cols}</Row>);
        }
    }
    return rows;
}

class ImageRetrieval extends React.Component {
    state = {
        visible: false,
        headerContent: <header className="header"/>,
        modalContent: <React.Fragment/>,
        tagContent: [],
        displayContent: [],
        footerContent: <React.Fragment/>,
        previewImageContent: <React.Fragment/>,
        resultList: [],
        resultNum: 0,
    };
    showModal = () => {
        this.setState({visible: true});
    };
    closeModal = () => {
        this.setState({visible: false});
    };
    handleCancel = e => {
        console.log(e);
        this.setState({visible: false});
    };
    handleChange = async info => {
        const {status} = info.file;
        if (status === 'uploading') {
            let modalContent = (<Spin spinning={true}>
                <Dragger
                    name={"file"}
                    action={"http://localhost:8080/image-retrieval-upload"}
                    onChange={this.handleChange}
                    showUploadList={false}
                >
                    <p className="ant-upload-drag-icon">
                        <PictureOutlined/>
                    </p>
                    <p className="ant-upload-text">图片上传中……</p>
                </Dragger>
            </Spin>);
            this.setState({modalContent: modalContent});
        } else if (status === 'done') {
            if (!info.file.url && !info.file.preview) {
                info.file.preview = await getBase64FromFile(info.file.originFileObj);
            }
            let previewImageContent = (<span>
                <img alt="预览" style={{width: 120, height: 90}} src={info.file.preview}/>
            </span>);
            let headerContent = (<br/>);
            let tagList = [];
            tagList.push(...info.file.response.tagInfos)
            let tagContent = generateTagContent(tagList);
            let resultList = [];
            resultList.push(...info.file.response.imageInfos);
            this.closeModal();
            this.setState({headerContent: headerContent});
            this.setState({previewImageContent: previewImageContent});
            this.setState({tagContent: tagContent});
            this.setState({resultList: resultList});
            this.setState({resultNum: resultList.length});
            const pageImgNum = Math.min(24, resultList.length);
            const rows = generateDisplayContent(1, pageImgNum, resultList);
            this.setState({displayContent: rows});
            let footerContent = (
                <Pagination defaultCurrent={1} defaultPageSize={24} showSizeChanger={false} total={resultList.length}
                            onChange={this.handlePageChange}/>);
            this.setState({footerContent: footerContent});
        } else if (status === 'error') {
            this.closeModal();
            message.error(`${info.file.name} file upload failed.`);
        }
    };
    handleSearch = value => {
        let headerContent;
        if (value !== '') {
            axios.get('http://localhost:8080/image-retrieval-input', {params: {searchValue: value}})
                .then(response => {
                    console.log(response);
                })
            headerContent = (<br/>);
        } else {
            headerContent = (<header className="header"/>);
        }
        this.setState({headerContent: headerContent});
    };

    handleClick = () => {
        let modalContent = (<Spin spinning={false}>
            <Dragger
                name={"file"}
                action={"http://localhost:8080/image-retrieval-upload"}
                onChange={this.handleChange}
                showUploadList={false}
            >
                <p className="ant-upload-drag-icon">
                    <PictureOutlined/>
                </p>
                <p className="ant-upload-text">点击或拖曳图片到此处</p>
            </Dragger>
        </Spin>);
        this.setState({modalContent: modalContent});
        this.showModal();
    };
    handlePageChange = page => {
        const pageImgNum = Math.min(24, this.state.resultNum - (page - 1) * 24);
        const rows = generateDisplayContent(page, pageImgNum, this.state.resultList);
        this.setState({displayContent: rows});
    }

    render() {
        return (
            <div>
                <div className="input">
                    {this.state.headerContent}
                    <Search
                        enterButton
                        suffix={<Tooltip title="按图片搜索" placement="bottom">
                            <CameraTwoTone
                                style={{
                                    fontSize: 20,
                                    color: '#1890ff',
                                }}
                                onClick={this.handleClick}
                            />
                        </Tooltip>}
                        onSearch={this.handleSearch}
                        style={{width: 620}}
                    />
                    <Modal
                        title="上传图片"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={null}
                    >
                        {this.state.modalContent}
                    </Modal>
                </div>
                <br/>
                <div>
                    <div>
                        {this.state.previewImageContent}
                        &emsp;
                        {this.state.tagContent}
                    </div>
                    <br/>
                    {this.state.displayContent}
                </div>
                {this.state.footerContent}
                <br/>
            </div>
        );
    };
}

export default ImageRetrieval;