export const fetchBudget = async (id, idd) => {
    console.log(id);

    console.log(idd.id);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${idd.id}/?_embed=transactions`);

    const data = await response.json();

    return data;
}


export const fetchBudgetedCategories = async (id, idd) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${idd.id}/budgetCategories`);

    const data = await response.json();

    return data;
}

//domyszlnie fecz robi get zmienaimy na post nie wybieramy tez budzetu do jakiego zapisujemy RESTOWE API TO KONWENCJA ENDPOINTOW JAK ONE DZIALAJA I CZEGO MOZNA SIE SPODZIEWAC PO NICH jesli zamiast parametr po parametrze damy obiekt tak jak tu to nie musiym pilnowac kolejnosc parametrow
export const addTransaction = async ({ budgetId, data }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budgetId}/transactions`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    });



    return await response.json();
}