import React, { useState } from 'react'

export default function LoginPage() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    return (
        <div className='loginPage'>
            <div>
                <div className="headerContainerLogin">
                    <h3>KONOVO</h3>
                </div>
            </div>

            <div className='loginScreen'>
                <div>
                    <form className='loginCard'>
                        <h2>Uloguj se</h2>
                        <div className="formGroup">
                            <label>Korisničko ime</label>
                            <input type="email" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" />
                        </div>
                        <div className="formGroup">
                            <label>Lozinka</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                        </div>
                        <button type="submit" className="buttonLogin">
                            {loading ? (
                                <div className="spinner-border spinner-border-sm-custom" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                "Prijavi se"
                            )}
                        </button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}
