import React from "react";

export default class DateText extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {date: new Date()};
    }
    
    state()
    {

    }

    render()
    {
        return(
            <input 
                type = "text" 
                value={this.state.value}
                onChange={this.handleChange}
            />
        )
    }
}