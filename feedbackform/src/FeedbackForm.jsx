
  import mySVG from './Check_sub.svg';
  import React, { useState } from 'react';
  import axios from 'axios';

  function FeedbackForm() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      organization: '',
      role: '',
      satisfaction: '',
      feedback: '',
      features: [],
      support: '',
      comments: '',
      contact: ''
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          features: [...prevData.features, name]
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          features: prevData.features.filter((feature) => feature !== name)
        }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const jsonData = JSON.stringify(formData);
    
      axios.post('http://localhost:3000/api/save-data', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          console.log(response.data);
          setSubmitted(true); // Update the submitted state to show the confirmation message
          console.log(formData); // Access the submitted data here
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle any errors
        });
    };
    
    if (submitted) {
      // Show the confirmation message
      return (
        <section className="submit-container">
          <div className="submit-wrapper">
            <div className="image">
              <img src={mySVG} alt="" />
            </div>
            <h1>Your Response Has Been Recorded...</h1>
            <button className="btn" onClick={() => setSubmitted(false)}>
              Submit Another Response
            </button>
          </div>
        </section>
      );
    }
    


    return (
      <section className="login-box">
        <h1>FeedBack</h1>
        <p>
        Welcome to Abhyaz!

Please take a moment to provide your valuable feedback. Your input helps us improve our platform and enhance your experience. We appreciate your time and insights.

Thank you for being a part of our community!

-The Abhyaz Team
        </p>
        <form onSubmit={handleSubmit}>
          <div className="ele-container">
            <label htmlFor="Name">
              Name <b>*</b>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="ele-container">
            <label htmlFor="Email">
              Email<b> *</b>
            </label>
            <input
              type="email"
              placeholder="Enter your email id"
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="ele-container">
            <label htmlFor="Organization">
              Organization <b>*</b>
            </label>
            <input
              type="text"
              placeholder="Enter your organization"
              required
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
            />
          </div>
          <ul className="ele-container">
            <p>
              Please select the statement that best represents your role:<b> *</b>
            </p>
            <li>
              <input
                type="radio"
                name="role"
                id="CXOs"
                value="CXOs"
                onChange={handleInputChange}
                checked={formData.role === 'CXOs'}
              />
              <label htmlFor="CXOs">
                The Training Infrastructure Utilization Map would assist in our Strategic Business Planning.
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="role"
                id="IT-Manager"
                value="IT-Manager"
                onChange={handleInputChange}
                checked={formData.role === 'IT-Manager'}
              />
              <label htmlFor="IT-Manager">
                We are delivering trainer, asset &operations BI on our training investment.
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="role"
                id="HR"
                value="HR"
                onChange={handleInputChange}
                checked={formData.role === 'HR'}
              />
              <label htmlFor="HR">Data-driven insights would improve our training operations.</label>
            </li>
            <li>
              <input
                type="radio"
                name="role"
                id="Partners"
                value="Partners"
                onChange={handleInputChange}
                checked={formData.role === 'Partners'}
              />
              <label htmlFor="Partners">
                We are looking to digitally transform our client's training operations.
              </label>
            </li>
          </ul>
          <ul className="ele-container">
            <p>
              How satisfied are you with the Train 4.0 solution? <b> *</b>
            </p>
            <li>
              <input
                type="radio"
                name="satisfaction"
                id="v-satisfied"
                value="Very Satisfied"
                onChange={handleInputChange}
                checked={formData.satisfaction === 'Very Satisfied'}
              />
              <label htmlFor="v-satisfied">Very Satisfied</label>
            </li>
            <li>
              <input
                type="radio"
                name="satisfaction"
                id="satisfied"
                value="Satisfied"
                onChange={handleInputChange}
                checked={formData.satisfaction === 'Satisfied'}
              />
              <label htmlFor="satisfied"> Satisfied</label>
            </li>
            <li>
              <input
                type="radio"
                name="satisfaction"
                id="Neutral"
                value="Neutral"
                onChange={handleInputChange}
                checked={formData.satisfaction === 'Neutral'}
              />
              <label htmlFor="Neutral">Neutral</label>
            </li>
            <li>
              <input
                type="radio"
                name="satisfaction"
                id="dissatisfied"
                value="Dissatisfied"
                onChange={handleInputChange}
                checked={formData.satisfaction === 'Dissatisfied'}
              />
              <label htmlFor="dissatisfied">Dissatisfied</label>
            </li>
            <li>
              <input
                type="radio"
                name="satisfaction"
                id="Poor"
                value="Poor"
                onChange={handleInputChange}
                checked={formData.satisfaction === 'Poor'}
              />
              <label htmlFor="Poor">Poor</label>
            </li>
          </ul>
          <div className="ele-container">
            <p>
              Please provide specific feedback or suggestions for improvement related to Train 4.0:<b> *</b>
            </p>
            <textarea
              placeholder="Feedback/Suggestions"
              minLength={150}
              name="feedback"
              id="suggestions"
              value={formData.feedback}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <ul className="ele-container">
            <p>
              Which key features of Train 4.0 do you find most valuable? <i>(Select all that apply)</i>
              <b> *</b>
            </p>
            <li>
              <input
                type="checkbox"
                id="feature1"
                name="feature1"
                onChange={handleCheckboxChange}
                checked={formData.features.includes('feature1')}
              />
              <label htmlFor="feature1">
                Managing trainer availability, profile, skill map, and performance through the system.
              </label>
            </li>
            <li>
              <input
                type="checkbox"
              id="feature2"
                name="feature2"
                onChange={handleCheckboxChange}
                checked={formData.features.includes('feature2')}
              />
              <label htmlFor="feature2">
                Accessing external queries via chat and increasing outreach with custom-designed campaigns.
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="feature3"
                name="feature3"
                onChange={handleCheckboxChange}
                checked={formData.features.includes('feature3')}
              />
              <label htmlFor="feature3">
                Accessing dashboards for performance metrics on assets, operations, trainer, and system support.
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="feature4"
                name="feature4"
                onChange={handleCheckboxChange}
                checked={formData.features.includes('feature4')}
              />
              <label htmlFor="feature4">
                Accessing the training management system built on Zoho One and driven by your process.
              </label>
            </li>
            <li className="ta-container">
              <input
                type="checkbox"
                id="feature5"
                name="feature5"
                onChange={handleCheckboxChange}
                checked={formData.features.includes('feature5')}
              />
              <div className="ta-wrapper">
                <label className="pls-spfy">Other (please specify).</label>
                <input
                  type="text"
                  name="Other"
                  id="Other"
                  placeholder="Others..."
                  value={formData.Other}
                  onChange={handleInputChange}
                />
              </div>
            </li>
          </ul>
          <ul className="ele-container">
            <p>
              How would you rate the level of support provided by the Abhyaz team for Train 4.0?<b> *</b>
            </p>
            <li>
              <input
                type="radio"
                name="support"
                id="Excellent"
                value="Excellent"
                onChange={handleInputChange}
                checked={formData.support === 'Excellent'}
              />
              <label htmlFor="Excellent">Excellent</label>
            </li>
            <li>
              <input
                type="radio"
                name="support"
                id="Good"
                value="Good"
                onChange={handleInputChange}
                checked={formData.support === 'Good'}
              />
              <label htmlFor="Good">Good</label>
            </li>
            <li>
              <input
                type="radio"
                name="support"
                id="Average"
                value="Average"
                onChange={handleInputChange}
                checked={formData.support === 'Average'}
              />
              <label htmlFor="Average">Average</label>
            </li>
            <li>
              <input
                type="radio"
                name="support"
                id="Poor-Rate"
                value="Poor"
                onChange={handleInputChange}
                checked={formData.support === 'Poor'}
              />
              <label htmlFor="Poor-Rate">Poor</label>
            </li>
            <li>
              <input
                type="radio"
                name="support"
                id="V-Poor-Rate"
                value="Very Poor"
                onChange={handleInputChange}
                checked={formData.support === 'Very Poor'}
              />
              <label htmlFor="V-Poor-Rate">Very Poor</label>
            </li>
          </ul>
          <div className="ele-container">
            <p>
              Do you have any additional comments or suggestions regarding Train 4.0?<b> *</b>
            </p>
            <textarea
              name="comments"
              id="add-comments"
              placeholder="Additional comments..."
              value={formData.comments}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <ul className="ele-container">
            <p>
              Can we contact you for further discussion or clarification regarding your feedback?<b> *</b>
            </p>
            <li>
              <input
                type="radio"
                name="contact"
                id="yes"
                value="Yes"
                onChange={handleInputChange}
                checked={formData.contact === 'Yes'}
              />
              <label htmlFor="yes"> Yes, you can contact me</label>
            </li>
            <li>
              <input
                type="radio"
                name="contact"
                id="no"
                value="No"
                onChange={handleInputChange}
                checked={formData.contact === 'No'}
              />
              <label htmlFor="no"> No</label>
            </li>
          </ul>
          <div className="ele-container">
            <div className="btn-wrapper">
              <input type="submit" value="Submit" className="btn" />
            </div>
          </div>
        </form>
      </section>
    );
  }

  export default FeedbackForm;
