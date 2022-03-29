import React from 'react';
import axios from 'axios';
import serialize from 'form-serialize';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../POSComponents/Nav';
import Sidebar from '../Sidebar';


class AddRepair extends React.Component {

    selam
    
    constructor() {
        super();
        this.state = {
            selectedFile: [],

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
            console.log(event.target.files)
            alert("Yalnızca JPG yükleyebilirsiniz.")
            return
        }

        const data = new FormData()
        data.append('file', event.target.files[0])

        if (event.target.files[0] !== null) {
            this.submit(data);
            
        }else {
            
            throw new Error("Dosyayı kontrol edin.");
        }
    }

    submit(data) {

        let url = "http://localhost:3001/api/upload";
        
        axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.data.data)
                this.setState({ imageURL: res.data.data })
            })

    }

    urunEkle = (e) => {
        e.preventDefault();
        
        const newRepair = serialize(e.target, { hash: true });


        newRepair.estimated_price = Number(newRepair.estimated_price);

        newRepair.status = "bekliyor";


        //newRepair.Sms = Boolean(newRepair.Sms);

        console.log(newRepair);

        this.urunEklePost(newRepair);

    }

    urunEklePost = async (repair) => {
        const response = await axios.post(`http://localhost:3001/api/repairs`, repair);
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

                     

                            {/** FORM START */}
                            <br />
                            <form onSubmit={this.urunEkle}>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Arıza Kaydı</span>
                                    <input type="text" name="name" className="form-control" required />

                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Ad Soyad </span>
                                    <textarea className="form-control" aria-label="With textarea"></textarea>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Telefon</span>
                                    <input type="text" name="tel" className="form-control" aria-label="Amount (to the nearest dollar)" required />
                                    <span className="input-group-text"></span>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Arıza</span>
                                    <input type="text" name="problem" className="form-control" aria-label="Amount (to the nearest dollar)" required />
                                    <span className="input-group-text"></span>
                                </div>


                                <div className="input-group mb-3">
                                    <span className="input-group-text">Durum </span>
                                    <input type="text" name="status" className="form-control" required />

                                </div>


                                <div className="input-group mb-3">
                                    <span className="input-group-text">Not </span>
                                    <input type="text" name="notes" className="form-control" required />

                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Ortalama Fiyat </span>
                                    <input type="number" name="estimated_price" className="form-control" required />

                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Marka</span>
                                    <input type="text" name="brand" className="form-control" required />

                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Model</span>
                                    <input type="text" name="model" className="form-control" required />

                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Renk</span>
                                    <input type="text" name="color" className="form-control" required />

                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Teşhis</span>
                                    <input type="text" name="diagnosis" className="form-control" required />

                                </div>

                                {/* <div className="input-group mb-3">
                                    <span className="input-group-text">Sms</span>
                                    <input type="bool" name="sms" className="form-control" required />

                                </div> */}

                             

                                <input className='btn btn-success' style={{ float: 'right', minBlockSize: 100, minWidth: 100, fontSize: 50 }} type="submit" value="Ekle" />
                            </form>

                            {/** FORM END */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddRepair