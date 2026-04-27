import React from "react";
import { useFormik } from "formik";

export default function FormikExample() {
  const SignupForm = () => {
    // Note that we have to initialize ALL of fields with values. These
    // could come from props, but since we don’t want to prefill this form,
    // we just use an empty string. If we don’t do this, React will yell
    // at us.

    // FOR MORE PROFESSIONAL CONFIRMATION, WE CAN USE YUP LIBRARY. please check the video https://academy.patika.dev/courses/react/formik-form-validasyonlari-1

    // THE NAME ATTR AND initialValues KEYS MUST BE SAME
    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        gender: "male",
        hobbies: [],
        country: "",
        password: "",
        confirmPassword: "",
      },
      validate: (values) => {
        const errors = {};
        const nameRegex = /^[A-Za-z]+$/;

        if (!values.firstName) {
          errors.firstName = "Required";
        } else if (values.firstName.length < 2) {
          errors.firstName = "Must be at least 2 characters";
        } else if (values.firstName.length > 75) {
          errors.firstName = "Must be lower than 75 characters";
        } else if (!nameRegex.test(values.firstName)) {
          errors.firstName = "First name can only contain letters";
        }

        if (!values.lastName) {
          errors.lastName = "Required";
        } else if (values.lastName.length < 2) {
          errors.lastName = "Must be at least 2 characters";
        } else if (values.lastName.length > 75) {
          errors.lastName = "Must be lower than 75 characters";
        } else if (!nameRegex.test(values.lastName)) {
          errors.lastName = "Last name can only contain letters";
        }

        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 8) {
          errors.password = "Must be at least 8 characters";
        } else if (values.password.length > 12) {
          errors.password = "Must be lower than 13 characters";
        }

        if (!values.confirmPassword) {
          errors.confirmPassword = "Required";
        } else if (values.password !== values.confirmPassword) {
          errors.confirmPassword = "Password could not confirmed";
        }

        if (!values.country) {
          errors.country = "Required";
        }

        return errors;
      },
      onSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 200);
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">
          First Name <span className="req">*</span>
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="error">{formik.errors.firstName}</div>
        ) : null}

        <label htmlFor="lastName">
          Last Name <span className="req">*</span>
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="error">{formik.errors.lastName}</div>
        ) : null}

        <label htmlFor="email">
          Email Address <span className="req">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="example@gmail.com"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">
          password (8-12 characters) <span className="req">*</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}

        <label htmlFor="passwordConfirm">
          password confirmation <span className="req">*</span>
        </label>
        <input
          id="passwordConfirm"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="error">{formik.errors.confirmPassword}</div>
        ) : null}

        <span className="radio">
          <label htmlFor="gender" className="checkbox-label">
            Male
          </label>
          <input
            id="gender"
            name="gender"
            type="radio"
            className="input-gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value="male"
            checked={formik.values.gender === "male"}
          />

          <label htmlFor="gender" className="checkbox-label">
            Famale
          </label>
          <input
            id="gender"
            name="gender"
            type="radio"
            className="input-gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value="female"
            checked={formik.values.gender === "female"}
          />
        </span>

        <span className="radio">
          <p>Please Select Hobby (optional)</p>
          <label htmlFor="hb1" className="checkbox-label">
            Football
          </label>
          <input
            id="hb1"
            name="hobbies"
            type="checkbox"
            className="input-gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value="football"
          />

          <label htmlFor="hb2" className="checkbox-label">
            Swimming
          </label>
          <input
            id="hb2"
            name="hobbies"
            type="checkbox"
            className="input-gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value="Swimming"
          />

          <label htmlFor="hb3" className="checkbox-label">
            Reading
          </label>
          <input
            id="hb3"
            name="hobbies"
            type="checkbox"
            className="input-gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value="Reading"
          />

          <label htmlFor="hb4" className="checkbox-label">
            Trip
          </label>
          <input
            id="hb4"
            name="hobbies"
            type="checkbox"
            className="input-gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value="Trip"
          />
        </span>

        <span className="selection">
          <label htmlFor="COU" className="checkbox-label">
            COUNTRY <span className="req">*</span>
          </label>
          <select
            name="country"
            id="COU"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
          >
            <option value="">--Please choose an option--</option>
            <option value="TR">TR</option>
            <option value="USA">USA</option>
            <option value="GR">GR</option>
            <option value="RU">RU</option>
          </select>
          {formik.touched.country && formik.errors.country ? (
            <div className="error">{formik.errors.country}</div>
          ) : null}
        </span>

        <code>
          <span className="req">*</span> : Required
        </code>

        <button type="submit" disabled={formik.isSubmitting}>
          Submit
        </button>
      </form>
    );
  };

  return <SignupForm />;
}
