import React, { Fragment, useMemo } from 'react'
import { InlineButton, RegularButton } from './Button.css';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

// prop types cwiczonko w tym!
function Button({ variant, children, ...props }) {

    const { to } = props;

    //wywolujemy funkcje wrapujac ja w nawiasy i 2 nawaiasy do wywolania od razu  || po zmianie useMemo nie  wywolujemy bo ona wywoluje   [] oznacza, ze tylko raz a z variant odpalic gdy variant sie zmieni
    const Component = useMemo(() => {

        switch (variant) {
            case 'inline':
                return InlineButton

            case 'regular':
                return RegularButton


            default:
                return RegularButton

        }
    }, [variant]);


    const content = useMemo(() => (

        <Component {...props}>
            {children}
        </Component>
    ), [props, children]);



    return to ? (
        <Link {...props}>

            {content}
        </Link>
    ) : (
            <Fragment>
                {content}
            </Fragment>

        )
}

Button.propTypes = {
    variant: PropTypes.oneOf(['inline', 'regular'])
}


export default Button