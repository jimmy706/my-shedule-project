import React from 'react';
import { Form, Input, Modal, TimePicker, Row, Col, Button, InputNumber } from 'antd';
import moment from 'moment';

let formatTime = 'HH:mm';

const ModalForm = Form.create({ name: 'form_in_modal' })(

    class extends React.Component {

        render() {
            const { visible, onCancel, onCreate, form, locateObjet } = this.props;
            const { getFieldDecorator } = form;
            return (

                <Modal
                    visible={visible}
                    title="Thêm kế hoạch"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                    footer={[
                        <Button key="back" onClick={onCancel}>
                            Hủy
                         </Button>,
                        <Button key="submit" type="primary" onClick={onCreate}>
                            Tạo mới
                        </Button>,
                    ]}
                >
                    <Form layout="vertical">
                        <Form.Item label="Tiêu đề">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Vui lòng nhập tiêu đề!' }],
                            })(<Input autoComplete="off" autoCorrect="off" />)}
                        </Form.Item>
                        <Form.Item label="Nội dung">
                            {getFieldDecorator('desc')(<Input type="textarea" autoComplete="off" autoCorrect="off" />)}
                        </Form.Item>
                        <Row type="flex" gutter={16}>
                            <Col>
                                <Form.Item label="Thời gian bắt đầu">
                                    {getFieldDecorator('beginTime', {
                                        initialValue: moment(`${locateObjet.fromTime}:00`, formatTime),
                                    })(<TimePicker format={formatTime} disabled />)}
                                </Form.Item>
                            </Col>

                            <Col>
                                <Form.Item label="Thời gian hoàn thành">
                                    {getFieldDecorator('amountToComplete', {
                                        initialValue: 1
                                    })(<InputNumber min={1}
                                        formatter={value => `${value} tiếng`} max={24 - locateObjet.fromTime} />)}
                                </Form.Item>
                            </Col>

                        </Row>
                        <Form.Item label="Thêm vị trí">
                            {getFieldDecorator('location')(<Input type="text" autoComplete="off" autoCorrect="off" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

export default ModalForm;
