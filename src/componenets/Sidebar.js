import React from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css';





const Sidebar = () => {
    return (
        <>

            <div className='container-fluid'>

                <div className='row'>


                    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '250px' }}>
                        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">

                            <span className="fs-4">Sidebar</span>
                        </a>
                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li key={1} className="nav-item" >
                                <a href="/" className="nav-link">
                                <i className="fa fa-home"></i>
                                    Ana Sayfa
                                </a>
                            </li>
                            <li key={2} className="nav-item" >
                            
                                <a href="/urunler" className="nav-link" >
                                <i className="fa-thin fa-arrow-up"></i>
                                    Ürünler
                                </a>
                            </li>
                            <li key={3} className="nav-item" >

                                <a href="/pos" className="nav-link " >
                                <i className="fas fa-address-book"></i>
                                    Satış Noktası
                                </a>
                            </li>
                            <li key={4} className="nav-item" >
                                <a href="/satislar" className="nav-link " >
                                    Satışlar
                                </a>
                            </li>
                            <li key={5} className="nav-item" >
                                <a href="/tamir" className="nav-link " >
                                    Tamir
                                </a>
                            </li>
                            <li key={6} className="nav-item" >
                                <a href="/kasa" className="nav-link " >
                                    Kasa İşlemleri
                                </a>
                            </li>
                            <li key={7} className="nav-item" >
                                <a href="/imeil" className="nav-link " >
                                    İmeil Sorgula
                                </a>
                            </li>
                            <li key={8} className="nav-item" >
                                <a href="/tedarikciler" className="nav-link " >
                                    Tedarikçiler
                                </a>
                            </li>
                            <li key={9} className="nav-item" >
                                <a href="/personel" className="nav-link " >
                                    Personel
                                </a>
                            </li>
                            <li key={10} className="nav-item" >
                                <a href="/loglar" className="nav-link " >
                                    İşlem Logları
                                </a>
                            </li>
                            <li key={11} className="nav-item" >
                                <a href="/raporlar" className="nav-link " >
                                    Raporlar
                                </a>
                            </li>
                            <li key={12} className="nav-item" >
                                <a href="/ayarlar" className="nav-link " >
                                    Ayarlar
                                </a>
                            </li>

                        </ul>
                        <hr />
                        <div className="dropdown">
                            <a href="# " className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                Ürünler
                            </a>
                            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                <li><a className="dropdown-item" href="# ">Yeni Ürün</a></li>
                                <li><a className="dropdown-item" href="# ">Ürün Listesi</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="# ">Stok Sayısı</a></li>
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Sidebar