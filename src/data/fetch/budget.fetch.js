export const fetchBudget = (id) => {
    const promise = fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`);


    return promise;
}


export const fetchBudgetedCategories = (id) => {
    const promise = fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`);


    return promise;
}

//domyszlnie fecz robi get zmienaimy na post nie wybieramy tez budzetu do jakiego zapisujemy RESTOWE API TO KONWENCJA ENDPOINTOW JAK ONE DZIALAJA I CZEGO MOZNA SIE SPODZIEWAC PO NICH jesli zamiast parametr po parametrze damy obiekt tak jak tu to nie musiym pilnowac kolejnosc parametrow
export const addTransaction = ({ budgetId, data }) => {
    const promise = fetch(`${process.env.REACT_APP_API_URL}/budgets/${budgetId}/transactions`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    return promise
}