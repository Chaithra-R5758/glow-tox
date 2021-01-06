import { getRenderPropValue } from "antd/lib/_util/getRenderPropValue"

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
        img:<img src="https://img.icons8.com/ffffff/64/service.png"/>,
        title:'Active Services',
        desc:'Contains all the active services',
    },
    {
        color:{backgroundColor:'#FFC702'},
        img:<img src="https://img.icons8.com/pastel-glyph/64/ffffff/bullhorn-megaphone--v2.png"/>,
        title:'Active Promotions',
        desc:'Contains all the active promotions',
    },{
        color:{backgroundColor:'#3AC81E'},
        img:<img src="https://img.icons8.com/wired/64/ffffff/renew-subscription.png"/>,
        title:'Active Subscriptions',
        desc:'Contains all the active subscriptions',
    },{
        color:{backgroundColor:'#8A50FD'},
        img:<img src="https://img.icons8.com/ios-filled/62/ffffff/gift.png"/>,
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