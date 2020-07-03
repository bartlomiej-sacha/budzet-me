

// w funkcjach  handleclick w budget category chcemy odplaic inna funkcje ktora bedziemy odzialywac na komponent toglable dziecka  i po to uzywamy useRef
import React, { useRef, useMemo, useCallback, useContext } from 'react'




import 'styled-components/macro'

import { groupBy } from 'lodash'
import { ToggleableList } from 'components'
import ParentCategory from './ParentCategory'
import CategoryItem from './CategoryItem'

import { useTranslation } from 'react-i18next'


import { useQuery } from 'react-query';

import API from 'data/fetch'

import BudgetContext from 'data/context/budget.context'


//funkcje reduxowe oddzielim od danych
function BudgetCategoryList() {



    const { data: budget } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget)
    const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories)
    const { data: budgetedCategories } = useQuery(['budgetedCategories', { id: 1 }], API.budget.fetchBudgetedCategories)

    /*  console.log(fetchRef); */


    //CONTEXT destrukturyzacja
    const { setSelectedParentCategoryId } = useContext(BudgetContext.store)




    const { t } = useTranslation();

    //use ref - referencja  zanim ref cos ma to ma nulla react ref w google || wysylamy to jako props do toglablelist to tam w useeffect przypisujemy do funkcji ktora chcemy miec z dziecka i odpalamy w handle w rodzicu linia 36
    const handleClickParentCategoryRef = useRef(null);


    //jezeli ktora z tych zmienny zmieni sie z tablicy (typy proste prowonuje do wartosci a typy takie jak tablica porownuje referencjami)
    const budgetedCategoriesByParent = useMemo(() => groupBy(budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).parentCategory.name),
        [budgetedCategories, allCategories]
    )




    // roznica useCallback a memo jest taka, ze callback zwraca nam funkcje ktora przekazujemy jako pierwszy parametr a nie wartosc tej funkcji
    // czyli w momencie kiedy selectparent categoryu ani handleclick parentcategoryref sie nie zmieni ta funkcja nie stworzy sie na nowo
    // wiec nie przerenderujemy rowniez tego componentu do ktorego przesylamy jako props ten handle czyli parent category
    const handleClearParentCategorySelect = useCallback(() => {
        setSelectedParentCategoryId();
        //
        handleClickParentCategoryRef.current()

    }, [setSelectedParentCategoryId, handleClickParentCategoryRef])

    const handleSelectRestParentCategories = useCallback(() => {
        setSelectedParentCategoryId(null);
        handleClickParentCategoryRef.current()

    }, [setSelectedParentCategoryId, handleClickParentCategoryRef]
    )

    //musi byc tablica elementow ma byc tyle ile jest kluczy w budgetedcategorisebyparent robimy destrukturyzacje tablicy wyciagmy z niej parentName z indexu 0 i categories z indexu 1 a nastepnie zwracamy po kazdej iteracji obiekt zawierajacy id zawierajacy Trigger ten nasz jsx element oraz zawierajacy children sama mapa zwraca tablice wiec finalnie mamy tablice 2 obiektow 

    //ten onclick w parent category dostajemy z toglablelist ale jak to kurwa nie mam pojecia

    /* 
        console.log("ehhh + ");
        console.log(budgetedCategoriesByParent);
        console.log(Object.entries(budgetedCategoriesByParent)); */

    // tu jest implementacja tego on klika on jest przesylany do parent category i przekazuje parentName do togglable list...
    const listItems = useMemo(
        () => Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
            id: parentName,
            Trigger: ({ onClick }) => (
                <ParentCategory
                    name={parentName}
                    onClick={() => {
                        onClick(parentName);
                        setSelectedParentCategoryId(parentName)
                    }}
                    categories={categories}
                    transactions={budget.transactions}
                />
            ),
            // we wszystkich kategoriach szukamy kategorii ktora ma to samo id co nasza zabudzetowana kategoria najdujemy obiekt tej kategorii  i wyciagamy { name } destrukturyzacja jej property name 
            children: categories.map(budgetedCategory => {
                const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId)
                return (
                    <CategoryItem
                        key={budgetedCategory.id}
                        name={name}
                        item={budgetedCategory}
                        transactions={budget.transactions}
                    />
                )
            }),
        })), [allCategories, budget.transactions, budgetedCategoriesByParent, setSelectedParentCategoryId]

    )




    const totalSpent = useMemo(() => budget.transactions
        .reduce((acc, transaction) => acc + transaction.amount, 0), [budget.transactions])



    const restToSpent = useMemo(() => budget.totalAmount - totalSpent, [budget.totalAmount, totalSpent]);

    const amountTaken = useMemo(() => budgetedCategories.reduce((acc, budgetedCategory) => {
        const categoryTransactions = budget.transactions.filter(transactions => transactions.categoryId === budgetedCategory.id)
        //trick wrzucamy logowana zmienna do obiektu by znac jej nazwe

        const categoryExpenses = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)



        return acc + Math.max(categoryExpenses, budgetedCategory.budget);
    }, 0), [budget.transactions, budgetedCategories]);



    //wyfiltruj te transakcje dla ktorych nie znajdziemy zabudzetowanych kategorii w naszym budzecie
    const notBudgetedTransaction = useMemo(() => budget.transactions
        .filter(transaction => {
            return !budgetedCategories
                .find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
        }), [budget.transactions, budgetedCategories])



    const notBudgetedExpenses = useMemo(() => notBudgetedTransaction.reduce((acc, transaction) => acc + transaction.amount, 0), [notBudgetedTransaction])

    const availableForRestCategories = useMemo(() => budget.totalAmount - amountTaken - notBudgetedExpenses, [budget.totalAmount, amountTaken, notBudgetedExpenses]);



    //is loaded trzeba uzyc
    //gdfybysmy nie uzyli usecallback dla tych onlickow z parent category to jakby rerenderowal sie glowny komponent budget category list tworzyl by nowa funkcje handleclearparent categoryselect i musialby sie rerenderowac tez parent category ktory ja dostaje

    return (


        <div>

            <div css={`
                border-bottom: 5px solid ${({ theme }) => theme.colors.gray.light}
            `}>
                <ParentCategory
                    name={budget.name}
                    amount={restToSpent}
                    onClick={handleClearParentCategorySelect}

                />

            </div>


            <ToggleableList
                items={listItems}
                clickRef={handleClickParentCategoryRef}
            />


            <div css={`
                border-top: 5px solid ${({ theme }) => theme.colors.gray.light}
            `}>

                <ParentCategory
                    name={t('Other categories')}
                    amount={availableForRestCategories}
                    onClick={handleSelectRestParentCategories}
                />

            </div>




        </div>
    )
}

export default BudgetCategoryList