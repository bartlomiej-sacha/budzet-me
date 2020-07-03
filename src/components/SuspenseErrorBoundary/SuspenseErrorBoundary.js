import React from 'react'
import { LoadingIndicator, Button } from 'components'





class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }




    //taki service roollbar np do logowania bledow na produkcji
    componentDidCatch(error) {
        // You can also log the error to an error reporting service
        /*  logErrorToMyService(error, errorInfo); */

        console.log(error)
    }

    //async await to nic innego jak czekanie na wykonanie czegos tutaj chcemy najpierw pobrac a pozniej sprawdzic czy blad jest wiec czekamy na refetch
    tryAgain = async () => {



        this.setState({ hasError: false })


    }


    render() {


        return (
            <React.Suspense fallback={<LoadingIndicator />} >
                {this.state.hasError ? (
                    <div>
                        Something went wrong! <Button onClick={this.tryAgain}>Try again!</Button>
                    </div>
                ) : (

                        <React.Fragment>
                            {this.props.children}
                        </React.Fragment>

                    )}


            </React.Suspense>


        )

    }
}

export default ErrorBoundary;