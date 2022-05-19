import React, { Component } from 'react'

export default class componentName extends Component {
    
    render() {
        console.log(this.props.postal)
        return (
            <tr>
            <td>#{this.props.postal.Pincode}</td>
            <td >{this.props.postal.Name}</td>
            <td >{this.props.postal.Block}</td>
            <td>{this.props.postal.District}</td>
            <td>{this.props.postal.State}</td>
          </tr>
        )
    }
}
