import {Formik, useField, Form} from "formik"; 
import * as Yup from 'yup'
import { Styles } from "./Styles";

const CustomTextinput = ({label, ...props}) => {

  const[field, meta] = useField(props);

return (
  <>
  <label htmlFor={props.id || props.name}>{label}</label>
  <input className="text-input" {...field} {...props}/>
  {meta.touched && meta.error ? (
  <div className = "error">{meta.error}</div>) :
  null}

  </>
)
}

const CustomCheckBox = ({children, ...props}) => {

  const[field, meta] = useField(props, 'checkbox');

return (
  <>
  <label className="checkbox">
  <input type="checkbox" {...field} {...props}/>
  {children}
  </label>
  {meta.touched && meta.error ? (
  <div className = "error">{meta.error}</div>) :
  null}

  </>
)
}

const CustomSelect = ({label, ...props}) => {

  const[field, meta] = useField(props);

return (
  <>
  <label htmlFor={props.id || props.name}>{label}</label>
  <select {...field} {...props}/>
  {meta.touched && meta.error ? (
  <div className = "error">{meta.error}</div>) :
  null}

  </>
)
}


function App() {
  return (
 
    <Styles>
      <Formik
      initialValues={{
 
        name: '',
        email: '',
        acceptedTerms: false,
        specialPower: '',


      }}
      validationSchema={Yup.object({
        name: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .max(15, 'Must be 15 character or less')
        .required('Required'),
        email: Yup.string()
        .email('Invalid email')
        .required('Required'),
        acceptedTerms: Yup.boolean()
        .required('Required')
        .oneOf([true], 'You must accept the terms and conditions'),
        specialPower: Yup.string()
        .oneOf(['flight', 'invisability', 'teleportation', 'other' ], 'invalid special power')
        .required('Required')
      })}
      onSubmit={(values, {setSubmitting, resetForm}) => {
        setTimeout(() =>{
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 3000)
      }}
      >
        {props =>(
          <Form>
            <h1>Sign Up</h1>
            <CustomTextinput  label="Name" name="name" type="text" placeholder="curtis"/>
            <CustomTextinput  label="Email" name="email" type="email" placeholder="curtis@React.com"/>
            <CustomSelect label="Special Power" name = "specialPower">
            <option value="">Select a special Power</option>
            <option value="flight">flight</option>
            <option value="invisability">invisability</option>
            <option value="teleportation">teleportation</option>
            <option value="other">others</option>
            </CustomSelect>
            <CustomCheckBox name="acceptedTerms">
              I accept the terms and conditions
            </CustomCheckBox>
            <button type="submit">{props.isSubmitting ? 'loading...': 'Submit'}</button>
          </Form>
        )}

        </Formik>
    </Styles>
  );
}

export default App;
