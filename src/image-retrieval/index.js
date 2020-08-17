import React from 'react';
import {Input} from 'antd';
import {PictureOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';
import {Upload, message} from 'antd';
import {CameraTwoTone} from '@ant-design/icons';
import {Modal} from 'antd';
import {Spin} from 'antd';
import {withRouter} from 'react-router-dom';
import "./index.css";

const {Search} = Input;
const {Dragger} = Upload;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class ImageRetrieval extends React.Component {
    state = {
        visible: false,
        content: <React.Fragment/>,
        previewImage: '',
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
    handleChange = info => {
        const {status} = info.file;
        if (status === 'uploading') {
            getBase64(info.file.originFileObj).then(url => this.setState({previewImage: url}));
            let content = (<Spin spinning={true}>
                <Dragger
                    name={"file"}
                    action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
                    onChange={this.handleChange}
                    showUploadList={false}
                >
                    <p className="ant-upload-drag-icon">
                        <img alt="预览" style={{width: 320, height: 180}} src={this.state.previewImage}/>
                    </p>
                    <p className="ant-upload-text">上传中……</p>
                </Dragger>
            </Spin>);
            this.setState({content: content});
        } else if (status === 'done') {
            this.closeModal();
            message.success(`${info.file.name} file uploaded successfully.`);
            this.props.history.push('/retrieval-result')
        } else if (status === 'error') {
            this.closeModal();
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    handleClick = () => {
        let content = (<Spin spinning={false}>
            <Dragger
                name={"file"}
                action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
                onChange={this.handleChange}
                showUploadList={false}
            >
                <p className="ant-upload-drag-icon">
                    <PictureOutlined/>
                </p>
                <p className="ant-upload-text">点击或拖曳图片到此处</p>
            </Dragger>
        </Spin>);
        this.setState({content: content});
        this.showModal();
    };

    render() {
        return (
            <div className="input">
                <header className="header"/>
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
                    onSearch={value => console.log(value)}
                    style={{width: 620}}
                />
                <Modal
                    title="上传图片"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    {this.state.content}
                </Modal>
            </div>
        );
    };
}

export default withRouter(ImageRetrieval);