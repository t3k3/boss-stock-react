import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';




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
                                    ANA SAYFA
                                </a>
                            </li>
                            <li key={2} className="nav-item" >
                                <a href="/urunler" className="nav-link" >
                                    ÜRÜNLER
                                </a>
                            </li>
                            <li key={3} className="nav-item" >
                                <a href="/pos" className="nav-link " >
                                    SATIŞ NOKTASI
                                </a>
                            </li>
                            <li key={4} className="nav-item" >
                                <a href="/satislar" className="nav-link " >
                                    SATIŞLAR
                                </a>
                            </li>
                            <li key={5} className="nav-item" >
                                <a href="/tamir" className="nav-link " >
                                    TAMİR
                                </a>
                            </li>

                        </ul>
                        <hr />
                        <div className="dropdown">
                            <a href="# " className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="# " alt="" width="32" height="32" className="rounded-circle me-2" />
                                <strong>boss</strong>
                            </a>
                            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                <li><a className="dropdown-item" href="# ">Ayarlar</a></li>
                                <li><a className="dropdown-item" href="# ">Profil</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="# ">Çıkış Yap</a></li>
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Sidebar