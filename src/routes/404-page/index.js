import { Result, Button } from 'antd';

const PageNotFound = () => {
    return (
      <Result
        status="404"
        title="404"
        style={{ top: '10%', left: '40%', position: 'absolute' }}
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary"><a href="/login">Back Home</a></Button>}
      />
    );
}
export default PageNotFound;