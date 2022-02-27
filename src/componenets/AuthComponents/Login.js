import React from 'react'
import 'bootstrap'
import serialize from 'form-serialize';


const Login = () => {



    function LoginHandler(e) {
        e.preventDefault();
        const login = serialize(e.target, { hash: true });
        console.log(login)
    }

    return (
        <>

            <div className='container col-3 center-x mt-5 bg-light'>
                <form onSubmit={LoginHandler} className="px-4 py-3">
                    <div className="mb-3">
                        <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email</label>
                        <input type="email" name='email' className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleDropdownFormPassword1" className="form-label">Parola</label>
                        <input type="password" name='password' className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                            <label className="form-check-label" htmlFor="dropdownCheck">
                                Beni Hatırla
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="# ">Kayıt Ol!</a>
                <a className="dropdown-item" href="# ">Şifreni mi unuttun?</a>
            </div>


        </>
    )
}

export default Login