import { useState } from 'react'
import { Form, Input, Button, Checkbox} from 'antd';



export const AddTask = ({onAdd}) => {
    const [text,setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
  
    const onFormLayoutChange = ({ layout }) => {
      setFormLayout(layout);
    };

    function onChange(e) {
        console.log(`checked = ${e.currentTarget.checked}`);
    }
    const onFinish = (values) => {
        const text=values.text;
        const day=values.day;
        const reminder=values.reminder;
        onAdd({text,day,reminder})

        setText('')
        setDay('')
        setReminder(false)

    };
    
    

    return (
        <>
        <Form
          layout={formLayout}
          form={form}
          initialValues={{
            reminder: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item label="Form Layout">
          </Form.Item>
          <Form.Item label="Field A" name='text'>
            <Input placeholder='Add Task' />
          </Form.Item>
          <Form.Item label="Field B" name='day'>
            <Input placeholder='Day time'/>
          </Form.Item>
          <Form.Item name="reminder" valuePropName="checked">
            <Checkbox>Reminder</Checkbox>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType='submit'>Submit</Button>
          </Form.Item>
        </Form>
      </>

        ///
        
    )
}

export default AddTask
