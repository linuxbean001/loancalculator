
import React, { Component } from 'react';
import Slider from 'react-rangeslider'
import NumberFormat from 'react-number-format';
import 'react-rangeslider/lib/index.css'
class Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            volume: 18000,
            loanAmt: 18000,
            termValue: 6,
            loan_term: 36,
            loan_interest: 6,
            fee: 250,
            total_interest_pay: '',
            servise: 1440,
            total_amt: 21403.42,
            total_interest_pay_text: 1713.42,
            FinalEmi: 609.34
        }
    }
    // createInterest = () => {
    //     let Interest = []
    //     for (let i = 6; i < 15; i++) {
    //         Interest.push(<option key={i} value={i}>{i}%</option>)
    //     }
    //     return Interest
    // }

    createTerm = () => {
        let Term = []

        for (let i = 1; i < 11; i++) {
            Term.push(<option key={i} value={i*6}>{i*6} (popular)</option>)
        }
        return Term
    }

    handleOnChange = (value) => {
        this.setState({
            volume: value
        })

    }
    handleOnChangeTerm = (value) => {
        this.setState({
            termValue: value
        })

    }
    handleChange = (evt) => {

        this.setState({ [evt.target.name]: evt.target.value }

        );

    }
    CalculateAmt = () => {
        console.log('xxxxxxxxx', this.state);
        this.CalculatorFn(this.state)

    }
    CalculatorFn = (val) => {
        console.log(val.termValue);
        const r = val.termValue / 12 / 100;
        const P = val.volume
        const n = val.loan_term
        const tEmi = (P * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)))
        let servise = val.volume * 8 / 100;
        const total_interest_pay = ((tEmi * n) - val.volume);
        const total_interest_pay_text = ((tEmi * n) - val.volume).toFixed(2);
        if (val.volume >= 10000 && val.volume <= 19999) {
            servise = val.volume * 8 / 100;
        } else if (val.volume >= 20000 && val.volume <= 49999) {
            servise = val.volume * 7 / 100;
        } else if (val.volume >= 50000 && val.volume <= 107000) {
            servise = val.volume * 6 / 100;
        }

        const total_amt = (parseFloat(val.volume) + parseFloat(total_interest_pay) + parseFloat(servise) + parseFloat(val.fee)).toFixed(2);
        const FinalEmi = (total_amt / parseInt(val.loan_term)).toFixed(2);

        this.setState({
            loanAmt: val.volume,
            total_interest_pay: total_interest_pay,
            servise: servise,
            total_amt: total_amt,
            total_interest_pay_text: total_interest_pay_text,
            FinalEmi: FinalEmi
        })
    }
    numberWithCommas=(x) =>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render() {
        let { volume, termValue } = this.state
        return (
            <div className="container">
                <h1 className="text-center">Grow with a loan from your community</h1>
                <div className="price-box">
                    <div className="row">
                        <div className="col-sm-6">

                            <div className="price-slider">
                                <h4 className="great">How much do you need to make your project a reality?</h4>

                                <div className="col-sm-12">
                                    <div id="slider_amirol">
                                   
                                        <div className="slider-pos">
                                            <Slider
                                                value={volume}
                                                onChange={this.handleOnChange}
                                                min={10000}
                                                max={100000}
                                                step={1000}
                                                tooltip={true}

                                            />

                                        </div>
                                        <span className="pull-left">$10,000</span>

                                        <span className="pull-right">$100,000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="price-slider">
                                <h4 className="great">What loan term makes sense for you?</h4>

                                <div className="btn-group btn-group-justified">
                                    <select className="form-control" name="loan_term"
                                        value={this.state.loan_term}
                                        onChange={this.handleChange}>

                                        {this.createTerm()}
                                    </select>

                                </div>
                            </div>
                            <div className="price-slider">
                                <h4 className="great">Fixed Interest Rate</h4>
                                <div className="btn-group btn-group-justified">
                                    <input type="number" name="termValue" className="price lead" min={6} max={14} value={this.state.termValue}
                                        onChange={this.handleChange} /><span className="font-24">%</span>
                                    <div className="slider-pos">
                                        <Slider
                                            value={termValue}
                                            onChange={this.handleOnChangeTerm}
                                            min={6}
                                            max={14}
                                            step={1}
                                            tooltip={true}
                                        />
                                    </div>
                                    <span className="pull-left">6%</span>
                                    <span className="pull-right">14%</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <button type="button" onClick={this.CalculateAmt} className="btn button btn-black btn-lg" >CALCULATE </button>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="price-form">

                                <div className="form-group">

                                    <div className="col-md-12 payDiv">
                                        <div className="card">

                                            <span className="text-center"><h1>${this.state.FinalEmi} </h1><h5 className="text-center">paid monthly to your community! </h5></span>

                                        </div>
                                    </div>

                                </div>

                                <hr className="style" />
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label htmlFor="amount_amirol" className="control-label">Principal: </label>

                                        </div>
                                        <div className="col-sm-6">
                                            <NumberFormat className="price lead" thousandSeparator={true} prefix={'$'} value={this.state.loanAmt} disabled="disabled" />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label htmlFor="amount_amirol" className="control-label">Interest : </label>

                                        </div>
                                        <div className="col-sm-6">
                                            <NumberFormat className="price lead" thousandSeparator={true} prefix={'$'} value={this.state.total_interest_pay_text} disabled="disabled" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label htmlFor="amount_amirol" className="control-label">One-time posting fee: </label>

                                        </div>
                                        <div className="col-sm-6">
                                            <NumberFormat className="price lead" thousandSeparator={true} prefix={'$'} value={this.state.fee} disabled="disabled" />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label htmlFor="amount_amirol" className="control-label">One-time success fee: </label>

                                        </div>
                                        <div className="col-sm-6">
                                            <NumberFormat className="price lead" thousandSeparator={true} prefix={'$'} value={this.state.servise} disabled="disabled" />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label htmlFor="amount_amirol" className="control-label">Total: </label>
                                        </div>

                                        <div className="col-sm-6">
                                            <NumberFormat className="price lead" thousandSeparator={true} prefix={'$'} value={this.state.total_amt} disabled="disabled" />

                                        </div>
                                    </div>
                                </div>

                                <div ></div>

                            </div>

                        </div>
                    </div>

                </div>

            </div>

        );
    }
}

export default Calculator; 