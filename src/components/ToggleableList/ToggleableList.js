import React, { useState, Fragment, useEffect } from 'react'



const Item = ({ item, onClickHandler, isActive }) => (
    //kazdy item to obiekt ktory posiada wlasciwosc trigger ktory posiada element jsx  czyli odwolujemy sie do property itema a to property to jsx
    <div>
        <item.Trigger onClick={onClickHandler} />
        {isActive && item.children}
    </div>

)



function ToggleableList({ items, clickRef }) {

    const [selectedItem, setSelectedItem] = useState();

    //do refa wyslanego przez propsy z budgetCategoryList ktory renderuje toggleableList czyli jest jego rodzicem przypisujemy funkcje setujaca wybrana parentCategory 

    useEffect(() => {

        clickRef.current = setSelectedItem;
    }, [clickRef, setSelectedItem])


    return (
        <Fragment>
            {items.map(item => (
                <Item
                    key={item.id}
                    item={item}
                    onClickHandler={setSelectedItem}
                    isActive={selectedItem === item.id}

                />
            ))}
        </Fragment>
    )
}

export default ToggleableList;