import React, { useMemo } from 'react'

import { connect } from 'react-redux'

import { groupBy } from 'lodash'

import { List, ListItem } from './BudgetTransactionList.css'

import { formatCurrency, formatDate } from 'utils'

import { useQuery } from 'react-query'

import API from 'data/fetch'
//WAZNEEE uzywamy tutaj memonizacji za pomoca useMemo i wrapujemy nasze stale w tego hooka lecz te stale sa uzywane tylko w obrebie tego komponentu gdyby byla taka potrzeba by miec wyliczane takie wartosci i bylyby one uzywane w roznych komponentach ktore np potrzebuja niezabudzetowanych kategorii etc to trzeba uzyc  biblioteki reselect ktora memonizuje te wartosci na poziome reduxa a nie na poziomie komponentu



//budzet jest na jeden miesiac wiec grupujemy po dniu miesiaca
function BudgetTransactionList({ selectedParentCategoryId }) {


    const { data: budget } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget)
    const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories)
    const { data: budgetedCategories } = useQuery(['budgetedCategories', { id: 1 }], API.budget.fetchBudgetedCategories)

    //filtrujemy wszystkie transakcje w ramach budzetu ktorych kategoria nalezy do kategori wyzszego rzedu ktory jest rozwiniety przez uzytkownika

    //funkcja ktora sie od razu wykonuje
    const filteredTransactionsBySelectedParentCategory = useMemo(() => {

        if (typeof selectedParentCategoryId === 'undefined') {
            return budget.transactions;

        }


        if (selectedParentCategoryId === null) {
            return budget.transactions.filter(transaction => {
                //some  dajemy funkcje w ktorej implementujemy warunek do sprawdzenia i dostajemy true lub false i w zaleznosci funkcja zwroci true lub false jesli w ktorejs iteracji dostaniemy true lub false
                const hasBudgetedCategory = budgetedCategories
                    .some((budgetedCategory) => budgetedCategory.categoryId === transaction.categoryId)

                //zwroc te transakcje ktore nie maja kategorii zabudzetowanej w ramach naszego budzetu
                return !hasBudgetedCategory;
            })

        }

        return budget.transactions
            .filter(transaction => {

                try {
                    const category = allCategories
                        .find(category => category.id === transaction.categoryId);
                    const parentCategoryName = category.parentCategory.name


                    return parentCategoryName === selectedParentCategoryId;

                } catch (error) {
                    return false;
                }



            })
    }, [allCategories, budgetedCategories, selectedParentCategoryId, budget.transactions])





    //obiekt transakcji zgrupowanych po dniu
    const groupedTransactions = useMemo(() => groupBy(
        filteredTransactionsBySelectedParentCategory,
        transaction => new Date(transaction.date).getUTCDate()
    ), [filteredTransactionsBySelectedParentCategory]
    )

    return (
        <List>

            {Object.entries(groupedTransactions).map(([key, transactions]) => (


                <ul key={key}>
                    {transactions.map(transaction => (
                        //owrapowac zeby react nie myslal ze chcemy zwrocic obiekt
                        //jesli nie znajdzie nam kategorii to zwracamy pusty obiekt a javascript jak nie znajduje property w obiekcie to go nie wypisze zostawi puse
                        <ListItem key={transaction.id}>
                            <div>{transaction.description}</div>
                            <div>{formatCurrency(transaction.amount)}</div>
                            <div>{formatDate(transaction.date)}</div>

                            <div>{(allCategories.find(category => category.id === transaction.categoryId) || {}).name}</div>

                        </ListItem>

                    ))}

                </ul>

            ))}




        </List>
    )
}

export default connect(state => ({

    selectedParentCategoryId: state.budget.selectedParentCategoryId,
}))(BudgetTransactionList);