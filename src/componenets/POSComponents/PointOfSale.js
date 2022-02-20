import React from "react";
import Nav from "./Nav";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './CheckoutModal.css';
import productPNG from "../../iphone.jpg";
import axios from "axios";



class PointOfSale extends React.Component {


    state =
        {
            products: [],

            cartItems: [],

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

            cartToplam: 0,

            searchQuery: "",

            category: "",

            openModal: false,

            paymantMethod: "nakit",

            realPrice: 0,

            test: 0,
        }

    async componentDidMount() {
        const response = await axios.get("http://45.12.54.52:3001/api/products?limit=100");
        //console.log(response.data.data)
        this.setState({ products: response.data.data })
    }

    //Barcod için yapılan yer. Eğer sayılar girildikten sonra enter'a basılırsa eşleşen ürünü direkt olarak sepete ekler. 
    _handleKeyDownProp = (e) => {
        if (e.key === 'Enter') {

            let newProductList = this.state.products;


            newProductList.forEach((product) => {

                if (product.barcode === e.target.value) {
                    this.addItemToCart(product)
                }
                this.setState({ searchQuery: "" })
            })
        }
    }

    deleteItemToCart = (product) => {
        const newCartItems = this.state.cartItems.filter(
            p => p._id !== product._id
        );

        this.setState({
            cartItems: newCartItems
        })
        this.calculateCartTotal(product)
    }


    /**
     
     addItemToCart = (product) => {
         
         let newCartItems = this.state.cartItems;
         let islem = 1
         
         if (newCartItems.findIndex(x => x._id === product._id)) {
             console.log(product._id)
             newCartItems = this.state.cartItems.concat([product]);
             product.cartQuantity = 0
             product.cartQuantity += 1;
            } else {
                product.cartQuantity += 1;
            }
            
            
            this.setState({
                cartItems: newCartItems
            })
            this.calculateCartTotal(product, islem)
        }
        */

    addItemToCart = (product) => {
        let newCartItems = this.state.cartItems;
        let islem = 1
        if (!newCartItems.includes(product)) {
            newCartItems = this.state.cartItems.concat([product]);
            product.cartQuantity = 0

            product.cartQuantity += 1;
        }
        else {
            product.cartQuantity += 1;
        }

        this.setState({
            cartItems: newCartItems
        })
        this.calculateCartTotal(product, islem)

    }

    decItemToCart = (product) => {
        let newCartItems = this.state.cartItems;
        let islem = 0
        if (!newCartItems.includes(product)) {
            newCartItems = this.state.cartItems.concat([product]);
            product.cartQuantity -= 1;
        }
        else {
            product.cartQuantity -= 1;
        }

        this.setState({
            cartItems: newCartItems
        })
        this.calculateCartTotal(product, islem)

        if (product.cartQuantity < 1) {
            this.deleteItemToCart(product)
        }
    }



    calculateCartTotal = (product, islem) => {

        if (islem) {
            this.setState({
                cartToplam: (this.state.cartToplam + product.price)
            })

        } else {
            this.setState({
                cartToplam: (this.state.cartToplam - product.price)
            })
        }


    }

    //Search alanından alınan her inputu state içindeki searchQuery'e atıyor.
    //Bir kategorinin seçili olma ihtimali üzerine kategoriyi boşaltıyoruz. Tüm ürünleri listede göstereniliyoruz.
    searchProduct = (event) => {
        this.setState({ searchQuery: event.target.value })
        this.setState({ category: "" })
    }

    realPriceFunc = (event) => {
        this.setState({ realPrice: event.target.value })
    }

    filterByCategory = (categoryName) => {
        this.setState({ category: categoryName })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
    }

    onClickButton = e => {
        e.preventDefault()
        this.setState({ openModal: true })
        this.setState({ realPrice: this.state.cartToplam })
    }

    onCloseModal = () => {
        this.setState({ openModal: false })
    }

    orderEkle = (e) => {

        e.preventDefault();

        let newOrder = {};

        newOrder.order_products = this.state.cartItems;

        newOrder.total_price = this.state.cartToplam;

        newOrder.sales_type = "magaza";

        newOrder.real_price = Number(this.state.realPrice);

        newOrder.payment_method = this.state.paymantMethod;


        console.log(newOrder);

        
        this.orderKaydet(newOrder);

    }

    orderKaydet = async (product) => {
        const response = await axios.post(`http://45.12.54.52:3001/api/orders`, product);
        console.log(response.data.success)
        if (response.data.success) {
            alert("Başarılı")
            //window.location.reload(true)
        }
        else {
            alert("Satış yapılamadı!" + response.data.message)
        }
    }



