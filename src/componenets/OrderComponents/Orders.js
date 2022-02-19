import React from 'react'
import axios from 'axios';
import Nav from '../POSComponents/Nav';
import Sidebar from '../Sidebar';


class ManageProducts extends React.Component {

    state =
        {
            orders: [],

            categories: [
                {
                    "id": 0,
                    "name": "Tümü",
                    "slug": ""
                },
                {
                    "id": 1,
                    "name": "Telefon",
                    "slug": "telefon"

                },
                {
                    "id": 2,
                    "name": "Aksesuar",
                    "slug": "aksesuar"

                },
                {
                    "id": 3,
                    "name": "Bilgisayar",
                    "slug": "bilgisayar"

                },
                {
                    "id": 4,
                    "name": "Kulaklık",
                    "slug": "kulaklık"
                },
                {
                    "id": 5,
                    "name": "Kulıf",
                    "slug": "kılıf"
                },
            ],

            searchQuery: "",

            category: "",

        }

    async componentDidMount() {
        const response = await axios.get("http://localhost:3001/api/orders?limit=100");
        //console.log(response.data.data)
        this.setState({ orders: response.data.data })
    }

    searchProduct = (event) => {
        this.setState({ searchQuery: event.target.value })
        this.setState({ category: "" })
    }

    filterByCategory = (categoryName) => {
        this.setState({ category: categoryName })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
    }

    

    render() {

        let filteredOrder = this.state.orders.filter(
            (order) => {
                //console.log("Toplam Ürün Sayısı : " + this.state.orders.length);
                return ((order._id.indexOf(this.state.searchQuery) !== -1) || (order.barcode.indexOf(this.state.searchQuery) !== -1))
            }
        )
        


        return (
            <>

                <Nav
                    searchProductProp={this.searchProduct}
                    //Search alanına barcode yazılıp enter yapıldığında _handleKeyDownProp() fonksiyona gönderiyor.
                    _handleKeyDownProp={this._handleKeyDownProp}
                    searchQuery={this.state.searchQuery}
                />


                <a href='urunler/yeni'>

                    <button type='button' className='btn btn-primary float-right mr-5'><i className='fa fa-plus'></i> YENİ ÜRÜN</button>
                </a>

                <div className='container-fluid'>
                    <div className='row'>

                        <div className='col-md-3'>
                            <Sidebar />
                        </div>

                        <div className='col-md-9 bg-light'>

                            <div className='float-left'>

                                {this.state.categories.map((category) => (
                                    <b key={category.id}>
                                        <button onClick={() => this.filterByCategory(category.slug)} type="button" className="btn btn-outline-primary btn-sm float-right mr-1" data-toggle="pill" >
                                            <i className="fa fa-tags"></i> {category.name}</button></b>

                                ))}
                            </div>



                            <div className="accordion accordion" id="accordionFlushExample">
                                {filteredOrder.map((order) => (

                                    <div className="accordion-item" key={order._id}>

                                        <h2 className="accordion-header" id="flush-headingOne">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#a" + order._id} aria-expanded="false" aria-controls={"a" + order._id}>

                                                {order._id}

                                                <div className='ml-5'>

                                                    {order.order_products.map((order_product) => (
                                                        <img key={order_product._id} style={{ maxWidth: 30 }} src={order_product.imageURL} alt={order_product.name}></img>

                                                    ))}
                                                </div>
                                                <h5 style={{fontSize: 15}} className='ml-5'>Satış Tutarı : <b style={{fontSize: 15}}>{order.real_price}</b> TL </h5>

                                                <h5 style={{fontSize: 15}} className='ml-5'>Satış Tarihi : <b style={{fontSize: 15}}>
                                                {(() =>  {
                                                    let date = new Date(order.order_created_date);
                                                    let options1 = {  
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        year: "numeric",
                                                        month: "numeric",  
                                                        day: "numeric",
                                                          
                                                    }
                                                    
                                                    return date.toLocaleTimeString("tr-TR", options1);

                                                    
                                                  })()}
                                                </b></h5>


                                            </button>
                                        </h2>

                                        <div id={"a" + order._id} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body">
                                                <table className="table">

                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Görsel</th>
                                                            <th scope="col">Ürün Adı</th>
                                                            <th scope="col">Barkod</th>
                                                            <th scope="col">Fiyat</th>
                                                            <th scope="col">Satış Adet</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>

                                                        {order.order_products.map((order_product) => (

                                                            <tr key={order_product._id}>
                                                                <th scope="row"><img key={order_product._id} style={{ maxWidth: 50 }} src={order_product.imageURL} alt={order_product.name}></img></th>
                                                                <td><span>{order_product.name}</span></td>
                                                                <td><span>{order_product.barcode}</span></td>
                                                                <td><span>{order_product.price}</span></td>
                                                                <td><span>{order_product.cartQuantity}</span></td>
                                                            </tr>

                                                        ))}
                                                        <tr>

                                                            <td><span></span></td>
                                                            <td><span></span></td>
                                                            <td><span></span></td>
                                                            <td><span>Toplam: <b>{order.real_price}</b> TL</span></td>
                                                            <td><span></span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <h1 style={{ fontSize: 15 }}>Sipariş Numarası : <b>{order._id}</b></h1>
                                                    </div>
                                                    <div className='col'>
                                                        <button className='btn btn-danger float-right'>İPTAL ET</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>





                        </div>

                    </div>
                </div>


            </>
        )
    }
}

export default ManageProducts;

