import React from "react";
import { connect } from "react-redux";
import { removeItem, removeCharge } from "../actions";
import "./Menu.css";


class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = {check: false};
        this.ref= React.createRef();

    }

    componentDidMount(){
        const bodyClick = (event) =>{
            if(this.ref.current.contains(event.target)){
                return;
            }
            this.setState({check: false});
        }
        document.addEventListener('click', bodyClick, {capture: true});
    }

    componentDidUpdate(prevProps){
        if(prevProps.basket !== this.props.basket){
            if(this.props.basket.length === 0){
                this.setState({check: false});
            }
        }
    }
    render() {
        const renderBasket = this.props.basket.map(item => {
            return (<li key={item.id}>
                <div className="basketItem">
                    <div className="itemImage">
                        <img src={item.image} />
                    </div>
                    <div className="itemDetail">
                        <h3>{item.name}</h3>
                        <p>{item.price.toFixed(2)}TL</p>
                    </div>
                    <div className="deleteItem">
                        <p>{item.number} ADET</p>
                        <button onClick={()=>{
                            this.props.removeItem(item);
                            this.props.removeCharge(item.price);
                        }} >ÇIKAR</button>
                    </div>
                </div>
            </li>);
        });

        return (
            <div className="menu">
                <div>
                    Shop
                </div>
                <div ref={this.ref}>
                    <a onClick={()=>this.setState({check: !this.state.check})}>
                        <span><i className="fas fa-shopping-basket"></i></span>
                        <span>{this.props.basket.length}</span>
                    </a>
                    <div className="dropdown">
                        <ul style={{display: `${this.state.check?'block': 'none'}`}}>
                            {
                               this.props.basket.length>0?renderBasket:<li className="emptyBasket">
                                   <i className="fas fa-shopping-basket fa-7x"></i>
                                   <h4>henüz sepetinize ürün eklemediniz.</h4></li>
                            }
                            <li>Toplam: {Math.abs(this.props.charge.toFixed(2))}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapState = (state) =>{
    return {basket: state.basket, charge: state.charge}
}

export default connect(mapState, {removeItem, removeCharge})(Menu);