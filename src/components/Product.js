import React from "react";
import { connect } from "react-redux";
import { addItem, addCharge } from "../actions";
import "./Product.css"

class Product extends React.Component {
    render() {
        return (
            <div className="product">
                <img src={this.props.product.image} />
                <div className="product-detail">
                    <h4>{this.props.product.price.toFixed(2).toString().replace(".", ",")}TL</h4>
                    <h3>{this.props.product.name}</h3>
                    <button onClick={() => {
                        this.props.addItem(this.props.product);
                        this.props.addCharge(this.props.product.price);
                    }
                    }>+</button>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return { state: state.basket }
}
export default connect(mapState, { addItem, addCharge })(Product);