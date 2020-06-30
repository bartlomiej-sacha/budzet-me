import React from 'react'
import { connect } from 'react-redux';
import { groupBy } from 'lodash'
import { ToggleableList } from 'components'
import ParentCategory from './ParentCategory'
import CategoryItem from './CategoryItem'


function BudgetCategoryList({ budgetedCategories, allCategories }) {


    const budgetedCategoriesByParent = groupBy(budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).parentCategory.name)

    //musi byc tablica elementow ma byc tyle ile jest kluczy w budgetedcategorisebyparent robimy destrukturyzacje tablicy wyciagmy z niej parentName z indexu 0 i categories z indexu 1 a nastepnie zwracamy po kazdej iteracji obiekt zawierajacy id zawierajacy Trigger ten nasz jsx element oraz zawierajacy children sama mapa zwraca tablice wiec finalnie mamy tablice 2 obiektow 

    //ten onclick w parent category dostajemy z toglablelist ale jak to kurwa nie mam pojecia

    /* 
        console.log("ehhh + ");
        console.log(budgetedCategoriesByParent);
        console.log(Object.entries(budgetedCategoriesByParent)); */

    // tu jest implementacja tego on klika on jest przesylany do parent category i ma zwiazek z onclikiem w toggleablelist
    const listItems = Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
                name={parentName}
                onClick={() => onClick(parentName)}
            />
        ),
        // we wszystkich kategoriach szukamy kategorii ktora ma to samo id co nasza zabudzetowana kategoria najdujemy obiekt tej kategorii  i wyciagamy { name } destrukturyzacja jej property name 
        children: categories.map(budgetedCategory => {
            const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId)
            return (
                <CategoryItem
                    key={budgetedCategory.id}
                    name={name}
                />
            )
        }),
    }))


    /*  console.log(listItems); */
    return (
        <div><ToggleableList
            items={listItems}
        /></div>
    )
}

export default connect(state => ({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
}))(BudgetCategoryList)