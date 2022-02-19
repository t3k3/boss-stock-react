import React from "react";
import customerPNG from "../../customer.png"
import logoPNG from "../../logo1.png"



class Nav extends React.Component {



  //search alanına yazıldıktan sonra enter tuşuna basılırsa sayfa yenilenmez.
  handleFormSubmit = (event) => {
    event.preventDefault();
  }

  render() {

    return (


      <>
        <section className="header-main bg-light">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3">
                <div className="brand-wrap">

                  <a href="/"><img style={{ width: 50 }} alt="logo" src={logoPNG} /></a>

                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <form onSubmit={this.handleFormSubmit} className="search-wrap">
                  <div className="input-group">
                    <input onInput={(e) => e.target.value = ("" + e.target.value).toLocaleLowerCase('tr-TR')} onChange={this.props.searchProductProp} onKeyDown={this.props._handleKeyDownProp} value={this.props.searchQuery} type="text" className="form-control" placeholder="Ürün İsmi - Barkod - SKU" />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="widgets-wrap d-flex justify-content-end">
                  <div className="widget-header">

                    <a href="/" className="btn btn-primary m-btn m-btn--icon m-btn--icon-only">
                      <i className="fa fa-home"></i>
                    </a>

                  </div>
                  <div className="widget-header dropdown">
                    <a href="# " className="ml-3 icontext" data-toggle="dropdown" data-offset="20,10">
                      <img src={customerPNG} className="avatar" alt=""></img>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="# "><i className="fa fa-sign-out-alt"></i> Çıkış Yap</a>
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


export default Nav;