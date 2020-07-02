import React from 'react'
import { createPortal } from 'react-dom'

import { useHistory } from 'react-router-dom'
import { Wrapper, Content, CloseIcon } from './Modal.css'

function Modal({ children }) {

    const history = useHistory();
    const handleClose = e => {
        e.stopPropagation()
        history.goBack();

    }

    //tu sie dzieje tak mamy odpalanie tego historygoback by sie cofnac jak klikniemy xsa czyli close Icon oraz wrapper  ale ze wrapper czyli wszystko dookola Contentu modala ( bialtego tla)  renderuje ten content to jesli klikniemy na wrapper to tak jakbysmy klikneli na ten modal? wiec uzywamy stopPropagation dla wrapper i historygoback a w samym contencie by zablokowac ten propagation tez dajemy onclick z stop propagation
    return createPortal(
        <Wrapper onClick={handleClose}>

            <Content onClick={e => e.stopPropagation()}>
                <CloseIcon onClick={handleClose}>&times;</CloseIcon>
                {children}

            </Content>

        </Wrapper>,
        document.querySelector('#modal')
    )
}

export default Modal;