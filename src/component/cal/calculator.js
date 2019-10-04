import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
class Calculator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      volume: 18000,
      Service: 1000,
      loan_term: 36,
      loan_interest: 9,
      fee: 250,
      total_interest_pay: '',
      servise: 1080,
      total_amt: 21936.23,
      total_interest_pay_text: 2606.23,
      FinalEmi: 609.34
    }
  }
  createInterest = () => {
    let Interest = []

    for (let i = 0; i < 20; i++) {
      Interest.push(<option key={i} value={i + 1}>{i + 1}%</option>)
    }
    return Interest
  }
  createTerm = () => {
    let Term = []

    for (let i = 1; i < 15; i++) {
      Term.push(<option key={i} value={i * 3}>{i * 3} Months</option>)
    }
    return Term
  }

  handleOnChange = value => {
    this.setState({
      volume: value
    })

    this.CalculatorFn(this.state)
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value }, () =>
      this.CalculatorFn(this.state)
    )
  }
  CalculatorFn = val => {
   
    let r = val.loan_interest / 12 / 100
    let P = val.volume
    let n = val.loan_term
    let tEmi = P * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1))

    let total_interest_pay = tEmi * n - val.volume
    let total_interest_pay_text = (tEmi * n - val.volume).toFixed(2)
    let servise = (val.volume * 6) / 100

    const total_amt = (
      parseFloat(val.volume) +
      parseFloat(total_interest_pay) +
      parseFloat(servise) +
      parseFloat(val.fee)
    ).toFixed(2)
    const FinalEmi = (total_amt / parseInt(val.loan_term)).toFixed(2)
 

    this.setState({
      volume: val.volume,
      total_interest_pay: total_interest_pay,
      servise: servise,
      total_amt: total_amt,
      total_interest_pay_text: total_interest_pay_text,
      FinalEmi: FinalEmi
    })
  }
  render () {
    let { volume } = this.state
    return (
      <div className='container'>
        <h1 className='text-center'>Loan Calculator</h1>
        <div className='price-box'>
          <div className='row'>
            <div className='col-sm-6'>
              <div className='price-slider'>
                <h4 className='great'>Principal Amount</h4>
                <span>Min 10k to Max 100K</span>
                <div className='col-sm-12'>
                  <div id='slider_amirol'>
                    <div className='slider-pos'>
                      <Slider
                        value={volume}
                        onChange={this.handleOnChange}
                        min={10000}
                        max={100000}
                        tooltip
                        step={1000}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='price-slider'>
                <h4 className='great'>Loan Term</h4>

                <div className='btn-group btn-group-justified'>
                  <select
                    className='form-control'
                    name='loan_term'
                    value={this.state.loan_term}
                    onChange={this.handleChange}
                  >
                    {this.createTerm()}
                  </select>
                </div>
              </div>
              <div className='price-slider'>
                <h4 className='great'>Fixed Interest Rate</h4>

                <input
                  name='sliderVal'
                  type='hidden'
                  id='sliderVal'
                  value='0'
                  readOnly='readOnly'
                />
                <input
                  name='month'
                  type='hidden'
                  id='month'
                  value='24month'
                  readOnly='readOnly'
                />
                <input
                  name='term'
                  type='hidden'
                  id='term'
                  value='quarterly'
                  readOnly='readOnly'
                />
                <div className='btn-group btn-group-justified'>
                  <select
                    className='form-control'
                    name='loan_interest'
                    value={this.state.loan_interest}
                    onChange={this.handleChange}
                  >
                    {this.createInterest()}
                  </select>
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='price-form'>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <label htmlFor='amount_amirol' className='control-label'>
                        Principal ($):{' '}
                      </label>
                    </div>
                    <div className='col-sm-6'>
                      <input
                        className='price lead'
                        name='totalprice'
                        type='text'
                        value={this.state.volume}
                        disabled='disabled'
                      />
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <label htmlFor='amount_amirol' className='control-label'>
                        Interest ($):{' '}
                      </label>
                    </div>
                    <div className='col-sm-6'>
                      <input
                        className='price lead'
                        type='text'
                        value={this.state.total_interest_pay_text}
                        disabled='disabled'
                      />
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <label htmlFor='amount_amirol' className='control-label'>
                        Fee ($):{' '}
                      </label>
                    </div>
                    <div className='col-sm-6'>
                      <input
                        className='price lead'
                        type='text'
                        value={this.state.fee}
                        disabled='disabled'
                      />
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <label htmlFor='amount_amirol' className='control-label'>
                        Service ($):{' '}
                      </label>
                    </div>
                    <div className='col-sm-6'>
                      <input
                        className='price lead'
                        type='text'
                        value={this.state.servise}
                        disabled='disabled'
                      />
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <label htmlFor='amount_amirol' className='control-label'>
                        Total ($):{' '}
                      </label>
                    </div>
                    <div className='col-sm-6'>
                      <input
                        className='price lead'
                        type='text'
                        value={this.state.total_amt}
                        disabled='disabled'
                      />
                    </div>
                  </div>
                </div>
                <div />
                <hr className='style' />

                <div className='form-group'>
                  <div className='col-sm-12'>
                    <div className='col-md-12 payDiv'>
                      <div className='card'>
                        <span className='pull-left'>
                          <h3>Payment</h3>
                        </span>
                        <span className='pull-right'>
                          <h3>${this.state.FinalEmi}/monthly</h3>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator
