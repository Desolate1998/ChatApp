import { store } from 'react-notifications-component'

export class Notfications {
  static Warning(Title: string, Message: string){
    store.addNotification({
        title: Title,
        message: Message,
        type: 'warning',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      })
  }
  static Danager (Title: string, Message: string) {
    store.addNotification({
      title: Title,
      message: Message,
      type: 'danger',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    })
  }

  static Success (Title: string, Message: string) {
    store.addNotification({
      title: Title,
      message: Message,
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    })
  }

  static info (Title: string, Message: string) {
    store.addNotification({
      title: Title,
      message: Message,
      type: 'info',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    })
  }

  static default (Title: string, Message: string) {
    store.addNotification({
      title: Title,
      message: Message,
      type: 'default',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    })
  }

  

}
