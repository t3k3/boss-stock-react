import React from 'react'
import axios from 'axios';
import Nav from '../POSComponents/Nav';
import Sidebar from '../Sidebar';


class ManageRepair extends React.Component {

  state =
    {
      product: [],

      categories: [
        {
          "id": 0,
          "name": "Tümü",
          "slug": ""
        },
        {
          "id": 1,
          "name": "Teslim Edilen",
          "slug": "Teslim Edilen"

        },
        {
          "id": 2,
          "name": "İADE",
          "slug": "İADE"

        },
        {
          "id":3,
          "name":"HAZIR",
          "slug":"HAZIR"
        }
     
      ],

      searchQuery: "",

      category: "",

    }

  async componentDidMount() {
    const response = await axios.get("http://localhost:3001/api/repairs?limit=1000");
    console.log(response.data.data)
    //this.setState({ products: response.data.data })
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

    let filteredProduct = this.state.product.filter(
      (product) => {
        console.log("Toplam Ürün Sayısı : " + this.state.products.length);
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


        <a href='tamir/yeni'>

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
                    <th scope="col">Müşteri</th>
                    <th scope="col">Telefon</th>
                    <th scope="col">Arıza</th>
                    <th scope="col">Durum</th>
                    <th scope="col">Not</th>
                    <th scope="col">Ortalama Fiyat</th>
                    <th scope="col">Marka</th>
                    <th scope="col">Model</th>
                    <th scope="col">Renk</th>
                    <th scope="col">Teşhis</th>
                    <th scope="col">Sms</th>
                  </tr>
                </thead>
                <tbody>



                  {filteredProduct.map((product) => (




                    <tr key={product._Id}>
                      <td> {product.Name}</td>
                      <th>{product.Tel}</th>
                      <td>{product.Problem}</td>
                      <td>{product.Status}</td>
                      <td>{product.Notes}</td>
                      <td>{product.Estimated_price}</td>
                      <td>{product.Brand}</td>
                      <td>{product.Device_model}</td>
                      <td>{product.Color}</td>
                      <td>{product.Diagnosis}</td>
                      {/* <td>{product.Sms}</td> */}




                      
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
                      <td><button className='btn btn-info mr-1'>Teslim Et</button><button className='btn btn-danger '>İade</button></td>
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

export default ManageRepair;

