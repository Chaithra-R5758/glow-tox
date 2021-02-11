import defaultImg from '../../assets/default.png'

export const BeforeAfter = (props) => {
    const imageHandler = e => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ defaultImg: reader.result });
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    return (
        <div style={{ margin: '0 5px', display: 'flex' }}>
            <label htmlFor="input">
                <img
                    width={60}
                    height={40}
                    className={'left'}
                    src={props.before || defaultImg} />
            </label>
            <input style={{ display: 'none' }}
                type="file"
                accept="image/*"
                name="image-upload"
                id="input"
            // onChange={this.imageHandler}
            />
            <label htmlFor="input">
                <img
                    width={60}
                    height={40}
                    className={'right'}
                    src={props.after || defaultImg} />
            </label>
            <input style={{ display: 'none' }}
                type="file"
                accept="image/*"
                name="image-upload"
                id="input"
            />
        </div>
    )
}