    render() {

        //Arama yapıldığında ürünlerin filtrelenmesi için gereken kod bloğu
        //Aynı zamanda kategori seçildiğinde ürünleri filtreler
        let filteredProduct = this.state.products.filter(
            (product) => {
                console.log("Toplam Ürün Sayısı : " + this.state.products.length);
                return (product.slug.indexOf(this.state.searchQuery) !== -1) && (product.category.indexOf(this.state.category) !== -1)
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

                <div>

                    <Modal

                        open={this.state.openModal}

                        onClose={this.onCloseModal}

                        classNames={{
                            overlay: 'customOverlay',
                            modal: 'customModal',
                        }}>

                        <div className="col-md-12">
                            <div className="card">
                                <span id="cart">
                                    <table className="table table-hover shopping-cart-wrap">
                                        <thead className="text-muted">
                                            <tr>
                                                <th scope="col">Ürün</th>
                                                <th scope="col" width="120">Adet</th>
                                                <th scope="col" width="120">Fiyat</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.cartItems.map((cartItem) => (
                                                <tr key={cartItem._id}>
                                                    <td>
                                                        <figure className="media">
                                                            <div className="img-wrap"><img src={productPNG} alt="product_alt" className="img-thumbnail img-xs" /></div>
                                                            <figcaption className="media-body">
                                                                <h6 className="title text-truncate">{cartItem.name} </h6>
                                                            </figcaption>
                                                        </figure>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="m-btn-group m-btn-group--pill btn-group mr-2" role="group" aria-label="...">

                                                            <button type="button" className="m-btn btn btn-default">{cartItem.cartQuantity}</button>

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="price-wrap">
                                                            <var className="price">{cartItem.cartQuantity * cartItem.price}</var>
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </span>
                            </div>

                            <div className="box">
                                <dl className="dlist-align">
                                    <dt>KDV: </dt>
                                    <dd className="text-right">18%</dd>
                                </dl>
                                <dl className="dlist-align">
                                    <dt>İndirim:</dt>
                                    <dd className="text-right"><a href="# ">0%</a></dd>
                                </dl>
                                <dl className="dlist-align">
                                    <dt>Ara Toplam:</dt>
                                    <dd className="text-right">12.000</dd>
                                </dl>
                                <dl className="dlist-align">
                                    <dt>Toplam: </dt>
                                    <dd className="text-right h4 b">
                                        {this.state.cartToplam}

                                    </dd>
                                </dl>

                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="card">
                                <span id="cart">
                                </span>
                            </div>

                            <div className="container">
                                <div className="row">
                                    <div className="col-6 p-0">
                                        <span className="input-group-text">İndirimli Toplam Satış Fiyatı: ₺ </span>
                                    </div>
                                    <div className="col-5 p-0">
                                        <input onChange={this.realPriceFunc} type="number" className="form-control " placeholder={this.state.cartToplam} />
                                    </div>
                                    <div className="col-1 p-0">
                                        <span className="input-group-text">.00</span>
                                    </div>


                                </div>
                            </div>

                            <div className="box">
                                <div className="row">
                                    <div className="col-md-6">

                                        <button onClick={() => this.setState({ paymantMethod: "kart" })} type="button" className={this.state.paymantMethod === "kart" ? "btn btn-success btn-lg btn-block" : "btn btn-outline-success btn-lg btn-block"}><i className="fa fa-credit-card" aria-hidden="true"></i> KREDİ KARTI </button>

                                    </div>

                                    <div className="col-md-6">
                                        <button onClick={() => this.setState({ paymantMethod: "nakit" })} type="button" href="# " className={this.state.paymantMethod === "nakit" ? "btn btn-success btn-lg btn-block" : "btn btn-outline-success btn-lg btn-block"}><i className="fa fa-shopping-cart" aria-hidden="true"></i> NAKİT </button>
                                    </div>
                                </div>
                            </div>

                            <div className="box">
                                <div className="row">
                                    <div className="col-md-6">

                                        <button onClick={() => this.setState({ openModal: false })} type="button" className="btn btn-outline-danger btn-error btn-lg btn-block"><i className="fa fa-times-circle "></i> Geri Dön </button>

                                    </div>
                                    <div className="col-md-6">
                                        <button onClick={this.orderEkle} type="button" href="# " className="btn  btn-primary btn-lg btn-block"><i className="fa fa-shopping-bag"></i> Ödeme </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Modal>
                </div >



                <section className="section-content padding-y-sm bg-default ">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8 card padding-y-sm card ">
                                <ul className="nav bg radius nav-pills nav-fill mb-3 bg" role="tablist">

                                    {this.state.categories.map((category) => (
                                        <li className="nav-item" key={category.id}>
                                            <button onClick={() => this.filterByCategory(category.slug)} type="button" className={this.state.category === category.slug ? "btn btn-primary btn-sm float-right" : "btn btn-outline-primary btn-sm float-right"} data-toggle="pill" >
                                                <i className="fa fa-tags"></i> {category.name}</button></li>


                                    ))}

                                </ul>

                                <span id="items">
                                    <div className="row">

                                        {filteredProduct.map((product) => (

                                            <div className="col-md-2" key={product._id}>
                                                <figure className="card card-product" style={{ minHeight: 250 }}>

                                                    {
                                                        //<span className="badge-new"> YENİ </span>
                                                    }

                                                    <div className="img-wrap" style={{ maxHeight: 100 }} >
                                                        <img src={product.imageURL} alt="iphone-12" />
                                                        <a className="btn-overlay" href="# "><i className="fa fa-search-plus"></i> Detay</a>
                                                    </div>
                                                    <figcaption className="info-wrap">
                                                        <a href="# " className="title">{product.name} </a>
                                                        <span className="badge bg-info" style={{ float: 'right' }}>Stok {product.stock_quantity}</span>
                                                        <div className="action-wrap">
                                                            <b style={{ fontSize: 10 }}>Barcode: {product.barcode}</b>
                                                            <div className="row">

                                                            <div className="price-wrap h5">
                                                                <span style={{color: 'green'}} className="price-new float-right">₺{product.price}</span>
                                                            </div>

                                                            <button onClick={(event) => this.addItemToCart(product)} className="btn btn-outline-primary btn-sm float-right" type="button"><i className="fa fa-cart-plus"></i> Ekle</button>
                                                            
                                                            </div>
                                                        </div>
                                                    </figcaption>
                                                </figure>
                                            </div>


                                        ))}




                                    </div>
                                </span>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <span id="cart">
                                        <table className="table table-hover shopping-cart-wrap">
                                            <thead className="text-muted">
                                                <tr>
                                                    <th scope="col">Ürün</th>
                                                    <th scope="col" width="120">Adet</th>
                                                    <th scope="col" width="120">Fiyat</th>
                                                    <th scope="col" className="text-right" width="200">Sil</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.cartItems.map((cartItem) => (
                                                    <tr key={cartItem._id}>
                                                        <td>
                                                            <figure className="media">
                                                                <div className="img-wrap"><img src={productPNG} alt="product_alt" className="img-thumbnail img-xs" /></div>
                                                                <figcaption className="media-body">
                                                                    <h6 className="title text-truncate">{cartItem.name} </h6>
                                                                </figcaption>
                                                            </figure>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="m-btn-group m-btn-group--pill btn-group mr-2" role="group" aria-label="...">
                                                                <button onClick={(event) => this.decItemToCart(cartItem)} type="button" className="m-btn btn btn-default"><i className="fa fa-minus"></i></button>
                                                                <button type="button" className="m-btn btn btn-default">{cartItem.cartQuantity}</button>
                                                                <button onClick={(event) => this.addItemToCart(cartItem)} type="button" className="m-btn btn btn-default"><i className="fa fa-plus"></i></button>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="price-wrap">
                                                                <var className="price">{cartItem.cartQuantity * cartItem.price}</var>
                                                            </div>
                                                        </td>
                                                        <td className="text-right">
                                                            <button onClick={(event) => this.decItemToCart(cartItem)} className="btn btn-outline-danger"><i className="fa fa-trash"></i></button>

                                                        </td>
                                                    </tr>
                                                ))}




                                            </tbody>
                                        </table>
                                    </span>
                                </div>

                                <div className="box">
                                    <dl className="dlist-align">
                                        <dt>KDV: </dt>
                                        <dd className="text-right">18%</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt>İndirim:</dt>
                                        <dd className="text-right"><a href="# ">0%</a></dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt>Ara Toplam:</dt>
                                        <dd className="text-right">12.000</dd>
                                    </dl>
                                    <dl className="dlist-align">
                                        <dt>Toplam: </dt>
                                        <dd className="text-right h4 b">
                                            {this.state.cartToplam}

                                        </dd>
                                    </dl>
                                    <div className="row">
                                        <div className="col-md-6">

                                            <button onClick={() => window.location.reload(true)} type="button" className="btn btn-outline-danger btn-error btn-lg btn-block"><i className="fa fa-times-circle "></i> Temizle </button>

                                        </div>
                                        <div className="col-md-6">
                                            <button onClick={this.onClickButton} type="button" className="btn btn-primary btn-lg btn-block" disabled={this.state.cartItems.length > 0 ? false : true}><i className="fa fa-shopping-bag"></i> Ödeme </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>




            </>
        )
    }



}




export default PointOfSale;
