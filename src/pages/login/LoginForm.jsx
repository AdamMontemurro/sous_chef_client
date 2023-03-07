import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginForm = ({toggleForm , setUser}) => {

    let navigate = useNavigate()

    const loginUser = async (data) => {
        try {
            const res = await axios.post('http://localhost:3001/users/login', data)
            localStorage.setItem('token', res.data.token)
            navigate('/dashboard')
            return res.data
        } catch (error) {
            console.log(error);
            throw error
        }
    }


    const initialState = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [formValues, setFormValues] = useState(initialState)

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const payload=  loginUser(formValues)
        setFormValues(initialState)
        setUser(payload)
    }



    return (
        <form className="col" onSubmit={onSubmit}>
            <div className='header'>
                <h1>Log in</h1>
            </div>
            <div className="input-wrapper-login">
                <label htmlFor="email"></label>
                <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={formValues.email}
                    required
                />
            </div>
            <div className="input-wrapper-login">
                <label htmlFor="password"></label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={formValues.password}
                    placeholder="Enter password"
                    required
                />
            </div>
            <div className='checkBoxDiv'>
                <input type="checkbox" name="" className='checkBox' />
                <label htmlFor="checkbox"> Remember me</label>
            </div>
            <button
                disabled={
                    !formValues.email ||
                    (!formValues.password &&
                        formValues.confirmPassword === formValues.password)
                }>
                Sign In
            </button>
            <div className='createFormText'>
                <p className='pCreate'>Not a user? <a onClick={()=>toggleForm()}>Sign up now</a></p>
            </div>
        </form>
    )
}
export default LoginForm