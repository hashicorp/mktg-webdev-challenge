import React, { useState, useEffect } from 'react'

import getAnalytics from './helpers/getAnalytics'

import Button from '@hashicorp/react-button'
import CheckboxInput from '@hashicorp/react-checkbox-input'
import TextInput from '@hashicorp/react-text-input'

import SubmitMessage from './partials/SubmitMessage/index.js'

/**
 * Localized from legacy web-components — @hashicorp/react-newsletter-signup-form v.2.1.4
 */

function NewsletterSignupForm(props) {
  const [storedEmail, setStoredEmail] = useState('')
  const [submitStatus, setSubmitStatus] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
  }

  const { placeholder, buttonText, theme, allowHorizontalLayout } = props
  return (
    <form
      className="g-newsletter-signup-form"
      onSubmit={handleSubmit}
      data-allow-horizontal-layout={props.allowHorizontalLayout}
      data-submitting={false}
      data-submitted={(!!submitStatus).toString()}
    >
      <SubmitMessage submitStatus={submitStatus} theme={theme} />
      <div className="form-elements">
        <div className="inputs">
          <TextInput
            type="email"
            name="email"
            className="g-text-input"
            placeholder={placeholder}
            theme={theme}
            form={{ touched: {}, errors: {} }}
            field={{}}
          />
          <CheckboxInput
            name="privacyPolicy"
            label="I agree to HashiCorp’s <a href='https://www.hashicorp.com/privacy' target='_blank'>Privacy&nbsp;Policy</a>.*"
            className="g-checkbox-input"
            theme={theme}
            form={{ touched: {}, errors: {} }}
            field={{ disabled: true }}
          />
        </div>
        <Button
          className="g-btn"
          type="submit"
          title={buttonText}
          theme={{
            brand: theme.brand,
            variant: theme.background === 'brand' ? 'secondary' : 'primary',
            background: theme.background,
          }}
        />
      </div>
    </form>
  )
}

NewsletterSignupForm.defaultProps = {
  allowHorizontalLayout: true,
  placeholder: 'Business Email address',
  buttonText: 'Subscribe to Newsletter',
  theme: {
    background: 'light',
  },
}

export default NewsletterSignupForm
