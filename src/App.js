import React from "react";
import Menu from "./components/Menu";
import Product from "./components/Product";
import { getProducts, getCategory, addItem, addCharge } from "./actions";
import { connect } from "react-redux";
import "./App.css"


class App extends React.Component {


    constructor(props) {
        super(props);

        this.state = { check: 'hepsi' };

        this.onValueChange = this.onValueChange.bind(this);
    }

    componentDidMount() {
        this.props.getProducts();
        this.props.getCategory();
        const basketStorage = JSON.parse(localStorage.getItem('basket') || '[]');


        if(Array.isArray(basketStorage) && basketStorage.length > 0){
            basketStorage.map(basket => {
                this.props.addCharge(basket.price);
                this.props.addItem(basket);
            });
        }
    }
    

    onValueChange(event) {
        this.setState({
            check: event.target.value
        });
        this.props.getProducts(event.target.value);
    }

    componentDidUpdate(prevProps){
        if(prevProps.basket !== this.props.basket){
            localStorage.setItem('basket', JSON.stringify(this.props.basket));
        }
    }
    
    render() {
        const data = this.props.products;

        const renderProducts = data.map((product) => {
            return <Product key={product.id} product={product} />
        });


        const renderCategory = this.props.category.map((category) => {
            return (
                <label key={category.id}>
                    <input type="radio" name="radio" value ={category.id}
                        checked={this.state.check == category.id}
                        onChange={this.onValueChange} />
                    {category.name}
                </label>);
        });
        return (
            <div>
                <Menu/>
                <div className="shop">
                    <div className="changes">
                        <div className="category">
                            <h4>Kategoriler:</h4>
                            <input type="text" placeholder="Ara" onChange={(e)=>e.target.value !== '' ? this.props.getCategory(e.target.value):this.props.getCategory()} />
                            <div className="category-list">
                                <label key='0'>
                                    <input type="radio" name="radio" value='hepsi'
                                    checked={this.state.check === 'hepsi'}
                                    onChange={(e) => {this.setState({check: e.target.value});this.props.getProducts();}} />
                                    Hepsi
                                </label>
                                {
                                    renderCategory
                                }
                            </div>
                        </div>
                    </div>
                    <div className="products">
                        {renderProducts}
                    </div>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return { products: state.products, category: state.category, basket: state.basket }
}

export default connect(mapState, { getProducts, getCategory, addItem, addCharge })(App);