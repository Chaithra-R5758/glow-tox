
import {ExperimentFilled,FundFilled,HistoryOutlined,GiftFilled } from '@ant-design/icons';
export const NAV_OPTIONS = [
    'Dashboard',
    'Services',
    'Promotions',
    'Service History',
    'Gift Cards',
]

export const DASHBOARD_OPTIONS = [
    {
        color:{backgroundColor:'#D42A68'},
        img:<ExperimentFilled style={{ 
        fontSize: '45px',
        color:' white'
      }} />,
        title:'Active Services',
        desc:'Contains all the active services',
    },
    {
        color:{backgroundColor:'#FFC702'},
        img:<FundFilled style={{ 
            fontSize: '45px',
            color:' white'
          }} />,
        title:'Active Promotions',
        desc:'Contains all the active promotions',
    },{
        color:{backgroundColor:'#3AC81E'},
        img:<HistoryOutlined  style={{ 
        fontSize: '45px',
        color:' white'
      }} />,
        title:'Active Subscriptions',
        desc:'Contains all the active subscriptions',
    },{
        color:{backgroundColor:'#8A50FD'},
        img:<GiftFilled  style={{ 
        fontSize: '45px',
        color:' white' 
      }} />,
        title:'Gift Cards',
        desc:'Contains all the gift card collections',
    },
]

export const CONSTANTS = {
    primaryClr: '#ff0000',
    headingFont: 'varela round',
    textFont: 'montserrat',
}

export const HEADER_TITLE = 'Glow Tox'

export const COPYRIGHT_DESC = '@2020, GlowTox. All rights reserved.'