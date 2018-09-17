import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Rating, Form, Button, TextArea} from 'semantic-ui-react'



const ReviewTextField = props => (
  <Form.Field>
    <TextArea value={props.input.value}
             onChange={(param,data) => props.input.onChange(data.value)}
             placeholder='Write your review here...'
             />
  </Form.Field>
)


const ReviewRating = props => (
  <Form.Field>
    <Rating  value={props.input.rating}
             onRate={(param,data) => props.input.onChange(data.rating)}
             icon='star' defaultRating={0} maxRating={5}
             />
  </Form.Field>
)


let ReviewForm = props => {
  const {handleSubmit} = props
  return (
  <Form onSubmit={handleSubmit}>
    <Field name="reviewName" component={ReviewTextField} />
    <Field name="reviewRating" component={ReviewRating} />
    <Button color='teal' content='Leave a review' labelPosition='left' icon='edit' />
  </Form>
  )
}

export default reduxForm({
  form: 'review'
})(ReviewForm)
