import React from 'react';
import axios from 'axios';
import serialize from 'form-serialize';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../POSComponents/Nav';
import Sidebar from '../Sidebar';


class AddProduct extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedFile: '',
            imageURL: "",
            categories: [

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
            category: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        if (event.target.files[0].type !== "image/jpeg") {
            console.log(event.target.files[0].type)
            alert("olmaaaaz jpg yüklee")
            return
        }

        this.setState({
            selectedFile: event.target.files[0],
        })
    }

    submit() {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        let url = "http://45.12.54.52:3001/api/upload";

        axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.data.data)
                this.setState({ imageURL: res.data.data })
            })

    }

    urunEkle = (e) => {
        e.preventDefault();
        if (this.state.imageURL === "") {
            alert("Lütfen resim yükleyin");
            return
        }
        if (this.state.category === "") {
            alert("Lütfen bir kategori seçin")
            return

        }
        const newProduct = serialize(e.target, { hash: true });
        newProduct.stock_quantity = Number(newProduct.stock_quantity);

        newProduct.price = Number(newProduct.price);
        newProduct.entry_price = Number(newProduct.entry_price);

        newProduct.category = this.state.category;
        newProduct.status = true;
        newProduct.cartQuantity = 0;
        console.log(newProduct.status)

        newProduct.imageURL = this.state.imageURL;
        newProduct.slug = newProduct.name.toLocaleLowerCase('tr-TR');

        console.log(newProduct);

        this.urunEklePost(newProduct);

    }

    urunEklePost = async (product) => {
        const response = await axios.post(`http://45.12.54.52:3001/api/products`, product);
        console.log(response.data.success)
        if (response.data.success) {
            alert("Başarılı")
            //window.location.reload(true)
        }
        else {
            alert("Ürün Yüklenemedi" + response.data.message)
        }
    }


    categorySelect = (e) => {
        console.log(e.target.htmlFor);
        this.setState({ category: e.target.htmlFor })
    }

    render() {
        return (
            <>

                <Nav />


                <div className='container-fluid'>

                    <div className='row'>

                        <div className='col-md-3'>
                            <Sidebar />
                        </div>

                        <div className='col-md-9 bg-light'>

                            {/** IMAGE UPLOAD START */}
                            <div className="form-row">
                                <div className="form-group col-mb-3">
                                    <label className="text-white">Dosya Seç :</label>
                                    <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
                                    <button type="submit" className="btn btn-info" onClick={() => this.submit()}>Yükle</button>
                                </div>
                            </div>
                            {/** IMAGE UPLOAD END */}

                            {/** FORM START */}
                            <br />
                            <form onSubmit={this.urunEkle}>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Ürün İsmi</span>
                                    <input type="text" name="name" className="form-control" required />

                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Ürün Açıklaması</span>
                                    <textarea className="form-control" aria-label="With textarea"></textarea>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Alış Fiyat: ₺ </span>
                                    <input type="number" name="entry_price" className="form-control" aria-label="Amount (to the nearest dollar)" required />
                                    <span className="input-group-text">.00</span>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Satış Fiyat: ₺ </span>
                                    <input type="number" name="price" className="form-control" aria-label="Amount (to the nearest dollar)" required />
                                    <span className="input-group-text">.00</span>
                                </div>


                                <div className="input-group mb-3">
                                    <span className="input-group-text">Stok Adet : </span>
                                    <input type="number" name="stock_quantity" className="form-control" required />

                                </div>


                                <div className="input-group mb-3">
                                    <span className="input-group-text">Barkod : </span>
                                    <input type="text" name="barcode" className="form-control" required />

                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Tedarikçi : </span>
                                    <input type="text" name="tedarikci" className="form-control" required />

                                </div>


                                <div className="input-group mb-3">

                                    <span className="input-group-text">Kategori</span>

                                    {this.state.categories.map((category) => (

                                        <b key={category.id}>

                                            <div className="btn-group" role="group">
                                                <input type="radio" className="btn-check" name="category" id={category.slug} autoComplete="off" />
                                                <label onClick={this.categorySelect} className="btn btn-outline-primary" htmlFor={category.slug}>{category.name}</label>

                                            </div>

                                        </b>

                                    ))}

                                </div>

                                <input className='btn btn-success' style={{ float: 'right', minBlockSize: 100, minWidth: 150, fontSize: 50 }} type="submit" value="Ekle" />
                            </form>

                            {/** FORM END */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddProduct