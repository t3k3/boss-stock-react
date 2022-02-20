import React from 'react'
import axios from 'axios';
import Nav from '../POSComponents/Nav';
import Sidebar from '../Sidebar';


class ManageProducts extends React.Component {

  state =
    {
      products: [],

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
    const response = await axios.get("http://45.12.54.52:3001/api/products?limit=100");
    //console.log(response.data.data)
    this.setState({ products: response.data.data })
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

    let filteredProduct = this.state.products.filter(
      (product) => {
        //console.log("Toplam Ürün Sayısı : " + this.state.products.length);
        return ((product.slug.indexOf(this.state.searchQuery) !== -1) || (product.barcode.indexOf(this.state.searchQuery) !== -1)) && (product.category.indexOf(this.state.category) !== -1)
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

            <div className='col-md-2'>
              <Sidebar />
            </div>

            <div className='col-md-10 bg-light'>

              <div className='float-left'>

                {this.state.categories.map((category) => (
                  <b key={category.id}>
                    <button onClick={() => this.filterByCategory(category.slug)} type="button" className="btn btn-outline-primary btn-sm float-right mr-1" data-toggle="pill" >
                      <i className="fa fa-tags"></i> {category.name}</button></b>

                ))}
              </div>


              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Ürün</th>
                    <th scope="col">Barkod</th>
                    <th scope="col">Ürün Adı</th>
                    <th scope="col">Fiyat</th>
                    <th scope="col">Stok</th>
                    <th scope="col">Kategori</th>
                    <th scope="col">Tedarikçi</th>
                    <th scope="col">Alış Tarihi</th>
                    <th scope="col">İşlem</th>
                  </tr>
                </thead>
                <tbody>




                  {filteredProduct.map((product) => (
                    <tr key={product._id}>
                      <td><img width={50} alt="iphone" src={product.imageURL}></img></td>
                      <th scope="row" >{product.barcode}</th>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td style={product.stock_quantity < 1 ? {color: 'red'}:{color: 'green'}}>{product.stock_quantity}</td>

                      <td><button className="btn btn-outline-primary btn-sm mr-1" data-toggle="pill" disabled>
                      <i className="fa fa-tags"></i> {product.category.toLocaleUpperCase('tr-TR')}</button></td>
                      



                      <td>{product.tedarikci}</td>
                      <td><b style={{ fontSize: 15, color: 'gray' }}>
                        {(() => {
                          let date = new Date(product.product_created_date);
                          let options1 = {
                            hour:"2-digit",
                            minute:"2-digit",
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          }
                          return date.toLocaleTimeString("tr-TR", options1);
                        })()}
                      </b></td>
                      <td><button className='btn btn-info mr-1'>Düzenle</button><button className='btn btn-danger '>Sil</button></td>
                    </tr>

                  ))}




                </tbody>
              </table>
            </div>

          </div>
        </div>

      </>
    )
  }
}

export default ManageProducts;

