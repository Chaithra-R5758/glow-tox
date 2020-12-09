// //import Toast from 'react-tost';
// //import { logoutUser } from '../../actions/user-actions';

// const showError = ({ toast, message }) => {
//   const styles = {
//     backgroundColor: '#ff1616',
//     height: 50,
//     width: 250,
//     borderRadius: 5,
//   };
//   switch (toast) {
//     case 'error':
//       //Toast.show(message, Toast.SHORT, Toast.BOTTOM, styles);
//       break;
//     default:
//       //Toast.show(message, Toast.SHORT, Toast.BOTTOM, styles);
//   }
// };

// export const handleError = ({ code = 0, message = '' }) => {
//   switch (code) {
//     case 100:
//       showError({ toast: 'error', message: `${code} Unable to connect. Please try again.` });
//       break;
//     case 209:
//       logoutUser();
//       showError({ toast: 'error', message: `${code} Your session has expired. Please restart the app.` });
//       break;
//     default:
//       showError({ toast: 'error', message: `${code}: ${message instanceof Object ? (message.message) : message}` });
//   }
// };


