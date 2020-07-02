import { toast } from 'react-toastify';

const notificationsMiddleware = () => next => action => {
    if (action.successMessage && /(.*)_(SUCCESS)/.test(action.type)) {
        //wyswietl notyfikacje
        toast.success(action.successMessage);

    }



    next(action)

}


export default notificationsMiddleware;