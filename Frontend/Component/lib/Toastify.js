import Toast from 'react-native-root-toast';

/**
 *  App Notification Default Function
 */

const Toastify = (text, color) =>{
     Toast.show(text, {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          backgroundColor: color,
          textColor: 'gold',
          shadowColor: "rgba(0, 0, 0, 0.5)",
          delay: 0,
      })
}

export default Toastify