import React from "react"

export default class Button extends React.Component
{
    handleClick = () => 
    {
        const year = 2020;
        const month = 2;
        // console.log((new Date().getMonth() + 1).toString());
        const date = new Date(year, month, 0).getDate();
        const daysInMonth = date.toString();
        console.log(daysInMonth);
    }

    render()
    {
        return(
            <button onClick={this.handleClick}>
                Click me Please
            </button>
        )
    }
}