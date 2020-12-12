
import './pageTitle.scss';

export const PageTitle = (props) => {
    return (
        <div className={'page-title-wrapper'}>
            <div className={'page-title'}>{props.title}</div>
            <div className={'page-title-divider'}></div>
        </div>
    )
}