import React, { useState, useContext } from "react";
import { AuthContext } from "../../processes/user/context/AuthContext";
import { ThemeContext } from "../../processes/user/context/ThemeContext";
import { useNavigate, Navigate } from "react-router-dom";
import SwitchButton from "../../widgets/user/changeTheme/buttonThemeSwitcher/buttonThemeSwitcher";
import BackSpaceButton from "../../shared/calculator/img/backspace.png";
import './calculator-styles/mobile-calculator-styles-white.scss';
import './calculator-styles/mobile-calculator-styles-dark.scss';
import DarkHorse from "../../shared/logo/dark-pink-horse.png";
import WhiteHorse from "../../shared/logo/white-pink-horse.png";

function Calculator() {
    const [calculation, setCalculation] = useState('')
    const [output, setOutput] = useState('')
    const actions = ['/', '*', '+', '-', '.']
    const navigate = useNavigate();

    // check user
    const { currentUser } = useContext(AuthContext);

    const [password, setPassword] = useState(false);

    // theme switcher
    const theme = useContext(ThemeContext);
    const whiteTheme = theme.state.whiteTheme;

    const checkPassword = () => {
        if (password === true) {
            if (currentUser === undefined) {
                navigate("/login")
            } else if (currentUser !== undefined) {
                navigate("/home")
            } else {
                console.log("error")
            }
    
        } else if (!password) {
            //pass
        };
    };

    const updateCalculation = value => {

        if (
            actions.includes(value) & calculation === '' ||
            actions.includes(value) & actions.includes(calculation.slice(-1)) ||
            actions.includes(value) & calculation === 0
        ) {
            return "Error";
        }

        setCalculation(calculation + value)

        if (!actions.includes(value)) {
            setOutput(eval(calculation + value).toString())
        }
    }

    const createDigits = () => {
        const digits = []

        for (let i = 1; i < 10; i++) {
            digits.push(
                <button onClick={() => updateCalculation(i.toString())} key={i}>{i}</button>
            )
        }

        return digits
    }

    const calculate = () => {
        if (calculation === "5+6") {
            setPassword(true)
            checkPassword()
        } else if (calculation === undefined || calculation.length === 0 || calculation === "") {
            setCalculation("Error")
        } else {
            checkPassword()
            setCalculation(eval(calculation).toString());
        }
    }

    const clear = () => {
        if (calculation === '') {
            return
        }
        const value = calculation.slice(0, -1)
        setCalculation(value)
    }

    return (
        <div className={whiteTheme ? "calculator-white" : "calculator-dark"} >
            <div className="container" >

                <div className="calc-grid">

                    <center><img className="horse" src={ whiteTheme ? WhiteHorse : DarkHorse } /> <h1>React Calculator With React Hooks</h1><SwitchButton /></center>

                    <div className='output'>
                        {calculation || '0'}
                        {output ? <span className="preRes">{output}</span> : ''}
                    </div>

                    <div>
                        <div className='ops'>

                            <button onClick={() => { updateCalculation('/') }} >/</button>
                            <button onClick={() => { updateCalculation('*') }}>*</button>
                            <button onClick={() => { updateCalculation('+') }}>+</button>
                            <button onClick={() => { updateCalculation('-') }}>-</button>
                            <button onClick={clear}> <img width={40} height={40} src={BackSpaceButton} /></button>
                        </div>
                        <div className='dig'>
                            {createDigits()}
                            <button onClick={() => { updateCalculation('.') }}>.</button>
                            <button onClick={() => { updateCalculation('0') }}>0</button>
                            <button className="equal_button" onClick={calculate}>=</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
