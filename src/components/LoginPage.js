import React, { useState } from 'react'
import { login } from '../network/AuthService'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!userName) {
            setError("Email je obavezan");
            setLoading(false)
            return;
        }

        if (!password) {
            setError("Lozinka je obavezna");
            setLoading(false)
            return;
        }

        try {
            const response = await login(userName, password)
            const token = response.data.token

            localStorage.setItem('token', token)
            navigate('/')
        } catch (error) {
            setError('Neuspešna prijava.')
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div className='loginPage'>
            <div>
                <div className="headerContainerLogin">
                    <h3>KONOVO</h3>
                </div>
            </div>
            <div className='loginScreen'>
                <div>
                    <form onSubmit={handleSubmit} className='loginCard'>
                        <h2>Uloguj se</h2>
                        <div className="formGroup">
                            <label>Korisničko ime</label>
                            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" />
                        </div>
                        <div className="formGroup">
                            <label>Lozinka</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                        </div>
                        <button type="submit" className="buttonLogin">
                            {loading ? (
                                <div className="spinner-border spinnerBorderCustom" role="status">
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
