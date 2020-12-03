import React from 'react';
import "../../../CSS/ExamPopup.css"
import SignIn from "../../FrontPage/SignIn";

class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <SignIn examSignIn={true} onGoBack={this.props.closePopup} onExamSignIn={this.props.authenticate} examSetId={this.props.examSetId}/>
                </div>
            </div>
        );
    }
}

export default Popup;