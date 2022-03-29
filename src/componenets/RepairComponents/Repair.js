import React from 'react'
import axios from 'axios';
import Nav from '../POSComponents/Nav';
import Sidebar from '../Sidebar';


class ManageRepair extends React.Component {

  state =
    {
      repairs: [],

      categories: [
        {
          "id": 0,
          "name": "Tümü",
          "slug": ""
        },
        {
          "id": 1,
          "name": "Teslim Edilen",
          "slug": "undefined"

        },
        {
          "id": 2,
          "name": "İADE",
          "slug": "1"

        },
        {
          "id": 3,
          "name": "HAZIR",
          "slug": "bekliyor"
        }

      ],

      searchQuery: "",

      category: "",

    }

  async componentDidMount() {
    const response = await axios.get("http://localhost:3001/api/repairs?limit=1000");
    console.log(response.data.data)
    this.setState({ repairs: response.data.data })
  }

  searchRepair = (event) => {
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

    let filteredRepair = this.state.repairs.filter(
      (repair) => {
        console.log("Toplam Ürün Sayısı : " + this.state.repairs.length);
        return ((repair.brand.indexOf(this.state.searchQuery) !== -1) || (repair.tel.indexOf(this.state.searchQuery) !== -1)) && (repair.name.indexOf(this.state.category) !== -1)
      }
    )


    return (
      <>

        <Nav
          searchProductProp={this.searchRepair}
          //Search alanına barcode yazılıp enter yapıldığında _handleKeyDownProp() fonksiyona gönderiyor.
          _handleKeyDownProp={this._handleKeyDownProp}
          searchQuery={this.state.searchQuery}
        />


        <a href='tamir/yeni'>

          <button type='button' className='btn btn-primary float-right mr-5'><i className='fa fa-plus'></i> YENİ TAMİR</button>
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
                  </tr>
                </thead>
                <tbody>



                  {filteredRepair.map((repair) => (


                    <tr className={repair.status === "bekliyor" ? "p-3 mb-2 bg-warning text-dark" : (repair.status === "undefined" ? "p-3 mb-2 bg-success text-white" : "p-3 mb-2 bg-danger text-dark")} key={repair._Id}>
                      <td> {repair.name}</td>
                      <th>{repair.tel}</th>
                      <td>{repair.troblem}</td>
                      <td>{repair.status}</td>
                      <td>{repair.notes}</td>
                      <td>{repair.estimated_price}</td>
                      <td>{repair.brand}</td>
                      <td>{repair.device_model}</td>
                      <td>{repair.color}</td>
                      <td>{repair.diagnosis}</td>
                      {/* <td>{product.Sms}</td> */}





                      <td><b style={{ fontSize: 15, color: 'gray' }}>
                        {(() => {
                          let date = new Date(repair.repair_created_date);
                          let options1 = {
                            hour: "2-digit",
                            minute: "2-digit",
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

